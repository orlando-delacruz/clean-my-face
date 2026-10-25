import { test, expect } from '@playwright/test';

const routes = ['/', '/products/cleansing-balm'];

for (const route of routes) {
  test(`no Google Fonts requests on ${route}`, async ({ page }) => {
    const remote: string[] = [];
    page.on('request', (request) => {
      const url = request.url();
      if (url.includes('fonts.googleapis.com') || url.includes('fonts.gstatic.com')) {
        remote.push(url);
      }
    });
    await page.goto(route);
    await page.waitForLoadState('networkidle');
    expect(remote).toEqual([]);
  });

  test(`Inter and Cormorant Garamond load on ${route}`, async ({ page }) => {
    await page.goto(route);
    await page.waitForLoadState('networkidle');
    const loaded = await page.evaluate(async () => {
      await document.fonts.ready;
      const faces = [...document.fonts];
      return {
        inter: faces.some((f) => f.family === 'Inter' && f.status === 'loaded'),
        cormorant: faces.some((f) => f.family === 'Cormorant Garamond' && f.status === 'loaded'),
      };
    });
    expect(loaded.inter).toBe(true);
    expect(loaded.cormorant).toBe(true);
  });
}

test('first h1 uses Cormorant Garamond', async ({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('networkidle');
  const family = await page.evaluate(() => {
    const h1 = document.querySelector('h1');
    return h1 ? getComputedStyle(h1).fontFamily : '';
  });
  const firstFamily = family.split(',')[0]?.replace(/['"]/g, '').trim();
  expect(firstFamily).toBe('Cormorant Garamond');
});
