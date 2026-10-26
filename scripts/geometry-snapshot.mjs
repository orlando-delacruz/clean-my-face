/**
 * geometry-snapshot: record rendered geometry for visual non-regression.
 *
 * Usage:
 *   node scripts/geometry-snapshot.mjs --port=4174 --out=test-results/geometry-head.json
 *   node scripts/geometry-snapshot.mjs --compare=test-results/geometry-base.json,test-results/geometry-head.json
 *   npm run snapshot:geometry -- --port=4174 --out=test-results/geometry-head.json
 *
 * For / and the first product of each range, at widths 390 and 1440
 * (DPR 1): records every <img> (bounding rect, object-fit/position,
 * currentSrc, structural path) and every element whose computed
 * background-image contains url( (box, background-size/position, path).
 *
 * Compare mode matches entries by route + width + path and reports every
 * element whose rendered box changed by more than 1 px, plus any added or
 * removed image/background. Expected differences after Phase 2: ONLY the
 * image source (currentSrc host file), never box or crop changes.
 */
import fs from 'node:fs';
import path from 'node:path';
import { chromium } from '@playwright/test';

function parseArgs(argv) {
  const out = { port: 0, out: '', compare: '' };
  for (const a of argv) {
    if (a.startsWith('--port=')) out.port = Number(a.slice('--port='.length));
    else if (a.startsWith('--out=')) out.out = a.slice('--out='.length);
    else if (a.startsWith('--compare=')) out.compare = a.slice('--compare='.length);
    else throw new Error(`Unknown arg "${a}". Usage: node scripts/geometry-snapshot.mjs --port=4182 --out=<file> | --compare=<a.json,b.json>`);
  }
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
  const r2 = (n) => Math.round(n * 100) / 100;
  const imgs = [...document.querySelectorAll('img')].map((el) => {
    const r = el.getBoundingClientRect();
    const cs = getComputedStyle(el);
    return {
      kind: 'img',
      path: pathOf(el),
      rect: { x: r2(r.x), y: r2(r.y), width: r2(r.width), height: r2(r.height) },
      objectFit: cs.objectFit,
      objectPosition: cs.objectPosition,
      currentSrc: el.currentSrc || el.src || '',
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
        rect: { x: r2(r.x), y: r2(r.y), width: r2(r.width), height: r2(r.height) },
        backgroundSize: cs.backgroundSize,
        backgroundPosition: cs.backgroundPosition,
        hasImageSet: bi.includes('image-set('),
        usesFallbackUrl: /url\\(["']?\\/img\\//.test(bi) || /url\\(["']?\\/assets\\//.test(bi),
      });
    }
  }
  return { imgs, bgs };
})()`;

async function collect(port, route, width) {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width, height: width < 768 ? 844 : 900 },
    deviceScaleFactor: 1,
    reducedMotion: 'reduce',
  });
  const page = await context.newPage();
  try {
    await page.goto(`http://localhost:${port}${route}`, { waitUntil: 'load' });
    await page.evaluate(() => document.fonts.ready);
    let lastY = -1;
    for (let i = 0; i < 40; i++) {
      const y = await page.evaluate(() => window.scrollY + window.innerHeight);
      await page.evaluate((v) => window.scrollTo(0, v), y);
      await page.waitForTimeout(200);
      const done = await page.evaluate(() => window.innerHeight + window.scrollY >= document.body.scrollHeight - 2);
      if (done || y === lastY) break;
      lastY = y;
    }
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(600);
    const data = await page.evaluate(COLLECT_JS);
    return { route, width, ...data };
  } finally {
    await context.close();
    await browser.close();
  }
}

function boxDelta(a, b) {
  return Math.max(
    Math.abs(a.x - b.x),
    Math.abs(a.y - b.y),
    Math.abs(a.width - b.width),
    Math.abs(a.height - b.height),
  );
}

function compare(basePath, headPath) {
  const base = JSON.parse(fs.readFileSync(basePath, 'utf8'));
  const head = JSON.parse(fs.readFileSync(headPath, 'utf8'));
  const keyOf = (e) => `${e.route}|${e.width}|${e.kind}|${e.path}`;
  // Phase 2 wraps migrated images in a display:contents <picture> that
  // introduces no box. Normalize that wrapper away so before/after entries
  // match by their visual position instead of their DOM depth.
  const normPath = (p) => p.replace(/>picture:nth-of-type\(\d+\)/g, '');
  const baseMap = new Map(base.entries.flatMap((en) => [...en.imgs, ...en.bgs].map((el) => [`${en.route}|${en.width}|${el.kind}|${normPath(el.path)}`, { entry: en, el }])));
  const headMap = new Map(head.entries.flatMap((en) => [...en.imgs, ...en.bgs].map((el) => [`${en.route}|${en.width}|${el.kind}|${normPath(el.path)}`, { entry: en, el }])));
  void keyOf;
  let failures = 0;
  let sourcesChanged = 0;
  for (const [k, { entry, el }] of baseMap) {
    const other = headMap.get(k);
    if (!other) {
      console.log(`REMOVED ${entry.route} @${entry.width} ${el.kind} ${el.path}`);
      failures += 1;
      continue;
    }
    const d = boxDelta(el.rect, other.el.rect);
    if (d > 1) {
      console.log(`BOX-CHANGE ${entry.route} @${entry.width} ${el.kind} ${el.path}: delta ${d} (base ${JSON.stringify(el.rect)} vs head ${JSON.stringify(other.el.rect)})`);
      failures += 1;
    }
    for (const prop of ['objectFit', 'objectPosition', 'backgroundSize', 'backgroundPosition']) {
      if (el[prop] !== undefined && other.el[prop] !== undefined && el[prop] !== other.el[prop]) {
        console.log(`CROP-CHANGE ${entry.route} @${entry.width} ${el.kind} ${el.path}: ${prop} base=${el[prop]} head=${other.el[prop]}`);
        failures += 1;
      }
    }
    const baseSrc = el.currentSrc ?? '';
    const headSrc = other.el.currentSrc ?? '';
    if (baseSrc !== headSrc) {
      sourcesChanged += 1;
      console.log(`SOURCE-CHANGE (expected) ${entry.route} @${entry.width} ${el.kind} ${el.path}: ${baseSrc.split('/').pop()} -> ${headSrc.split('/').pop()}`);
    }
  }
  for (const [k, { entry, el }] of headMap) {
    if (!baseMap.has(k)) {
      console.log(`ADDED ${entry.route} @${entry.width} ${el.kind} ${el.path} src=${el.currentSrc ?? ''}`);
      failures += 1;
    }
  }
  if (failures === 0) console.log(`geometry-compare: PASS (no box changes >1px, no crop changes, no added/removed image elements; ${sourcesChanged} expected source changes)`);
  else {
    console.log(`geometry-compare: FAILED with ${failures} difference(s)`);
    process.exitCode = 1;
  }
}

async function main() {
  const { port, out, compare: cmp } = parseArgs(process.argv.slice(2));
  if (cmp !== '') {
    const [a, b] = cmp.split(',');
    if (!a || !b) throw new Error('Usage: node scripts/geometry-snapshot.mjs --compare=<base.json,head.json>');
    compare(a, b);
    return;
  }
  if (!port || out === '') throw new Error('Usage: node scripts/geometry-snapshot.mjs --port=<port> --out=<file>');
  const [, ...slugs] = [null, ...firstProductSlugs()];
  const routes = ['/', ...slugs.map((s) => `/products/${s}`)];
  const entries = [];
  for (const width of [390, 1440]) {
    for (const route of routes) {
      entries.push(await collect(port, route, width));
      console.log('collected', route, width);
    }
  }
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, `${JSON.stringify({ port, collectedAt: new Date().toISOString(), entries }, null, 1)}\n`);
  console.log(`wrote ${out}`);
}

main().catch((error) => {
  console.error('geometry-snapshot FAILED:', error && error.message ? error.message : error);
  process.exit(1);
});
