import auth from '../locales/en/auth.json';
import common from '../locales/en/common.json';
import errors from '../locales/en/errors.json';
import { startMissingKeyDetection, stopMissingKeyDetection, takeMissingKeys } from '../test/missing-keys';
import { createI18n } from './config';
import { translateErrorCode, UNKNOWN_ERROR_KEY } from './errors';
import { reportMissingKey } from './missing-keys';
import { namespaces } from './resources';

/** Hojas de un catálogo, como `actions.retry`. */
function leaves(catalog: object, prefix = ''): [string, unknown][] {
  return Object.entries(catalog).flatMap(([key, value]) =>
    typeof value === 'object' && value !== null ? leaves(value, `${prefix}${key}.`) : [[`${prefix}${key}`, value]],
  );
}

describe('i18n configuration', () => {
  it('initializes synchronously in English only, with no detector or backend', () => {
    const i18n = createI18n();
    expect(i18n.isInitialized).toBe(true);
    expect(i18n.language).toBe('en');
    expect(i18n.resolvedLanguage).toBe('en');
    expect(i18n.languages).toEqual(['en']);
    expect(i18n.options.supportedLngs).toEqual(['en', 'cimode']);
    expect(i18n.modules.languageDetector).toBeUndefined();
    expect(i18n.modules.backend).toBeUndefined();
    expect(namespaces).toEqual(['common', 'auth', 'errors']);
  });

  it('creates independent instances', () => {
    const a = createI18n();
    const b = createI18n();
    expect(a).not.toBe(b);
    a.addResource('en', 'common', 'appName', 'Changed');
    expect(b.t('appName')).toBe('Cali Coach');
  });

  it('translates an existing key in each namespace', () => {
    const i18n = createI18n();
    expect(i18n.t('appName')).toBe('Cali Coach');
    expect(i18n.t('common:actions.retry')).toBe('Try again');
    expect(i18n.t('auth:signUp.title')).toBe('Create your account');
    expect(i18n.t('signUp.title', { ns: 'auth' })).toBe('Create your account');
    expect(i18n.t('errors:EMAIL_ALREADY_REGISTERED')).toBe('This email already has an account.');
  });

  it('has a non-empty English string for every key of every catalog', () => {
    for (const catalog of [common, auth, errors]) {
      for (const [key, value] of leaves(catalog)) {
        expect(typeof value, key).toBe('string');
        expect((value as string).trim(), key).not.toBe('');
      }
    }
  });

  it('rejects unknown keys at compile time', () => {
    const i18n = createI18n();
    // Si alguna de estas claves existiera, `npm run typecheck` fallaría por un @ts-expect-error sin uso.
    // @ts-expect-error clave inexistente en common
    expect(i18n.t('common:doesNotExist')).toBe('doesNotExist');
    // @ts-expect-error clave inexistente en auth
    expect(i18n.t('auth:signUp.missing')).toBe('signUp.missing');
    expect(takeMissingKeys()).toEqual(['common:doesNotExist', 'auth:signUp.missing']);
  });
});

describe('missing key detection', () => {
  it('records an unknown key used at runtime', () => {
    const i18n = createI18n();
    const dynamicKey: string = ['does', 'not', 'exist'].join('.');
    expect(i18n.t(dynamicKey as 'appName')).toBe(dynamicKey);
    expect(takeMissingKeys()).toEqual(['common:does.not.exist']);
  });

  it('fails the test when a key is missing, and the check clears its state', () => {
    createI18n().t('errors:NOT_A_KEY' as 'errors:unknown');
    expect(() => stopMissingKeyDetection()).toThrow('Missing translation keys: errors:NOT_A_KEY');
    // El registro queda vacío: la siguiente comprobación ya no falla.
    expect(() => stopMissingKeyDetection()).not.toThrow();
    startMissingKeyDetection();
  });

  it('starts every test with an empty record', () => {
    reportMissingKey('common', 'leftover');
    startMissingKeyDetection();
    expect(takeMissingKeys()).toEqual([]);
  });

  it('does not interrupt the UI outside the tests: the key is shown, and only development logs it', () => {
    stopMissingKeyDetection();
    const error = vi.spyOn(console, 'error').mockImplementation(() => {});
    try {
      const i18n = createI18n();

      vi.stubEnv('DEV', false);
      expect(i18n.t('common:hidden' as 'appName')).toBe('hidden');
      expect(error).not.toHaveBeenCalled();

      vi.stubEnv('DEV', true);
      expect(i18n.t('common:visible' as 'appName')).toBe('visible');
      expect(error).toHaveBeenCalledWith('[i18n] Missing translation key: common:visible');
    } finally {
      vi.unstubAllEnvs();
      error.mockRestore();
      startMissingKeyDetection();
    }
  });
});

describe('translateErrorCode', () => {
  const generic = errors[UNKNOWN_ERROR_KEY];

  it('translates a known error code', () => {
    expect(translateErrorCode(createI18n(), 'RATE_LIMITED')).toBe('Too many attempts. Please wait and try again later.');
  });

  it.each([
    ['an unknown code', 'SOMETHING_NEW'],
    ['no code', undefined],
    ['null', null],
    ['an empty code', ''],
    ['the generic key itself', 'unknown'],
    ['a nested path', 'errors.RATE_LIMITED'],
    ['a namespaced key', 'common:appName'],
    ['a prototype property', '__proto__'],
    ['a lowercase code', 'rate_limited'],
  ])('returns the generic message for %s, without reporting a missing key', (_label, code) => {
    expect(translateErrorCode(createI18n(), code)).toBe(generic);
    expect(takeMissingKeys()).toEqual([]);
  });

  it('translates every error code in the catalog to its own message', () => {
    const i18n = createI18n();
    const codes = Object.keys(errors).filter((key) => key !== UNKNOWN_ERROR_KEY);
    expect(codes.length).toBeGreaterThan(0);
    for (const code of codes) {
      expect(code).toMatch(/^[A-Z][A-Z0-9_]*$/);
      expect(translateErrorCode(i18n, code), code).toBe(errors[code as keyof typeof errors]);
      expect(translateErrorCode(i18n, code), code).not.toBe(generic);
    }
  });

  it('covers the error codes that POST /api/auth/register can return (README, section 4)', () => {
    // Contrato de la API, no una copia del catálogo: 400, 403, 409, 413, 415, 429, 500 y 503.
    const registerContract = [
      'VALIDATION_ERROR',
      'MALFORMED_JSON',
      'CSRF_REJECTED',
      'EMAIL_ALREADY_REGISTERED',
      'PAYLOAD_TOO_LARGE',
      'UNSUPPORTED_MEDIA_TYPE',
      'RATE_LIMITED',
      'INTERNAL_ERROR',
      'TEMPORARILY_UNAVAILABLE',
    ];
    const i18n = createI18n();
    for (const code of registerContract) {
      expect(translateErrorCode(i18n, code), code).not.toBe(generic);
    }
  });
});
