import '@testing-library/jest-dom/vitest';
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../../theme';
import { MediaFrame } from './MediaFrame';

describe('MediaFrame', () => {
  it('sets aspect-ratio and stand-in attribute in dev', () => {
    const { container, unmount } = render(
      <ThemeProvider theme={theme}>
        <MediaFrame ratio="16/9" standIn>
          <img src="x.jpg" alt="" />
        </MediaFrame>
      </ThemeProvider>,
    );
    const wrapper = container.querySelector('[data-stand-in="true"]');
    expect(wrapper).not.toBeNull();
    unmount();
  });

  it('omits the stand-in attribute when standIn is false', () => {
    const { container, unmount } = render(
      <ThemeProvider theme={theme}>
        <MediaFrame ratio="16/9">
          <img src="x.jpg" alt="" />
        </MediaFrame>
      </ThemeProvider>,
    );
    const wrapper = container.querySelector('[data-stand-in]');
    expect(wrapper).toBeNull();
    unmount();
  });
});
