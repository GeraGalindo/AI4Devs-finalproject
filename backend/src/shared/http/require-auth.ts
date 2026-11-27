import type { RequestHandler, Response } from 'express';
import type { SessionCookieConfig } from '../config.js';
import { AppError } from './errors.js';
import { readSessionToken } from './session-cookie.js';

/** Identidad mínima que deja `requireAuth`: el `userId` sale solo del JWT verificado (2.5). */
export interface Identity {
  userId: string;
}

/** Verifica un token de sesión. Devuelve `null` si no es válido, ha caducado o está revocado. */
export type Authenticate<T extends Identity> = (token: string) => Promise<T | null>;

/**
 * `requireAuth` (DEV-004; sección 4, paso 5). Lee el token solo de la cookie de sesión y lo
 * verifica con `authenticate` (firma, algoritmo, claims y `token_version`). Sin cookie o con un
 * token no válido → 401 UNAUTHENTICATED. Si es válido, deja la identidad en `res.locals.auth`.
 */
export function requireAuth<T extends Identity>(authenticate: Authenticate<T>, cookie: SessionCookieConfig): RequestHandler {
  return async (req, res, next) => {
    const token = readSessionToken(req, cookie);
    const identity = token ? await authenticate(token) : null;
    if (!identity) {
      return next(new AppError(401, 'UNAUTHENTICATED', 'Authentication required.'));
    }
    res.locals.auth = identity;
    next();
  };
}

/** Identidad que dejó `requireAuth`. Solo se usa en rutas que lo llevan delante. */
export function authenticatedIdentity<T extends Identity>(res: Response): T {
  const identity = res.locals.auth as T | undefined;
  if (!identity) throw new Error('authenticatedIdentity() used on a route without requireAuth');
  return identity;
}
