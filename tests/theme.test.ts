import { describe, it, expect } from 'vitest';
import { theme } from '../src/theme';

const legacyColors: Record<string, string> = {
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
};

const expectedFonts = {
  display: "'Cormorant Garamond', Garamond, Georgia, 'Times New Roman', serif",
  body: "'Inter', -apple-system, 'Segoe UI', system-ui, sans-serif",
};

const legacySpacing = {
  xs: '0.5rem',
  sm: '1rem',
  md: '1.5rem',
  lg: '2.5rem',
  xl: '4rem',
  section: '7rem',
  sectionMobile: '4rem',
};

describe('theme tokens', () => {
  it('preserves every legacy color with its original value', () => {
    for (const [key, value] of Object.entries(legacyColors)) {
      expect(theme.colors[key as keyof typeof theme.colors]).toBe(value);
    }
  });

  it('uses self-hosted font stacks (intentional Phase 1 change)', () => {
    expect(theme.fonts).toEqual(expectedFonts);
  });

  it('preserves legacy spacing, radius, and breakpoints', () => {
    expect(theme.spacing).toEqual(legacySpacing);
    expect(theme.radius.sm).toBe('0.5rem');
    expect(theme.radius.md).toBe('0.75rem');
    expect(theme.breakpoints.md).toBe('768px');
    expect(theme.breakpoints.lg).toBe('1024px');
  });

  it('has the new token groups and keys', () => {
    expect(Object.keys(theme).sort()).toEqual([
      'breakpoints',
      'colors',
      'fontSizes',
      'fontWeights',
      'fonts',
      'layout',
      'letterSpacings',
      'lineHeights',
      'motion',
      'radius',
      'range',
      'rangeThemes',
      'shadows',
      'spacing',
      'zIndex',
    ]);
    expect(theme.breakpoints.sm).toBe('480px');
    expect(theme.breakpoints.xl).toBe('1280px');
    expect(theme.breakpoints.xxl).toBe('1440px');
    expect(theme.radius.lg).toBe('1.25rem');
    expect(theme.radius.pill).toBe('999px');
    expect(theme.fontSizes.display).toBeTruthy();
    expect(theme.layout.container.standard).toBe('72rem');
    expect(theme.motion.durations.base).toBe(0.4);
    expect(theme.rangeThemes.plump.deep).toBe('#2C4763');
    expect(theme.rangeThemes.clear.deep).toBe('#3F6034');
  });
});
