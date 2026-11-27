import { afterAll, beforeEach, describe, expect, it } from 'vitest';
import { createAuthRepository, EmailAlreadyRegisteredError } from '../../src/modules/auth/auth.repository.js';
import { authTestContext, userRow } from '../support/auth-app.js';

/** Repositorio de autenticación contra PostgreSQL real (Prisma sobre el pool compartido). */
describe('auth repository', () => {
  const ctx = authTestContext();
  const repo = createAuthRepository(ctx.prisma);
  const newUser = { email: 'ana@example.com', passwordHash: '$argon2id$v=19$m=19456,t=2,p=1$c2FsdA$aGFzaA', timezone: 'UTC' };

  beforeEach(() => ctx.reset());
  afterAll(() => ctx.close());

  it('creates a user with NULL available_weekdays and returns it as null', async () => {
    const user = await repo.create(newUser);
    expect(user).toEqual({ id: expect.any(String), email: newUser.email, timezone: 'UTC', availableWeekdays: null, tokenVersion: 0 });
    expect((await userRow(ctx.pool, newUser.email))?.available_weekdays).toBeNull();
    expect(await repo.findSessionUser(user.id)).toEqual(user);
    expect(await repo.findCredentialsByEmail(newUser.email)).toEqual({ ...user, passwordHash: newUser.passwordHash });
  });

  it('returns configured weekdays unchanged', async () => {
    const user = await repo.create(newUser);
    await ctx.pool.query('UPDATE users SET available_weekdays = $1, updated_at = now() WHERE id = $2', [[1, 3, 5], user.id]);
    expect((await repo.findSessionUser(user.id))?.availableWeekdays).toEqual([1, 3, 5]);
  });

  it('never returns the password hash from findSessionUser', async () => {
    const user = await repo.create(newUser);
    expect(await repo.findSessionUser(user.id)).not.toHaveProperty('passwordHash');
  });

  it('maps the unique index users_email_key to EmailAlreadyRegisteredError', async () => {
    await repo.create(newUser);
    await expect(repo.create(newUser)).rejects.toBeInstanceOf(EmailAlreadyRegisteredError);
  });

  it('returns null for unknown users', async () => {
    expect(await repo.findCredentialsByEmail('nobody@example.com')).toBeNull();
    expect(await repo.findSessionUser('3f1c2d4b-6a7e-4f0b-9c1d-2e3f4a5b6c7d')).toBeNull();
  });

  it('revokeSessions increments token_version only while it still matches', async () => {
    const user = await repo.create(newUser);
    expect(await repo.revokeSessions(user.id, 0)).toBe(true);
    expect(await repo.revokeSessions(user.id, 0)).toBe(false);
    expect((await userRow(ctx.pool, newUser.email))?.token_version).toBe(1);
  });

  it('concurrent revocations of the same version increment token_version exactly once', async () => {
    const user = await repo.create(newUser);
    const results = await Promise.all(Array.from({ length: 8 }, () => repo.revokeSessions(user.id, 0)));
    expect(results.filter(Boolean)).toHaveLength(1);
    expect((await userRow(ctx.pool, newUser.email))?.token_version).toBe(1);
  });
});
