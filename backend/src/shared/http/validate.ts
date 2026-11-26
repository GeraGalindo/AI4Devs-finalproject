import type { RequestHandler, Response } from 'express';
import type { z } from 'zod';
import { AppError } from './errors.js';

/**
 * Validación con Zod (sección 4, paso 6). Los esquemas deben ser estrictos
 * (`z.strictObject`), para que un campo desconocido → 400 VALIDATION_ERROR.
 * Los valores ya validados quedan en `res.locals.input`.
 */
export interface InputSchemas {
  params?: z.ZodType;
  query?: z.ZodType;
  body?: z.ZodType;
}

export interface ValidatedInput {
  params: unknown;
  query: unknown;
  body: unknown;
}

export function validate(schemas: InputSchemas): RequestHandler {
  return (req, res, next) => {
    const fields: { path: string; message: string }[] = [];
    const input: ValidatedInput = { params: req.params, query: req.query, body: req.body };

    for (const part of ['params', 'query', 'body'] as const) {
      const schema = schemas[part];
      if (!schema) continue;
      const result = schema.safeParse(req[part]);
      if (result.success) {
        input[part] = result.data;
      } else {
        for (const issue of result.error.issues) {
          fields.push({ path: [part, ...issue.path.map(String)].join('.'), message: issue.message });
        }
      }
    }

    if (fields.length > 0) {
      return next(new AppError(400, 'VALIDATION_ERROR', 'The request is invalid.', { fields }));
    }
    res.locals.input = input;
    next();
  };
}

/** Lee la entrada validada por `validate()`, con el tipo que indique quien la usa. */
export function validatedInput<T extends Partial<ValidatedInput>>(res: Response): T {
  return res.locals.input as T;
}
