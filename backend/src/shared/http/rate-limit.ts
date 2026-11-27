import { rateLimit, type RateLimitRequestHandler } from 'express-rate-limit';
import { AppError } from './errors.js';

/**
 * Límite de peticiones (DEV-004, D6; sección 4, paso 4). Va detrás del cuerpo y antes de la
 * validación, así que cuenta todo intento que supera CSRF y la lectura del cuerpo, también los
 * que fallan la validación y los que tienen éxito.
 *
 * - La clave es la IP del socket (`req.ip` sin `trust proxy`): no se confía en `X-Forwarded-For`.
 *   Detrás de un proxy todos los clientes compartirían la clave, así que no basta para desplegar
 *   (DEV-036).
 * - Almacén en memoria, propio de cada limitador y de cada `createApp`: los contadores son
 *   independientes por endpoint, se pierden al reiniciar y no se comparten entre instancias.
 * - El reloj es el del sistema, no el `Clock` inyectable.
 */
export interface RateLimitPolicy {
  windowMs: number;
  limit: number;
}

export const LOGIN_RATE_LIMIT: RateLimitPolicy = { windowMs: 15 * 60 * 1000, limit: 10 };
export const REGISTER_RATE_LIMIT: RateLimitPolicy = { windowMs: 60 * 60 * 1000, limit: 5 };

export function createRateLimiter({ windowMs, limit }: RateLimitPolicy): RateLimitRequestHandler {
  return rateLimit({
    windowMs,
    limit,
    // Con cabeceras estándar, express-rate-limit añade `Retry-After` al superar el límite.
    standardHeaders: 'draft-7',
    legacyHeaders: false,
    handler: (_req, _res, next) => {
      next(new AppError(429, 'RATE_LIMITED', 'Too many requests. Try again later.'));
    },
  });
}
