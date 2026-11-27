import { randomUUID } from 'node:crypto';
import { describe, expect, it, vi } from 'vitest';
import { fixedClock } from '../../domain/clock.js';
import { DEV_JWT_SECRET } from '../../shared/config.js';
import { AppError } from '../../shared/http/errors.js';
import type { PasswordHasher } from './auth.password.js';
import { EmailAlreadyRegisteredError, type AuthRepository, type UserCredentials } from './auth.repository.js';
import { createAuthService } from './auth.service.js';
import { createSessionTokens } from './auth.token.js';

/**
 * Lógica del servicio con dobles en memoria (sin base de datos). El comportamiento contra
 * PostgreSQL real está en tests/integration/auth.*.test.ts.
 */
function withoutHash({ passwordHash: _omit, ...user }: UserCredentials) {
  void _omit;
  return user;
}

function setup() {
  const users = new Map<string, UserCredentials>();
  const repository: AuthRepository = {
    findCredentialsByEmail: vi.fn(async (email: string) => [...users.values()].find((u) => u.email === email) ?? null),
    findSessionUser: vi.fn(async (id: string) => {
      const user = users.get(id);
      return user ? withoutHash(user) : null;
    }),
    create: vi.fn(async ({ email, passwordHash, timezone }) => {
      if ([...users.values()].some((u) => u.email === email)) throw new EmailAlreadyRegisteredError();
      const user = { id: randomUUID(), email, passwordHash, timezone, availableWeekdays: null, tokenVersion: 0 };
      users.set(user.id, user);
      return withoutHash(user);
    }),
    revokeSessions: vi.fn(async (id: string, tokenVersion: number) => {
      const user = users.get(id);
      if (!user || user.tokenVersion !== tokenVersion) return false;
      user.tokenVersion++;
      return true;
    }),
  };
  const passwords: PasswordHasher = {
    hash: vi.fn(async (password: string) => `hashed:${password}`),
    verify: vi.fn(async (hash: string, password: string) => hash === `hashed:${password}`),
    verifyDummy: vi.fn(async () => false as const),
  };
  const clock = fixedClock('2026-11-27T10:00:00Z');
  const service = createAuthService({ repository, passwords, tokens: createSessionTokens(DEV_JWT_SECRET), clock });
  return { service, repository, passwords };
}

const input = { email: 'ana@example.com', password: 'correct horse battery', timezone: 'Europe/Madrid' };

async function expectAppError(promise: Promise<unknown>, status: number, code: string, message?: string) {
  const err = await promise.then(
    () => {
      throw new Error('expected an AppError');
    },
    (e: unknown) => e,
  );
  expect(err).toBeInstanceOf(AppError);
  expect(err).toMatchObject({ status, code, ...(message ? { message } : {}) });
  return err as AppError;
}

describe('auth service', () => {
  it('registers with the hashed password and returns the public user and a token', async () => {
    const { service, repository } = setup();
    const { user, token } = await service.register(input);
    expect(repository.create).toHaveBeenCalledWith({
      email: input.email,
      passwordHash: 'hashed:correct horse battery',
      timezone: input.timezone,
    });
    expect(user).toEqual({ id: expect.any(String), email: input.email, timezone: input.timezone, availableWeekdays: null });
    expect(user).not.toHaveProperty('passwordHash');
    expect(user).not.toHaveProperty('tokenVersion');
    expect((await service.authenticate(token))?.userId).toBe(user.id);
  });

  it('maps a duplicate email to 409 EMAIL_ALREADY_REGISTERED', async () => {
    const { service } = setup();
    await service.register(input);
    await expectAppError(service.register(input), 409, 'EMAIL_ALREADY_REGISTERED');
  });

  it('D9: the same 401 INVALID_CREDENTIALS for an unknown email and a wrong password', async () => {
    const { service, passwords } = setup();
    await service.register(input);

    const unknown = await expectAppError(
      service.login({ email: 'nobody@example.com', password: input.password }),
      401,
      'INVALID_CREDENTIALS',
    );
    expect(passwords.verifyDummy).toHaveBeenCalledTimes(1);
    expect(passwords.verify).not.toHaveBeenCalled();

    const wrong = await expectAppError(service.login({ email: input.email, password: 'wrong password!' }), 401, 'INVALID_CREDENTIALS');
    expect(passwords.verify).toHaveBeenCalledTimes(1);
    expect(passwords.verifyDummy).toHaveBeenCalledTimes(1);
    expect(wrong.message).toBe(unknown.message);
    expect(wrong.details).toBeUndefined();
    expect(unknown.details).toBeUndefined();
  });

  it('logs in with the right password', async () => {
    const { service } = setup();
    const registered = await service.register(input);
    const { user } = await service.login({ email: input.email, password: input.password });
    expect(user).toEqual(registered.user);
  });

  it('rejects a token whose ver no longer matches token_version, and an unknown sub', async () => {
    const { service, repository } = setup();
    const { token, user } = await service.register(input);
    await repository.revokeSessions(user.id, 0);
    expect(await service.authenticate(token)).toBeNull();

    const tokens = createSessionTokens(DEV_JWT_SECRET);
    const orphan = await tokens.issue({ sub: randomUUID(), ver: 0 }, new Date('2026-11-27T10:00:00Z'));
    expect(await service.authenticate(orphan)).toBeNull();
  });

  it('logout revokes only with a valid token and never touches the repository otherwise', async () => {
    const { service, repository } = setup();
    const { token, user } = await service.register(input);

    await service.logout(undefined);
    await service.logout('garbage');
    expect(repository.revokeSessions).not.toHaveBeenCalled();

    await service.logout(token);
    expect(repository.revokeSessions).toHaveBeenCalledWith(user.id, 0);

    // El mismo token ya no es válido: un segundo logout no vuelve a incrementar.
    await service.logout(token);
    expect(repository.revokeSessions).toHaveBeenCalledTimes(1);
  });
});
