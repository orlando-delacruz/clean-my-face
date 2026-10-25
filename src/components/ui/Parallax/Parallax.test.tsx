import '@testing-library/jest-dom/vitest';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../../theme';
import { Parallax } from './Parallax';

vi.mock('motion/react', async (importOriginal) => {
  const actual = await importOriginal<typeof import('motion/react')>();
  return {
    ...actual,
    useReducedMotion: () => true,
  };
});

describe('Parallax', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders untouched children under reduced motion', () => {
    const { unmount } = render(
      <ThemeProvider theme={theme}>
        <Parallax>
          <span>Content</span>
        </Parallax>
      </ThemeProvider>,
    );
    expect(screen.getByText('Content')).toBeInTheDocument();
    unmount();
  });
});
