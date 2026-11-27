import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { parseEnv } from 'node:util';
import pg from 'pg';

/**
 * Base de datos de los E2E (DEV-007, parcial; T1). Los E2E escriben usuarios de verdad, así que
 * usan una base propia y desechable, `calicoach_e2e`, nunca `calicoach` (desarrollo) ni
 * `calicoach_test` (integración). Salvaguardas:
 * - nombre terminado en `_e2e`, en un host local;
 * - distinta de `DATABASE_URL` y de `TEST_DATABASE_URL` (del entorno y de `backend/.env`);
 * - `current_database()` se comprueba después de conectar;
 * - nunca se borra nada: cada prueba usa un email único.
 * Las credenciales por defecto son las del PostgreSQL local de `docker-compose.yml` (no son secretos).
 */
export const DEFAULT_E2E_DATABASE_URL = 'postgres://calicoach:calicoach@localhost:5432/calicoach_e2e';
const E2E_DATABASE_NAME = /^[a-z0-9_]+_e2e$/;
const LOCAL_HOSTS = new Set(['localhost', '127.0.0.1', '[::1]']);

export class E2eDatabaseGuardError extends Error {
  override name = 'E2eDatabaseGuardError';
}

const BACKEND_DIR = fileURLToPath(new URL('../../backend/', import.meta.url));

/** Variables de `backend/.env`, sin cargarlas en el entorno. */
export function readBackendEnv(path = `${BACKEND_DIR}.env`): Record<string, string | undefined> {
  return existsSync(path) ? parseEnv(readFileSync(path, 'utf8')) : {};
}

interface DatabaseId {
  host: string;
  port: string;
  name: string;
}

function databaseId(value: string, label: string): DatabaseId {
  let url: URL;
  try {
    url = new URL(value);
  } catch {
    throw new E2eDatabaseGuardError(`${label} is not a valid URL`);
  }
  if (url.protocol !== 'postgres:' && url.protocol !== 'postgresql:') {
    throw new E2eDatabaseGuardError(`${label} must be a postgres:// URL`);
  }
  return { host: url.hostname, port: url.port || '5432', name: decodeURIComponent(url.pathname.replace(/^\//, '')) };
}

const sameDatabase = (a: DatabaseId, b: DatabaseId) =>
  a.name === b.name && a.port === b.port && (a.host === b.host || (LOCAL_HOSTS.has(a.host) && LOCAL_HOSTS.has(b.host)));

/**
 * Devuelve la URL de la base de E2E (`E2E_DATABASE_URL`, o la local por defecto) si cumple las
 * salvaguardas; si no, lanza un error que no incluye credenciales.
 */
export function resolveE2eDatabaseUrl(
  env: Record<string, string | undefined> = process.env,
  backendEnv: Record<string, string | undefined> = readBackendEnv(),
): string {
  const value = env.E2E_DATABASE_URL?.trim() || DEFAULT_E2E_DATABASE_URL;
  const e2e = databaseId(value, 'E2E_DATABASE_URL');
  if (!E2E_DATABASE_NAME.test(e2e.name)) {
    throw new E2eDatabaseGuardError(`Refusing to use "${e2e.name}" for E2E: the database name must end with _e2e`);
  }
  if (!LOCAL_HOSTS.has(e2e.host)) {
    throw new E2eDatabaseGuardError(`Refusing to use host "${e2e.host}" for E2E: only a local PostgreSQL is allowed`);
  }
  for (const name of ['DATABASE_URL', 'TEST_DATABASE_URL'] as const) {
    for (const source of [env, backendEnv]) {
      const other = source[name]?.trim();
      if (other && sameDatabase(e2e, databaseId(other, name))) {
        throw new E2eDatabaseGuardError(`Refusing to run E2E: E2E_DATABASE_URL points to the same database as ${name}`);
      }
    }
  }
  return value;
}

/** Comprueba, ya conectado, que la base es la de E2E. */
export async function assertConnectedToE2eDatabase(client: pg.Client, expectedUrl: string): Promise<void> {
  const { rows } = await client.query<{ db: string }>('SELECT current_database() AS db');
  const db = rows[0]?.db ?? '';
  if (!E2E_DATABASE_NAME.test(db) || db !== databaseId(expectedUrl, 'E2E_DATABASE_URL').name) {
    throw new E2eDatabaseGuardError(`Connected to "${db}" instead of the E2E database`);
  }
}

/** Abre una conexión a la base de E2E comprobada. */
export async function connectE2eDatabase(url = resolveE2eDatabaseUrl()): Promise<pg.Client> {
  const client = new pg.Client({ connectionString: url });
  await client.connect();
  try {
    await assertConnectedToE2eDatabase(client, url);
  } catch (err) {
    await client.end();
    throw err;
  }
  return client;
}

/** Crea la base si no existe y aplica las migraciones versionadas (`prisma migrate deploy`). */
export async function prepareE2eDatabase(url = resolveE2eDatabaseUrl()): Promise<void> {
  const { name } = databaseId(url, 'E2E_DATABASE_URL');
  const maintenance = new URL(url);
  maintenance.pathname = '/postgres';
  const admin = new pg.Client({ connectionString: maintenance.toString() });
  await admin.connect();
  try {
    const { rowCount } = await admin.query('SELECT 1 FROM pg_database WHERE datname = $1', [name]);
    // El nombre ya está validado por la expresión regular, así que es seguro como identificador.
    if (!rowCount) await admin.query(`CREATE DATABASE "${name}"`);
  } finally {
    await admin.end();
  }

  const client = await connectE2eDatabase(url);
  await client.end();

  // `backend/prisma.config.ts` carga `backend/.env` sin sobrescribir esta DATABASE_URL.
  execFileSync('npx', ['prisma', 'migrate', 'deploy'], {
    cwd: BACKEND_DIR,
    env: { ...process.env, DATABASE_URL: url },
    stdio: 'pipe',
  });
}
