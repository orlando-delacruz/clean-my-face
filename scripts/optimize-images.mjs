/**
 * optimize-images: build-time derivative generator for the Phase 2 pipeline.
 *
 * Usage:
 *   node scripts/optimize-images.mjs [--force]
 *   npm run images:optimize
 *
 * Reads the declarative manifest in scripts/image-manifest.mjs and, for each
 * entry with widths, writes AVIF and WebP derivatives into public/img/ plus
 * one machine-readable map at public/img/manifest.json. Originals in images/
 * are never modified.
 *
 * Output location decision: public/img/ is the only folder Vite copies
 * verbatim into dist/ with stable, predictable URLs (/img/<file>). Generated
 * files are build artifacts: they are git-ignored (see .gitignore) and
 * produced by `npm run images:optimize`, which `npm run build` calls first.
 * In `npm run dev` the variants may be absent; ResponsiveImage then falls
 * back to the original URLs (documented in docs/FRONTEND.md), so dev never
 * 404s and never needs the generated folder.
 *
 * Rules enforced here:
 * - Never upscale: a target width wider than the source is skipped and logged.
 * - Never ship a derivative larger than its original: if an encoded variant
 *   is >= the source bytes, it is excluded from manifest.json and logged.
 * - Idempotent: outputs whose source hash and options hash match
 *   .cache/image-manifest.json are skipped (git-ignored). Changing options
 *   regenerates. Use --force to ignore the cache.
 * - Fail loudly: every file operation is wrapped; errors are rethrown with
 *   the source path, target width, format, and the real sharp message.
 * - No timestamps are written anywhere, so manifest.json is byte-identical
 *   across consecutive runs.
 */
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import {
  IMAGE_EXCLUDED,
  IMAGE_FORMATS,
  IMAGE_MANIFEST,
  IMAGE_QUALITY,
} from './image-manifest.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..');
const IMAGES_DIR = path.join(root, 'images');
const OUT_DIR = path.join(root, 'public', 'img');
const MANIFEST_PATH = path.join(OUT_DIR, 'manifest.json');
const CACHE_PATH = path.join(root, '.cache', 'image-manifest.json');

function slugify(key) {
  return key
    .replace(/\.[a-zA-Z0-9]+$/, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-+/g, '-');
}

function sha256File(filePath) {
  const hash = crypto.createHash('sha256');
  hash.update(fs.readFileSync(filePath));
  return hash.digest('hex');
}

function optionsHash() {
  return crypto
    .createHash('sha256')
    .update(JSON.stringify({ formats: IMAGE_FORMATS, quality: IMAGE_QUALITY }))
    .digest('hex')
    .slice(0, 16);
}

function loadCache() {
  try {
    return JSON.parse(fs.readFileSync(CACHE_PATH, 'utf8'));
  } catch {
    return {};
  }
}

function parseArgs(argv) {
  const out = { force: false };
  for (const a of argv) {
    if (a === '--force') out.force = true;
    else throw new Error(`Unknown arg "${a}". Usage: node scripts/optimize-images.mjs [--force]`);
  }
  return out;
}

async function main() {
  const { force } = parseArgs(process.argv.slice(2));
  const cache = loadCache();
  const nextCache = {};
  const optHash = optionsHash();
  fs.mkdirSync(OUT_DIR, { recursive: true });
  fs.mkdirSync(path.dirname(CACHE_PATH), { recursive: true });

  const seenOutputs = new Set();
  const manifestEntries = {};
  const rows = [];
  let originalBytesTotal = 0;
  let deliveredBytesTotal = 0;
  let skippedUpscale = 0;
  let skippedLarger = 0;
  let reusedFromCache = 0;

  const sorted = [...IMAGE_MANIFEST].sort((a, b) => a.key.localeCompare(b.key));
  for (const entry of sorted) {
    const sourcePath = path.join(IMAGES_DIR, entry.key);
    if (!fs.existsSync(sourcePath)) {
      throw new Error(
        `optimize-images: source not found: "${entry.key}" (resolved to ${sourcePath}). Fix scripts/image-manifest.mjs or restore the file in images/.`,
      );
    }
    const sourceStat = fs.statSync(sourcePath);
    const sourceHash = sha256File(sourcePath);
    originalBytesTotal += sourceStat.size;

    let meta;
    try {
      meta = await sharp(sourcePath).metadata();
    } catch (error) {
      throw new Error(
        `optimize-images: cannot read metadata for "${entry.key}" (${sourcePath}): ${error && error.message ? error.message : error}`,
      );
    }
    const sourceWidth = meta.width ?? 0;
    const sourceHeight = meta.height ?? 0;
    if (sourceWidth <= 0) {
      throw new Error(`optimize-images: source has no width: "${entry.key}".`);
    }

    const slug = slugify(entry.key);
    const variants = [];

    for (const width of entry.widths) {
      if (width > sourceWidth) {
        skippedUpscale += IMAGE_FORMATS.length;
        rows.push({
          source: entry.key,
          width,
          format: '(all)',
          bytes: 0,
          ratio: 'SKIPPED: wider than source, never upscale',
        });
        continue;
      }
      for (const format of IMAGE_FORMATS) {
        const fileName = `${slug}-${width}.${format}`;
        if (seenOutputs.has(fileName)) {
          throw new Error(
            `optimize-images: output collision: "${fileName}" is produced by more than one manifest entry (current: "${entry.key}"). Rename the slug scheme.`,
          );
        }
        seenOutputs.add(fileName);
        const outPath = path.join(OUT_DIR, fileName);
        const cacheKey = fileName;
        const fingerprint = `${sourceHash}:${optHash}:${width}:${format}`;
        const cached = !force && cache[cacheKey] === fingerprint && fs.existsSync(outPath);

        let bytes;
        if (cached) {
          bytes = fs.statSync(outPath).size;
          reusedFromCache += 1;
        } else {
          let buffer;
          try {
            const pipeline = sharp(sourcePath).resize({ width, withoutEnlargement: true });
            if (format === 'avif') {
              pipeline.avif({
                quality: IMAGE_QUALITY.avif.quality,
                effort: IMAGE_QUALITY.avif.effort,
              });
            } else {
              pipeline.webp({ quality: IMAGE_QUALITY.webp.quality });
            }
            buffer = await pipeline.toBuffer();
          } catch (error) {
            throw new Error(
              `optimize-images: failed to encode "${entry.key}" at ${width}px .${format}: ${error && error.message ? error.message : error}`,
            );
          }
          bytes = buffer.length;
          if (bytes >= sourceStat.size) {
            skippedLarger += 1;
            rows.push({
              source: entry.key,
              width,
              format,
              bytes,
              ratio: `EXCLUDED: ${bytes} B >= original ${sourceStat.size} B`,
            });
            nextCache[cacheKey] = `excluded:${fingerprint}`;
            continue;
          }
          try {
            fs.writeFileSync(outPath, buffer);
          } catch (error) {
            throw new Error(
              `optimize-images: cannot write "${outPath}" for "${entry.key}" at ${width}px .${format}: ${error && error.message ? error.message : error}`,
            );
          }
          nextCache[cacheKey] = fingerprint;
        }
        deliveredBytesTotal += bytes;
        variants.push({
          format,
          width,
          url: `/img/${fileName}`,
          bytes,
        });
        rows.push({
          source: entry.key,
          width,
          format,
          bytes,
          ratio: `${((bytes / sourceStat.size) * 100).toFixed(1)}% of original`,
        });
      }
    }

    let lqip = null;
    if (variants.length > 0) {
      try {
        const lqipBuffer = await sharp(sourcePath)
          .resize({ width: IMAGE_QUALITY.lqip.width, withoutEnlargement: true })
          .webp({ quality: IMAGE_QUALITY.lqip.quality })
          .toBuffer();
        lqip = `data:image/webp;base64,${lqipBuffer.toString('base64')}`;
      } catch (error) {
        throw new Error(
          `optimize-images: cannot build LQIP for "${entry.key}": ${error && error.message ? error.message : error}`,
        );
      }
    }

    variants.sort((a, b) => a.width - b.width || a.format.localeCompare(b.format));
    manifestEntries[entry.key] = {
      width: sourceWidth,
      height: sourceHeight,
      variants,
      lqip,
    };
  }

  const manifest = { version: 1, entries: manifestEntries };
  const manifestJson = `${JSON.stringify(manifest, null, 1)}\n`;
  try {
    fs.writeFileSync(MANIFEST_PATH, manifestJson);
  } catch (error) {
    throw new Error(
      `optimize-images: cannot write manifest "${MANIFEST_PATH}": ${error && error.message ? error.message : error}`,
    );
  }
  try {
    fs.writeFileSync(CACHE_PATH, `${JSON.stringify(nextCache, null, 1)}\n`);
  } catch (error) {
    throw new Error(
      `optimize-images: cannot write cache "${CACHE_PATH}": ${error && error.message ? error.message : error}`,
    );
  }

  const manifestBytes = Buffer.byteLength(manifestJson, 'utf8');
  const generatedFiles = fs.readdirSync(OUT_DIR).filter((f) => f !== 'manifest.json');

  console.log('source | width | format | bytes | ratio vs original');
  for (const row of rows) {
    console.log(`${row.source} | ${row.width} | ${row.format} | ${row.bytes} | ${row.ratio}`);
  }
  console.log('');
  console.log(`originals referenced: ${sorted.length} sources, ${originalBytesTotal} B on disk`);
  console.log(`generated files: ${generatedFiles.length} in public/img/ (+ manifest.json ${manifestBytes} B)`);
  console.log(`delivered derivative bytes: ${deliveredBytesTotal} B`);
  console.log(`skipped (upscale): ${skippedUpscale}, excluded (larger than original): ${skippedLarger}, reused from cache: ${reusedFromCache}`);
  console.log(`excluded from this phase (${IMAGE_EXCLUDED.length}): ${IMAGE_EXCLUDED.map((e) => e.key).join(', ')}`);
  console.log(`wrote ${MANIFEST_PATH}`);
}

main().catch((error) => {
  console.error(`optimize-images FAILED: ${error && error.message ? error.message : error}`);
  process.exit(1);
});
