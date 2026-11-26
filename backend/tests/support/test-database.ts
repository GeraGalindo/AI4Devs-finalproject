import { execFileSync } from 'node:child_process';
import pg from 'pg';

/**
 * Salvaguardas de la base de pruebas (DEV-002, D4). Las pruebas de integración solo se
 * ejecutan contra una base desechable cuyo nombre termina en `_test`, distinta de la de
 * desarrollo, para que ninguna operación destructiva alcance `DATABASE_URL`.
 */

const TEST_DATABASE_NAME = /^[a-z0-9_]+_test$/;

export class TestDatabaseGuardError extends Error {
  override name = 'TestDatabaseGuardError';
}

/** Devuelve `TEST_DATABASE_URL` si apunta a una base `*_test` distinta de `DATABASE_URL`. */
export function resolveTestDatabaseUrl(env: NodeJS.ProcessEnv): string {
  const testUrl = env.TEST_DATABASE_URL;
  if (!testUrl) {
    throw new TestDatabaseGuardError(
      'Integration tests require TEST_DATABASE_URL pointing to a *_test database (see backend/.env.example)',
    );
  }
  const test = parseUrl(testUrl, 'TEST_DATABASE_URL');
  const testDb = databaseName(test);
  if (!TEST_DATABASE_NAME.test(testDb)) {
    throw new TestDatabaseGuardError(`Refusing to use "${testDb}" for tests: the database name must end with _test`);
  }
  if (env.DATABASE_URL) {
    const dev = parseUrl(env.DATABASE_URL, 'DATABASE_URL');
    if (dev.host === test.host && databaseName(dev) === testDb) {
      throw new TestDatabaseGuardError('Refusing to run tests: TEST_DATABASE_URL points to the same database as DATABASE_URL');
    }
  }
  return testUrl;
}

/** Crea la base de pruebas si no existe y aplica las migraciones versionadas con `migrate deploy`. */
export async function prepareTestDatabase(testUrl: string): Promise<void> {
  const url = parseUrl(testUrl, 'TEST_DATABASE_URL');
  const dbName = databaseName(url);
  if (!TEST_DATABASE_NAME.test(dbName)) {
    throw new TestDatabaseGuardError(`Refusing to prepare "${dbName}": the database name must end with _test`);
  }
  const maintenance = new URL(url);
  maintenance.pathname = '/postgres';
  const client = new pg.Client({ connectionString: maintenance.toString() });
  await client.connect();
  try {
    const { rowCount } = await client.query('SELECT 1 FROM pg_database WHERE datname = $1', [dbName]);
    // El nombre ya está validado por la expresión regular, así que es seguro como identificador.
    if (!rowCount) await client.query(`CREATE DATABASE "${dbName}"`);
  } finally {
    await client.end();
  }
  execFileSync('npx', ['prisma', 'migrate', 'deploy'], {
    env: { ...process.env, DATABASE_URL: testUrl },
    stdio: 'pipe',
  });
}

/** Vacía las tablas indicadas solo si la conexión está realmente en una base `*_test`. */
export async function truncateTables(pool: pg.Pool, tables: readonly string[]): Promise<void> {
  const { rows } = await pool.query<{ db: string }>('SELECT current_database() AS db');
  const db = rows[0]?.db ?? '';
  if (!TEST_DATABASE_NAME.test(db)) {
    throw new TestDatabaseGuardError(`Refusing to truncate tables in "${db}": not a *_test database`);
  }
  await pool.query(`TRUNCATE ${tables.map((t) => `"${t}"`).join(', ')}`);
}

function parseUrl(value: string, name: string): URL {
  try {
    return new URL(value);
  } catch {
    throw new TestDatabaseGuardError(`${name} is not a valid URL`);
  }
}

function databaseName(url: URL): string {
  return decodeURIComponent(url.pathname.replace(/^\//, ''));
}
