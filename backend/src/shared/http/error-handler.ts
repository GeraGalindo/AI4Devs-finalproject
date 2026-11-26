import type { ErrorRequestHandler, RequestHandler } from 'express';
import { AppError, requestIdOf, sendError } from './errors.js';

/** Ruta desconocida → 404 NOT_FOUND en JSON (sección 4). */
export const notFound: RequestHandler = (_req, res) => {
  sendError(res, 404, 'NOT_FOUND', 'Resource not found.');
};

/** Errores de `express.json()` (body-parser), traducidos a los códigos del contrato. */
const BODY_PARSER_ERRORS: Record<string, [number, string, string]> = {
  'entity.parse.failed': [400, 'MALFORMED_JSON', 'The request body is not valid JSON.'],
  'entity.too.large': [413, 'PAYLOAD_TOO_LARGE', 'The request body is too large.'],
  'charset.unsupported': [415, 'UNSUPPORTED_MEDIA_TYPE', 'Unsupported request charset.'],
  'encoding.unsupported': [415, 'UNSUPPORTED_MEDIA_TYPE', 'Unsupported request content encoding.'],
  'request.size.invalid': [400, 'MALFORMED_JSON', 'The request body does not match its Content-Length.'],
};

/**
 * Manejador central de errores. Nunca incluye trazas, SQL ni el mensaje interno en la
 * respuesta, en ningún entorno: un error no controlado → 500 INTERNAL_ERROR con el
 * `requestId`. La traza solo va al log del servidor, junto con ese `requestId`.
 */
export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (res.headersSent) return next(err);

  if (err instanceof AppError) {
    return sendError(res, err.status, err.code, err.message, err.details);
  }

  const type = typeof err === 'object' && err !== null && 'type' in err ? String(err.type) : undefined;
  const mapped = type ? BODY_PARSER_ERRORS[type] : undefined;
  if (mapped) {
    const [status, code, message] = mapped;
    return sendError(res, status, code, message);
  }

  console.error(`[error] requestId=${requestIdOf(res)} ${req.method} ${req.path}`, err);
  sendError(res, 500, 'INTERNAL_ERROR', 'Internal server error.');
};
