import { test, expect } from '@playwright/test';

test('/_system renders the 404 page in production preview', async ({ page }) => {
  await page.goto('/_system');
  await expect(page.getByRole('heading', { name: 'This page is not here' })).toBeVisible();
});
