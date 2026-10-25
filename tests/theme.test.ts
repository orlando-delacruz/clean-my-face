import { describe, it, expect } from 'vitest';
import { theme } from '../src/theme';

describe('theme tokens', () => {
  it('records the current top-level token groups', () => {
    expect(Object.keys(theme).sort()).toEqual([
      'breakpoints',
      'colors',
      'fonts',
      'radius',
      'spacing',
    ]);
  });

  it('records the current color token keys', () => {
    expect(Object.keys(theme.colors).sort()).toEqual([
      'accent',
      'accentContrast',
      'background',
      'border',
      'clearDeep',
      'clearTint',
      'gold',
      'muted',
      'plumpDeep',
      'plumpTint',
      'surface',
      'text',
    ]);
  });

  it('records the current spacing token keys', () => {
    expect(Object.keys(theme.spacing).sort()).toEqual([
      'lg',
      'md',
      'section',
      'sectionMobile',
      'sm',
      'xl',
      'xs',
    ]);
  });
});