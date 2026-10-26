import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import type { ImageMeta } from '../../../data/images';
import { ResponsiveBackground } from './ResponsiveBackground';

const metaWithVariants: ImageMeta = {
  key: 'bg-image-2.png',
  src: '/assets/bg-image-2-test.png',
  width: 1416,
  height: 794,
  variants: [
    { format: 'webp', width: 640, url: '/img/bg-image-2-640.webp' },
    { format: 'webp', width: 1280, url: '/img/bg-image-2-1280.webp' },
  ],
};

const metaOriginalOnly: ImageMeta = {
  key: 'bg-mage-1.jpg',
  src: '/assets/bg-mage-1-test.jpg',
  width: 1416,
  height: 794,
  variants: [],
};

function styleContent(): string {
  return [...document.head.querySelectorAll('style')]
    .map((el) => el.textContent ?? '')
    .join('\n');
}

describe('ResponsiveBackground', () => {
  it('emits the fallback url() and an image-set() override with the tint overlay', () => {
    const { container } = render(
      <ResponsiveBackground image={metaWithVariants} tint="red">
        <span>child stays</span>
      </ResponsiveBackground>,
    );
    expect(container.textContent).toContain('child stays');
    const css = styleContent();
    expect(css).toContain('url("/assets/bg-image-2-test.png")');
    expect(css).toContain(
      'image-set(url("/img/bg-image-2-640.webp") 1x, url("/img/bg-image-2-1280.webp") 2x)',
    );
  });

  it('emits only the fallback url() when there are no variants', () => {
    render(<ResponsiveBackground image={metaOriginalOnly} tint="red" />);
    const css = styleContent();
    expect(css).toContain('url("/assets/bg-mage-1-test.jpg")');
  });

  it('renders as a section when tag="section" is passed', () => {
    const { container } = render(
      <ResponsiveBackground image={metaWithVariants} tint="red" tag="section">
        <span>section child</span>
      </ResponsiveBackground>,
    );
    expect(container.querySelector('section')).not.toBeNull();
    expect(container.querySelector('div')).toBeNull();
  });

  it('throws when image is missing', () => {
    expect(() =>
      render(
        <ResponsiveBackground
          image={undefined as unknown as ImageMeta}
          tint="red"
        />,
      ),
    ).toThrow(/ResponsiveBackground: image is required/);
  });
});
