import pg from 'pg';

export type DatabaseCheck = () => Promise<void>;

const DEFAULT_CHECK_TIMEOUT_MS = 2000;

export function createPool(databaseUrl: string): pg.Pool {
  const pool = new pg.Pool({
    connectionString: databaseUrl,
    max: 10,
    connectionTimeoutMillis: DEFAULT_CHECK_TIMEOUT_MS,
  });
  // Un cliente inactivo que pierde la conexión emite 'error'; sin este manejador el proceso terminaría.
  pool.on('error', (err) => {
    console.error('[db] idle client error:', err.message);
  });
  return pool;
}

/**
 * Comprueba la conexión con `SELECT 1`. Rechaza si no hay conexión o si la consulta
 * supera el tiempo máximo, para que /api/health no se quede colgado.
 */
export function createDatabaseCheck(
  pool: pg.Pool,
  timeoutMs: number = DEFAULT_CHECK_TIMEOUT_MS,
): DatabaseCheck {
  return async () => {
    let timer: NodeJS.Timeout | undefined;
    const timeout = new Promise<never>((_, reject) => {
      timer = setTimeout(() => reject(new Error(`database check timed out after ${timeoutMs} ms`)), timeoutMs);
    });
    try {
      await Promise.race([pool.query('SELECT 1'), timeout]);
    } finally {
      clearTimeout(timer);
    }
  };
}
