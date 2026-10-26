/**
 * inject-hero-preload: add a hero preload link to the built index.html.
 *
 * Usage:
 *   node scripts/inject-hero-preload.mjs
 *   npm run build:preload
 *
 * Runs after `vite build` (see the `build` script). Reads
 * dist/img/manifest.json (written by scripts/optimize-images.mjs) and
 * injects one preload link for the hero AVIF srcset into dist/index.html:
 *
 *   <link rel="preload" as="image" type="image/avif"
 *         imagesrcset="..." imagesizes="100vw" fetchpriority="high">
 *
 * The hero img is rendered by React, so without this link the browser only
 * discovers it after JS runs. The preload puts the correct variant into the
 * initial HTML instead. Only one format is preloaded (AVIF, the first format
 * ResponsiveImage offers): a second link for WebP would make supporting
 * browsers fetch both. Browsers without AVIF support skip the link via
 * type="image/avif" and use the WebP source or the original fallback.
 *
 * Idempotent: the marker comment is checked first; a second run changes
 * nothing. Fail loudly with the real file path and error.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..');
const MANIFEST_PATH = path.join(root, 'dist', 'img', 'manifest.json');
const INDEX_PATH = path.join(root, 'dist', 'index.html');
const MARKER = 'CMF-HERO-PRELOAD';

function main() {
  let manifestRaw;
  try {
    manifestRaw = fs.readFileSync(MANIFEST_PATH, 'utf8');
  } catch (error) {
    throw new Error(
      `inject-hero-preload: cannot read ${MANIFEST_PATH} (run npm run build:images first): ${error && error.message ? error.message : error}`,
    );
  }
  const manifest = JSON.parse(manifestRaw);
  const hero = manifest.entries['hero.png'];
  if (!hero) {
    throw new Error(
      `inject-hero-preload: manifest ${MANIFEST_PATH} has no hero.png entry.`,
    );
  }
  const avif = hero.variants.filter((v) => v.format === 'avif');
  if (avif.length === 0) {
    throw new Error(
      'inject-hero-preload: hero.png has no AVIF variants in the manifest.',
    );
  }
  const srcset = avif.map((v) => `${v.url} ${v.width}w`).join(', ');
  const link = `<!-- ${MARKER} -->\n    <link rel="preload" as="image" type="image/avif" imagesrcset="${srcset}" imagesizes="100vw" fetchpriority="high" />`;

  let html;
  try {
    html = fs.readFileSync(INDEX_PATH, 'utf8');
  } catch (error) {
    throw new Error(
      `inject-hero-preload: cannot read ${INDEX_PATH} (run vite build first): ${error && error.message ? error.message : error}`,
    );
  }
  if (html.includes(MARKER)) {
    console.log('inject-hero-preload: marker present, nothing to do.');
    return;
  }
  if (!html.includes('</head>')) {
    throw new Error(
      `inject-hero-preload: no </head> in ${INDEX_PATH}, cannot inject.`,
    );
  }
  const next = html.replace('</head>', `    ${link}\n  </head>`);
  try {
    fs.writeFileSync(INDEX_PATH, next);
  } catch (error) {
    throw new Error(
      `inject-hero-preload: cannot write ${INDEX_PATH}: ${error && error.message ? error.message : error}`,
    );
  }
  console.log(`inject-hero-preload: preloaded hero AVIF srcset (${avif.length} variants) in dist/index.html`);
}

try {
  main();
} catch (error) {
  console.error(`inject-hero-preload FAILED: ${error && error.message ? error.message : error}`);
  process.exit(1);
}
