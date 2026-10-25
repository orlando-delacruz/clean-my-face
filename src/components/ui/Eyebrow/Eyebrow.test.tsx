import '@testing-library/jest-dom/vitest';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../../theme';
import { Eyebrow } from './Eyebrow';

describe('Eyebrow', () => {
  it('renders label text', () => {
    const { unmount } = render(
      <ThemeProvider theme={theme}>
        <Eyebrow>Label</Eyebrow>
      </ThemeProvider>,
    );
    expect(screen.getByText('Label')).toBeInTheDocument();
    unmount();
  });
});
