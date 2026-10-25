import { describe, it, expect } from 'vitest';
import { theme } from '../src/theme';

function hexToRgb(hex: string): [number, number, number] {
  const clean = hex.replace('#', '');
  const full =
    clean.length === 3
      ? clean
          .split('')
          .map((c) => c + c)
          .join('')
      : clean;
  return [
    parseInt(full.slice(0, 2), 16),
    parseInt(full.slice(2, 4), 16),
    parseInt(full.slice(4, 6), 16),
  ];
}

function luminance(hex: string): number {
  const [r, g, b] = hexToRgb(hex).map((v) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function contrastRatio(a: string, b: string): number {
  const l1 = luminance(a);
  const l2 = luminance(b);
  const [hi, lo] = l1 >= l2 ? [l1, l2] : [l2, l1];
  return (hi + 0.05) / (lo + 0.05);
}

const pairs: Array<[string, string, string]> = [
  ['text/background', theme.colors.text, theme.colors.background],
  ['text/surface', theme.colors.text, theme.colors.surface],
  ['muted/background', theme.colors.muted, theme.colors.background],
  ['muted/surface', theme.colors.muted, theme.colors.surface],
  ['textInverse/surfaceInverse', theme.colors.textInverse, theme.colors.surfaceInverse],
  ['mutedInverse/surfaceInverse', theme.colors.mutedInverse, theme.colors.surfaceInverse],
  ['plumpDeep/plumpSoft', theme.colors.plumpDeep, theme.colors.plumpSoft],
  ['plumpDeep/plumpTint', theme.colors.plumpDeep, theme.colors.plumpTint],
  ['clearDeep/clearSoft', theme.colors.clearDeep, theme.colors.clearSoft],
  ['clearDeep/clearTint', theme.colors.clearDeep, theme.colors.clearTint],
  ['error/errorSurface', theme.colors.error, theme.colors.errorSurface],
  ['success/successSurface', theme.colors.success, theme.colors.successSurface],
  ['focus/background', theme.colors.focus, theme.colors.background],
  ['focusInverse/surfaceInverse', theme.colors.focusInverse, theme.colors.surfaceInverse],
];

describe('contrast', () => {
  for (const [name, fg, bg] of pairs) {
    it(`${name} meets minimum`, () => {
      const ratio = contrastRatio(fg, bg);
      const min = name.startsWith('focus') ? 3 : 4.5;
      expect(ratio, `${name}: ${fg} on ${bg} = ${ratio.toFixed(2)}`).toBeGreaterThanOrEqual(min);
    });
  }

  it('prints the full ratio table', () => {
    const table = pairs.map(([name, fg, bg]) => ({
      pair: name,
      ratio: Number(contrastRatio(fg, bg).toFixed(2)),
    }));
    console.log(JSON.stringify(table, null, 2));
    expect(table.length).toBe(pairs.length);
  });
});
