import { Router } from 'express';
import type { DatabaseCheck } from '../../shared/db.js';

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
      res.status(503).json({
        error: {
          code: 'TEMPORARILY_UNAVAILABLE',
          message: 'Database is unavailable.',
          details: { database: 'down' },
        },
      });
    }
  });

  return router;
}
