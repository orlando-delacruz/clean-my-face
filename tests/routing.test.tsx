import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ranges } from '../src/data/content';
import App from '../src/App';

const routes = [
  '/',
  ...ranges.flatMap((range) => range.products.map((product) => `/products/${product.slug}`)),
  '/privacy-policy',
  '/terms-and-conditions',
];

describe('routing', () => {
  beforeEach(() => {
    window.history.replaceState({}, '', '/');
  });

  for (const route of routes) {
    it(`renders ${route} without throwing and has one h1`, () => {
      window.history.replaceState({}, '', route);
      const { container, unmount } = render(<App />);
      expect(container.querySelectorAll('h1')).toHaveLength(1);
      unmount();
    });
  }

  it('renders product name in a heading on product pages', () => {
    const product = ranges[0].products[0];
    window.history.replaceState({}, '', `/products/${product.slug}`);
    const { unmount } = render(<App />);
    expect(screen.getByRole('heading', { name: product.name })).toBeInTheDocument();
    unmount();
  });

  it('renders the 404 page for an unknown route', () => {
    window.history.replaceState({}, '', '/this-route-does-not-exist');
    const { container, unmount } = render(<App />);
    expect(container.textContent).toContain('This page is not here');
    expect(container.querySelectorAll('h1')).toHaveLength(1);
    unmount();
  });
});