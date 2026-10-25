import { theme } from '../theme';

export function up(key: keyof typeof theme.breakpoints): string {
  return `@media (min-width: ${theme.breakpoints[key]})`;
}
