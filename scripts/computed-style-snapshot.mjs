/**
 * Computed-style snapshot for visual regression proof (color-related properties only).
 *
 * Usage:
 *   node scripts/computed-style-snapshot.mjs --label=<name> --port=<port> [--out=<dir>]
 *
 * Labels and ports are CLI args, e.g.:
 *   node scripts/computed-style-snapshot.mjs --label=baseline --port=4181
 *   node scripts/computed-style-snapshot.mjs --label=head --port=4182
 *
 * Requires the repo's own @playwright/test (chromium). No new dependency.
 * Run from the repository root so module resolution finds @playwright/test.
 */
import fs from 'node:fs';
import path from 'node:path';
import { chromium } from '@playwright/test';

const PROPS = [
  'color',
  'background-color',
  'background-image',
  'border-top-color',
  'border-right-color',
  'border-bottom-color',
  'border-left-color',
  'outline-color',
  'box-shadow',
  'text-shadow',
  'text-decoration-color',
  'caret-color',
  'column-rule-color',
  'fill',
  'stroke',
  'opacity',
  'filter',
];

function parseArgs(argv) {
  const out = { label: null, port: null, out: 'test-results/computed-styles' };
  for (const a of argv) {
    if (a.startsWith('--label=')) out.label = a.slice('--label='.length);
    else if (a.startsWith('--port=')) out.port = Number(a.slice('--port='.length));
    else if (a.startsWith('--out=')) out.out = a.slice('--out='.length);
  }
  if (!out.label) throw new Error('Missing required arg --label=<name>. Got: ' + argv.join(' '));
  if (!out.port) throw new Error('Missing required arg --port=<port>. Got: ' + argv.join(' '));
  return out;
}

function productSlugs() {
  const src = fs.readFileSync(path.join('src', 'data', 'content.ts'), 'utf8');
  const slugs = [];
  const re = /slug:\s*'([a-z0-9-]+)'/g;
  let m;
  while ((m = re.exec(src)) !== null) slugs.push(m[1]);
  if (slugs.length === 0) throw new Error('No product slugs found in src/data/content.ts');
  return slugs;
}

const SNAPSHOT_JS = `(() => {
  const PROPS = ${JSON.stringify(PROPS)};
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
  const out = {};
  const els = document.querySelectorAll('*');
  for (const el of els) {
    const key = pathOf(el);
    const rec = {};
    const cs = getComputedStyle(el);
    for (const p of PROPS) rec[p] = cs.getPropertyValue(p);
    for (const pseudo of ['::before', '::after']) {
      const ps = getComputedStyle(el, pseudo);
      for (const p of PROPS) rec[pseudo + '|' + p] = ps.getPropertyValue(p);
    }
    out[key] = rec;
  }
  return { count: els.length, styles: out };
})()`;

async function settled(page) {
  // React 19 concurrent rendering can commit after `load`; styled-components
  // flushes its stylesheet with the commit. Poll until the GlobalStyle body
  // background is applied, then allow a buffer for remaining sheets.
  await page.waitForFunction(
    () => getComputedStyle(document.body).backgroundColor !== 'rgba(0, 0, 0, 0)',
    null,
    { timeout: 15000 },
  );
  await page.waitForTimeout(500);
}

async function snapshotPage(page, url) {
  await page.goto(url, { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  await settled(page);
  await page.waitForTimeout(400);
  return page.evaluate(SNAPSHOT_JS);
}

async function interactiveStates(page, url, maxFocus = 60) {
  await page.goto(url, { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  await settled(page);
  const targets = await page.evaluate(() => {
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
    return [...document.querySelectorAll('a, button')].map((el) => pathOf(el));
  });

  const hover = {};
  let hoverErrors = 0;
  for (const sel of targets) {
    try {
      await page.evaluate((s) => {
        const el = document.querySelector(s);
        if (el && el.scrollIntoView) el.scrollIntoView({ block: 'center' });
      }, sel);
      await page.hover(sel, { timeout: 10000 });
      // Let transitions and smooth scrolling settle so the captured style is
      // the steady hover state, not a mid-transition interpolation.
      await page.waitForTimeout(400);
    } catch (error) {
      hoverErrors++;
      hover[sel] = { hoverError: error && error.message ? error.message.split('\n')[0] : String(error) };
      continue;
    }
    hover[sel] = await page.evaluate(
      ([s, props]) => {
        const el = document.querySelector(s);
        if (!el) return null;
        const cs = getComputedStyle(el);
        const rec = {};
        for (const p of props) rec[p] = cs.getPropertyValue(p);
        return rec;
      },
      [sel, PROPS],
    );
  }

  const focus = {};
  await page.evaluate(() => {
    if (document.activeElement && document.activeElement.blur) document.activeElement.blur();
  });
  for (let i = 0; i < maxFocus; i++) {
    await page.keyboard.press('Tab');
    await page.waitForTimeout(150);
    const rec = await page.evaluate((props) => {
      const el = document.activeElement;
      if (!el || el === document.body) return null;
      function pathOf(node) {
        const parts = [];
        let n = node;
        while (n && n !== document.body && n.parentElement) {
          const tag = n.tagName.toLowerCase();
          let k = 1;
          let sib = n;
          while ((sib = sib.previousElementSibling) !== null) {
            if (sib.tagName.toLowerCase() === tag) k++;
          }
          parts.unshift(tag + ':nth-of-type(' + k + ')');
          n = n.parentElement;
        }
        return 'body>' + parts.join('>');
      }
      const cs = getComputedStyle(el);
      const r = {};
      for (const p of props) r[p] = cs.getPropertyValue(p);
      return { key: pathOf(el), style: r };
    }, PROPS);
    if (!rec) break;
    focus[rec.key] = rec.style;
  }
  return { targets: targets.length, hoverCount: Object.keys(hover).length, focusCount: Object.keys(focus).length, hover, focus };
}

async function main() {
  const { label, port, out } = parseArgs(process.argv.slice(2));
  const base = 'http://localhost:' + port;
  const slugs = productSlugs();
  const routes = ['/', ...slugs.map((s) => '/products/' + s), '/privacy-policy', '/terms-and-conditions'];
  const widths = [390, 1440];
  fs.mkdirSync(out, { recursive: true });

  const browser = await chromium.launch();
  try {
    for (const width of widths) {
      const context = await browser.newContext({
        viewport: width === 390 ? { width: 390, height: 844 } : { width: 1440, height: 900 },
        reducedMotion: 'reduce',
      });
      const page = await context.newPage();
      for (const route of routes) {
        const safe = route === '/' ? 'home' : route.replace(/\//g, '_').replace(/^_/, '');
        const snap = await snapshotPage(page, base + route);
        fs.writeFileSync(
          path.join(out, label + '-' + safe + '-' + width + '.json'),
          JSON.stringify({ label, route, width, count: snap.count, styles: snap.styles }),
        );
        console.log('saved', label, route, width, snap.count + ' elements');
      }
      await context.close();
    }
    const context = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      reducedMotion: 'reduce',
    });
    const page = await context.newPage();
    for (const route of ['/', '/products/' + slugs[0]]) {
      const safe = route === '/' ? 'home' : route.replace(/\//g, '_').replace(/^_/, '');
      const states = await interactiveStates(page, base + route, 60);
      fs.writeFileSync(
        path.join(out, label + '-' + safe + '-1440-interactive.json'),
        JSON.stringify({ label, route, width: 1440, ...states }),
      );
      console.log(
        'saved interactive',
        label,
        route,
        states.targets + ' targets, ' + states.hoverCount + ' hover, ' + states.focusCount + ' focus',
      );
    }
    await context.close();
  } finally {
    await browser.close();
  }
  console.log('done: ' + label);
}

main().catch((error) => {
  console.error('computed-style-snapshot FAILED:', error && error.message ? error.message : error);
  console.error('context: label/port/out args and route being snapshotted are printed above if reached');
  process.exit(1);
});
