import '@testing-library/jest-dom/vitest';
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../../theme';
import { Divider } from './Divider';

describe('Divider', () => {
  it('renders decorative divider hidden from assistive tech', () => {
    const { container, unmount } = render(
      <ThemeProvider theme={theme}>
        <Divider />
      </ThemeProvider>,
    );
    expect(container.querySelector('[aria-hidden="true"]')).not.toBeNull();
    unmount();
  });
});
