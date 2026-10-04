import 'styled-components';

/**
 * Design tokens: a provisional working scale (TBD per OQ-6: no brand palette,
 * typeface, or logo confirmed). Restrained neutral foundation + range primaries
 * supplied by the client (soft blue for Plump It Up, soft green for Stay Clear).
 * The pastels serve as fills and range surfaces with dark text; text accents
 * use the deep range inks (`plumpDeep`, `clearDeep`) to hold contrast.
 * `gold` is reserved for hairline details on dark surfaces.
 */
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
    /** Dark slate blue: text accents, focus, and hover ink for Plump contexts. */
    plumpDeep: string;
    /** Deep botanical green: text accents and hover ink for Stay Clear contexts. */
    clearDeep: string;
    /** Warm metallic hairline + hero detail, formalized from the hero treatment. */
    gold: string;
  };
  fonts: {
    display: string;
    body: string;
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
  radius: {
    sm: string;
    md: string;
  };
  breakpoints: {
    /** Provisional recommendation: final breakpoints unconfirmed (OQ-7). */
    md: string;
    lg: string;
  };
}

declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
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
  },
  fonts: {
    display: "Garamond, Georgia, 'Times New Roman', serif",
    body: "'Inter', -apple-system, 'Segoe UI', sans-serif",
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
  radius: {
    sm: '0.5rem',
    md: '0.75rem',
  },
  breakpoints: {
    md: '768px',
    lg: '1024px',
  },
};
