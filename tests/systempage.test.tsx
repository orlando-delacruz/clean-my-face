import '@testing-library/jest-dom/vitest';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { theme } from '../src/theme';
import SystemPage from '../src/pages/SystemPage';

describe('SystemPage', () => {
  it('renders one h1 and all primitive sections', () => {
    const { container, unmount } = render(
      <ThemeProvider theme={theme}>
        <SystemPage />
      </ThemeProvider>,
    );
    expect(container.querySelectorAll('h1')).toHaveLength(1);
    for (const name of [
      'Colors',
      'Contrast',
      'Typography',
      'Motion',
      'Primitives',
      'Media frames',
      'Range themes',
    ]) {
      expect(screen.getByRole('heading', { name })).toBeInTheDocument();
    }
    unmount();
  });
});
