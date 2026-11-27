import type { RequestHandler } from 'express';
import type { SessionCookieConfig } from '../../shared/config.js';
import { authenticatedIdentity } from '../../shared/http/require-auth.js';
import { clearSessionCookie, readSessionToken, setSessionCookie } from '../../shared/http/session-cookie.js';
import { validatedInput } from '../../shared/http/validate.js';
import type { LoginInput, RegisterInput } from './auth.schemas.js';
import type { AuthenticatedUser, AuthService } from './auth.service.js';

/**
 * Controladores de `/api/auth` (sección 4, "Autenticación"). El JWT solo viaja en `Set-Cookie`:
 * los cuerpos contienen únicamente `{ user }`.
 */
export interface AuthController {
  register: RequestHandler;
  login: RequestHandler;
  me: RequestHandler;
  logout: RequestHandler;
}

export function createAuthController(service: AuthService, cookie: SessionCookieConfig): AuthController {
  return {
    async register(_req, res) {
      const { body } = validatedInput<{ body: RegisterInput }>(res);
      const { user, token } = await service.register(body);
      setSessionCookie(res, cookie, token);
      res.status(201).json({ user });
    },

    async login(_req, res) {
      const { body } = validatedInput<{ body: LoginInput }>(res);
      const { user, token } = await service.login(body);
      setSessionCookie(res, cookie, token);
      res.status(200).json({ user });
    },

    me(_req, res) {
      const { user } = authenticatedIdentity<AuthenticatedUser>(res);
      res.status(200).json({ user });
    },

    async logout(req, res) {
      await service.logout(readSessionToken(req, cookie));
      clearSessionCookie(res, cookie);
      res.status(204).end();
    },
  };
}
