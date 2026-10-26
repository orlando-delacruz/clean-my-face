/**
 * check-bundle: fail the build if internal metadata leaked into production output.
 *
 * Usage:
 *   node scripts/check-bundle.mjs [--dir=dist] [--strict]
 *
 * Scans .js/.css/.html files under --dir (default: dist/).
 * FAILS (exit 1) when a forbidden internal marker is found, printing the
 * file and the surrounding context of each match.
 * WARNs (exit 0) on "picsum.photos" stand-in imagery; with --strict a
 * picsum match FAILS instead (this is the future launch blocker).
 *
 * NOTE on scope: the generic words "pending" and "placeholder" are
 * deliberately NOT forbidden. React internals and the standard HTML
 * placeholder attribute legitimately contain them; forbidding the bare
 * words would produce false positives. Only the exact dev-only markers
 * listed in FORBIDDEN fail the check.
 */
import fs from 'node:fs';
import path from 'node:path';

// The single allowed placeholder-like string: draft legal copy that is
// knowingly shipped pending client approval (see docs/REBUILD_LOG.md).
const ALLOWLIST = ['[effective date to be confirmed]'];

const FORBIDDEN = [
  /OQ-\d+/,
  'data-placeholder',
  'data-stand-in',
  'PLACEHOLDER_INVENTORY',
  'CLAIM_REVIEW',
  'NEEDS_CLIENT_APPROVAL',
  'OPEN_QUESTION',
  'CMF_SYSTEM_PAGE_MARKER',
  /\bTBD\b/,
];

function parseArgs(argv) {
  const out = { dir: 'dist', strict: false };
  for (const a of argv) {
    if (a.startsWith('--dir=')) out.dir = a.slice('--dir='.length);
    else if (a === '--strict') out.strict = true;
    else throw new Error(`Unknown arg "${a}". Usage: node scripts/check-bundle.mjs [--dir=dist] [--strict]`);
  }
  return out;
}

function walk(d, acc = []) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const f = path.join(d, e.name);
    if (e.isDirectory()) walk(f, acc);
    else if (/\.(js|css|html)$/.test(e.name)) acc.push(f);
  }
  return acc;
}

function snippet(text, index, length) {
  const start = Math.max(0, index - 40);
  const end = Math.min(text.length, index + length + 40);
  return JSON.stringify(text.slice(start, end));
}

function main() {
  const { dir, strict } = parseArgs(process.argv.slice(2));
  if (!fs.existsSync(dir)) {
    throw new Error(`check-bundle: directory does not exist: ${dir} (run from the repository root)`);
  }
  console.log(`check-bundle: allowlist has exactly ${ALLOWLIST.length} entr${ALLOWLIST.length === 1 ? 'y' : 'ies'}:`);
  for (const a of ALLOWLIST) console.log(`  allowlisted: ${a}`);

  const files = walk(dir);
  let failures = 0;
  const picsumFiles = [];
  let picsumCount = 0;

  for (const f of files) {
    const rel = path.relative(process.cwd(), f);
    let text = fs.readFileSync(f, 'utf8');
    for (const a of ALLOWLIST) text = text.split(a).join('');
    for (const pattern of FORBIDDEN) {
      if (typeof pattern === 'string') {
        let i = text.indexOf(pattern);
        while (i !== -1) {
          failures++;
          console.log(`FORBIDDEN "${pattern}" in ${rel}: ...${snippet(text, i, pattern.length)}...`);
          i = text.indexOf(pattern, i + 1);
        }
      } else {
        // Fresh non-global regex per file so matching always starts at 0
        // and cannot loop: exec advances lastIndex on its own.
        const re = new RegExp(pattern.source, 'g');
        let m = re.exec(text);
        while (m !== null) {
          failures++;
          console.log(`FORBIDDEN ${pattern} in ${rel}: ...${snippet(text, m.index, m[0].length)}...`);
          m = re.exec(text);
        }
      }
    }
    const pm = text.match(/picsum\.photos/g) || [];
    if (pm.length > 0) {
      picsumCount += pm.length;
      picsumFiles.push(rel);
    }
  }

  if (picsumFiles.length > 0) {
    console.log(
      `${strict ? 'FAIL' : 'WARN'}: "picsum.photos" appears ${picsumCount} time(s) in: ${picsumFiles.join(', ')}`,
    );
    if (strict) failures++;
  }

  if (failures > 0) {
    console.log(`check-bundle: FAILED with ${failures} forbidden match(es) in ${dir}/`);
    process.exit(1);
  }
  console.log(`check-bundle: PASS (${files.length} files scanned in ${dir}/)`);
}

try {
  main();
} catch (error) {
  console.error(`check-bundle ERROR: ${error && error.message ? error.message : error}`);
  console.error('context: failed while parsing args, walking the directory, or reading a file (see above)');
  process.exit(2);
}
