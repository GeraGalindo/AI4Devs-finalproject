import pg from 'pg';
import { afterAll, describe, expect, it } from 'vitest';
import { resolveTestDatabaseUrl, TestDatabaseGuardError, truncateTables } from '../support/test-database.js';

const BASE = 'postgres://calicoach:calicoach@localhost:5432';

describe('test database guard (DEV-002, D4)', () => {
  it('requires TEST_DATABASE_URL', () => {
    expect(() => resolveTestDatabaseUrl({ DATABASE_URL: `${BASE}/calicoach` })).toThrow(TestDatabaseGuardError);
  });

  it('rejects a database whose name does not end with _test', () => {
    expect(() => resolveTestDatabaseUrl({ TEST_DATABASE_URL: `${BASE}/calicoach` })).toThrow(/must end with _test/);
  });

  it('rejects TEST_DATABASE_URL pointing to the same database as DATABASE_URL', () => {
    const url = `${BASE}/calicoach_test`;
    expect(() => resolveTestDatabaseUrl({ TEST_DATABASE_URL: url, DATABASE_URL: url })).toThrow(/same database/);
  });

  it('accepts a separate *_test database', () => {
    const env = { TEST_DATABASE_URL: `${BASE}/calicoach_test`, DATABASE_URL: `${BASE}/calicoach` };
    expect(resolveTestDatabaseUrl(env)).toBe(env.TEST_DATABASE_URL);
  });

  describe('truncateTables', () => {
    const devUrl = process.env.DATABASE_URL;
    const devPool = devUrl ? new pg.Pool({ connectionString: devUrl, max: 1 }) : undefined;

    afterAll(async () => {
      await devPool?.end();
    });

    // Comprueba current_database() en el servidor antes de ejecutar nada: no llega a emitir TRUNCATE.
    it.runIf(devPool)('refuses to truncate when connected to the development database', async () => {
      await expect(truncateTables(devPool!, ['users'])).rejects.toThrow(/not a \*_test database/);
    });
  });
});
