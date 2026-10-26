/**
 * measure-image-usage: record how every rendered image is actually used.
 *
 * Usage:
 *   node scripts/measure-image-usage.mjs [--port=4182]
 *   npm run measure:images
 *
 * Runs against the production preview of HEAD (start it first, e.g.
 * `npm run preview -- --port 4182 --strictPort`). No new dependency;
 * uses the repo's own @playwright/test (chromium).
 *
 * For / and the first product of each range (slugs derived from
 * src/data/content.ts, not hardcoded), at widths 390 and 1440 with
 * DPR 1 and 2: scrolls the page fully to trigger reveals/lazy loads,
 * then records every <img> (currentSrc, natural and rendered size,
 * loading, fetchpriority, initial-viewport presence, object-fit,
 * structural path) and every element whose computed background-image
 * contains url( (url, box size, background-size/position, path).
 *
 * Output: Markdown table to docs/baseline/image-usage.md and raw JSON
 * to test-results/ (git-ignored).
 */
import fs from 'node:fs';
import path from 'node:path';
import { chromium } from '@playwright/test';

function parseArgs(argv) {
  const out = { port: 4182 };
  for (const a of argv) {
    if (a.startsWith('--port=')) out.port = Number(a.slice('--port='.length));
    else throw new Error(`Unknown arg "${a}". Usage: node scripts/measure-image-usage.mjs [--port=4182]`);
  }
  if (!out.port) throw new Error('Missing --port=<port>.');
  return out;
}

function firstProductSlugs() {
  const src = fs.readFileSync(path.join('src', 'data', 'content.ts'), 'utf8');
  const slugs = [];
  const re = /slug:\s*'([a-z0-9-]+)'/g;
  let m;
  while ((m = re.exec(src)) !== null) slugs.push(m[1]);
  if (slugs.length !== 12) {
    throw new Error(`Expected 12 product slugs in src/data/content.ts, found ${slugs.length}.`);
  }
  // File order is the Plump It Up system (6) followed by Stay Clear (6).
  return [slugs[0], slugs[6]];
}

const COLLECT_JS = `(() => {
  function pathOf(el) {
    const parts = [];
    let node = el;
    while (node && node !== document.body && node.parentElement) {
      const tag = node.tagName.toLowerCase();
      let i = 1;
      let sib = node;
      while ((sib = sib.previousElementSibling) !== null) {
        if (sib.tagName.toLowerCase() === tag) i++;
      }
      parts.unshift(tag + ':nth-of-type(' + i + ')');
      node = node.parentElement;
    }
    return 'body>' + parts.join('>');
  }
  const vh = window.innerHeight;
  const imgs = [...document.querySelectorAll('img')].map((el) => {
    const r = el.getBoundingClientRect();
    const cs = getComputedStyle(el);
    return {
      kind: 'img',
      path: pathOf(el),
      currentSrc: el.currentSrc || el.src || '',
      naturalWidth: el.naturalWidth,
      naturalHeight: el.naturalHeight,
      renderedWidth: Math.round(r.width * 100) / 100,
      renderedHeight: Math.round(r.height * 100) / 100,
      loading: el.getAttribute('loading') || '(default)',
      fetchpriority: el.getAttribute('fetchpriority') || '(default)',
      inInitialViewport: r.top < vh && r.bottom > 0,
      objectFit: cs.objectFit,
      alt: (el.getAttribute('alt') || '').slice(0, 80),
    };
  });
  const bgs = [];
  for (const el of document.querySelectorAll('*')) {
    const bi = getComputedStyle(el).backgroundImage;
    if (bi && bi !== 'none' && bi.includes('url(')) {
      const r = el.getBoundingClientRect();
      const cs = getComputedStyle(el);
      bgs.push({
        kind: 'background',
        path: pathOf(el),
        url: bi.slice(0, 300),
        boxWidth: Math.round(r.width * 100) / 100,
        boxHeight: Math.round(r.height * 100) / 100,
        backgroundSize: cs.backgroundSize,
        backgroundPosition: cs.backgroundPosition,
      });
    }
  }
  return { imgs, bgs };
})()`;

async function collectFor(page, base, route, width, dpr) {
  await page.goto(base + route, { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForFunction(() => getComputedStyle(document.body).backgroundColor !== 'rgba(0, 0, 0, 0)', null, { timeout: 15000 });
  const vh = page.viewportSize().height;
  const initial = await page.evaluate((h) => {
    const out = [];
    document.querySelectorAll('img').forEach((el) => {
      const r = el.getBoundingClientRect();
      out.push({ src: el.currentSrc || el.src || '', inInitialViewport: r.top < h && r.bottom > 0 });
    });
    return out;
  }, vh);
  const initialMap = new Map(initial.map((e) => [e.src, e.inInitialViewport]));
  // Scroll fully to trigger reveals and lazy loads.
  let lastY = -1;
  for (let i = 0; i < 40; i++) {
    const y = await page.evaluate(() => window.scrollY + window.innerHeight);
    await page.evaluate((v) => window.scrollTo(0, v), y);
    await page.waitForTimeout(250);
    const done = await page.evaluate(() => window.innerHeight + window.scrollY >= document.body.scrollHeight - 2);
    if (done || y === lastY) break;
    lastY = y;
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(600);
  const data = await page.evaluate(COLLECT_JS);
  for (const img of data.imgs) {
    if (initialMap.has(img.currentSrc)) img.inInitialViewport = initialMap.get(img.currentSrc);
  }
  return { route, width, dpr, ...data };
}

async function main() {
  const { port } = parseArgs(process.argv.slice(2));
  const base = 'http://localhost:' + port;
  const [, firstPlump, firstClear] = [null, ...firstProductSlugs()];
  const routes = ['/', '/products/' + firstPlump, '/products/' + firstClear];
  console.log('routes:', routes.join(', '));
  const combos = [];
  for (const w of [390, 1440]) for (const dpr of [1, 2]) combos.push([w, dpr]);

  const browser = await chromium.launch();
  const all = [];
  try {
    for (const [width, dpr] of combos) {
      const context = await browser.newContext({
        viewport: { width, height: width < 768 ? 844 : 900 },
        deviceScaleFactor: dpr,
        isMobile: width < 768,
      });
      const page = await context.newPage();
      for (const route of routes) {
        const entry = await collectFor(page, base, route, width, dpr);
        all.push(entry);
        console.log('collected', route, width, 'dpr' + dpr, entry.imgs.length + ' imgs,', entry.bgs.length + ' bgs');
      }
      await context.close();
    }
  } finally {
    await browser.close();
  }

  fs.mkdirSync('test-results', { recursive: true });
  fs.writeFileSync('test-results/image-usage.json', JSON.stringify({ port, collectedAt: new Date().toISOString(), entries: all }, null, 1));

  // Aggregate per distinct source URL.
  const bySrc = new Map();
  for (const e of all) {
    for (const img of e.imgs) {
      const key = img.currentSrc.split('/').pop() || img.currentSrc;
      if (!bySrc.has(key)) {
        bySrc.set(key, { src: img.currentSrc, intrinsic: `${img.naturalWidth}x${img.naturalHeight}`, maxRendered: 0, maxNeeded: 0, contexts: 0 });
      }
      const rec = bySrc.get(key);
      rec.contexts++;
      if (img.renderedWidth > rec.maxRendered) rec.maxRendered = Math.round(img.renderedWidth * 100) / 100;
      const needed = img.renderedWidth * e.dpr;
      if (needed > rec.maxNeeded) rec.maxNeeded = Math.round(needed * 100) / 100;
      if (img.naturalWidth > 0) rec.intrinsic = `${img.naturalWidth}x${img.naturalHeight}`;
    }
  }
  function verdict(rec, intrinsicW) {
    if (!(intrinsicW > 0) || !(rec.maxNeeded > 0)) return 'UNKNOWN (never rendered with size)';
    if (intrinsicW < rec.maxNeeded) return 'source too small for DPR 2';
    if (intrinsicW > rec.maxNeeded * 2) return 'oversized for use';
    return 'already sufficient resolution';
  }
  const lines = [];
  lines.push('# Image Usage (measured against local production preview)');
  lines.push('');
  lines.push(`Generated: ${new Date().toISOString()} — routes /, first product of each range; widths 390/1440; DPR 1/2.`);
  lines.push('');
  lines.push('Verdict rule: needed = max rendered CSS width x 2 (DPR 2 target). Intrinsic < needed => "source too small for DPR 2"; intrinsic > needed x 2 => "oversized for use"; otherwise "already sufficient resolution".');
  lines.push('');
  lines.push('| Image (dist URL tail) | Intrinsic | Max rendered CSS px | Max needed px @DPR2 | Contexts | Verdict |');
  lines.push('|---|---|---:|---:|---:|---|');
  for (const [key, rec] of [...bySrc.entries()].sort()) {
    const iw = Number(String(rec.intrinsic).split('x')[0]) || 0;
    lines.push(`| \`${key}\` | ${rec.intrinsic} | ${rec.maxRendered} | ${rec.maxNeeded} | ${rec.contexts} | ${verdict(rec, iw)} |`);
  }
  lines.push('');
  lines.push('### CSS background images with url()');
  lines.push('');
  lines.push('| Background (truncated) | Rendered box | background-size | background-position | Seen on |');
  lines.push('|---|---|---|---|---|');
  const seenBg = new Set();
  for (const e of all) {
    for (const b of e.bgs) {
      const k = b.url + '|' + b.boxWidth + 'x' + b.boxHeight;
      if (seenBg.has(k)) continue;
      seenBg.add(k);
      lines.push(`| \`${b.url.slice(0, 90)}\` | ${b.boxWidth}x${b.boxHeight} | ${b.backgroundSize} | ${b.backgroundPosition} | ${e.route} ${e.width}/dpr${e.dpr} |`);
    }
  }
  fs.mkdirSync(path.join('docs', 'baseline'), { recursive: true });
  fs.writeFileSync(path.join('docs', 'baseline', 'image-usage.md'), lines.join('\n') + '\n');
  console.log('wrote docs/baseline/image-usage.md and test-results/image-usage.json');
}

main().catch((error) => {
  console.error('measure-image-usage FAILED:', error && error.message ? error.message : error);
  process.exit(1);
});
