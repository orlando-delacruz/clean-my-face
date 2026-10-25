import '@testing-library/jest-dom/vitest';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../../theme';
import { TextureSwatch } from './TextureSwatch';

describe('TextureSwatch', () => {
  it('always exposes an accessible name', () => {
    const { unmount } = render(
      <ThemeProvider theme={theme}>
        <TextureSwatch color={theme.colors.plumpTint} label=" milky essence " />
      </ThemeProvider>,
    );
    expect(screen.getByRole('img')).toHaveAccessibleName();
    unmount();
  });
});
