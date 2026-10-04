import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }

  * {
    margin: 0;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    font-family: ${({ theme }) => theme.fonts.body};
    font-size: 1rem;
    line-height: 1.65;
    -webkit-font-smoothing: antialiased;
    /* Safety net: no stray wide child may push the page sideways on small
       screens. Clip (unlike hidden) keeps sticky positioning working. */
    overflow-x: clip;
  }

  h1, h2, h3 {
    font-family: ${({ theme }) => theme.fonts.display};
    font-weight: 500;
    line-height: 1.12;
    letter-spacing: -0.01em;
  }

  img {
    display: block;
    max-width: 100%;
  }

  a {
    color: inherit;
  }

  ::selection {
    background: ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.accentContrast};
  }

  :focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.plumpDeep};
    outline-offset: 3px;
  }

  @media (prefers-reduced-motion: reduce) {
    html {
      scroll-behavior: auto;
    }
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      transition-duration: 0.01ms !important;
    }
  }
`;
