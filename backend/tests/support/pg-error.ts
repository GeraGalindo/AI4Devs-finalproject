import { expect } from 'vitest';

type PgError = { code?: string; constraint?: string };

/** Comprueba que una operación falla con el SQLSTATE (y, si se indica, la restricción) esperados. */
export async function expectPgError(operation: Promise<unknown>, code: string, constraint?: string): Promise<void> {
  const error = await operation.then(
    () => {
      throw new Error(`expected SQLSTATE ${code}, but the operation succeeded`);
    },
    (err: unknown) => err as PgError,
  );
  expect(error.code).toBe(code);
  if (constraint !== undefined) expect(error.constraint).toBe(constraint);
}
