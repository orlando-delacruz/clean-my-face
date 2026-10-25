import { test, expect } from '@playwright/test';
import { ranges } from '../../src/data/content';

const routes = [
  '/',
  ...ranges.flatMap((range) => range.products.map((product) => `/products/${product.slug}`)),
  '/privacy-policy',
  '/terms-and-conditions',
  '/this-route-does-not-exist',
];

const widths = [320, 390, 768, 1024, 1440];

for (const route of routes) {
  test(`route ${route} renders without console errors`, async ({ page }) => {
    const errors: string[] = [];
    const warnings: string[] = [];
    page.on('pageerror', (error) => errors.push(error.message));
    page.on('console', (message) => {
      if (message.type() === 'error') errors.push(message.text());
      if (message.type() === 'warning') warnings.push(message.text());
    });

    await page.goto(route);
    await expect(page.locator('h1')).toHaveCount(1);

    if (warnings.length > 0) {
      console.log(`WARNINGS ${route}: ${warnings.join(' | ')}`);
    }
    expect(errors, `console/page errors on ${route}`).toEqual([]);
  });
}

for (const route of routes.filter((route) => route !== '/this-route-does-not-exist')) {
  for (const width of widths) {
    test(`no horizontal overflow: ${route} @ ${width}`, async ({ page }) => {
      await page.setViewportSize({ width, height: width < 768 ? 700 : 900 });
      await page.goto(route);
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
      );
      expect(overflow, `${route} overflows at ${width}px`).toBe(false);
    });
  }
}

test('mobile navigation opens and closes with Escape', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  const toggle = page.getByRole('button', { name: /open menu/i });
  await toggle.click();
  await expect(page.getByRole('button', { name: /close menu/i })).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('button', { name: /open menu/i })).toBeVisible();
});

test('mobile navigation returns focus to the toggle after Escape', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  const toggle = page.getByRole('button', { name: /open menu/i });
  await toggle.click();
  await page.keyboard.press('Escape');
  await expect(toggle).toBeFocused();
});