import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';

/**
 * Documented exceptions to the zero-hardcoded-colors rule. Each entry is
 * reviewed, not a loophole:
 * - src/styles/color.ts builds an rgba() string at runtime from caller input.
 *   The single `rgba(` format template is computation, not a hardcoded color.
 * - src/styles/color.test.ts feeds hex inputs and rgba expectations into that
 *   helper. Every literal in that file is a test input for the helper above,
 *   never a shipped product color.
 */
const allowlist: Array<{ file: string; pattern: string; reason: string }> = [
  {
    file: 'src/styles/color.ts',
    pattern: 'rgba(',
    reason: 'runtime format template of the withAlpha computation helper, not a hardcoded color',
  },
  {
    file: 'src/styles/color.test.ts',
    pattern: 'rgba(',
    reason: 'expected-value strings for withAlpha tests, not shipped product colors',
  },
  {
    file: 'src/styles/color.test.ts',
    pattern: '#',
    reason: 'hex inputs for withAlpha tests, not shipped product colors',
  },
];

function walk(dir: string, out: string[] = []): string[] {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'node_modules' || entry.name === 'dist') continue;
      walk(full, out);
    } else if (/\.(ts|tsx)$/.test(entry.name)) {
      out.push(full);
    }
  }
  return out;
}

function isAllowed(file: string, literal: string): boolean {
  const normalized = file.replace(/\\/g, '/');
  return allowlist.some((a) => normalized.endsWith(a.file) && literal.includes(a.pattern));
}

function scan(): Array<{ file: string; line: number; literal: string }> {
  const offenders: Array<{ file: string; line: number; literal: string }> = [];
  const hexRe = /[^a-zA-Z0-9#]#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})(?![0-9a-fA-F])/g;
  const funcRe = /\b(?:rgb|rgba|hsl|hsla)\s*\(/g;
  for (const file of walk(path.join(process.cwd(), 'src'))) {
    const normalized = file.replace(/\\/g, '/');
    if (normalized.endsWith('src/theme.ts')) continue;
    const lines = fs.readFileSync(file, 'utf8').split(/\r?\n/);
    lines.forEach((text, idx) => {
      if (/(href|to)=["']#/.test(text)) return;
      let m: RegExpExecArray | null;
      hexRe.lastIndex = 0;
      while ((m = hexRe.exec(text)) !== null) {
        const literal = m[0].trim();
        if (!isAllowed(file, literal)) {
          offenders.push({ file: path.relative(process.cwd(), file), line: idx + 1, literal });
        }
      }
      funcRe.lastIndex = 0;
      while ((m = funcRe.exec(text)) !== null) {
        if (!isAllowed(file, m[0])) {
          offenders.push({ file: path.relative(process.cwd(), file), line: idx + 1, literal: m[0] });
        }
      }
    });
  }
  return offenders;
}

describe('tokens guard', () => {
  it('has zero hardcoded color literals outside theme.ts', () => {
    const offenders = scan();
    console.log(`TOKEN_SCAN_MATCHES ${offenders.length}`);
    console.log(`ALLOWLIST ${allowlist.length}`);
    if (offenders.length > 0) {
      console.log(JSON.stringify(offenders.slice(0, 20), null, 2));
    }
    expect(offenders).toEqual([]);
  });
});
