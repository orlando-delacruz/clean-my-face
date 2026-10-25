import '@testing-library/jest-dom/vitest';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../../theme';
import { Heading } from './Heading';

function setup(ui: React.ReactElement) {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);
}

describe('Heading', () => {
  it('renders the requested semantic tag independent of size', () => {
    const { unmount } = setup(
      <Heading as="h3" size="display">
        Hello
      </Heading>,
    );
    expect(screen.getByRole('heading', { level: 3 })).toBeInTheDocument();
    unmount();
  });

  it('renders h1 when requested', () => {
    const { unmount } = setup(<Heading as="h1">Title</Heading>);
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    unmount();
  });
});
