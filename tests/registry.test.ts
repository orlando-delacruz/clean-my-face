import { describe, expect, it } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import {
  closing,
  routineGuide,
  skinNeeds,
  brand,
  ranges,
} from '../src/data/content';
import {
  buildImageSet,
  buildSrcSet,
  imageMeta,
  slugifyImageKey,
  variantUrl,
} from '../src/data/images';

const root = process.cwd();

function manifestSource(): string {
  return fs.readFileSync(path.join(root, 'scripts', 'image-manifest.mjs'), 'utf8');
}

function manifestBlock(): string {
  const src = manifestSource();
  const start = src.indexOf('export const IMAGE_MANIFEST = [');
  const end = src.indexOf('];', start);
  if (start === -1 || end === -1) throw new Error('IMAGE_MANIFEST block not found');
  return src.slice(start, end);
}

function manifestKeys(): string[] {
  const src = manifestBlock();
  const keys: string[] = [];
  const re = /key:\s*'([^']+)'/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(src)) !== null) keys.push(m[1] as string);
  return keys;
}

function manifestWidths(): Map<string, number[]> {
  const src = manifestBlock();
  const out = new Map<string, number[]>();
  const re = /key:\s*'([^']+)',\s*\n\s*widths:\s*\[([^\]]*)\]/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(src)) !== null) {
    const key = m[1] as string;
    const list = (m[2] as string)
      .split(',')
      .map((s) => s.trim())
      .filter((s) => s !== '')
      .map(Number);
    out.set(key, list);
  }
  return out;
}

/** Every image path the rendered pages can request. */
function usedKeys(): string[] {
  const keys = new Set<string>();
  for (const range of ranges) {
    keys.add(range.systemImage);
    for (const product of range.products) {
      keys.add(product.image);
      for (const g of product.gallery) keys.add(g);
    }
  }
  for (const card of skinNeeds.cards) keys.add(card.image);
  keys.add(routineGuide.image);
  keys.add(closing.image);
  keys.add(brand.heroImage);
  // CSS backgrounds referenced from section components, not content.ts.
  keys.add('bg-image-2.png');
  keys.add('bg-image-3.png');
  keys.add('bg-mage-1.jpg');
  return [...keys];
}

describe('image registry consistency', () => {
  it('covers every manifest key in the image registry', () => {
    for (const key of manifestKeys()) {
      expect(imageMeta(key), key).not.toBeNull();
    }
  });

  it('covers every used key in the manifest', () => {
    const inManifest = new Set(manifestKeys());
    for (const key of usedKeys()) {
      expect(inManifest.has(key), key).toBe(true);
    }
  });

  it('pins the slug scheme used by the optimizer', () => {
    expect(slugifyImageKey('CLEANSING BALM/CLEANSING BALM.png')).toBe(
      'cleansing-balm-cleansing-balm',
    );
    expect(slugifyImageKey('6 products system.jpg')).toBe('6-products-system');
    expect(slugifyImageKey('bg-mage-1.jpg')).toBe('bg-mage-1');
    expect(slugifyImageKey('dry spot rescue balm/dry spot rescue balm.png')).toBe(
      'dry-spot-rescue-balm-dry-spot-rescue-balm',
    );
    expect(variantUrl('hero.png', 640, 'avif')).toBe('/img/hero-640.avif');
    expect(variantUrl('RICE BARRIER CREAM MASK/RICE BARRIER CREAM MASK.png', 560, 'webp')).toBe(
      '/img/rice-barrier-cream-mask-rice-barrier-cream-mask-560.webp',
    );
  });

  it('returns empty variants in DEV so the generated folder is never required locally', () => {
    // Vitest runs with import.meta.env.DEV === true, so this executes the
    // dev branch: originals render, no /img/ file is ever requested.
    // Production (preview/Vercel) takes the other branch; Playwright
    // Production uses the generated variants; manual QA (docs/QA_CHECKLIST.md)
    // covers the prod branch in a real browser.
    expect(import.meta.env.DEV).toBe(true);
    const meta = imageMeta('hero.png');
    expect(meta).not.toBeNull();
    expect(meta?.variants).toEqual([]);
    expect(meta?.src).not.toBe('');
  });

  it('returns null for unmapped keys and metadata for registered keys', () => {
    expect(imageMeta('does-not-exist.png')).toBeNull();
    // additional-img-1.jpg and additional-img-6.jpg were registered
    // (Phase 10.5 follow-up) so the Expertise section can use real photos.
    expect(imageMeta('additional-img-1.jpg')).not.toBeNull();
    expect(imageMeta('additional-img-6.jpg')).not.toBeNull();
  });

  it('builds srcset and image-set from metadata', () => {
    const meta = {
      key: 'hero.png',
      src: '/assets/hero.png',
      width: 1417,
      height: 794,
      variants: [
        { format: 'avif' as const, width: 640, url: '/img/hero-640.avif' },
        { format: 'webp' as const, width: 640, url: '/img/hero-640.webp' },
      ],
    };
    expect(buildSrcSet(meta, 'avif')).toBe('/img/hero-640.avif 640w');
    expect(buildSrcSet(meta, 'webp')).toBe('/img/hero-640.webp 640w');
    expect(buildImageSet(meta)).toBe(
      'image-set(url("/img/hero-640.webp") 1x)',
    );
    expect(
      buildImageSet({ ...meta, variants: [] }),
    ).toBeNull();
  });

  it('generated manifest: variants exist on disk, widths never exceed the source, no derivative is larger than its original', () => {
    const generatedPath = path.join(root, 'public', 'img', 'manifest.json');
    if (!fs.existsSync(generatedPath)) {
      console.log(
        'SKIP: public/img/manifest.json is absent (run npm run images:optimize to generate it). This test does not pass silently: generate the folder and re-run.',
      );
      return;
    }
    const generated = JSON.parse(fs.readFileSync(generatedPath, 'utf8')) as {
      entries: Record<
        string,
        {
          width: number;
          height: number;
          variants: Array<{ format: string; width: number; url: string; bytes: number }>;
        }
      >;
    };
    const widths = manifestWidths();
    let checked = 0;
    for (const [key, entry] of Object.entries(generated.entries)) {
      const declared = widths.get(key);
      expect(declared, `manifest entry for ${key}`).toBeDefined();
      const originalBytes = fs.statSync(path.join(root, 'images', key)).size;
      for (const v of entry.variants) {
        expect(v.width, `${key} variant width`).toBeLessThanOrEqual(entry.width);
        const filePath = path.join(root, 'public', 'img', path.basename(v.url));
        expect(fs.existsSync(filePath), filePath).toBe(true);
        const derivativeBytes = fs.statSync(filePath).size;
        expect(
          derivativeBytes < originalBytes,
          `${v.url} (${derivativeBytes} B) must be smaller than ${key} (${originalBytes} B)`,
        ).toBe(true);
        checked += 1;
      }
    }
    console.log(`GENERATED_VARIANTS_CHECKED ${checked}`);
    expect(checked).toBeGreaterThan(0);
  });
});
