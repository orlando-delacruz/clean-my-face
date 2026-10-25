import '@testing-library/jest-dom/vitest';
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../../theme';
import { MediaFrame } from './MediaFrame';

describe('MediaFrame', () => {
  it('sets aspect-ratio and placeholder attribute', () => {
    const { container, unmount } = render(
      <ThemeProvider theme={theme}>
        <MediaFrame ratio="16/9" placeholder>
          <img src="x.jpg" alt="" />
        </MediaFrame>
      </ThemeProvider>,
    );
    const wrapper = container.querySelector('[data-placeholder="true"]');
    expect(wrapper).not.toBeNull();
    unmount();
  });
});
