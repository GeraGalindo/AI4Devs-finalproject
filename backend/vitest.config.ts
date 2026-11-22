import { existsSync } from 'node:fs';
import { defineConfig } from 'vitest/config';

// En local, las pruebas de integración leen DATABASE_URL de backend/.env.
// En CI la variable ya viene del entorno y loadEnvFile no la sobrescribe.
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
          // Las pruebas de integración usan PostgreSQL real y no se ejecutan en paralelo.
          fileParallelism: false,
        },
      },
    ],
  },
});
