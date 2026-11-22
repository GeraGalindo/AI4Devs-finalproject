import { expect, test } from '@playwright/test';

test('the diagnostics view reaches the backend and PostgreSQL through the Vite proxy', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByTestId('health-status')).toHaveText('All systems operational.');
  await expect(page.getByTestId('backend-status')).toHaveText('Up');
  await expect(page.getByTestId('database-status')).toHaveText('Up');
});
