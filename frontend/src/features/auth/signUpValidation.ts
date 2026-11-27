/**
 * Validación local del registro (DEV-007, parcial), equivalente a `registerBodySchema` del
 * backend (DEV-004). El backend sigue siendo la autoridad: si su `400` marca un campo, la
 * pantalla lo muestra igual.
 *
 * - Email: `trim()` y minúsculas, el mismo patrón que `z.email()` de Zod 4.6.7 (solo ASCII) y
 *   254 caracteres como máximo, en el mismo orden que el backend.
 * - Contraseña: de 12 a 128 caracteres reales (puntos de código), sin recortar.
 */
export const EMAIL_MAX_LENGTH = 254;
export const PASSWORD_MIN_LENGTH = 12;
export const PASSWORD_MAX_LENGTH = 128;

/** Copia literal de `email` en `zod/v4/core/regexes` (Zod 4.6.7), el que usa `z.email()`. */
// Los `\-` innecesarios se conservan para que la copia siga siendo idéntica a la de Zod.
// eslint-disable-next-line no-useless-escape
const ZOD_EMAIL = /^(?:[A-Za-z0-9_'+\-]+\.)*[A-Za-z0-9_'+\-]*[A-Za-z0-9_+-]@(?:[A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$/;

export type EmailProblem = 'required' | 'invalid';
export type PasswordProblem = 'required' | 'tooShort' | 'tooLong';

/** Lo mismo que hace el backend antes de validar y guardar. */
export function normalizeEmail(value: string): string {
  return value.trim().toLowerCase();
}

export function emailProblem(value: string): EmailProblem | undefined {
  const email = normalizeEmail(value);
  if (email === '') return 'required';
  if (email.length > EMAIL_MAX_LENGTH || !ZOD_EMAIL.test(email)) return 'invalid';
  return undefined;
}

export const characters = (value: string): number => [...value].length;

export function passwordProblem(value: string): PasswordProblem | undefined {
  if (value === '') return 'required';
  const length = characters(value);
  if (length < PASSWORD_MIN_LENGTH) return 'tooShort';
  if (length > PASSWORD_MAX_LENGTH) return 'tooLong';
  return undefined;
}
