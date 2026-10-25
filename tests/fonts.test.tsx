import { describe, it, expect } from 'vitest';
import { renderToString } from 'react-dom/server';
import { ServerStyleSheet, ThemeProvider } from 'styled-components';
import { theme } from '../src/theme';
import { GlobalStyle } from '../src/GlobalStyle';
import { fontFaces } from '../src/styles/fonts';

describe('self-hosted fonts', () => {
  it('declares @font-face for Inter and Cormorant Garamond', () => {
    expect(fontFaces).toContain("font-family: 'Inter'");
    expect(fontFaces).toContain("font-family: 'Cormorant Garamond'");
  });

  it('contains no remote font URL', () => {
    expect(fontFaces).not.toContain('fonts.googleapis.com');
    expect(fontFaces).not.toContain('fonts.gstatic.com');
    expect(fontFaces).not.toContain('http://');
    expect(fontFaces).not.toContain('https://');
  });

  it('GlobalStyle output contains @font-face for both families and no remote URL', () => {
    const sheet = new ServerStyleSheet();
    try {
      renderToString(
        sheet.collectStyles(
          <ThemeProvider theme={theme}>
            <GlobalStyle />
          </ThemeProvider>,
        ),
      );
      const css = sheet.getStyleTags();
      expect(css).toContain('@font-face');
      expect(css).toContain('Inter');
      expect(css).toContain('Cormorant Garamond');
      expect(css).not.toContain('fonts.googleapis.com');
      expect(css).not.toContain('fonts.gstatic.com');
    } finally {
      sheet.seal();
    }
  });
});
