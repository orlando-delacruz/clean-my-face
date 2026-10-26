import '@testing-library/jest-dom/vitest';
import { describe, it, expect } from 'vitest';
import { withAlpha } from './color';

describe('withAlpha', () => {
  it('expands 6-digit hex', () => {
    expect(withAlpha('#B0C5E0', 0.5)).toBe('rgba(176, 197, 224, 0.5)');
  });

  it('expands 3-digit hex', () => {
    expect(withAlpha('#fff', 1)).toBe('rgba(255, 255, 255, 1)');
  });

  it('accepts boundary alphas 0 and 1', () => {
    expect(withAlpha('#000000', 0)).toBe('rgba(0, 0, 0, 0)');
    expect(withAlpha('#000000', 1)).toBe('rgba(0, 0, 0, 1)');
  });

  it('throws with the offending input for invalid hex', () => {
    expect(() => withAlpha('#12', 0.5)).toThrow(/#12/);
    expect(() => withAlpha('xyz', 0.5)).toThrow(/3- or 6-digit hex/);
  });

  it('throws with the offending input for invalid alpha', () => {
    expect(() => withAlpha('#B0C5E0', -0.1)).toThrow(/-0\.1/);
    expect(() => withAlpha('#B0C5E0', 2)).toThrow(/between 0 and 1/);
    expect(() => withAlpha('#B0C5E0', Number.NaN)).toThrow(/between 0 and 1/);
  });
});
