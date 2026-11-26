import { existsSync } from 'node:fs';
import { defineConfig } from 'vitest/config';

// En local, las pruebas de integración leen DATABASE_URL y TEST_DATABASE_URL de backend/.env.
// En CI las variables ya vienen del entorno y loadEnvFile no las sobrescribe.
if (existsSync('.env')) {
  process.loadEnvFile('.env');
}

export default defineConfig({
  test: {
    projects: [
      {
        test: {
          name: 'unit',
          environment: 'node',
          include: ['src/**/*.test.ts'],
        },
      },
      {
        test: {
          name: 'integration',
          environment: 'node',
          include: ['tests/integration/**/*.test.ts'],
          // Valida TEST_DATABASE_URL (base *_test distinta de la de desarrollo) y aplica las migraciones.
          globalSetup: ['tests/support/global-setup.ts'],
          // Las pruebas de integración usan PostgreSQL real y no se ejecutan en paralelo.
          fileParallelism: false,
        },
      },
    ],
  },
});
