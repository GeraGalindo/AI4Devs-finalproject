import { existsSync } from 'node:fs';
import { createApp } from './app.js';
import { createAuthRepository } from './modules/auth/auth.repository.js';
import { ConfigError, loadConfig } from './shared/config.js';
import { createDatabaseCheck, createPool } from './shared/db.js';
import { DEFAULT_SPA_DIR } from './shared/http/spa.js';
import { createPrisma } from './shared/prisma.js';

function main(): void {
  let config;
  try {
    config = loadConfig();
  } catch (err) {
    if (err instanceof ConfigError) {
      console.error(`[config] ${err.message}`);
      process.exit(1);
    }
    throw err;
  }

  const pool = createPool(config.databaseUrl);
  const prisma = createPrisma(pool);
  const app = createApp({
    config,
    checkDatabase: createDatabaseCheck(pool),
    authRepository: createAuthRepository(prisma),
    spaDir: DEFAULT_SPA_DIR,
  });

  const server = app.listen(config.port, () => {
    console.log(`[server] listening on http://localhost:${config.port} (${config.nodeEnv}, origin ${config.appOrigin})`);
    if (existsSync(`${DEFAULT_SPA_DIR}/index.html`)) console.log(`[server] serving the SPA build from ${DEFAULT_SPA_DIR}`);
  });

  const shutdown = (signal: string) => {
    console.log(`[server] ${signal} received, shutting down`);
    server.close(() => {
      // Primero Prisma y después el pool que comparte (DEV-002).
      prisma
        .$disconnect()
        .finally(() => pool.end())
        .finally(() => process.exit(0));
    });
  };
  process.on('SIGINT', () => shutdown('SIGINT'));
  process.on('SIGTERM', () => shutdown('SIGTERM'));
}

main();
