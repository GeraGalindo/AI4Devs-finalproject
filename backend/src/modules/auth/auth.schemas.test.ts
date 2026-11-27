import { describe, expect, it } from 'vitest';
import { isIanaTimeZone, loginBodySchema, registerBodySchema } from './auth.schemas.js';

const valid = { email: 'ana@example.com', password: 'correct horse battery', timezone: 'Europe/Madrid' };

function fieldErrors(input: unknown): string[] {
  const result = registerBodySchema.safeParse(input);
  return result.success ? [] : result.error.issues.map((issue) => issue.path.join('.') || '(root)');
}

describe('register body schema', () => {
  it('accepts a valid body', () => {
    expect(registerBodySchema.parse(valid)).toEqual(valid);
  });

  describe('email', () => {
    it('trims and lowercases before validating, as users_email_normalized_chk requires', () => {
      expect(registerBodySchema.parse({ ...valid, email: '  Ana.Perez@Example.COM \t' }).email).toBe(
        'ana.perez@example.com',
      );
    });

    it.each([['not-an-email'], ['ana@'], ['@example.com'], ['ana example@example.com'], [''], ['ñandú@example.com']])(
      'rejects %j',
      (email) => {
        expect(fieldErrors({ ...valid, email })).toEqual(['email']);
      },
    );

    it('rejects emails longer than 254 characters', () => {
      const email = `${'a'.repeat(64)}@${'b'.repeat(185)}.com`;
      expect(email.length).toBe(254);
      expect(fieldErrors({ ...valid, email })).toEqual([]);
      expect(fieldErrors({ ...valid, email: `a${email}` })).toEqual(['email']);
    });
  });

  describe('password (D2: 12–128 characters, no composition rules, not transformed)', () => {
    it.each([
      [11, false],
      [12, true],
      [128, true],
      [129, false],
    ])('length %i → valid: %s', (length, ok) => {
      expect(fieldErrors({ ...valid, password: 'p'.repeat(length) })).toEqual(ok ? [] : ['password']);
    });

    it('counts characters (code points), not UTF-16 units', () => {
      // 12 emojis son 24 unidades UTF-16; 65 emojis superan las 128 unidades pero no los 128 caracteres.
      expect(fieldErrors({ ...valid, password: '🔒'.repeat(11) })).toEqual(['password']);
      expect(fieldErrors({ ...valid, password: '🔒'.repeat(12) })).toEqual([]);
      expect(fieldErrors({ ...valid, password: '🔒'.repeat(128) })).toEqual([]);
      expect(fieldErrors({ ...valid, password: '🔒'.repeat(129) })).toEqual(['password']);
    });

    it('does not trim or transform the password', () => {
      const password = '  Spaces Count  ';
      expect(registerBodySchema.parse({ ...valid, password }).password).toBe(password);
      // 11 caracteres útiles más espacios alrededor: cuentan los espacios.
      expect(fieldErrors({ ...valid, password: ' 12345678901' })).toEqual([]);
    });

    it('requires no particular character classes', () => {
      expect(fieldErrors({ ...valid, password: 'aaaaaaaaaaaa' })).toEqual([]);
    });
  });

  describe('timezone (D7)', () => {
    it.each(['Europe/Madrid', 'UTC', 'Etc/UTC', 'America/Argentina/Buenos_Aires', 'Etc/GMT+5', 'America/Port-au-Prince', 'Asia/Kolkata', 'Pacific/Kiritimati'])(
      'accepts the IANA zone %s',
      (timezone) => {
        expect(isIanaTimeZone(timezone)).toBe(true);
      },
    );

    it('stores the zone exactly as received, without normalizing it', () => {
      expect(registerBodySchema.parse({ ...valid, timezone: 'Asia/Calcutta' }).timezone).toBe('Asia/Calcutta');
      expect(registerBodySchema.parse({ ...valid, timezone: 'UTC' }).timezone).toBe('UTC');
    });

    it.each(['+01:00', '-05:00', '+0100', 'UTC+1', 'GMT-3', 'Z', 'Mars/Olympus', 'Europe/', '/Madrid', 'Europe/Madrid ', '', 'E'.repeat(65)])(
      'rejects %j',
      (timezone) => {
        expect(isIanaTimeZone(timezone)).toBe(false);
        expect(fieldErrors({ ...valid, timezone })).toEqual(['timezone']);
      },
    );
  });

  it.each([
    ['an unknown field', { ...valid, role: 'admin' }, ['(root)']],
    ['a missing field', { email: valid.email, password: valid.password }, ['timezone']],
    ['a wrong type', { ...valid, password: 123456789012 }, ['password']],
  ])('rejects %s', (_label, input, paths) => {
    expect(fieldErrors(input)).toEqual(paths);
  });
});

describe('login body schema', () => {
  it('normalizes the email and does not apply the minimum length to the password', () => {
    expect(loginBodySchema.parse({ email: ' Ana@Example.com', password: 'short' })).toEqual({
      email: 'ana@example.com',
      password: 'short',
    });
  });

  it.each([
    ['an empty password', { email: 'ana@example.com', password: '' }],
    ['a password over 128 characters', { email: 'ana@example.com', password: 'p'.repeat(129) }],
    ['an unknown field', { email: 'ana@example.com', password: 'x', remember: true }],
    ['a malformed email', { email: 'ana', password: 'x' }],
  ])('rejects %s', (_label, input) => {
    expect(loginBodySchema.safeParse(input).success).toBe(false);
  });
});
