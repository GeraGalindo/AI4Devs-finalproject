import express, { type Express } from 'express';
import { healthRouter } from './modules/health/health.routes.js';
import type { DatabaseCheck } from './shared/db.js';

export interface AppDeps {
  checkDatabase: DatabaseCheck;
}

export function createApp({ checkDatabase }: AppDeps): Express {
  const app = express();
  app.disable('x-powered-by');

  app.use('/api', healthRouter(checkDatabase));

  return app;
}
