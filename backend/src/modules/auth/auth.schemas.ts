import { z } from 'zod';

/**
 * Esquemas de entrada de autenticación (DEV-004; sección 4, "Validación de entradas").
 * Estrictos: un campo desconocido → 400 VALIDATION_ERROR con `details.fields`.
 */

/** D2: de 12 a 128 caracteres (puntos de código, no unidades UTF-16), sin reglas de composición. */
export const PASSWORD_MIN_LENGTH = 12;
export const PASSWORD_MAX_LENGTH = 128;

/** Longitud máxima de un email (RFC 5321). */
export const EMAIL_MAX_LENGTH = 254;

const characters = (value: string): number => [...value].length;

/**
 * Email con `trim` y minúsculas antes de validarlo, buscarlo o guardarlo, como exige
 * `users_email_normalized_chk`. El formato de `z.email()` solo admite ASCII, así que
 * `toLowerCase()` en JavaScript y `lower()` en PostgreSQL coinciden.
 */
export const emailSchema = z.string().trim().toLowerCase().pipe(z.email().max(EMAIL_MAX_LENGTH));

/** La contraseña no se recorta ni se transforma (D2). */
export const newPasswordSchema = z
  .string()
  .refine((value) => characters(value) >= PASSWORD_MIN_LENGTH, {
    message: `Password must be at least ${PASSWORD_MIN_LENGTH} characters`,
  })
  .refine((value) => characters(value) <= PASSWORD_MAX_LENGTH, {
    message: `Password must be at most ${PASSWORD_MAX_LENGTH} characters`,
  });

/**
 * En el login no se aplica el mínimo: una contraseña corta simplemente no coincide (401).
 * El máximo sí, para no calcular hashes de entradas arbitrariamente largas.
 */
export const loginPasswordSchema = z
  .string()
  .min(1)
  .refine((value) => characters(value) <= PASSWORD_MAX_LENGTH, {
    message: `Password must be at most ${PASSWORD_MAX_LENGTH} characters`,
  });

/**
 * Forma de un identificador IANA: el primer segmento solo con letras, dígitos y `_`
 * (`UTC`, `Europe`, `EST5EDT`); los siguientes admiten además `+` y `-` (`Etc/GMT+5`,
 * `America/Port-au-Prince`). Así se rechazan los desfases (`+01:00`, `-05:00`, `UTC+1`), que
 * `Intl` acepta pero PostgreSQL interpreta con el signo invertido (convención POSIX).
 */
const IANA_TIME_ZONE_SHAPE = /^[A-Za-z][A-Za-z0-9_]*(\/[A-Za-z0-9_+-]+)*$/;
export const TIME_ZONE_MAX_LENGTH = 64;

/**
 * D7: zona IANA reconocida por `Intl.DateTimeFormat`, incluida `UTC`. Se guarda tal como llega,
 * sin normalizarla (`Intl` y PostgreSQL resuelven igual los nombres, también en minúsculas).
 */
export function isIanaTimeZone(value: string): boolean {
  if (value.length > TIME_ZONE_MAX_LENGTH || !IANA_TIME_ZONE_SHAPE.test(value)) return false;
  try {
    new Intl.DateTimeFormat('en-US', { timeZone: value });
    return true;
  } catch {
    return false;
  }
}

export const timeZoneSchema = z.string().refine(isIanaTimeZone, {
  message: 'Must be an IANA time zone such as Europe/Madrid',
});

export const registerBodySchema = z.strictObject({
  email: emailSchema,
  password: newPasswordSchema,
  timezone: timeZoneSchema,
});

export const loginBodySchema = z.strictObject({
  email: emailSchema,
  password: loginPasswordSchema,
});

export type RegisterInput = z.infer<typeof registerBodySchema>;
export type LoginInput = z.infer<typeof loginBodySchema>;
