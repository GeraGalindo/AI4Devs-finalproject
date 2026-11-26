import { randomUUID } from 'node:crypto';
import type { RequestHandler } from 'express';

/**
 * Genera siempre un UUID nuevo como identificador de la petición (D10) e ignora el valor que
 * envíe el cliente, para que no se pueda inyectar en los logs. Se devuelve en `X-Request-Id`
 * y se usa como `requestId` en los errores.
 */
export const requestId: RequestHandler = (_req, res, next) => {
  const id = randomUUID();
  res.locals.requestId = id;
  res.set('X-Request-Id', id);
  next();
};
