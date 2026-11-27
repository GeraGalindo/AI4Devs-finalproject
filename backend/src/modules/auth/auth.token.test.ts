import { randomUUID } from 'node:crypto';
import { generateKeyPair, SignJWT } from 'jose';
import { describe, expect, it } from 'vitest';
import { DEV_JWT_SECRET } from '../../shared/config.js';
import { SESSION_MAX_AGE_SECONDS } from '../../shared/http/session-cookie.js';
import { createSessionTokens } from './auth.token.js';

const tokens = createSessionTokens(DEV_JWT_SECRET);
const key = new TextEncoder().encode(DEV_JWT_SECRET);
const NOW = new Date('2026-11-27T10:00:00.000Z');
const NOW_S = NOW.getTime() / 1000;
const sub = randomUUID();

function b64url(value: unknown): string {
  return Buffer.from(JSON.stringify(value)).toString('base64url');
}

/** Firma con el secreto correcto un payload arbitrario, para probar la validación de claims. */
function signRaw(payload: Record<string, unknown>, alg: 'HS256' | 'HS384' | 'HS512' = 'HS256'): Promise<string> {
  return new SignJWT(payload).setProtectedHeader({ alg }).sign(key);
}

describe('session tokens (D3)', () => {
  it('issues an HS256 JWT with exactly sub, ver, iat and exp, valid for 7 days', async () => {
    const token = await tokens.issue({ sub, ver: 3 }, NOW);
    const [header, payload] = token
      .split('.')
      .slice(0, 2)
      .map((part) => JSON.parse(Buffer.from(part, 'base64url').toString()));
    expect(header).toEqual({ alg: 'HS256', typ: 'JWT' });
    expect(payload).toEqual({ sub, ver: 3, iat: NOW_S, exp: NOW_S + SESSION_MAX_AGE_SECONDS });
    expect(SESSION_MAX_AGE_SECONDS).toBe(604800);

    expect(await tokens.verify(token, NOW)).toEqual({ sub, ver: 3 });
  });

  it('API-08: rejects an expired token, using the injected time', async () => {
    const token = await tokens.issue({ sub, ver: 0 }, NOW);
    const justBefore = new Date(NOW.getTime() + (SESSION_MAX_AGE_SECONDS - 1) * 1000);
    const atExpiry = new Date(NOW.getTime() + SESSION_MAX_AGE_SECONDS * 1000);
    expect(await tokens.verify(token, justBefore)).toEqual({ sub, ver: 0 });
    expect(await tokens.verify(token, atExpiry)).toBeNull();
  });

  it('API-08: rejects alg "none"', async () => {
    const token = `${b64url({ alg: 'none', typ: 'JWT' })}.${b64url({ sub, ver: 0, iat: NOW_S, exp: NOW_S + 60 })}.`;
    expect(await tokens.verify(token, NOW)).toBeNull();
  });

  it.each(['HS384', 'HS512'] as const)('API-08: rejects %s even when signed with the right secret', async (alg) => {
    const token = await signRaw({ sub, ver: 0, iat: NOW_S, exp: NOW_S + 60 }, alg);
    expect(await tokens.verify(token, NOW)).toBeNull();
  });

  it('API-08: rejects an asymmetric algorithm (RS256)', async () => {
    const { privateKey } = await generateKeyPair('RS256');
    const token = await new SignJWT({ sub, ver: 0, iat: NOW_S, exp: NOW_S + 60 })
      .setProtectedHeader({ alg: 'RS256' })
      .sign(privateKey);
    expect(await tokens.verify(token, NOW)).toBeNull();
  });

  it('API-08: rejects a tampered payload or signature, and another secret', async () => {
    const token = await tokens.issue({ sub, ver: 0 }, NOW);
    const [header, , signature] = token.split('.');
    const forgedPayload = b64url({ sub, ver: 1, iat: NOW_S, exp: NOW_S + SESSION_MAX_AGE_SECONDS });
    expect(await tokens.verify(`${header}.${forgedPayload}.${signature}`, NOW)).toBeNull();

    const flipped = signature!.startsWith('A') ? `B${signature!.slice(1)}` : `A${signature!.slice(1)}`;
    expect(await tokens.verify(`${token.split('.').slice(0, 2).join('.')}.${flipped}`, NOW)).toBeNull();

    const other = createSessionTokens('another-secret-that-is-at-least-32-bytes-long');
    expect(await other.verify(token, NOW)).toBeNull();
  });

  it.each([
    ['without sub', { ver: 0, iat: NOW_S, exp: NOW_S + 60 }],
    ['without ver', { sub, iat: NOW_S, exp: NOW_S + 60 }],
    ['without iat', { sub, ver: 0, exp: NOW_S + 60 }],
    ['without exp', { sub, ver: 0, iat: NOW_S }],
    ['with a non-uuid sub', { sub: 'admin', ver: 0, iat: NOW_S, exp: NOW_S + 60 }],
    ['with a negative ver', { sub, ver: -1, iat: NOW_S, exp: NOW_S + 60 }],
    ['with a string ver', { sub, ver: '0', iat: NOW_S, exp: NOW_S + 60 }],
    ['with an extra claim', { sub, ver: 0, iat: NOW_S, exp: NOW_S + 60, admin: true }],
    ['issued in the future', { sub, ver: 0, iat: NOW_S + 60, exp: NOW_S + 120 }],
    ['living longer than 7 days', { sub, ver: 0, iat: NOW_S, exp: NOW_S + SESSION_MAX_AGE_SECONDS + 1 }],
  ])('rejects a correctly signed token %s', async (_label, payload) => {
    expect(await tokens.verify(await signRaw(payload), NOW)).toBeNull();
  });

  it.each([[''], ['not-a-jwt'], ['a.b.c'], ['a.b']])('rejects the malformed token %j', async (token) => {
    expect(await tokens.verify(token, NOW)).toBeNull();
  });
});
