import { describe, expect, it } from 'vitest';
import type { PrismaClient } from '../../shared/prisma.js';
import { createAuthRepository, EmailAlreadyRegisteredError, UserRepositoryError } from './auth.repository.js';

/**
 * Saneamiento de errores (salvaguarda 5): un error de Prisma puede llevar en el mensaje los
 * argumentos de la consulta. Se simula uno así para comprobar que nunca sale del repositorio.
 * El comportamiento contra PostgreSQL real está en tests/integration/auth.repository.test.ts.
 */
const EMAIL = 'leak@example.com';
const HASH = '$argon2id$v=19$m=19456,t=2,p=1$c2FsdA$aGFzaA';

class FakePrismaError extends Error {
  override name = 'PrismaClientValidationError';
  constructor(readonly code?: string) {
    super(`Invalid prisma.user.create() invocation: { data: { email: "${EMAIL}", passwordHash: "${HASH}" } }`);
  }
}

function prismaFailingWith(error: unknown): PrismaClient {
  const fail = async () => {
    throw error;
  };
  return { user: { findUnique: fail, create: fail, updateMany: fail } } as unknown as PrismaClient;
}

describe('auth repository error sanitizing', () => {
  it.each([
    ['create', (repo: ReturnType<typeof createAuthRepository>) => repo.create({ email: EMAIL, passwordHash: HASH, timezone: 'UTC' })],
    ['findCredentialsByEmail', (repo: ReturnType<typeof createAuthRepository>) => repo.findCredentialsByEmail(EMAIL)],
    ['findSessionUser', (repo: ReturnType<typeof createAuthRepository>) => repo.findSessionUser('id')],
    ['revokeSessions', (repo: ReturnType<typeof createAuthRepository>) => repo.revokeSessions('id', 0)],
  ])('%s replaces the error with one that has no query data and no cause', async (operation, call) => {
    const repo = createAuthRepository(prismaFailingWith(new FakePrismaError('P2010')));
    const err = await call(repo).then(
      () => {
        throw new Error('expected a failure');
      },
      (e: unknown) => e as Error,
    );
    expect(err).toBeInstanceOf(UserRepositoryError);
    expect(err.message).toBe(`users.${operation} failed (PrismaClientValidationError P2010)`);
    expect(err.cause).toBeUndefined();
    expect(`${err.message}\n${err.stack}`).not.toContain(EMAIL);
    expect(`${err.message}\n${err.stack}`).not.toContain(HASH);
  });

  it('maps only P2002 on create to EmailAlreadyRegisteredError', async () => {
    const repo = createAuthRepository(prismaFailingWith(new FakePrismaError('P2002')));
    await expect(repo.create({ email: EMAIL, passwordHash: HASH, timezone: 'UTC' })).rejects.toBeInstanceOf(
      EmailAlreadyRegisteredError,
    );
    await expect(repo.findSessionUser('id')).rejects.toBeInstanceOf(UserRepositoryError);
  });

  it('handles thrown non-Error values', async () => {
    const repo = createAuthRepository(prismaFailingWith(`raw ${EMAIL}`));
    await expect(repo.findCredentialsByEmail(EMAIL)).rejects.toThrow('users.findCredentialsByEmail failed (string)');
  });
});
