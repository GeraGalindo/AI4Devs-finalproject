import { Router, type RequestHandler } from 'express';
import type { SessionCookieConfig } from '../../shared/config.js';
import { jsonBody, noBody } from '../../shared/http/body.js';
import { createRateLimiter, LOGIN_RATE_LIMIT, REGISTER_RATE_LIMIT } from '../../shared/http/rate-limit.js';
import { validate } from '../../shared/http/validate.js';
import { createAuthController } from './auth.controller.js';
import { loginBodySchema, registerBodySchema } from './auth.schemas.js';
import type { AuthService } from './auth.service.js';

export interface AuthRouterDeps {
  service: AuthService;
  cookie: SessionCookieConfig;
  /** `requireAuth` ya configurado con `service.authenticate` y la cookie del entorno. */
  requireAuth: RequestHandler;
}

/** Ninguna respuesta de `/api/auth` se guarda en cachés (sección 4, cabeceras de respuesta). */
const noStore: RequestHandler = (_req, res, next) => {
  res.set('Cache-Control', 'no-store');
  next();
};

/**
 * Rutas de `/api/auth` (DEV-004). El CSRF ya se aplicó en `/api` (paso 2). Después, en el orden
 * de la sección 4: cuerpo (3) → límite de peticiones (4) → autenticación (5) → Zod (6) → servicio (7).
 * Cada router tiene sus propios limitadores, con contadores independientes por endpoint.
 */
export function authRouter({ service, cookie, requireAuth }: AuthRouterDeps): Router {
  const controller = createAuthController(service, cookie);
  const registerLimiter = createRateLimiter(REGISTER_RATE_LIMIT);
  const loginLimiter = createRateLimiter(LOGIN_RATE_LIMIT);

  const router = Router();
  router.use(noStore);
  router.post('/register', jsonBody, registerLimiter, validate({ body: registerBodySchema }), controller.register);
  router.post('/login', jsonBody, loginLimiter, validate({ body: loginBodySchema }), controller.login);
  router.get('/me', requireAuth, controller.me);
  router.post('/logout', noBody, controller.logout);
  return router;
}
