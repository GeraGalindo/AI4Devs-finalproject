import express, { Router, type Express } from 'express';
import { systemClock, type Clock } from './domain/clock.js';
import { healthRouter } from './modules/health/health.routes.js';
import type { Config } from './shared/config.js';
import type { DatabaseCheck } from './shared/db.js';
import { csrfProtection } from './shared/http/csrf.js';
import { errorHandler, notFound } from './shared/http/error-handler.js';
import { requestId } from './shared/http/request-id.js';
import { securityHeaders } from './shared/http/security-headers.js';
import { spaRouter } from './shared/http/spa.js';

export interface AppDeps {
  config: Pick<Config, 'nodeEnv' | 'appOrigin'>;
  checkDatabase: DatabaseCheck;
  /** Reloj inyectable (D5). Solo se puede sustituir con NODE_ENV=test. */
  clock?: Clock;
  /** Carpeta del build de la SPA. Si no existe, no se sirve nada fuera de /api. */
  spaDir?: string;
  /** Rutas adicionales bajo /api. Solo para pruebas (D6): el servidor nunca las pasa. */
  extraApiRoutes?: (api: Router) => void;
}

/**
 * Composición de la aplicación. Orden de los controles (sección 4, "Orden de los controles"):
 * 1. `helmet` y `X-Request-Id`; 2. CSRF en métodos que modifican datos bajo /api;
 * 3. cuerpo y tipo de contenido, por ruta (`jsonBody` / `noBody`); 4–5. límite de peticiones y
 * autenticación (DEV-004); 6. validación Zod, por ruta; 7. servicio. Después, 404 y errores.
 */
export function createApp({ config, checkDatabase, clock, spaDir, extraApiRoutes }: AppDeps): Express {
  if (clock && clock !== systemClock && config.nodeEnv !== 'test') {
    throw new Error('A custom Clock can only be injected with NODE_ENV=test');
  }

  const app = express();
  app.disable('x-powered-by');
  app.locals.clock = clock ?? systemClock;

  app.use(requestId);
  app.use(securityHeaders(config.nodeEnv));

  const api = Router();
  api.use(csrfProtection(config.appOrigin));
  api.use(healthRouter(checkDatabase));
  extraApiRoutes?.(api);
  api.use(notFound);
  app.use('/api', api);

  const spa = spaDir ? spaRouter(spaDir) : undefined;
  if (spa) app.use(spa);

  app.use(notFound);
  app.use(errorHandler);
  return app;
}
