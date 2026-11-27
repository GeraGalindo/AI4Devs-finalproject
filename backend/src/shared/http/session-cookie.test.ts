import express from 'express';
import request from 'supertest';
import { describe, expect, it } from 'vitest';
import { sessionCookieFor } from '../config.js';
import { clearSessionCookie, readSessionToken, SESSION_MAX_AGE_SECONDS, setSessionCookie } from './session-cookie.js';

function appWith(handler: express.RequestHandler) {
  const app = express();
  app.get('/', handler);
  return app;
}

describe('session cookie (D5)', () => {
  it('API-10: in production it is __Host-session with HttpOnly, Secure, SameSite=Lax, Path=/, 7 days and no Domain', async () => {
    const cookie = sessionCookieFor('production');
    const res = await request(appWith((_req, res) => (setSessionCookie(res, cookie, 'jwt.value.here'), res.end()))).get('/');
    const [header] = res.headers['set-cookie'] as unknown as string[];
    expect(header).toBe('__Host-session=jwt.value.here; Max-Age=604800; Path=/; HttpOnly; Secure; SameSite=Lax');
    expect(header).not.toMatch(/domain|expires/i);
    expect(SESSION_MAX_AGE_SECONDS).toBe(7 * 24 * 60 * 60);
  });

  it.each(['development', 'test'] as const)('in %s it is "session" without Secure', async (nodeEnv) => {
    const cookie = sessionCookieFor(nodeEnv);
    const res = await request(appWith((_req, res) => (setSessionCookie(res, cookie, 'tok'), res.end()))).get('/');
    expect(res.headers['set-cookie']).toEqual(['session=tok; Max-Age=604800; Path=/; HttpOnly; SameSite=Lax']);
  });

  it('clears the cookie with the same attributes and Max-Age=0', async () => {
    const cookie = sessionCookieFor('production');
    const res = await request(appWith((_req, res) => (clearSessionCookie(res, cookie), res.end()))).get('/');
    expect(res.headers['set-cookie']).toEqual(['__Host-session=; Max-Age=0; Path=/; HttpOnly; Secure; SameSite=Lax']);
  });

  it('reads only the session cookie of the environment', async () => {
    const read = (nodeEnv: 'production' | 'test') =>
      appWith((req, res) => {
        res.json({ token: readSessionToken(req, sessionCookieFor(nodeEnv)) ?? null });
      });

    const both = 'session=dev-token; __Host-session=prod-token; other=x';
    expect((await request(read('production')).get('/').set('Cookie', both)).body.token).toBe('prod-token');
    expect((await request(read('test')).get('/').set('Cookie', both)).body.token).toBe('dev-token');
    expect((await request(read('production')).get('/').set('Cookie', 'session=dev-token')).body.token).toBeNull();
    expect((await request(read('test')).get('/').set('Cookie', 'session=')).body.token).toBeNull();
    expect((await request(read('test')).get('/')).body.token).toBeNull();
    // Con el nombre repetido gana el primero; nunca se combinan.
    expect((await request(read('test')).get('/').set('Cookie', 'session=a; session=b')).body.token).toBe('a');
  });
});
