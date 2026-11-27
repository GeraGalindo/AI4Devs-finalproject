import { randomUUID } from 'node:crypto';
import { SignJWT } from 'jose';
import request from 'supertest';
import { afterAll, beforeEach, describe, expect, it } from 'vitest';
import { fixedClock } from '../../src/domain/clock.js';
import { DEV_JWT_SECRET } from '../../src/shared/config.js';
import {
  authTestContext,
  CSRF,
  expectError,
  PASSWORD,
  registration,
  sessionCookie,
  setCookies,
  tokenOf,
  userRow,
} from '../support/auth-app.js';

/** Login, sesión actual y logout contra PostgreSQL real (HU-05, API-07–API-09, API-43). */
describe('login, current session and logout', () => {
  const ctx = authTestContext();
  let app = ctx.app();
  let registeredCookie = '';
  let userId = '';

  beforeEach(async () => {
    await ctx.reset();
    app = ctx.app();
    const res = await request(app).post('/api/auth/register').set(CSRF).send(registration());
    registeredCookie = sessionCookie(res);
    userId = res.body.user.id;
  });

  afterAll(() => ctx.close());

  const login = (body: object) => request(app).post('/api/auth/login').set(CSRF).send(body);
  const me = (cookie?: string) => {
    const req = request(app).get('/api/auth/me');
    return cookie ? req.set('Cookie', cookie) : req;
  };
  const logout = (cookie?: string) => {
    const req = request(app).post('/api/auth/logout').set(CSRF);
    return cookie ? req.set('Cookie', cookie) : req;
  };

  describe('POST /api/auth/login', () => {
    it('HU-05 criterion 1: right credentials → 200 with the user and a cookie that restores the session', async () => {
      const res = await login({ email: 'ana@example.com', password: PASSWORD });
      expect(res.status).toBe(200);
      expect(res.headers['cache-control']).toBe('no-store');
      expect(res.body).toEqual({
        user: { id: userId, email: 'ana@example.com', timezone: 'Europe/Madrid', availableWeekdays: null },
      });
      const cookie = sessionCookie(res);
      expect(JSON.stringify(res.body)).not.toContain(tokenOf(cookie));

      const current = await me(cookie);
      expect(current.status).toBe(200);
      expect(current.body).toEqual(res.body);
    });

    it('normalizes the email before looking it up', async () => {
      expect((await login({ email: '  ANA@Example.com ', password: PASSWORD })).status).toBe(200);
    });

    it('API-07 / HU-05 criterion 2: unknown email and wrong password give the same 401, without a cookie', async () => {
      const unknown = await login({ email: 'nobody@example.com', password: PASSWORD });
      const wrong = await login({ email: 'ana@example.com', password: `${PASSWORD}!` });

      for (const res of [unknown, wrong]) {
        expectError(res, 401, 'INVALID_CREDENTIALS');
        expect(setCookies(res)).toEqual([]);
      }
      const strip = (body: { error: Record<string, unknown> }) => ({ ...body.error, requestId: undefined });
      expect(strip(unknown.body)).toEqual(strip(wrong.body));
      expect(unknown.body.error.details).toBeUndefined();
      expect(Object.keys(unknown.body.error)).toEqual(Object.keys(wrong.body.error));
      expect(unknown.headers['content-type']).toBe(wrong.headers['content-type']);
    });

    it('a password shorter than the minimum is simply wrong (401), not a validation error', async () => {
      expectError(await login({ email: 'ana@example.com', password: 'short' }), 401, 'INVALID_CREDENTIALS');
    });

    it('rejects a malformed email or an unknown field with 400', async () => {
      expectError(await login({ email: 'ana', password: PASSWORD }), 400, 'VALIDATION_ERROR');
      expectError(await login({ email: 'ana@example.com', password: PASSWORD, remember: true }), 400, 'VALIDATION_ERROR');
    });

    it('D10: replaces an existing session cookie with the newly authenticated user', async () => {
      const other = await request(app).post('/api/auth/register').set(CSRF).send(registration('bea@example.com'));
      expect(other.status).toBe(201);

      const res = await request(app)
        .post('/api/auth/login')
        .set(CSRF)
        .set('Cookie', registeredCookie)
        .send({ email: 'bea@example.com', password: PASSWORD });
      expect(res.status).toBe(200);
      expect((await me(sessionCookie(res))).body.user.email).toBe('bea@example.com');
    });
  });

  describe('GET /api/auth/me', () => {
    it('returns the user without writing anything', async () => {
      const before = await userRow(ctx.pool, 'ana@example.com');
      const res = await me(registeredCookie);
      expect(res.status).toBe(200);
      expect(res.headers['cache-control']).toBe('no-store');
      const after = await userRow(ctx.pool, 'ana@example.com');
      expect(after).toEqual(before);
    });

    it('HU-05: no cookie, an empty cookie or another cookie name → 401 UNAUTHENTICATED', async () => {
      for (const res of [await me(), await me('session='), await me(`__Host-${registeredCookie}`), await me(`other=${tokenOf(registeredCookie)}`)]) {
        expectError(res, 401, 'UNAUTHENTICATED');
        expect(res.headers['cache-control']).toBe('no-store');
      }
    });

    it('ignores identities sent outside the cookie', async () => {
      const token = tokenOf(registeredCookie);
      const res = await request(app)
        .get(`/api/auth/me?token=${token}&userId=${userId}`)
        .set('Authorization', `Bearer ${token}`)
        .set('X-User-Id', userId);
      expectError(res, 401, 'UNAUTHENTICATED');
    });

    describe('API-08: invalid tokens → 401', () => {
      const key = new TextEncoder().encode(DEV_JWT_SECRET);
      const b64 = (value: unknown) => Buffer.from(JSON.stringify(value)).toString('base64url');
      const nowS = () => Math.floor(Date.now() / 1000);

      it('expired: a session issued 7 days ago, checked with the injected Clock', async () => {
        const t0 = new Date('2026-11-01T08:00:00.000Z');
        const pastApp = ctx.app({ clock: fixedClock(t0) });
        const res = await request(pastApp).post('/api/auth/login').set(CSRF).send({ email: 'ana@example.com', password: PASSWORD });
        const cookie = sessionCookie(res);

        const almost = ctx.app({ clock: fixedClock(new Date(t0.getTime() + (604800 - 1) * 1000)) });
        expect((await request(almost).get('/api/auth/me').set('Cookie', cookie)).status).toBe(200);

        // HU-05 criterion 4: al caducar, cualquier acción → 401.
        const expired = ctx.app({ clock: fixedClock(new Date(t0.getTime() + 604800 * 1000)) });
        expectError(await request(expired).get('/api/auth/me').set('Cookie', cookie), 401, 'UNAUTHENTICATED');
      });

      it('alg "none"', async () => {
        const token = `${b64({ alg: 'none', typ: 'JWT' })}.${b64({ sub: userId, ver: 0, iat: nowS(), exp: nowS() + 600 })}.`;
        expectError(await me(`session=${token}`), 401, 'UNAUTHENTICATED');
      });

      it('another algorithm (HS512) signed with the right secret', async () => {
        const token = await new SignJWT({ sub: userId, ver: 0, iat: nowS(), exp: nowS() + 600 })
          .setProtectedHeader({ alg: 'HS512' })
          .sign(key);
        expectError(await me(`session=${token}`), 401, 'UNAUTHENTICATED');
      });

      it('a tampered payload keeping the original signature', async () => {
        const [header, , signature] = tokenOf(registeredCookie).split('.');
        const payload = b64({ sub: randomUUID(), ver: 0, iat: nowS(), exp: nowS() + 600 });
        expectError(await me(`session=${header}.${payload}.${signature}`), 401, 'UNAUTHENTICATED');
      });

      it('a valid signature for a user that does not exist', async () => {
        const token = await new SignJWT({ ver: 0 })
          .setProtectedHeader({ alg: 'HS256' })
          .setSubject(randomUUID())
          .setIssuedAt()
          .setExpirationTime('1h')
          .sign(key);
        expectError(await me(`session=${token}`), 401, 'UNAUTHENTICATED');
      });
    });
  });

  describe('POST /api/auth/logout', () => {
    it('API-09 / HU-05 criterion 3: revokes every session of the user, on every device', async () => {
      const deviceA = registeredCookie;
      const deviceB = sessionCookie(await login({ email: 'ana@example.com', password: PASSWORD }));
      expect((await me(deviceB)).status).toBe(200);

      const res = await logout(deviceA);
      expect(res.status).toBe(204);
      expect(res.headers['cache-control']).toBe('no-store');
      expect(setCookies(res)).toEqual(['session=; Max-Age=0; Path=/; HttpOnly; SameSite=Lax']);
      expect((await userRow(ctx.pool, 'ana@example.com'))?.token_version).toBe(1);

      expectError(await me(deviceA), 401, 'UNAUTHENTICATED');
      expectError(await me(deviceB), 401, 'UNAUTHENTICATED');

      // Un nuevo login funciona y emite un token con la nueva versión.
      const again = sessionCookie(await login({ email: 'ana@example.com', password: PASSWORD }));
      expect((await me(again)).status).toBe(200);
    });

    it('is idempotent: without a session, or with a revoked or invalid cookie, it answers 204 and changes nothing', async () => {
      await logout(registeredCookie).expect(204);
      const after = await userRow(ctx.pool, 'ana@example.com');

      for (const cookie of [undefined, registeredCookie, 'session=garbage', 'session=a.b.c']) {
        const res = await logout(cookie);
        expect(res.status).toBe(204);
        expect(setCookies(res)).toEqual(['session=; Max-Age=0; Path=/; HttpOnly; SameSite=Lax']);
      }
      expect(await userRow(ctx.pool, 'ana@example.com')).toEqual(after);
    });

    it('concurrent logouts and requests: token_version grows once and no revoked session works afterwards', async () => {
      const deviceB = sessionCookie(await login({ email: 'ana@example.com', password: PASSWORD }));

      await Promise.all([
        logout(registeredCookie),
        logout(registeredCookie),
        logout(deviceB),
        me(registeredCookie),
        me(deviceB),
        logout(deviceB),
      ]);

      expect((await userRow(ctx.pool, 'ana@example.com'))?.token_version).toBe(1);
      expectError(await me(registeredCookie), 401, 'UNAUTHENTICATED');
      expectError(await me(deviceB), 401, 'UNAUTHENTICATED');
    });

    it('API-43 (logout): 204 without Content-Type; 400 with a body; 403 without X-CSRF-Protection — the last two without effect', async () => {
      const withBody = await request(app)
        .post('/api/auth/logout')
        .set(CSRF)
        .set('Cookie', registeredCookie)
        .send({ all: true });
      expectError(withBody, 400, 'VALIDATION_ERROR');

      const withoutHeader = await request(app)
        .post('/api/auth/logout')
        .set('Origin', CSRF.Origin)
        .set('Cookie', registeredCookie);
      expectError(withoutHeader, 403, 'CSRF_REJECTED');

      expect(setCookies(withBody)).toEqual([]);
      expect(setCookies(withoutHeader)).toEqual([]);
      expect((await me(registeredCookie)).status).toBe(200);
      expect((await userRow(ctx.pool, 'ana@example.com'))?.token_version).toBe(0);

      // `logout()` no envía cuerpo ni Content-Type.
      const ok = await logout(registeredCookie);
      expect(ok.status).toBe(204);
      expectError(await me(registeredCookie), 401, 'UNAUTHENTICATED');
    });
  });
});
