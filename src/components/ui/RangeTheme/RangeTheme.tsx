import { ThemeProvider } from 'styled-components';
import type { ReactNode } from 'react';
import { theme } from '../../../theme';

/**
 * RangeTheme: overrides theme.range for its children.
 */
export type RangeId = 'plump' | 'clear';

export function getRangeTheme(id: RangeId) {
  return theme.rangeThemes[id];
}

export function RangeTheme({
  id,
  children,
}: {
  id: RangeId;
  children: ReactNode;
}) {
  const range = getRangeTheme(id);
  return <ThemeProvider theme={{ ...theme, range }}>{children}</ThemeProvider>;
}
