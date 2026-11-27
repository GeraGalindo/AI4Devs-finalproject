import { parseCookie, stringifySetCookie } from 'cookie';
import type { Request, Response } from 'express';
import type { SessionCookieConfig } from '../config.js';

/**
 * Cookie de sesión (DEV-004, D5; sección 4 "Cookie de sesión"). El nombre y `Secure` salen de
 * `sessionCookieFor(nodeEnv)` (DEV-003): `__Host-session` con `Secure` en production y `session`
 * sin `Secure` en development/test. Siempre `HttpOnly; SameSite=Lax; Path=/`, sin `Domain`.
 */

/** 7 días absolutos, sin renovación (DP-15). Coincide con la vida del JWT. */
export const SESSION_MAX_AGE_SECONDS = 7 * 24 * 60 * 60;

function serialize(cookie: SessionCookieConfig, value: string, maxAge: number): string {
  return stringifySetCookie({
    name: cookie.name,
    value,
    httpOnly: true,
    secure: cookie.secure,
    sameSite: 'lax',
    path: '/',
    maxAge,
  });
}

/** Emite la cookie con el JWT. Solo se llama tras una autenticación correcta. */
export function setSessionCookie(res: Response, cookie: SessionCookieConfig, token: string): void {
  res.append('Set-Cookie', serialize(cookie, token, SESSION_MAX_AGE_SECONDS));
}

/** Borra la cookie con los mismos atributos y `Max-Age=0`. */
export function clearSessionCookie(res: Response, cookie: SessionCookieConfig): void {
  res.append('Set-Cookie', serialize(cookie, '', 0));
}

/**
 * Lee el token **solo** de la cookie de sesión del entorno, nunca de otra cookie, del cuerpo,
 * de la URL ni de otras cabeceras. Si el nombre se repite, `cookie` se queda con el primero.
 */
export function readSessionToken(req: Request, cookie: SessionCookieConfig): string | undefined {
  const header = req.headers.cookie;
  if (!header) return undefined;
  const value = parseCookie(header)[cookie.name];
  return value ? value : undefined;
}
