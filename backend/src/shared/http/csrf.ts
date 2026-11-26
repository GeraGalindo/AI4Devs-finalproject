import type { RequestHandler } from 'express';
import { sendError } from './errors.js';

const UNSAFE_METHODS = new Set(['POST', 'PUT', 'PATCH', 'DELETE']);

/**
 * Protección CSRF de readme.md 2.5 y sección 4, en todo POST, PUT, PATCH y DELETE bajo /api,
 * con o sin cuerpo. No depende del cuerpo: se evalúa antes de leerlo.
 * 1. Si llega `Origin`, debe ser exactamente APP_ORIGIN (`null` se rechaza).
 * 2. Sin `Origin`: `Sec-Fetch-Site` debe valer `same-origin`; si no llega, el origen de
 *    `Referer` debe ser APP_ORIGIN; sin ninguna de las dos → rechazo.
 * 3. `X-CSRF-Protection: 1` es obligatoria.
 */
export function csrfProtection(appOrigin: string): RequestHandler {
  return (req, res, next) => {
    if (!UNSAFE_METHODS.has(req.method)) return next();

    if (!sameOrigin(req.get('origin'), req.get('sec-fetch-site'), req.get('referer'), appOrigin)) {
      return reject(res);
    }
    if (req.get('x-csrf-protection') !== '1') {
      return reject(res);
    }
    next();
  };
}

function sameOrigin(
  origin: string | undefined,
  secFetchSite: string | undefined,
  referer: string | undefined,
  appOrigin: string,
): boolean {
  if (origin !== undefined) return origin === appOrigin;
  if (secFetchSite !== undefined) return secFetchSite === 'same-origin';
  if (referer !== undefined) {
    try {
      return new URL(referer).origin === appOrigin;
    } catch {
      return false;
    }
  }
  return false;
}

function reject(res: Parameters<RequestHandler>[1]): void {
  sendError(res, 403, 'CSRF_REJECTED', 'Request rejected by CSRF protection.');
}
