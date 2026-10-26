import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import type { ImageMeta } from '../../../data/images';
import { ResponsiveImage } from './ResponsiveImage';

const metaWithVariants: ImageMeta = {
  key: 'hero.png',
  src: '/assets/hero-test.png',
  width: 1417,
  height: 794,
  variants: [
    { format: 'avif', width: 640, url: '/img/hero-640.avif' },
    { format: 'webp', width: 640, url: '/img/hero-640.webp' },
    { format: 'avif', width: 1280, url: '/img/hero-1280.avif' },
    { format: 'webp', width: 1280, url: '/img/hero-1280.webp' },
  ],
};

const metaOriginalOnly: ImageMeta = {
  key: 'additional-img-7.png',
  src: '/assets/additional-img-7-test.png',
  width: 229,
  height: 225,
  variants: [],
};

describe('ResponsiveImage', () => {
  it('renders picture with AVIF and WebP sources and a correct srcset', () => {
    const { container } = render(
      <ResponsiveImage image={metaWithVariants} alt="Test alt" sizes="100vw" />,
    );
    const picture = container.querySelector('picture');
    expect(picture).not.toBeNull();
    const avif = picture?.querySelector('source[type="image/avif"]');
    const webp = picture?.querySelector('source[type="image/webp"]');
    expect(avif?.getAttribute('srcset')).toBe(
      '/img/hero-640.avif 640w, /img/hero-1280.avif 1280w',
    );
    expect(webp?.getAttribute('srcset')).toBe(
      '/img/hero-640.webp 640w, /img/hero-1280.webp 1280w',
    );
    expect(avif?.getAttribute('sizes')).toBe('100vw');
    const fallback = picture?.querySelector('img');
    expect(fallback?.getAttribute('src')).toBe('/assets/hero-test.png');
    expect(fallback?.getAttribute('alt')).toBe('Test alt');
    expect(fallback?.getAttribute('width')).toBe('1417');
    expect(fallback?.getAttribute('height')).toBe('794');
  });

  it('is lazy by default and eager with priority', () => {
    const { container, rerender } = render(
      <ResponsiveImage image={metaWithVariants} alt="" sizes="100vw" />,
    );
    const fallback = container.querySelector('img');
    expect(fallback?.getAttribute('loading')).toBe('lazy');
    expect(fallback?.getAttribute('fetchpriority')).toBe('auto');
    expect(fallback?.getAttribute('decoding')).toBe('async');
    rerender(<ResponsiveImage image={metaWithVariants} alt="" sizes="100vw" priority />);
    const eager = container.querySelector('img');
    expect(eager?.getAttribute('loading')).toBe('eager');
    expect(eager?.getAttribute('fetchpriority')).toBe('high');
    expect(eager?.getAttribute('decoding')).toBe('sync');
  });

  it('renders the fallback img only when there are no variants', () => {
    const { container } = render(
      <ResponsiveImage image={metaOriginalOnly} alt="Original only" sizes="50vw" />,
    );
    expect(container.querySelectorAll('source')).toHaveLength(0);
    expect(container.querySelector('img')?.getAttribute('src')).toBe(
      '/assets/additional-img-7-test.png',
    );
  });

  it('forwards className to the inner img so styled() CSS is unchanged', () => {
    const { container } = render(
      <ResponsiveImage
        image={metaOriginalOnly}
        alt=""
        sizes="50vw"
        className="kept-style"
      />,
    );
    expect(container.querySelector('img.kept-style')).not.toBeNull();
  });

  it('throws when image is missing', () => {
    expect(() =>
      render(
        <ResponsiveImage
          image={undefined as unknown as ImageMeta}
          alt=""
          sizes="100vw"
        />,
      ),
    ).toThrow(/ResponsiveImage: image is required/);
  });
});
