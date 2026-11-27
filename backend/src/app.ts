import express, { Router, type Express, type RequestHandler } from 'express';
import { systemClock, type Clock } from './domain/clock.js';
import { createPasswordHasher } from './modules/auth/auth.password.js';
import type { AuthRepository } from './modules/auth/auth.repository.js';
import { authRouter } from './modules/auth/auth.routes.js';
import { createAuthService } from './modules/auth/auth.service.js';
import { createSessionTokens } from './modules/auth/auth.token.js';
import { healthRouter } from './modules/health/health.routes.js';
import { sessionCookieFor, type Config } from './shared/config.js';
import type { DatabaseCheck } from './shared/db.js';
import { csrfProtection } from './shared/http/csrf.js';
import { errorHandler, notFound } from './shared/http/error-handler.js';
import { requestId } from './shared/http/request-id.js';
import { requireAuth } from './shared/http/require-auth.js';
import { securityHeaders } from './shared/http/security-headers.js';
import { spaRouter } from './shared/http/spa.js';

/** Lo que reciben las rutas de prueba: el mismo `requireAuth` que usarán los módulos. */
export interface ApiContext {
  requireAuth: RequestHandler;
}

export interface AppDeps {
  config: Pick<Config, 'nodeEnv' | 'appOrigin' | 'jwtSecret'>;
  checkDatabase: DatabaseCheck;
  /** Acceso a `users` para la autenticación (DEV-004). El servidor lo crea con Prisma. */
  authRepository: AuthRepository;
  /** Reloj inyectable (D5). Solo se puede sustituir con NODE_ENV=test. */
  clock?: Clock;
  /** Carpeta del build de la SPA. Si no existe, no se sirve nada fuera de /api. */
  spaDir?: string;
  /** Rutas adicionales bajo /api. Solo para pruebas (D6): el servidor nunca las pasa. */
  extraApiRoutes?: (api: Router, context: ApiContext) => void;
}

/**
 * Composición de la aplicación. Orden de los controles (sección 4, "Orden de los controles"):
 * 1. `helmet` y `X-Request-Id`; 2. CSRF en métodos que modifican datos bajo /api;
 * 3. cuerpo y tipo de contenido, por ruta (`jsonBody` / `noBody`); 4. límite de peticiones, por
 * ruta (`register` y `login`); 5. autenticación, por ruta (`requireAuth`); 6. validación Zod, por
 * ruta; 7. servicio. Después, 404 y errores.
 */
export function createApp({ config, checkDatabase, authRepository, clock, spaDir, extraApiRoutes }: AppDeps): Express {
  if (clock && clock !== systemClock && config.nodeEnv !== 'test') {
    throw new Error('A custom Clock can only be injected with NODE_ENV=test');
  }

  const app = express();
  app.disable('x-powered-by');
  const appClock = clock ?? systemClock;
  app.locals.clock = appClock;

  const cookie = sessionCookieFor(config.nodeEnv);
  const authService = createAuthService({
    repository: authRepository,
    passwords: createPasswordHasher(),
    tokens: createSessionTokens(config.jwtSecret),
    clock: appClock,
  });
  const context: ApiContext = { requireAuth: requireAuth(authService.authenticate, cookie) };

  app.use(requestId);
  app.use(securityHeaders(config.nodeEnv));

  const api = Router();
  api.use(csrfProtection(config.appOrigin));
  api.use(healthRouter(checkDatabase));
  api.use('/auth', authRouter({ service: authService, cookie, requireAuth: context.requireAuth }));
  extraApiRoutes?.(api, context);
  api.use(notFound);
  app.use('/api', api);

  const spa = spaDir ? spaRouter(spaDir) : undefined;
  if (spa) app.use(spa);

  app.use(notFound);
  app.use(errorHandler);
  return app;
}
