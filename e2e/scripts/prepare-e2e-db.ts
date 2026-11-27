import { prepareE2eDatabase, resolveE2eDatabaseUrl } from '../support/e2e-database.ts';

/**
 * Prepara `calicoach_e2e` antes de `playwright test` (DEV-007, parcial): salvaguardas, creación
 * si no existe y `prisma migrate deploy`. Nunca muestra la URL: puede llevar credenciales.
 */
try {
  const url = resolveE2eDatabaseUrl();
  await prepareE2eDatabase(url);
  console.log(`[e2e] Database "${new URL(url).pathname.slice(1)}" ready (migrations applied)`);
} catch (err) {
  console.error(`[e2e] ${err instanceof Error ? err.message : String(err)}`);
  process.exitCode = 1;
}
