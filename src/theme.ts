import 'styled-components';

export interface CmfTheme {
  colors: {
    background: string;
    surface: string;
    text: string;
    muted: string;
    border: string;
    accent: string;
    accentContrast: string;
    plumpTint: string;
    clearTint: string;
    plumpDeep: string;
    clearDeep: string;
    gold: string;
    surfaceInverse: string;
    textInverse: string;
    mutedInverse: string;
    borderStrong: string;
    borderInverse: string;
    plumpSoft: string;
    clearSoft: string;
    scrimSoft: string;
    scrimStrong: string;
    focus: string;
    focusInverse: string;
    error: string;
    errorSurface: string;
    success: string;
    successSurface: string;
    surfaceWarm: string;
    inkDark: string;
    cardDark: string;
    heroScrim: string;
    rangeScrim: string;
    black: string;
    textInverse03: string;
    textInverse05: string;
    textInverse10: string;
    textInverse14: string;
    textInverse35: string;
    textInverse40: string;
    textInverse48: string;
    textInverse72: string;
    textInverse82: string;
    textInverse88: string;
    surface75: string;
    surface72: string;
    surface88: string;
    gold14: string;
    gold28: string;
    gold32: string;
    gold35: string;
    gold55: string;
    gold68: string;
    text12: string;
    text22: string;
    text25: string;
    text28: string;
    text32: string;
    text35: string;
    text38: string;
    text40: string;
    text45: string;
    text50: string;
    text70: string;
    black35: string;
    black60: string;
    heroScrim18: string;
    heroScrim44: string;
    heroScrim60: string;
    heroScrim78: string;
    heroScrim88: string;
    heroScrim92: string;
    rangeScrim04: string;
    rangeScrim52: string;
    rangeScrim84: string;
    background16: string;
    background28: string;
  };
  fonts: {
    display: string;
    body: string;
  };
  fontSizes: {
    display: string;
    h1: string;
    h2: string;
    h3: string;
    title: string;
    bodyLg: string;
    body: string;
    small: string;
    eyebrow: string;
  };
  lineHeights: {
    tight: string;
    heading: string;
    snug: string;
    body: string;
  };
  letterSpacings: {
    tight: string;
    heading: string;
    normal: string;
    eyebrow: string;
  };
  fontWeights: {
    regular: number;
    medium: number;
    semibold: number;
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    section: string;
    sectionMobile: string;
  };
  layout: {
    container: {
      narrow: string;
      standard: string;
      wide: string;
    };
    gutter: string;
    section: {
      tight: string;
      base: string;
      loose: string;
    };
    sectionMobile: {
      tight: string;
      base: string;
      loose: string;
    };
  };
  radius: {
    sm: string;
    md: string;
    lg: string;
    pill: string;
  };
  shadows: {
    soft: string;
    lifted: string;
  };
  breakpoints: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
    xxl: string;
  };
  zIndex: {
    base: number;
    raised: number;
    sticky: number;
    overlay: number;
    modal: number;
    skip: number;
  };
  motion: {
    durations: {
      fast: number;
      base: number;
      slow: number;
      slower: number;
    };
    css: {
      fast: string;
      base: string;
      slow: string;
      slower: string;
    };
    easings: {
      standard: [number, number, number, number];
      emphasized: [number, number, number, number];
      exit: [number, number, number, number];
    };
    cssEasings: {
      standard: string;
      emphasized: string;
      exit: string;
    };
  };
  rangeThemes: {
    plump: {
      tint: string;
      deep: string;
      soft: string;
      ink: string;
    };
    clear: {
      tint: string;
      deep: string;
      soft: string;
      ink: string;
    };
  };
  range: {
    tint: string;
    deep: string;
    soft: string;
    ink: string;
  };
}

declare module 'styled-components' {
  export interface DefaultTheme extends CmfTheme {}
}

export const theme: CmfTheme = {
  colors: {
    background: '#FAF7F1',
    surface: '#FFFFFF',
    text: '#211A13',
    muted: '#6E6459',
    border: '#E6DCCC',
    accent: '#B0C5E0',
    accentContrast: '#211A13',
    plumpTint: '#B0C5E0',
    clearTint: '#D3E2C1',
    plumpDeep: '#2C4763',
    clearDeep: '#3F6034',
    gold: '#C9A96A',
    surfaceInverse: '#121814',
    textInverse: '#FFFDF8',
    mutedInverse: '#B9B2A6',
    borderStrong: '#CBBFAA',
    borderInverse: '#2C3530',
    plumpSoft: '#DFE8F3',
    clearSoft: '#EDF3E6',
    scrimSoft: 'rgba(18, 24, 20, 0.35)',
    scrimStrong: 'rgba(18, 24, 20, 0.62)',
    focus: '#2C4763',
    focusInverse: '#FFFDF8',
    error: '#9C2B2B',
    errorSurface: '#F7E6E4',
    success: '#3F6034',
    successSurface: '#EDF3E6',
    surfaceWarm: '#EDE4D3',
    inkDark: '#1B231E',
    cardDark: '#17110B',
    heroScrim: '#0E1310',
    rangeScrim: '#0C0906',
    black: '#000000',
    textInverse03: 'rgba(255, 253, 248, 0.03)',
    textInverse05: 'rgba(255, 253, 248, 0.05)',
    textInverse10: 'rgba(255, 253, 248, 0.1)',
    textInverse14: 'rgba(255, 253, 248, 0.14)',
    textInverse35: 'rgba(255, 253, 248, 0.35)',
    textInverse40: 'rgba(255, 253, 248, 0.4)',
    textInverse48: 'rgba(255, 253, 248, 0.48)',
    textInverse72: 'rgba(255, 253, 248, 0.72)',
    textInverse82: 'rgba(255, 253, 248, 0.82)',
    textInverse88: 'rgba(255, 253, 248, 0.88)',
    surface75: 'rgba(255, 255, 255, 0.75)',
    surface72: 'rgba(255, 255, 255, 0.72)',
    surface88: 'rgba(255, 255, 255, 0.88)',
    gold14: 'rgba(201, 169, 106, 0.14)',
    gold28: 'rgba(201, 169, 106, 0.28)',
    gold32: 'rgba(201, 169, 106, 0.32)',
    gold35: 'rgba(201, 169, 106, 0.35)',
    gold55: 'rgba(201, 169, 106, 0.55)',
    gold68: 'rgba(201, 169, 106, 0.68)',
    text12: 'rgba(33, 26, 19, 0.12)',
    text22: 'rgba(33, 26, 19, 0.22)',
    text25: 'rgba(33, 26, 19, 0.25)',
    text28: 'rgba(33, 26, 19, 0.28)',
    text32: 'rgba(33, 26, 19, 0.32)',
    text35: 'rgba(33, 26, 19, 0.35)',
    text38: 'rgba(33, 26, 19, 0.38)',
    text40: 'rgba(33, 26, 19, 0.4)',
    text45: 'rgba(33, 26, 19, 0.45)',
    text50: 'rgba(33, 26, 19, 0.5)',
    text70: 'rgba(33, 26, 19, 0.7)',
    black35: 'rgba(0, 0, 0, 0.35)',
    black60: 'rgba(0, 0, 0, 0.6)',
    heroScrim18: 'rgba(14, 19, 16, 0.18)',
    heroScrim44: 'rgba(14, 19, 16, 0.44)',
    heroScrim60: 'rgba(14, 19, 16, 0.6)',
    heroScrim78: 'rgba(14, 19, 16, 0.78)',
    heroScrim88: 'rgba(14, 19, 16, 0.88)',
    heroScrim92: 'rgba(14, 19, 16, 0.92)',
    rangeScrim04: 'rgba(12, 9, 6, 0.04)',
    rangeScrim52: 'rgba(12, 9, 6, 0.52)',
    rangeScrim84: 'rgba(12, 9, 6, 0.84)',
    background16: 'rgba(250, 247, 241, 0.16)',
    background28: 'rgba(250, 247, 241, 0.28)',
  },
  fonts: {
    display: "'Cormorant Garamond', Garamond, Georgia, 'Times New Roman', serif",
    body: "'Inter', -apple-system, 'Segoe UI', system-ui, sans-serif",
  },
  fontSizes: {
    display: 'clamp(3rem, 2.2rem + 4vw, 6rem)',
    h1: 'clamp(2.5rem, 1.9rem + 3vw, 4.5rem)',
    h2: 'clamp(2rem, 1.6rem + 2vw, 3.25rem)',
    h3: 'clamp(1.5rem, 1.3rem + 1vw, 2rem)',
    title: 'clamp(1.25rem, 1.15rem + 0.5vw, 1.5rem)',
    bodyLg: 'clamp(1.0625rem, 1rem + 0.3vw, 1.25rem)',
    body: '1rem',
    small: '0.875rem',
    eyebrow: '0.75rem',
  },
  lineHeights: {
    tight: '1.05',
    heading: '1.12',
    snug: '1.3',
    body: '1.65',
  },
  letterSpacings: {
    tight: '-0.02em',
    heading: '-0.01em',
    normal: '0',
    eyebrow: '0.16em',
  },
  fontWeights: {
    regular: 400,
    medium: 500,
    semibold: 600,
  },
  spacing: {
    xs: '0.5rem',
    sm: '1rem',
    md: '1.5rem',
    lg: '2.5rem',
    xl: '4rem',
    section: '7rem',
    sectionMobile: '4rem',
  },
  layout: {
    container: {
      narrow: '44rem',
      standard: '72rem',
      wide: '90rem',
    },
    gutter: 'clamp(1.25rem, 4vw, 3rem)',
    section: {
      tight: '4rem',
      base: '7rem',
      loose: '10rem',
    },
    sectionMobile: {
      tight: '3rem',
      base: '4rem',
      loose: '6rem',
    },
  },
  radius: {
    sm: '0.5rem',
    md: '0.75rem',
    lg: '1.25rem',
    pill: '999px',
  },
  shadows: {
    soft: '0 1px 2px rgba(33, 26, 19, 0.06), 0 8px 24px rgba(33, 26, 19, 0.06)',
    lifted: '0 2px 4px rgba(33, 26, 19, 0.08), 0 16px 40px rgba(33, 26, 19, 0.12)',
  },
  breakpoints: {
    sm: '480px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    xxl: '1440px',
  },
  zIndex: {
    base: 0,
    raised: 10,
    sticky: 100,
    overlay: 200,
    modal: 300,
    skip: 1000,
  },
  motion: {
    durations: {
      fast: 0.2,
      base: 0.4,
      slow: 0.8,
      slower: 1.2,
    },
    css: {
      fast: '200ms',
      base: '400ms',
      slow: '800ms',
      slower: '1200ms',
    },
    easings: {
      standard: [0.22, 1, 0.36, 1],
      emphasized: [0.16, 1, 0.3, 1],
      exit: [0.4, 0, 1, 1],
    },
    cssEasings: {
      standard: 'cubic-bezier(0.22, 1, 0.36, 1)',
      emphasized: 'cubic-bezier(0.16, 1, 0.3, 1)',
      exit: 'cubic-bezier(0.4, 0, 1, 1)',
    },
  },
  rangeThemes: {
    plump: {
      tint: '#B0C5E0',
      deep: '#2C4763',
      soft: '#DFE8F3',
      ink: '#2C4763',
    },
    clear: {
      tint: '#D3E2C1',
      deep: '#3F6034',
      soft: '#EDF3E6',
      ink: '#3F6034',
    },
  },
  range: {
    tint: '#B0C5E0',
    deep: '#2C4763',
    soft: '#DFE8F3',
    ink: '#2C4763',
  },
};