import { defineConfig, devices } from '@playwright/test';

/**
 * Smoke E2E de DEV-001 (decisión D4): solo Chromium, ejecución manual o mediante
 * workflow_dispatch. Requiere PostgreSQL en marcha (`npm run db:up`) y DATABASE_URL
 * disponible para el backend (backend/.env en local, variable de entorno en CI).
 * Playwright arranca el backend y Vite si no están ya en marcha.
 */
const isCI = !!process.env.CI;

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  forbidOnly: isCI,
  retries: 0,
  reporter: isCI ? [['list'], ['html', { open: 'never' }]] : 'list',
  use: {
    baseURL: 'http://localhost:5173',
    trace: 'retain-on-failure',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
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
  ],
});
