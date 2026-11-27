import { expect, type Page } from '@playwright/test';

/**
 * Problemas de una página en un E2E (DEV-007, parcial; T4 y M5). Recoge las respuestas HTTP con
 * error, los errores de consola, las excepciones y las violaciones de la CSP. Cada escenario
 * declara las respuestas con error que **espera** (por ejemplo, el `401` de `GET /api/auth/me`
 * sin sesión, que Chromium registra en la consola). Cualquier otra cosa hace fallar la prueba:
 * no se silencia la consola de forma global.
 */
export interface ExpectedResponse {
  method: string;
  path: string;
  status: number;
}

declare global {
  interface Window {
    __cspViolations: string[];
  }
}

interface Seen extends ExpectedResponse {
  url: string;
}

const LOAD_FAILURE = /^Failed to load resource: the server responded with a status of (\d{3})\b/;

export async function watchPage(page: Page, expected: ExpectedResponse[] = []) {
  const responses: Seen[] = [];
  const consoleErrors: { text: string; url: string }[] = [];
  const pageErrors: string[] = [];

  await page.addInitScript(() => {
    window.__cspViolations = [];
    document.addEventListener('securitypolicyviolation', (e) => {
      window.__cspViolations.push(`${e.violatedDirective} ${e.blockedURI}`);
    });
  });
  page.on('response', (response) => {
    if (response.status() < 400) return;
    const url = new URL(response.url());
    responses.push({ method: response.request().method(), path: url.pathname, status: response.status(), url: response.url() });
  });
  page.on('console', (message) => {
    if (message.type() === 'error') consoleErrors.push({ text: message.text(), url: message.location().url });
  });
  page.on('pageerror', (error) => pageErrors.push(error.message));

  const isExpected = (r: ExpectedResponse) =>
    expected.some((e) => e.method === r.method && e.path === r.path && e.status === r.status);

  return {
    /** Respuestas con error vistas hasta ahora. */
    responses: () => responses.map(({ method, path, status }) => ({ method, path, status })),

    /** Falla con cualquier respuesta, error de consola, excepción o violación de la CSP no declarada. */
    async expectNoUnexpectedProblems(): Promise<void> {
      expect(
        responses.filter((r) => !isExpected(r)).map(({ method, path, status }) => ({ method, path, status })),
        'unexpected HTTP error responses',
      ).toEqual([]);

      // Un error de consola solo se admite si es el aviso de Chromium por una respuesta esperada que sí ocurrió.
      const allowance = new Map<string, number>();
      for (const r of responses.filter(isExpected)) allowance.set(`${r.url} ${r.status}`, (allowance.get(`${r.url} ${r.status}`) ?? 0) + 1);
      const unexpectedConsole = consoleErrors.filter(({ text, url }) => {
        const status = LOAD_FAILURE.exec(text)?.[1];
        const key = `${url} ${status}`;
        const left = status ? (allowance.get(key) ?? 0) : 0;
        if (left === 0) return true;
        allowance.set(key, left - 1);
        return false;
      });
      expect(unexpectedConsole.map((c) => c.text), 'unexpected console errors').toEqual([]);
      expect(pageErrors, 'uncaught page errors').toEqual([]);
      expect(await page.evaluate(() => window.__cspViolations), 'CSP violations').toEqual([]);
    },
  };
}

/** Sin desplazamiento horizontal (CT-01). */
export async function expectNoHorizontalScroll(page: Page): Promise<void> {
  const { scrollWidth, clientWidth } = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
  }));
  expect(scrollWidth, 'horizontal scroll').toBeLessThanOrEqual(clientWidth);
}

/** Todos los controles visibles miden al menos 44 × 44 px (T-02, CT-03). */
export async function expectTouchTargets(page: Page, min = 44): Promise<void> {
  const controls = page.locator('button:visible, input:visible, select:visible, a:visible');
  const count = await controls.count();
  expect(count, 'interactive controls on the page').toBeGreaterThan(0);
  for (let i = 0; i < count; i++) {
    const box = await controls.nth(i).boundingBox();
    const name = await controls.nth(i).evaluate((el) => el.outerHTML.slice(0, 80));
    expect(box, name).not.toBeNull();
    expect(box?.width ?? 0, `${name} width`).toBeGreaterThanOrEqual(min);
    expect(box?.height ?? 0, `${name} height`).toBeGreaterThanOrEqual(min);
  }
}
