import { expect, test } from '@playwright/test';
import { watchPage } from '../support/page-problems.ts';

// Desde DEV-007, `/` restaura la sesión: la vista de diagnóstico está en `/diagnostics`.
test('the diagnostics view reaches the backend and PostgreSQL through the Vite proxy', async ({ page }) => {
  const problems = await watchPage(page);
  await page.goto('/diagnostics');

  await expect(page.getByTestId('health-status')).toHaveText('All systems operational.');
  await expect(page.getByTestId('backend-status')).toHaveText('Up');
  await expect(page.getByTestId('database-status')).toHaveText('Up');
  await problems.expectNoUnexpectedProblems();
});
