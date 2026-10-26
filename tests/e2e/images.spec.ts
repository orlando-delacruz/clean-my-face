import { expect, test } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';

const DIST_IMG = path.join(process.cwd(), 'dist', 'img');
const DIST_IMG_BAK = path.join(process.cwd(), 'dist', 'img.bak');

test('no image request returns non-2xx on /', async ({ page }) => {
  const bad: string[] = [];
  page.on('response', (response) => {
    const contentType = response.headers()['content-type'] ?? '';
    if (!contentType.startsWith('image/')) return;
    if (response.status() >= 400) bad.push(`${response.status()} ${response.url()}`);
  });
  await page.goto('/');
  await page.evaluate(() => document.fonts.ready);
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(1000);
  expect(bad).toEqual([]);
});

test('hero is delivered as AVIF or WebP with a real natural width', async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => document.fonts.ready);
  await page.waitForFunction(() => {
    const img = document.querySelector('#hero img');
    return img instanceof HTMLImageElement && img.complete && img.naturalWidth > 0;
  });
  const hero = await page.evaluate(() => {
    const img = document.querySelector('#hero img');
    if (!img) return null;
    return {
      currentSrc: (img as HTMLImageElement).currentSrc,
      naturalWidth: (img as HTMLImageElement).naturalWidth,
      sources: [...document.querySelectorAll('#hero source')].map((s) =>
        s.getAttribute('srcset'),
      ),
    };
  });
  expect(hero).not.toBeNull();
  expect(hero?.currentSrc).toMatch(/\.(avif|webp)$/);
  expect(hero?.naturalWidth).toBeGreaterThan(0);
  expect(hero?.sources.length).toBeGreaterThan(0);
});

test('page still renders all images when generated variants are missing', async ({
  page,
}) => {
  if (!fs.existsSync(DIST_IMG)) {
    test.skip(true, 'dist/img is missing: run npm run build first');
    return;
  }
  fs.renameSync(DIST_IMG, DIST_IMG_BAK);
  try {
    const bad: string[] = [];
    page.on('response', (response) => {
      const contentType = response.headers()['content-type'] ?? '';
      if (!contentType.startsWith('image/')) return;
      if (response.status() >= 400) bad.push(`${response.status()} ${response.url()}`);
    });
    await page.goto('/');
    await page.evaluate(() => document.fonts.ready);
    for (let i = 0; i < 40; i++) {
      const y = await page.evaluate(() => window.scrollY + window.innerHeight);
      await page.evaluate((v) => window.scrollTo(0, v), y);
      await page.waitForTimeout(200);
      const done = await page.evaluate(
        () => window.innerHeight + window.scrollY >= document.body.scrollHeight - 2,
      );
      if (done) break;
    }
    await page.waitForFunction(
      () =>
        [...document.querySelectorAll('img')].every(
          (img) => img.complete && img.naturalWidth > 0,
        ),
      null,
      { timeout: 30000 },
    );
    // Fallback img src values are the original bundled URLs, so every image
    // still has a natural size even though all /img/ variants 404.
    const empty = await page.evaluate(
      () =>
        [...document.querySelectorAll('img')].filter(
          (img) => img.naturalWidth === 0,
        ).length,
    );
    expect(empty).toBe(0);
    // The only failures allowed are the /img/ variant URLs themselves; the
    // originals must all succeed. Filter to non-/img/ failures.
    expect(bad.filter((entry) => !entry.includes('/img/'))).toEqual([]);
  } finally {
    if (fs.existsSync(DIST_IMG_BAK)) fs.renameSync(DIST_IMG_BAK, DIST_IMG);
  }
});
