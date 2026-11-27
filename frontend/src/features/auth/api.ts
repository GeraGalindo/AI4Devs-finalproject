import { apiRequest, isRecord } from '../../shared/api/client';
import type { PublicUser } from './types';

/**
 * Llamadas de autenticación: restaurar la sesión (DEV-006) y registrarse (DEV-007). `login` y
 * `logout` quedan fuera de la Entrega 2.
 */
export function parsePublicUser(value: unknown): PublicUser {
  if (
    !isRecord(value) ||
    typeof value.id !== 'string' ||
    typeof value.email !== 'string' ||
    typeof value.timezone !== 'string' ||
    !(value.availableWeekdays === null ||
      (Array.isArray(value.availableWeekdays) && value.availableWeekdays.every((d) => Number.isInteger(d))))
  ) {
    throw new TypeError('Invalid user');
  }
  return {
    id: value.id,
    email: value.email,
    timezone: value.timezone,
    availableWeekdays: value.availableWeekdays === null ? null : [...(value.availableWeekdays as number[])],
  };
}

/** `{ user }`, la forma de las respuestas de `register`, `login` y `me`. */
export function parseUserResponse(body: unknown): PublicUser {
  if (!isRecord(body)) throw new TypeError('Invalid response');
  return parsePublicUser(body.user);
}

/** `GET /api/auth/me`: `200 { user }` o `401 UNAUTHENTICATED`. */
export function getMe(signal?: AbortSignal): Promise<PublicUser> {
  return apiRequest('GET', '/api/auth/me', { parse: parseUserResponse, ...(signal ? { signal } : {}) });
}

export interface RegisterInput {
  email: string;
  password: string;
  timezone: string;
}

/** `POST /api/auth/register`: `201 { user }` y la cookie de sesión. */
export function register(input: RegisterInput, signal?: AbortSignal): Promise<PublicUser> {
  return apiRequest('POST', '/api/auth/register', {
    body: input,
    parse: parseUserResponse,
    ...(signal ? { signal } : {}),
  });
}
