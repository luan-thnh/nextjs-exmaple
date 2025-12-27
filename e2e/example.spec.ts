import { expect, test } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Next.js Template/);
});

test('get started link', async ({ page }) => {
  await page.goto('/login');

  // Click the get started link.
  await expect(page.getByRole('heading', { name: 'Sign in to your account' })).toBeVisible();
});
