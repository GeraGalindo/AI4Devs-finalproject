import { jwtVerify, SignJWT } from 'jose';
import { z } from 'zod';
import { SESSION_MAX_AGE_SECONDS } from '../../shared/http/session-cookie.js';

/**
 * JWT de sesión (DEV-004, D3; readme.md 2.5): HS256 con `jose`, claims `sub`, `ver`, `iat` y
 * `exp`, y 7 días absolutos (DP-15). El "ahora" llega del `Clock`, así que la caducidad se
 * prueba con `fixedClock`. El token solo viaja en la cookie: nunca en JSON ni en URLs.
 */
export const JWT_ALGORITHM = 'HS256';

export interface SessionClaims {
  /** `users.id`. */
  sub: string;
  /** `users.token_version` en el momento de emitirlo. */
  ver: number;
}

export interface SessionTokens {
  issue(claims: SessionClaims, now: Date): Promise<string>;
  /** Devuelve los claims si el token es válido en `now`; `null` en cualquier otro caso. */
  verify(token: string, now: Date): Promise<SessionClaims | null>;
}

/** Estructura exacta del payload: cualquier claim de más o de otro tipo invalida el token. */
const payloadSchema = z.strictObject({
  sub: z.uuid(),
  ver: z.int().min(0),
  iat: z.int(),
  exp: z.int(),
});

export function createSessionTokens(secret: string): SessionTokens {
  const key = new TextEncoder().encode(secret);

  return {
    async issue({ sub, ver }, now) {
      const iat = Math.floor(now.getTime() / 1000);
      return new SignJWT({ ver })
        .setProtectedHeader({ alg: JWT_ALGORITHM, typ: 'JWT' })
        .setSubject(sub)
        .setIssuedAt(iat)
        .setExpirationTime(iat + SESSION_MAX_AGE_SECONDS)
        .sign(key);
    },

    async verify(token, now) {
      let payload: unknown;
      try {
        // `algorithms` fija HS256: `none`, HS512, RS256… se rechazan antes de comprobar la firma.
        ({ payload } = await jwtVerify(token, key, {
          algorithms: [JWT_ALGORITHM],
          currentDate: now,
          requiredClaims: ['sub', 'ver', 'iat', 'exp'],
        }));
      } catch {
        return null;
      }

      const parsed = payloadSchema.safeParse(payload);
      if (!parsed.success) return null;
      const { sub, ver, iat, exp } = parsed.data;
      const nowSeconds = Math.floor(now.getTime() / 1000);
      // Nunca más de 7 días de vida, ni emitido en el futuro.
      if (exp - iat > SESSION_MAX_AGE_SECONDS || iat > nowSeconds) return null;
      return { sub, ver };
    },
  };
}
