import pg from 'pg';
import { afterAll, beforeEach, describe, expect, it } from 'vitest';
import { expectPgError } from '../support/pg-error.js';
import { resolveTestDatabaseUrl, truncateTables } from '../support/test-database.js';

/** Restricciones de `users` comprobadas con SQL directo contra PostgreSQL real (DEV-002, T-03). */
describe('users constraints', () => {
  const pool = new pg.Pool({ connectionString: resolveTestDatabaseUrl(process.env), max: 2 });

  beforeEach(async () => {
    await truncateTables(pool, ['users']);
  });

  afterAll(async () => {
    await pool.end();
  });

  type UserRow = { email: unknown; password_hash: unknown; timezone: unknown; token_version?: unknown; available_weekdays?: unknown };

  const valid = (overrides: Partial<UserRow> = {}): UserRow => ({
    email: 'athlete@example.com',
    password_hash: 'not-a-real-hash',
    timezone: 'Europe/Madrid',
    ...overrides,
  });

  function insert(row: UserRow) {
    const columns = Object.keys(row);
    const placeholders = columns.map((_, i) => `$${i + 1}`);
    return pool.query(
      `INSERT INTO users (${columns.join(', ')}) VALUES (${placeholders.join(', ')}) RETURNING *`,
      Object.values(row),
    );
  }

  describe('valid rows', () => {
    it('applies the defaults: uuid id, token_version 0, NULL weekdays and timestamps', async () => {
      const { rows } = await insert(valid());
      const user = rows[0];
      expect(user.id).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/);
      expect(user.token_version).toBe(0);
      expect(user.available_weekdays).toBeNull();
      expect(user.created_at).toBeInstanceOf(Date);
      expect(user.updated_at).toBeInstanceOf(Date);
    });

    it.each([
      [[1, 4]],
      [[0, 2, 4, 6]],
      [[0, 1, 2, 3, 4, 5]],
    ])('accepts %j as available_weekdays', async (days) => {
      const { rows } = await insert(valid({ available_weekdays: days }));
      expect(rows[0].available_weekdays).toEqual(days);
    });
  });

  describe('CHECK constraints (SQLSTATE 23514)', () => {
    it.each(['Athlete@example.com', ' athlete@example.com', 'athlete@example.com '])(
      'rejects the non-normalized email %j',
      async (email) => {
        await expectPgError(insert(valid({ email })), '23514', 'users_email_normalized_chk');
      },
    );

    it('rejects a negative token_version', async () => {
      await expectPgError(insert(valid({ token_version: -1 })), '23514', 'users_token_version_nonneg_chk');
    });

    it.each([
      ['an empty array', []],
      ['1 day', [1]],
      ['7 days', [0, 1, 2, 3, 4, 5, 6]],
      ['a day above 6', [1, 7]],
      ['a negative day', [-1, 3]],
    ])('rejects available_weekdays with %s', async (_label, days) => {
      await expectPgError(insert(valid({ available_weekdays: days })), '23514', 'users_available_weekdays_chk');
    });
  });

  describe('UNIQUE email (SQLSTATE 23505)', () => {
    it('rejects a second user with the same email', async () => {
      await insert(valid());
      await expectPgError(insert(valid({ password_hash: 'other' })), '23505', 'users_email_key');
      const { rows } = await pool.query('SELECT count(*)::int AS n FROM users');
      expect(rows[0].n).toBe(1);
    });
  });

  describe('NOT NULL (SQLSTATE 23502)', () => {
    it.each(['email', 'password_hash', 'timezone'] as const)('rejects a NULL %s', async (column) => {
      await expectPgError(insert(valid({ [column]: null })), '23502');
    });

    it('rejects a NULL token_version', async () => {
      await expectPgError(insert(valid({ token_version: null })), '23502');
    });
  });
});
