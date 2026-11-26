import { expect, test, type Page } from '@playwright/test';

/**
 * DEV-003 (D8 y D9): el build real de la SPA servido por Express, con la CSP estricta de helmet.
 * Las violaciones de CSP se recogen con el evento `securitypolicyviolation` del navegador.
 */
declare global {
  interface Window {
    __cspViolations: string[];
  }
}

const REQUIRED_DIRECTIVES = [
  "default-src 'self'",
  "script-src 'self'",
  "style-src 'self'",
  "connect-src 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "base-uri 'self'",
];

async function trackViolations(page: Page): Promise<string[]> {
  const consoleErrors: string[] = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });
  page.on('pageerror', (err) => consoleErrors.push(err.message));
  await page.addInitScript(() => {
    window.__cspViolations = [];
    document.addEventListener('securitypolicyviolation', (e) => {
      window.__cspViolations.push(`${e.violatedDirective} ${e.blockedURI}`);
    });
  });
  return consoleErrors;
}

for (const path of ['/', '/today']) {
  test(`GET ${path} serves the SPA build with the strict CSP and no violations`, async ({ page }) => {
    const consoleErrors = await trackViolations(page);
    const assets: { url: string; status: number }[] = [];
    page.on('response', (res) => {
      if (new URL(res.url()).pathname.startsWith('/assets/')) assets.push({ url: res.url(), status: res.status() });
    });

    const response = await page.goto(path);
    expect(response?.status()).toBe(200);
    expect(response?.headers()['content-type']).toMatch(/text\/html/);

    const csp = response?.headers()['content-security-policy'] ?? '';
    for (const directive of REQUIRED_DIRECTIVES) expect(csp).toContain(directive);
    expect(csp).not.toContain('unsafe-inline');
    expect(csp).not.toContain('unsafe-eval');

    // La aplicación funciona: llega al backend y a PostgreSQL por el mismo origen.
    await expect(page.getByTestId('health-status')).toHaveText('All systems operational.');
    // La hoja de estilos (no estilos en línea) se aplica.
    await expect(page.locator('main.diagnostics')).toHaveCSS('max-width', '480px');

    expect(assets.some((a) => a.url.endsWith('.js'))).toBe(true);
    expect(assets.some((a) => a.url.endsWith('.css'))).toBe(true);
    expect(assets.every((a) => a.status === 200)).toBe(true);

    expect(await page.evaluate(() => window.__cspViolations)).toEqual([]);
    expect(consoleErrors).toEqual([]);
  });
}

test('the violation detector works: an inline style is blocked by the CSP', async ({ page }) => {
  await trackViolations(page);
  await page.goto('/');
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
