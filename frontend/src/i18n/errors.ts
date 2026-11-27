import type { i18n } from 'i18next';
import type errors from '../locales/en/errors.json';

export type ErrorKey = keyof typeof errors;

/** Clave del mensaje genérico para códigos sin traducción. */
export const UNKNOWN_ERROR_KEY = 'unknown' satisfies ErrorKey;

/** Los códigos de error de la API son `UPPER_SNAKE_CASE` (sección 4 del README). */
const ERROR_CODE_SHAPE = /^[A-Z][A-Z0-9_]*$/;

/**
 * Mensaje visible para un `error.code` del backend (DEV-038). Nunca usa `error.message`, que es
 * un texto técnico para desarrollo y *logs* (sección 4).
 *
 * Un código desconocido, ausente o con otra forma devuelve el mensaje genérico. Se comprueba con
 * `exists()` antes de traducir, así que un código nuevo del backend no cuenta como una clave
 * inexistente del frontend.
 */
export function translateErrorCode(instance: i18n, code: string | null | undefined): string {
  const key: ErrorKey =
    typeof code === 'string' && ERROR_CODE_SHAPE.test(code) && instance.exists(code, { ns: 'errors' })
      ? (code as ErrorKey)
      : UNKNOWN_ERROR_KEY;
  return instance.t(key, { ns: 'errors' });
}
