import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express, { Router } from 'express';

/** `frontend/dist`, resuelto igual desde `src/` (tsx) que desde `dist/` (build). */
export const DEFAULT_SPA_DIR = fileURLToPath(new URL('../../../../frontend/dist', import.meta.url));

/**
 * Sirve el build de la SPA (D9) si existe `index.html`. Los ficheros estáticos se sirven tal
 * cual; las rutas GET/HEAD de la SPA (sin extensión de fichero) reciben `index.html`. Nunca
 * intercepta `/api`, y un recurso estático inexistente (`/assets/x.js`) no se oculta con
 * `index.html`: sigue hasta el 404.
 */
export function spaRouter(spaDir: string): Router | undefined {
  const indexHtml = path.join(spaDir, 'index.html');
  if (!existsSync(indexHtml)) return undefined;

  const router = Router();
  router.use(express.static(spaDir, { index: false, fallthrough: true }));
  router.use((req, res, next) => {
    const isSpaRoute =
      (req.method === 'GET' || req.method === 'HEAD') &&
      req.path !== '/api' &&
      !req.path.startsWith('/api/') &&
      !path.posix.basename(req.path).includes('.');
    if (!isSpaRoute) return next();
    res.set('Cache-Control', 'no-cache');
    res.sendFile(indexHtml);
  });
  return router;
}
