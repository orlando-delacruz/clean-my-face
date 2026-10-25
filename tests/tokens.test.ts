import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';

const allowlist: Array<{ file: string; pattern: string; reason: string }> = [];

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
        const allowed = allowlist.some(
          (a) => file.endsWith(a.file) && literal.includes(a.pattern),
        );
        if (!allowed) {
          offenders.push({ file: path.relative(process.cwd(), file), line: idx + 1, literal });
        }
      }
      funcRe.lastIndex = 0;
      while ((m = funcRe.exec(text)) !== null) {
        offenders.push({ file: path.relative(process.cwd(), file), line: idx + 1, literal: m[0] });
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
