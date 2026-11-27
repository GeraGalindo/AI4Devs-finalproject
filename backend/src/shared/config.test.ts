import { describe, expect, it } from 'vitest';
import { ConfigError, DEV_JWT_SECRET, loadConfig, sessionCookieFor } from './config.js';

const DB = 'postgres://u:p@h:5432/d';
const dev = { NODE_ENV: 'development', DATABASE_URL: DB };
// Secreto de producción de prueba: aleatorio, de 48 bytes en base64 (no es un secreto real).
const PROD_SECRET = 'q7Vb2mXJ9kTz4LcRf8NwYp1sHd6GuEa3oBiK5vZt0xQyMnWlCjSe';
const prod = { NODE_ENV: 'production', DATABASE_URL: DB, APP_ORIGIN: 'https://cali-coach.example', JWT_SECRET: PROD_SECRET };

describe('loadConfig', () => {
  describe('DEV-001 settings', () => {
    it('reads DATABASE_URL and defaults PORT to 3000', () => {
      expect(loadConfig(dev)).toMatchObject({ nodeEnv: 'development', port: 3000, databaseUrl: DB });
    });

    it('fails explicitly when DATABASE_URL is missing', () => {
      expect(() => loadConfig({ NODE_ENV: 'development' })).toThrow(ConfigError);
    });

    it('rejects an invalid PORT', () => {
      expect(() => loadConfig({ ...dev, PORT: 'abc' })).toThrow(/PORT/);
    });
  });

  describe('NODE_ENV (D4)', () => {
    it('is required', () => {
      expect(() => loadConfig({ DATABASE_URL: DB })).toThrow(/NODE_ENV is required/);
    });

    it.each(['staging', 'prod', 'Production', ''])('rejects %j', (value) => {
      expect(() => loadConfig({ ...dev, NODE_ENV: value })).toThrow(/NODE_ENV/);
    });

    it.each(['development', 'test', 'production'])('accepts %s', (value) => {
      const env = value === 'production' ? prod : { ...dev, NODE_ENV: value };
      expect(loadConfig(env).nodeEnv).toBe(value);
    });
  });

  describe('APP_ORIGIN (D2)', () => {
    it('defaults to the Vite origin in development and test', () => {
      expect(loadConfig(dev).appOrigin).toBe('http://localhost:5173');
      expect(loadConfig({ ...dev, NODE_ENV: 'test' }).appOrigin).toBe('http://localhost:5173');
    });

    it('is required in production', () => {
      expect(() => loadConfig({ ...prod, APP_ORIGIN: undefined })).toThrow(/APP_ORIGIN is required/);
    });

    it('must use https in production', () => {
      expect(() => loadConfig({ ...prod, APP_ORIGIN: 'http://cali-coach.example' })).toThrow(/https/);
    });

    it('normalizes a trailing slash to the bare origin', () => {
      expect(loadConfig({ ...prod, APP_ORIGIN: 'https://cali-coach.example/' }).appOrigin).toBe(
        'https://cali-coach.example',
      );
    });

    it.each([
      ['a path', 'https://cali-coach.example/app'],
      ['a query', 'https://cali-coach.example/?a=1'],
      ['a fragment', 'https://cali-coach.example/#x'],
      ['credentials', 'https://user:pass@cali-coach.example'],
      ['another scheme', 'ftp://cali-coach.example'],
      ['an invalid URL', 'not a url'],
    ])('rejects an origin with %s', (_label, value) => {
      expect(() => loadConfig({ ...prod, APP_ORIGIN: value })).toThrow(ConfigError);
    });
  });

  describe('session cookie and secure startup (D3)', () => {
    it('uses the relaxed session cookie in development and test', () => {
      expect(loadConfig(dev).sessionCookie).toEqual({ name: 'session', secure: false });
      expect(loadConfig({ ...dev, NODE_ENV: 'test' }).sessionCookie).toEqual({ name: 'session', secure: false });
    });

    it('uses __Host-session with Secure in production', () => {
      expect(loadConfig(prod).sessionCookie).toEqual({ name: '__Host-session', secure: true });
    });

    it('cannot be relaxed in production through environment variables', () => {
      const attempt = {
        ...prod,
        SESSION_COOKIE_NAME: 'session',
        SESSION_COOKIE_SECURE: 'false',
        COOKIE_SECURE: 'false',
      };
      expect(loadConfig(attempt).sessionCookie).toEqual({ name: '__Host-session', secure: true });
    });

    it('sessionCookieFor depends only on NODE_ENV', () => {
      expect(sessionCookieFor('production')).toEqual({ name: '__Host-session', secure: true });
      expect(sessionCookieFor('development')).toEqual({ name: 'session', secure: false });
      expect(sessionCookieFor('test')).toEqual({ name: 'session', secure: false });
    });

    it.each([
      ['without APP_ORIGIN', { APP_ORIGIN: undefined }],
      ['with an http APP_ORIGIN', { APP_ORIGIN: 'http://cali-coach.example' }],
    ])('refuses to start in production %s', (_label, overrides) => {
      expect(() => loadConfig({ ...prod, ...overrides })).toThrow(ConfigError);
    });
  });

  describe('JWT_SECRET (DEV-004, D4)', () => {
    it.each(['development', 'test'])('falls back to the fixed development secret in %s', (nodeEnv) => {
      expect(loadConfig({ ...dev, NODE_ENV: nodeEnv }).jwtSecret).toBe(DEV_JWT_SECRET);
      expect(loadConfig({ ...dev, NODE_ENV: nodeEnv, JWT_SECRET: '' }).jwtSecret).toBe(DEV_JWT_SECRET);
    });

    it('accepts a custom secret of at least 32 bytes in development, and rejects a shorter one', () => {
      const custom = 'x'.repeat(32);
      expect(loadConfig({ ...dev, JWT_SECRET: custom }).jwtSecret).toBe(custom);
      expect(() => loadConfig({ ...dev, JWT_SECRET: 'x'.repeat(31) })).toThrow(/at least 32 bytes/);
    });

    it('accepts a random secret in production', () => {
      expect(loadConfig(prod).jwtSecret).toBe(PROD_SECRET);
    });

    it.each([
      ['missing', undefined, /JWT_SECRET is required/],
      ['empty', '', /JWT_SECRET is required/],
      ['shorter than 32 bytes', PROD_SECRET.slice(0, 31), /at least 32 bytes/],
      ['surrounded by whitespace', ` ${PROD_SECRET}\n`, /whitespace/],
      ['the development secret', DEV_JWT_SECRET, /development or example value/],
      ['a placeholder', 'please-change-me-before-deploying-to-production-0123', /development or example value/],
      ['an example value', 'example-jwt-secret-with-enough-length-for-the-check', /development or example value/],
      ['a repeated character', 'a'.repeat(64), /does not look random/],
      ['a repeated pattern', 'ab12'.repeat(16), /does not look random/],
    ])('refuses to start in production when it is %s', (_label, value, message) => {
      expect(() => loadConfig({ ...prod, JWT_SECRET: value })).toThrow(message);
    });

    it('never includes the secret in the error message', () => {
      const leaked = 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa';
      try {
        loadConfig({ ...prod, JWT_SECRET: leaked });
        expect.unreachable();
      } catch (err) {
        expect((err as Error).message).not.toContain(leaked);
      }
    });

    it('counts bytes, not characters', () => {
      // 16 caracteres de 2 bytes = 32 bytes.
      expect(loadConfig({ ...dev, JWT_SECRET: 'ñ'.repeat(16) }).jwtSecret).toBe('ñ'.repeat(16));
    });
  });
});
