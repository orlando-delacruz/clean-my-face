import '@testing-library/jest-dom/vitest';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../../theme';
import { Text } from './Text';

describe('Text', () => {
  it('renders body text', () => {
    const { unmount } = render(
      <ThemeProvider theme={theme}>
        <Text>Body copy</Text>
      </ThemeProvider>,
    );
    expect(screen.getByText('Body copy')).toBeInTheDocument();
    unmount();
  });

  it('applies muted tone', () => {
    const { unmount } = render(
      <ThemeProvider theme={theme}>
        <Text tone="muted">Muted</Text>
      </ThemeProvider>,
    );
    expect(screen.getByText('Muted')).toBeInTheDocument();
    unmount();
  });
});
