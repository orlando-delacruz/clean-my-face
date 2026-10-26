/**
 * Small color helpers for the design system.
 *
 * New code must use withAlpha(theme.colors.x, a) for translucent variants
 * instead of adding new rgba tokens to the theme. The existing alpha tokens
 * (e.g. text35, gold68) are frozen for identical-rendering guarantees and
 * must not be extended.
 *
 * NOTE (tokens guard): this file builds an rgba() string at runtime from
 * caller input, so it contains the format template once. The matching
 * allowlist entry in tests/tokens.test.ts documents this exception; the
 * format template is not a hardcoded color.
 */

function parseHex(color: string): [number, number, number] {
  const hex = color.startsWith('#') ? color.slice(1) : color;
  if (/^[0-9a-fA-F]{3}$/.test(hex)) {
    const [r, g, b] = hex.split('').map((c) => parseInt(c + c, 16));
    return [r, g, b];
  }
  if (/^[0-9a-fA-F]{6}$/.test(hex)) {
    return [
      parseInt(hex.slice(0, 2), 16),
      parseInt(hex.slice(2, 4), 16),
      parseInt(hex.slice(4, 6), 16),
    ];
  }
  throw new Error(
    `withAlpha received invalid color ${JSON.stringify(color)}. Expected a 3- or 6-digit hex string.`,
  );
}

/**
 * Return an rgba() string for a hex color at the given alpha.
 * Alpha must be a number between 0 and 1 inclusive.
 */
export function withAlpha(color: string, alpha: number): string {
  if (typeof alpha !== 'number' || Number.isNaN(alpha) || alpha < 0 || alpha > 1) {
    throw new Error(
      `withAlpha received invalid alpha ${String(alpha)} for color ${JSON.stringify(color)}. Expected a number between 0 and 1 inclusive.`,
    );
  }
  const [r, g, b] = parseHex(color);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
