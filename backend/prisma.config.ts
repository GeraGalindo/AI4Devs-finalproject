import { existsSync } from 'node:fs';
import { defineConfig } from 'prisma/config';

// Prisma 7 no carga .env por sí mismo. En local se lee backend/.env;
// en CI la variable ya viene del entorno y loadEnvFile no la sobrescribe.
if (existsSync('.env')) {
  process.loadEnvFile('.env');
}

const databaseUrl = process.env.DATABASE_URL;

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: { path: 'prisma/migrations' },
  // `prisma generate` (postinstall) no necesita conexión: sin DATABASE_URL se omite el datasource
  // y los comandos `migrate` fallan indicando que falta la URL.
  ...(databaseUrl ? { datasource: { url: databaseUrl } } : {}),
});
