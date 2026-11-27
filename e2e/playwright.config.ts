import { defineConfig, devices } from '@playwright/test';
import { resolveE2eDatabaseUrl } from './support/e2e-database.ts';

/**
 * E2E de Cali Coach en Chromium. Se ejecutan en la CI de cada PR y con `workflow_dispatch`
 * (DEV-007, T3), y en local con `npm run test:e2e` y PostgreSQL en marcha (`npm run db:up`).
 *
 * Base de datos (DEV-007, T1): los dos backends usan `calicoach_e2e` (`E2E_DATABASE_URL`, o la
 * local por defecto), comprobada por `support/e2e-database.ts` y preparada con migraciones por
 * `scripts/prepare-e2e-db.ts` antes de `playwright test`. La variable del entorno prevalece sobre
 * `backend/.env`.
 *
 * Servidores propios en puertos dedicados y **nunca reutilizados**, para no hablar con un
 * servidor de desarrollo conectado a otra base ni heredar los contadores del límite de peticiones:
 * - `chromium`: smoke de DEV-001 a través del proxy de Vite (backend :3001, Vite :5174);
 * - `spa-build` (DEV-003 y DEV-007): el build real servido por Express en :3100, con la CSP de
 *   helmet. Su servidor compila frontend y backend antes de arrancar.
 */
const isCI = !!process.env.CI;
const E2E_DATABASE_URL = resolveE2eDatabaseUrl();

export const DEV_BACKEND_URL = 'http://localhost:3001';
export const DEV_FRONTEND_URL = 'http://localhost:5174';
export const SPA_BUILD_URL = 'http://localhost:3100';

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  forbidOnly: isCI,
  retries: 0,
  reporter: isCI ? [['list'], ['html', { open: 'never' }]] : 'list',
  use: {
    trace: 'retain-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      testIgnore: /spa-build\..*spec\.ts/,
      use: { ...devices['Desktop Chrome'], baseURL: DEV_FRONTEND_URL },
    },
    {
      name: 'spa-build',
      testMatch: /spa-build\..*spec\.ts/,
      use: { ...devices['Desktop Chrome'], baseURL: SPA_BUILD_URL },
    },
  ],
  webServer: [
    {
      command: 'npm run dev --workspace backend',
      cwd: '..',
      url: `${DEV_BACKEND_URL}/api/health`,
      env: { PORT: '3001', APP_ORIGIN: DEV_FRONTEND_URL, DATABASE_URL: E2E_DATABASE_URL },
      reuseExistingServer: false,
      timeout: 60_000,
    },
    {
      command: 'npm run dev --workspace frontend -- --port 5174',
      cwd: '..',
      url: DEV_FRONTEND_URL,
      env: { VITE_API_PROXY_TARGET: DEV_BACKEND_URL },
      reuseExistingServer: false,
      timeout: 60_000,
    },
    {
      // Build real servido por Express (mismo origen). NODE_ENV=development: sin HSTS ni
      // upgrade-insecure-requests, porque es http://localhost; la CSP es la misma que en producción.
      command: 'npm run build && node --env-file-if-exists=backend/.env backend/dist/server.js',
      cwd: '..',
      url: `${SPA_BUILD_URL}/api/health`,
      env: { NODE_ENV: 'development', PORT: '3100', APP_ORIGIN: SPA_BUILD_URL, DATABASE_URL: E2E_DATABASE_URL },
      reuseExistingServer: false,
      timeout: 180_000,
    },
  ],
});
