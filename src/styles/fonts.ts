import interLatinWoff2 from '@fontsource-variable/inter/files/inter-latin-wght-normal.woff2?url';
import cormorant400 from '@fontsource/cormorant-garamond/files/cormorant-garamond-latin-400-normal.woff2?url';
import cormorant500 from '@fontsource/cormorant-garamond/files/cormorant-garamond-latin-500-normal.woff2?url';
import cormorant500Italic from '@fontsource/cormorant-garamond/files/cormorant-garamond-latin-500-italic.woff2?url';

export const fontFaces = `
@font-face {
  font-family: 'Inter';
  src: url('${interLatinWoff2}') format('woff2');
  font-weight: 400 600;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Cormorant Garamond';
  src: url('${cormorant400}') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Cormorant Garamond';
  src: url('${cormorant500}') format('woff2');
  font-weight: 500;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Cormorant Garamond';
  src: url('${cormorant500Italic}') format('woff2');
  font-weight: 500;
  font-style: italic;
  font-display: swap;
}
`;
