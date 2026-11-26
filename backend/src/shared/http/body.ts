import express, { type RequestHandler } from 'express';
import { AppError } from './errors.js';

/** Tamaño máximo de un cuerpo JSON (D7). Si se supera → 413 PAYLOAD_TOO_LARGE. */
export const JSON_BODY_LIMIT = '16kb';

const parseJson = express.json({ limit: JSON_BODY_LIMIT, type: 'application/json', strict: true });

const requireJsonContentType: RequestHandler = (req, _res, next) => {
  if (!req.is('application/json')) {
    return next(new AppError(415, 'UNSUPPORTED_MEDIA_TYPE', 'Content-Type must be application/json.'));
  }
  next();
};

/**
 * Para operaciones **con cuerpo** (sección 4, "Cuerpo y tipo de contenido"):
 * `Content-Type: application/json` obligatorio (→ 415) y JSON válido (→ 400 MALFORMED_JSON),
 * de 16 KB como máximo (→ 413). Va detrás de la comprobación CSRF.
 */
export const jsonBody: RequestHandler = (req, res, next) => {
  requireJsonContentType(req, res, (err?: unknown) => (err ? next(err) : parseJson(req, res, next)));
};

/**
 * Para operaciones **sin cuerpo** (`logout`, `complete`, `DELETE` de series): no se exige
 * `Content-Type`, y un cuerpo no vacío → 400 VALIDATION_ERROR, sea cual sea su tipo.
 */
export const noBody: RequestHandler = (req, _res, next) => {
  const reject = () => next(new AppError(400, 'VALIDATION_ERROR', 'This operation does not accept a request body.'));

  const length = req.get('content-length');
  if (length !== undefined && Number(length) > 0) return reject();
  if (req.get('transfer-encoding') === undefined) return next();

  // Cuerpo por fragmentos (chunked): basta con el primer byte para rechazarlo.
  let settled = false;
  req.once('data', (chunk: Buffer) => {
    if (settled || chunk.length === 0) return;
    settled = true;
    req.pause();
    reject();
  });
  req.once('end', () => {
    if (settled) return;
    settled = true;
    next();
  });
  req.once('error', (err) => {
    if (settled) return;
    settled = true;
    next(err);
  });
};
