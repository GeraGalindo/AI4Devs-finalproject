import request from 'supertest';
import { afterAll, afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { createApp } from '../../src/app.js';
import { createAuthRepository } from '../../src/modules/auth/auth.repository.js';
import { DEV_JWT_SECRET } from '../../src/shared/config.js';
import { createPool } from '../../src/shared/db.js';
import { createPrisma } from '../../src/shared/prisma.js';
import {
  authTestContext,
  CSRF,
  expectError,
  ORIGIN,
  PASSWORD,
  PROD_CSRF,
  registration,
  sessionCookie,
  setCookies,
  tokenOf,
  userCount,
  userRow,
} from '../support/auth-app.js';
import { resolveTestDatabaseUrl } from '../support/test-database.js';

/** CSRF, límite de peticiones, cookie de producción y ausencia de credenciales en logs (DEV-004). */
describe('authentication security controls', () => {
  const ctx = authTestContext();
  let app = ctx.app();

  beforeEach(async () => {
    await ctx.reset();
    app = ctx.app();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  afterAll(() => ctx.close());

  describe('CSRF on register, login and logout (API-06)', () => {
    const foreign = [
      ['another Origin', { Origin: 'https://evil.example', 'X-CSRF-Protection': '1' }],
      ['Origin: null', { Origin: 'null', 'X-CSRF-Protection': '1' }],
      ['no X-CSRF-Protection', { Origin: ORIGIN }],
      ['no Origin, Sec-Fetch-Site or Referer', { 'X-CSRF-Protection': '1' }],
      ['Sec-Fetch-Site: cross-site', { 'Sec-Fetch-Site': 'cross-site', 'X-CSRF-Protection': '1' }],
    ] as const;

    it.each(foreign)('API-06: login with %s → 403 without Set-Cookie', async (_label, headers) => {
      await request(app).post('/api/auth/register').set(CSRF).send(registration()).expect(201);
      const res = await request(app)
        .post('/api/auth/login')
        .set(headers)
        .send({ email: 'ana@example.com', password: PASSWORD });
      expectError(res, 403, 'CSRF_REJECTED');
      expect(setCookies(res)).toEqual([]);
    });

    it.each(foreign)('register with %s → 403, no account and no cookie', async (_label, headers) => {
      const res = await request(app).post('/api/auth/register').set(headers).send(registration());
      expectError(res, 403, 'CSRF_REJECTED');
      expect(setCookies(res)).toEqual([]);
      expect(await userCount(ctx.pool)).toBe(0);
    });

    it.each(foreign)('logout with %s → 403 and the session stays valid', async (_label, headers) => {
      const cookie = sessionCookie(await request(app).post('/api/auth/register').set(CSRF).send(registration()));
      const res = await request(app).post('/api/auth/logout').set(headers).set('Cookie', cookie);
      expectError(res, 403, 'CSRF_REJECTED');
      expect(setCookies(res)).toEqual([]);
      expect((await userRow(ctx.pool, 'ana@example.com'))?.token_version).toBe(0);
      expect((await request(app).get('/api/auth/me').set('Cookie', cookie)).status).toBe(200);
    });
  });

  describe('rate limiting (API-11, D6)', () => {
    const login = (target = app, body: object = { email: 'ana@example.com', password: PASSWORD }) =>
      request(target).post('/api/auth/login').set(CSRF).send(body);

    function expectRateLimited(res: request.Response, maxSeconds: number): void {
      expectError(res, 429, 'RATE_LIMITED');
      const retryAfter = Number(res.headers['retry-after']);
      expect(Number.isInteger(retryAfter)).toBe(true);
      expect(retryAfter).toBeGreaterThan(0);
      expect(retryAfter).toBeLessThanOrEqual(maxSeconds);
    }

    it('login: 10 attempts per 15 minutes per IP, counting successes, failures and invalid bodies', async () => {
      await request(app).post('/api/auth/register').set(CSRF).send(registration()).expect(201);

      const statuses: number[] = [];
      for (let i = 0; i < 4; i++) statuses.push((await login()).status);
      for (let i = 0; i < 4; i++) statuses.push((await login(app, { email: 'ana@example.com', password: 'wrong password!' })).status);
      for (let i = 0; i < 2; i++) statuses.push((await login(app, { email: 'ana', password: 'x' })).status);
      expect(statuses).toEqual([200, 200, 200, 200, 401, 401, 401, 401, 400, 400]);

      const limited = await login();
      expectRateLimited(limited, 15 * 60);
      expect(setCookies(limited)).toEqual([]);
    });

    it('register: 5 attempts per hour per IP, counting successes and failures', async () => {
      const statuses: number[] = [];
      for (let i = 0; i < 3; i++) statuses.push((await request(app).post('/api/auth/register').set(CSRF).send(registration(`u${i}@example.com`))).status);
      statuses.push((await request(app).post('/api/auth/register').set(CSRF).send(registration('u0@example.com'))).status);
      statuses.push((await request(app).post('/api/auth/register').set(CSRF).send(registration('bad'))).status);
      expect(statuses).toEqual([201, 201, 201, 409, 400]);

      const limited = await request(app).post('/api/auth/register').set(CSRF).send(registration('late@example.com'));
      expectRateLimited(limited, 60 * 60);
      expect(await userCount(ctx.pool)).toBe(3);
    });

    it('keeps independent counters per endpoint', async () => {
      for (let i = 0; i < 10; i++) await login(app, { email: 'nobody@example.com', password: PASSWORD });
      expectRateLimited(await login(), 15 * 60);

      const res = await request(app).post('/api/auth/register').set(CSRF).send(registration());
      expect(res.status).toBe(201);
      // `me` y `logout` no tienen límite.
      expect((await request(app).get('/api/auth/me').set('Cookie', sessionCookie(res))).status).toBe(200);
    });

    it('does not trust X-Forwarded-For: rotating it does not reset the counter', async () => {
      // express-rate-limit avisa por consola de la cabecera inesperada (trust proxy desactivado).
      vi.spyOn(console, 'error').mockImplementation(() => {});
      vi.spyOn(console, 'warn').mockImplementation(() => {});
      for (let i = 0; i < 10; i++) {
        await login(app, { email: 'nobody@example.com', password: PASSWORD }).set('X-Forwarded-For', `203.0.113.${i}`);
      }
      expectRateLimited(await login().set('X-Forwarded-For', '198.51.100.7'), 15 * 60);
    });

    it('runs after the body check (section 4 order): requests rejected for their body are not counted', async () => {
      for (let i = 0; i < 12; i++) {
        const res = await request(app).post('/api/auth/login').set(CSRF).set('Content-Type', 'application/json').send('{bad');
        expectError(res, 400, 'MALFORMED_JSON');
      }
      expectError(await login(app, { email: 'nobody@example.com', password: PASSWORD }), 401, 'INVALID_CREDENTIALS');
    });

    it('each app instance has its own counters', async () => {
      for (let i = 0; i < 10; i++) await login(app, { email: 'nobody@example.com', password: PASSWORD });
      expectRateLimited(await login(), 15 * 60);
      expectError(await login(ctx.app(), { email: 'nobody@example.com', password: PASSWORD }), 401, 'INVALID_CREDENTIALS');
    });
  });

  describe('production cookie (API-10)', () => {
    it('emits __Host-session with HttpOnly, Secure, SameSite=Lax, Path=/, Max-Age=604800, no Domain, and never the JWT in the body', async () => {
      const prodApp = ctx.app({ nodeEnv: 'production' });
      const res = await request(prodApp).post('/api/auth/register').set(PROD_CSRF).send(registration());
      expect(res.status).toBe(201);

      const [cookie] = setCookies(res);
      expect(cookie).toMatch(/^__Host-session=[^;]+; Max-Age=604800; Path=\/; HttpOnly; Secure; SameSite=Lax$/);
      expect(cookie).not.toMatch(/domain/i);
      const session = sessionCookie(res, '__Host-session');
      expect(JSON.stringify(res.body)).not.toContain(tokenOf(session));

      const login = await request(prodApp).post('/api/auth/login').set(PROD_CSRF).send({ email: 'ana@example.com', password: PASSWORD });
      expect(setCookies(login)[0]).toMatch(/^__Host-session=[^;]+; Max-Age=604800; Path=\/; HttpOnly; Secure; SameSite=Lax$/);
      expect(JSON.stringify(login.body)).not.toContain(tokenOf(sessionCookie(login, '__Host-session')));

      // En producción solo vale `__Host-session`; la cookie relajada de desarrollo se ignora.
      expect((await request(prodApp).get('/api/auth/me').set('Cookie', session)).status).toBe(200);
      expectError(
        await request(prodApp).get('/api/auth/me').set('Cookie', `session=${tokenOf(session)}`),
        401,
        'UNAUTHENTICATED',
      );

      const out = await request(prodApp).post('/api/auth/logout').set(PROD_CSRF).set('Cookie', session);
      expect(out.status).toBe(204);
      expect(setCookies(out)).toEqual(['__Host-session=; Max-Age=0; Path=/; HttpOnly; Secure; SameSite=Lax']);
    });
  });

  describe('no credentials in logs or responses', () => {
    function captureConsole(): () => string {
      const lines: string[] = [];
      const record = (...args: unknown[]) => {
        lines.push(
          args
            .map((a) => (a instanceof Error ? `${a.name}: ${a.message}\n${a.stack ?? ''}\n${String(a.cause ?? '')}` : typeof a === 'string' ? a : JSON.stringify(a)))
            .join(' '),
        );
      };
      for (const method of ['log', 'info', 'warn', 'error', 'debug'] as const) {
        vi.spyOn(console, method).mockImplementation(record);
      }
      return () => lines.join('\n');
    }

    it('a full register, login, failed login, duplicate and logout flow logs nothing sensitive', async () => {
      const logs = captureConsole();
      const register = await request(app).post('/api/auth/register').set(CSRF).send(registration());
      await request(app).post('/api/auth/register').set(CSRF).send(registration());
      await request(app).post('/api/auth/login').set(CSRF).send({ email: 'ana@example.com', password: 'wrong password!' });
      const login = await request(app).post('/api/auth/login').set(CSRF).send({ email: 'ana@example.com', password: PASSWORD });
      await request(app).post('/api/auth/logout').set(CSRF).set('Cookie', sessionCookie(login));

      const hash = (await userRow(ctx.pool, 'ana@example.com'))!.password_hash;
      const output = logs();
      for (const secret of [PASSWORD, 'wrong password!', hash, tokenOf(sessionCookie(register)), DEV_JWT_SECRET]) {
        expect(output).not.toContain(secret);
      }
    });

    it('a database failure answers a generic 500 and logs a sanitized error without email, password or hash', async () => {
      // Pool ya cerrado: Prisma falla dentro del repositorio.
      const deadPool = createPool(resolveTestDatabaseUrl(process.env));
      const deadPrisma = createPrisma(deadPool);
      await deadPool.end();
      const brokenApp = createApp({
        config: { nodeEnv: 'test', appOrigin: ORIGIN, jwtSecret: DEV_JWT_SECRET },
        checkDatabase: async () => undefined,
        authRepository: createAuthRepository(deadPrisma),
      });

      const logs = captureConsole();
      const res = await request(brokenApp).post('/api/auth/register').set(CSRF).send(registration('leak@example.com'));
      const loginRes = await request(brokenApp)
        .post('/api/auth/login')
        .set(CSRF)
        .send({ email: 'leak@example.com', password: PASSWORD });

      for (const r of [res, loginRes]) {
        expectError(r, 500, 'INTERNAL_ERROR');
        expect(JSON.stringify(r.body)).not.toMatch(/leak@example\.com|argon2|prisma|users\./i);
      }
      const output = logs();
      expect(output).toMatch(/UserRepositoryError: users\.(create|findCredentialsByEmail) failed/);
      expect(output).not.toContain('leak@example.com');
      expect(output).not.toContain(PASSWORD);
      expect(output).not.toMatch(/\$argon2id\$/);
      await deadPrisma.$disconnect();
    });
  });
});
