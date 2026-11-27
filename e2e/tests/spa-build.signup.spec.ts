import { expect, test, type Page } from '@playwright/test';
import { findUsers, uniqueEmail } from '../support/db.ts';
import { expectNoHorizontalScroll, expectTouchTargets, watchPage } from '../support/page-problems.ts';

/**
 * Registro de extremo a extremo (DEV-007, parcial; HU-04 y S-03): React → `POST
 * /api/auth/register` → PostgreSQL (`calicoach_e2e`) → sesión → restauración al recargar. En el
 * build real con la CSP, a 320 px.
 *
 * Límite de peticiones (A2): el backend admite 5 registros por hora e IP, en memoria y por
 * proceso. El `429` se prueba con *mocks* en RTL; aquí nunca se fuerza. Presupuesto por
 * ejecución: **4 registros** (1 + 2 + 1), todos contra el servidor de `spa-build`, que Playwright
 * arranca de nuevo en cada ejecución (`reuseExistingServer: false`), así que el contador empieza
 * en cero. Cada escenario comprueba cuántos hace. Sin reintentos: un reintento sumaría registros.
 * Un escenario nuevo que registre usuarios debe caber en el presupuesto (máximo 5).
 */
const PASSWORD = 'correct horse battery staple';
const ME_UNAUTHENTICATED = { method: 'GET', path: '/api/auth/me', status: 401 };

test.use({ viewport: { width: 320, height: 640 }, timezoneId: 'America/Bogota' });
test.describe.configure({ retries: 0 });

/** Cuenta los `POST /api/auth/register` que envía el navegador de esta página. */
function countRegistrations(page: Page): () => number {
  let count = 0;
  page.on('request', (request) => {
    if (request.method() === 'POST' && new URL(request.url()).pathname === '/api/auth/register') count += 1;
  });
  return () => count;
}

async function fillAndSubmit(page: Page, email: string) {
  await page.getByLabel('Email').fill(email);
  await page.getByLabel('Password').fill(PASSWORD);
  const response = page.waitForResponse((r) => r.url().endsWith('/api/auth/register') && r.request().method() === 'POST');
  await page.getByRole('button', { name: 'Create account' }).click();
  return response;
}

test('a new user signs up, gets a session stored in PostgreSQL and keeps it after a reload', async ({ page, context }) => {
  const problems = await watchPage(page, [ME_UNAUTHENTICATED]);
  const registrations = countRegistrations(page);
  const typed = uniqueEmail('Signup');
  const email = typed.toLowerCase();

  // 1. Sin sesión, `/` lleva a `/signup`.
  await page.goto('/');
  await expect(page).toHaveURL(/\/signup$/);
  await expect(page.getByRole('heading', { name: 'Create your account' })).toBeVisible();
  await expect(page.getByText('Time zone: America/Bogota')).toBeVisible();
  await expectNoHorizontalScroll(page);
  await expectTouchTargets(page);

  // 2–3. Registro con el email en mayúsculas → 201 con { user } y sin token.
  const response = await fillAndSubmit(page, typed);
  expect(response.status()).toBe(201);
  const body = await response.json();
  expect(Object.keys(body)).toEqual(['user']);
  expect(body.user).toEqual({ id: expect.any(String), email, timezone: 'America/Bogota', availableWeekdays: null });

  // 4. Cookie de sesión HttpOnly (`session` fuera de producción).
  const cookie = (await context.cookies()).find((c) => c.name === 'session');
  expect(cookie).toMatchObject({ httpOnly: true, sameSite: 'Lax', path: '/' });
  expect(JSON.stringify(body)).not.toContain(cookie?.value ?? '<none>');

  // 5. Vista provisional con el email normalizado.
  await expect(page).toHaveURL(/\/$/);
  await expect(page.getByTestId('signed-in-as')).toHaveText(`You are signed in as ${email}.`);
  await expectNoHorizontalScroll(page);

  // 6–8. La fila existe en calicoach_e2e: email normalizado, Argon2id sin la contraseña, zona y días.
  const rows = await findUsers(email);
  expect(rows).toHaveLength(1);
  const [row] = rows;
  expect(row?.email).toBe(email);
  expect(row?.password_hash).toMatch(/^\$argon2id\$v=19\$m=19456,t=2,p=1\$/);
  expect(row?.password_hash).not.toContain(PASSWORD);
  expect(row?.timezone).toBe('America/Bogota');
  expect(row?.available_weekdays).toBeNull();
  expect(row?.token_version).toBe(0);
  expect(await findUsers(typed)).toHaveLength(0);

  // 9–10. Al recargar, GET /api/auth/me → 200 y la sesión se mantiene.
  const me = page.waitForResponse((r) => r.url().endsWith('/api/auth/me'));
  await page.reload();
  expect((await me).status()).toBe(200);
  await expect(page.getByTestId('signed-in-as')).toHaveText(`You are signed in as ${email}.`);

  // 11. Solo el 401 inicial de /me; sin errores ni violaciones de la CSP. Un solo registro.
  expect(registrations()).toBe(1);
  expect(problems.responses()).toEqual([ME_UNAUTHENTICATED]);
  await problems.expectNoUnexpectedProblems();
});

test('an already registered email gets 409 next to the email field and no second account', async ({ page, request, baseURL }) => {
  const email = uniqueEmail('Duplicate').toLowerCase();
  const first = await request.post('/api/auth/register', {
    headers: { Origin: baseURL ?? '', 'X-CSRF-Protection': '1' },
    data: { email, password: PASSWORD, timezone: 'UTC' },
  });
  expect(first.status()).toBe(201);

  const problems = await watchPage(page, [ME_UNAUTHENTICATED, { method: 'POST', path: '/api/auth/register', status: 409 }]);
  const registrations = countRegistrations(page);
  await page.goto('/signup');
  const response = await fillAndSubmit(page, email.toUpperCase());
  expect(response.status()).toBe(409);

  const field = page.getByLabel('Email');
  await expect(field).toHaveAttribute('aria-invalid', 'true');
  await expect(field).toHaveAccessibleDescription('This email already has an account.');
  await expect(field).toBeFocused();
  await expect(page).toHaveURL(/\/signup$/);
  expect(await findUsers(email)).toHaveLength(1);
  // Dos registros en total: el de la API (201) y el del navegador (409).
  expect(registrations()).toBe(1);
  await problems.expectNoUnexpectedProblems();
});

test('without a detected time zone, the user picks one manually and it is stored', async ({ page }) => {
  await page.addInitScript(() => {
    const original = Intl.DateTimeFormat.prototype.resolvedOptions;
    Intl.DateTimeFormat.prototype.resolvedOptions = function (this: Intl.DateTimeFormat) {
      return { ...original.call(this), timeZone: undefined } as unknown as Intl.ResolvedDateTimeFormatOptions;
    };
  });
  const problems = await watchPage(page, [ME_UNAUTHENTICATED]);
  const registrations = countRegistrations(page);
  const email = uniqueEmail('Manual').toLowerCase();

  await page.goto('/signup');
  const select = page.getByRole('combobox', { name: 'Time zone' });
  await expect(select).toHaveValue('');
  await expect(page.getByText(/^Time zone: /)).toHaveCount(0);
  await expectTouchTargets(page);

  await page.getByLabel('Email').fill(email);
  await page.getByLabel('Password').fill(PASSWORD);
  await page.getByRole('button', { name: 'Create account' }).click();
  await expect(select).toHaveAttribute('aria-invalid', 'true');
  await expect(select).toBeFocused();
  // Sin zona elegida no sale ninguna petición.
  expect(registrations()).toBe(0);

  await select.selectOption('Asia/Tokyo');
  const response = page.waitForResponse((r) => r.url().endsWith('/api/auth/register'));
  await page.getByRole('button', { name: 'Create account' }).click();
  expect((await response).status()).toBe(201);
  await expect(page.getByTestId('signed-in-as')).toBeVisible();

  const rows = await findUsers(email);
  expect(rows.map((r) => r.timezone)).toEqual(['Asia/Tokyo']);
  expect(registrations()).toBe(1);
  await problems.expectNoUnexpectedProblems();
});
