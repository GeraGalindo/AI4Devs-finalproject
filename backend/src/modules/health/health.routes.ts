import { Router } from 'express';
import type { DatabaseCheck } from '../../shared/db.js';
import { sendError } from '../../shared/http/errors.js';

export interface HealthOk {
  status: 'ok';
  database: 'up';
}

/**
 * GET /api/health — endpoint técnico público (DEV-001, excepción de autenticación documentada en la sección 4).
 * No devuelve datos de usuario ni detalles internos del error.
 */
export function healthRouter(checkDatabase: DatabaseCheck): Router {
  const router = Router();

  router.get('/health', async (_req, res) => {
    res.set('Cache-Control', 'no-store');
    try {
      await checkDatabase();
      const body: HealthOk = { status: 'ok', database: 'up' };
      res.status(200).json(body);
    } catch (err) {
      console.error('[health] database check failed:', err instanceof Error ? err.message : err);
      sendError(res, 503, 'TEMPORARILY_UNAVAILABLE', 'Database is unavailable.', { database: 'down' });
    }
  });

  return router;
}
