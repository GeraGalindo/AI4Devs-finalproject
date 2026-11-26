import type { Response } from 'express';

/**
 * Formato de errores de la sección 4: `{ error: { code, message, details?, requestId } }`.
 * `message` es técnico (para desarrollo y logs) y la SPA traduce a partir de `code`.
 */
export interface ErrorBody {
  error: {
    code: string;
    message: string;
    details?: Record<string, unknown>;
    requestId: string;
  };
}

/** Error esperado de la API: el manejador central lo convierte en la respuesta del contrato. */
export class AppError extends Error {
  override name = 'AppError';

  constructor(
    readonly status: number,
    readonly code: string,
    message: string,
    readonly details?: Record<string, unknown>,
  ) {
    super(message);
  }
}

export function requestIdOf(res: Response): string {
  return String(res.locals.requestId ?? '');
}

export function sendError(
  res: Response,
  status: number,
  code: string,
  message: string,
  details?: Record<string, unknown>,
): void {
  const body: ErrorBody = {
    error: { code, message, ...(details ? { details } : {}), requestId: requestIdOf(res) },
  };
  res.status(status).json(body);
}
