import { expect, test } from '@playwright/test';
import { watchPage } from '../support/page-problems.ts';

/**
 * DEV-003 (D8 y D9): el build real de la SPA servido por Express, con la CSP estricta de helmet.
 * Desde DEV-007, `/` y las rutas desconocidas restauran la sesión (`GET /api/auth/me`, `401`
 * sin sesión), así que la comprobación completa en el navegador se hace en `/diagnostics` y el
 * resto de rutas declaran ese `401` como esperado (M5).
 */
const REQUIRED_DIRECTIVES = [
  "default-src 'self'",
  "script-src 'self'",
  "style-src 'self'",
  "connect-src 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "base-uri 'self'",
];

const ME_UNAUTHENTICATED = { method: 'GET', path: '/api/auth/me', status: 401 };

for (const path of ['/', '/diagnostics', '/today', '/signup']) {
  test(`GET ${path} returns the SPA build with the strict CSP header`, async ({ request }) => {
    const response = await request.get(path);
    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toMatch(/text\/html/);
    const csp = response.headers()['content-security-policy'] ?? '';
    for (const directive of REQUIRED_DIRECTIVES) expect(csp).toContain(directive);
    expect(csp).not.toContain('unsafe-inline');
    expect(csp).not.toContain('unsafe-eval');
  });
}

test('GET /diagnostics runs in the browser with the strict CSP and no violations', async ({ page }) => {
  const problems = await watchPage(page);
  const assets: { url: string; status: number }[] = [];
  page.on('response', (res) => {
    if (new URL(res.url()).pathname.startsWith('/assets/')) assets.push({ url: res.url(), status: res.status() });
  });

  await page.goto('/diagnostics');

  // La aplicación funciona: llega al backend y a PostgreSQL por el mismo origen.
  await expect(page.getByTestId('health-status')).toHaveText('All systems operational.');
  // La hoja de estilos (no estilos en línea) se aplica.
  await expect(page.locator('main.diagnostics')).toHaveCSS('max-width', '480px');

  expect(assets.some((a) => a.url.endsWith('.js'))).toBe(true);
  expect(assets.some((a) => a.url.endsWith('.css'))).toBe(true);
  expect(assets.every((a) => a.status === 200)).toBe(true);
  await problems.expectNoUnexpectedProblems();
});

test('GET /today falls back to the SPA and ends at /signup with only the expected 401', async ({ page }) => {
  const problems = await watchPage(page, [ME_UNAUTHENTICATED]);
  await page.goto('/today');

  await expect(page).toHaveURL(/\/signup$/);
  await expect(page.getByRole('heading', { name: 'Create your account' })).toBeVisible();
  // Los estilos de los componentes (DEV-039) llegan en la hoja de estilos del build.
  await expect(page.getByRole('button', { name: 'Create account' })).toHaveCSS('min-height', '44px');
  expect(problems.responses()).toEqual([ME_UNAUTHENTICATED]);
  await problems.expectNoUnexpectedProblems();
});

test('the violation detector works: an inline style is blocked by the CSP', async ({ page }) => {
  await watchPage(page);
  await page.goto('/diagnostics');
  await page.evaluate(() => {
    const style = document.createElement('style');
    style.textContent = 'body { color: red; }';
    document.head.appendChild(style);
  });
  await expect.poll(() => page.evaluate(() => window.__cspViolations.length)).toBeGreaterThan(0);
  expect(await page.evaluate(() => window.__cspViolations.join(' '))).toContain('style-src');
});

test('/api/* is not intercepted by the SPA fallback', async ({ request }) => {
  for (const path of ['/api/nope', '/api', '/api/does/not/exist']) {
    const res = await request.get(path);
    expect(res.status()).toBe(404);
    expect(res.headers()['content-type']).toMatch(/application\/json/);
    const body = await res.json();
    expect(body.error.code).toBe('NOT_FOUND');
    expect(body.error.requestId).toBe(res.headers()['x-request-id']);
  }
  const health = await request.get('/api/health');
  expect(health.status()).toBe(200);
  expect(await health.json()).toEqual({ status: 'ok', database: 'up' });
});

test('a missing static asset returns 404 instead of index.html', async ({ request }) => {
  for (const path of ['/assets/missing.js', '/assets/missing.css', '/favicon-missing.png']) {
    const res = await request.get(path);
    expect(res.status()).toBe(404);
    expect(res.headers()['content-type']).toMatch(/application\/json/);
    expect((await res.json()).error.code).toBe('NOT_FOUND');
  }
});
