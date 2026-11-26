import { defineConfig, devices } from '@playwright/test';

/**
 * E2E de Cali Coach. Solo Chromium; ejecución manual o mediante workflow_dispatch (DEV-001, D4).
 * Requiere PostgreSQL en marcha (`npm run db:up`) y DATABASE_URL disponible para el backend
 * (backend/.env en local, variable de entorno en CI). Playwright arranca los servidores si no
 * están ya en marcha.
 *
 * Proyectos:
 * - `chromium`: smoke de DEV-001 a través del proxy de Vite (desarrollo).
 * - `spa-build` (DEV-003): el build real servido por Express en :3100, con la CSP de helmet.
 *   Su servidor compila frontend y backend antes de arrancar.
 */
const isCI = !!process.env.CI;
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
      use: { ...devices['Desktop Chrome'], baseURL: 'http://localhost:5173' },
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
      url: 'http://localhost:3000/api/health',
      reuseExistingServer: !isCI,
      timeout: 60_000,
    },
    {
      command: 'npm run dev --workspace frontend',
      cwd: '..',
      url: 'http://localhost:5173',
      reuseExistingServer: !isCI,
      timeout: 60_000,
    },
    {
      // Build real servido por Express (mismo origen). NODE_ENV=development: sin HSTS ni
      // upgrade-insecure-requests, porque es http://localhost; la CSP es la misma que en producción.
      command: 'npm run build && node --env-file-if-exists=backend/.env backend/dist/server.js',
      cwd: '..',
      url: `${SPA_BUILD_URL}/api/health`,
      env: { NODE_ENV: 'development', PORT: '3100', APP_ORIGIN: SPA_BUILD_URL },
      reuseExistingServer: !isCI,
      timeout: 180_000,
    },
  ],
});
