import '@testing-library/jest-dom/vitest';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import { theme } from '../../../theme';
import type { CmfTheme } from '../../../theme';
import { RangeTheme, getRangeTheme } from './RangeTheme';

function Probe() {
  const current = useContext(ThemeContext) as CmfTheme;
  return <span>{current.range.deep}</span>;
}

describe('RangeTheme', () => {
  it('overrides theme.range for children', () => {
    const { unmount } = render(
      <RangeTheme id="clear">
        <Probe />
      </RangeTheme>,
    );
    expect(screen.getByText(theme.rangeThemes.clear.deep)).toBeInTheDocument();
    unmount();
  });

  it('returns the typed range theme', () => {
    expect(getRangeTheme('plump')).toEqual(theme.rangeThemes.plump);
  });
});
