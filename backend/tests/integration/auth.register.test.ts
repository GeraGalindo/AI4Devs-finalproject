import request from 'supertest';
import { afterAll, beforeEach, describe, expect, it } from 'vitest';
import {
  authTestContext,
  CSRF,
  expectError,
  PASSWORD,
  registration,
  sessionCookie,
  setCookies,
  tokenOf,
  userCount,
  userRow,
  UUID,
} from '../support/auth-app.js';

/** POST /api/auth/register contra PostgreSQL real (HU-04). */
describe('POST /api/auth/register', () => {
  const ctx = authTestContext();
  let app = ctx.app();

  beforeEach(async () => {
    await ctx.reset();
    app = ctx.app();
  });

  afterAll(() => ctx.close());

  const register = (body: unknown) => request(app).post('/api/auth/register').set(CSRF).send(body as object);

  it('HU-04 criterion 1: creates the account, starts the session and keeps the browser time zone', async () => {
    const res = await register(registration('ana@example.com', { timezone: 'America/Bogota' }));

    expect(res.status).toBe(201);
    expect(res.headers['cache-control']).toBe('no-store');
    expect(res.body).toEqual({
      user: { id: expect.stringMatching(UUID), email: 'ana@example.com', timezone: 'America/Bogota', availableWeekdays: null },
    });

    const cookie = sessionCookie(res);
    expect(setCookies(res)[0]).toMatch(/^session=[^;]+; Max-Age=604800; Path=\/; HttpOnly; SameSite=Lax$/);
    // El JWT nunca va en el cuerpo.
    expect(JSON.stringify(res.body)).not.toContain(tokenOf(cookie));

    const me = await request(app).get('/api/auth/me').set('Cookie', cookie);
    expect(me.status).toBe(200);
    expect(me.body).toEqual(res.body);
  });

  it('stores only an Argon2id hash, a NULL available_weekdays and token_version 0', async () => {
    await register(registration()).expect(201);

    const row = await userRow(ctx.pool, 'ana@example.com');
    expect(row?.password_hash).toMatch(/^\$argon2id\$v=19\$m=19456,t=2,p=1\$/);
    expect(row?.password_hash).not.toContain(PASSWORD);
    expect(row?.available_weekdays).toBeNull();
    expect(row?.token_version).toBe(0);
  });

  it('normalizes the email with trim and lowercase before storing it', async () => {
    const res = await register(registration('  Ana.Perez@Example.COM  '));
    expect(res.status).toBe(201);
    expect(res.body.user.email).toBe('ana.perez@example.com');
    expect(await userRow(ctx.pool, 'ana.perez@example.com')).toBeDefined();
  });

  it.each(['UTC', 'Etc/GMT+5', 'Asia/Calcutta'])('D7: stores the IANA zone %s exactly as received', async (timezone) => {
    const res = await register(registration('tz@example.com', { timezone }));
    expect(res.status).toBe(201);
    expect((await userRow(ctx.pool, 'tz@example.com'))?.timezone).toBe(timezone);
  });

  it('HU-04 criterion 2: a registered email (in any case) → 409 EMAIL_ALREADY_REGISTERED, without a new row or cookie', async () => {
    await register(registration()).expect(201);

    const res = await register(registration(' ANA@example.com', { password: 'another long password' }));
    expectError(res, 409, 'EMAIL_ALREADY_REGISTERED');
    expect(setCookies(res)).toEqual([]);
    expect(await userCount(ctx.pool)).toBe(1);
  });

  it('concurrent registrations with the same email: exactly one 201, the rest 409, and one row', async () => {
    const responses = await Promise.all(Array.from({ length: 5 }, () => register(registration('race@example.com'))));

    const statuses = responses.map((r) => r.status).sort();
    expect(statuses).toEqual([201, 409, 409, 409, 409]);
    for (const res of responses.filter((r) => r.status === 409)) expectError(res, 409, 'EMAIL_ALREADY_REGISTERED');
    expect(await userCount(ctx.pool)).toBe(1);
  });

  it.each([
    ['a malformed email', registration('not-an-email'), 'body.email'],
    ['an 11-character password', registration('a@example.com', { password: 'p'.repeat(11) }), 'body.password'],
    ['a 129-character password', registration('a@example.com', { password: 'p'.repeat(129) }), 'body.password'],
    ['an offset instead of a zone (+01:00)', registration('a@example.com', { timezone: '+01:00' }), 'body.timezone'],
    ['an offset instead of a zone (-05:00)', registration('a@example.com', { timezone: '-05:00' }), 'body.timezone'],
    ['an unknown zone', registration('a@example.com', { timezone: 'Mars/Olympus' }), 'body.timezone'],
    ['an unknown field', registration('a@example.com', { availableWeekdays: [1, 3] }), 'body'],
    ['a missing timezone', { email: 'a@example.com', password: PASSWORD }, 'body.timezone'],
  ])('HU-04 criterion 3: %s → 400 VALIDATION_ERROR on the field, nothing created', async (_label, body, path) => {
    const res = await register(body);
    expectError(res, 400, 'VALIDATION_ERROR');
    expect(res.body.error.details.fields.map((f: { path: string }) => f.path)).toContain(path);
    expect(setCookies(res)).toEqual([]);
    expect(await userCount(ctx.pool)).toBe(0);
  });

  it.each([12, 128])('accepts a %i-character password', async (length) => {
    const res = await register(registration(`len${length}@example.com`, { password: 'p'.repeat(length) }));
    expect(res.status).toBe(201);
  });

  it('rejects a non-JSON body with 415 and creates nothing', async () => {
    const res = await request(app).post('/api/auth/register').set(CSRF).type('form').send('email=a@example.com');
    expectError(res, 415, 'UNSUPPORTED_MEDIA_TYPE');
    expect(await userCount(ctx.pool)).toBe(0);
  });
});
