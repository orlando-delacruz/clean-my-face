import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import { ranges, findProductBySlug } from '../src/data/content';
import { img } from '../src/data/images';

const root = process.cwd();

describe('content integrity', () => {
  const products = ranges.flatMap((range) => range.products);

  it('has exactly 12 product records', () => {
    expect(products).toHaveLength(12);
  });

  it('has both ranges with 6 products each', () => {
    expect(ranges.map((range) => range.id)).toEqual(['plump', 'clear']);
    for (const range of ranges) {
      expect(range.products).toHaveLength(6);
    }
  });

  it('has unique, lowercase, URL-safe slugs', () => {
    const slugs = products.map((product) => product.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const slug of slugs) {
      expect(slug).toMatch(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
    }
  });

  it('has valid range references', () => {
    for (const product of products) {
      expect(['plump', 'clear']).toContain(product.rangeId);
      const range = ranges.find((item) => item.id === product.rangeId);
      expect(range).toBeDefined();
    }
  });

  it('has all required product-page fields', () => {
    for (const product of products) {
      expect(product.rangeId).toBeTruthy();
      expect(product.slug).toBeTruthy();
      expect(product.step).toBeTruthy();
      expect(product.role).toBeTruthy();
      expect(product.name).toBeTruthy();
      expect(product.skinType).toBeTruthy();
      expect(product.purpose).toBeTruthy();
      expect(product.positioning).toBeTruthy();
      expect(product.positioningLong).toBeTruthy();
      expect(product.tagline).toBeTruthy();
      expect(product.description).toBeTruthy();
      expect(product.benefits.length).toBeGreaterThan(0);
      expect(product.ingredients.length).toBeGreaterThan(0);
      expect(product.textureNotes.length).toBeGreaterThan(0);
      expect(product.image).toBeTruthy();
      expect(product.gallery.length).toBeGreaterThan(0);
      expect(product.placeholder).toBe(true);
    }
  });

  it('resolves every content image path through the image map', () => {
    for (const product of products) {
      expect(img(product.image), product.image).not.toBe('');
      for (const galleryPath of product.gallery) {
        expect(img(galleryPath), galleryPath).not.toBe('');
      }
    }
    for (const range of ranges) {
      expect(img(range.systemImage), range.systemImage).not.toBe('');
    }
  });

  it('resolves image-map keys to files on disk', () => {
    const imagesSource = fs.readFileSync(path.join(root, 'src/data/images.ts'), 'utf8');
    const importMatches = [...imagesSource.matchAll(/from '\.\.\/\.\.\/images\/([^']+)'/g)];
    const independentMatches = [...imagesSource.matchAll(/from\s+['"]\.\.\/\.\.\/images\/[^'"]+['"]/g)];
    expect(importMatches.length).toBeGreaterThan(0);
    expect(independentMatches.length).toBe(importMatches.length);
    console.log('IMAGE_IMPORT_COUNT', importMatches.length);
    for (const match of importMatches) {
      const relativePath = match[1];
      expect(fs.existsSync(path.join(root, 'images', relativePath)), relativePath).toBe(true);
    }
  });

  it('finds every product by slug', () => {
    for (const product of products) {
      const found = findProductBySlug(product.slug);
      expect(found).not.toBeNull();
      expect(found?.product.slug).toBe(product.slug);
    }
  });
});