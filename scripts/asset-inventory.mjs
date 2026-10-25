import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const scanDirs = ['src', 'public', 'images'];
const exts = new Set(['.png','.jpg','.jpeg','.gif','.webp','.svg','.ico','.woff','.woff2','.ttf','.otf','.mp4','.webm','.avif']);

function walk(dir, out) {
  out = out || [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'node_modules' || entry.name === 'dist' || entry.name === '.git') continue;
      walk(full, out);
    } else if (exts.has(path.extname(entry.name).toLowerCase())) {
      out.push(full);
    }
  }
  return out;
}

function readDimensions(filePath) {
  const buf = fs.readFileSync(filePath);
  const ext = path.extname(filePath).toLowerCase();
  if (ext === '.png' && buf.length >= 24) {
    return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
  }
  if (ext === '.gif' && buf.length >= 10) {
    return { width: buf.readUInt16LE(6), height: buf.readUInt16LE(8) };
  }
  if (ext === '.webp' && buf.length >= 30) {
    const riff = buf.toString('ascii', 0, 4);
    const webp = buf.toString('ascii', 8, 12);
    if (riff === 'RIFF' && webp === 'WEBP') {
      const chunk = buf.toString('ascii', 12, 16);
      if (chunk === 'VP8 ' && buf.length >= 30) {
        return { width: buf.readUInt16LE(26), height: buf.readUInt16LE(28) };
      }
      if (chunk === 'VP8L' && buf.length >= 25) {
        const b0 = buf[21], b1 = buf[22], b2 = buf[23], b3 = buf[24];
        const width = 1 + (((b1 & 0x3f) << 8) | b0);
        const height = 1 + (((b3 & 0x0f) << 10) | (b2 << 2) | ((b1 & 0xc0) >> 6));
        return { width: width, height: height };
      }
      if (chunk === 'VP8X' && buf.length >= 30) {
        const width = 1 + (buf[24] | (buf[25] << 8) | (buf[26] << 16));
        const height = 1 + (buf[27] | (buf[28] << 8) | (buf[29] << 16));
        return { width: width, height: height };
      }
    }
  }
  if ((ext === '.jpg' || ext === '.jpeg') && buf.length >= 2) {
    let i = 2;
    while (i < buf.length - 9) {
      if (buf[i] !== 0xff) { i++; continue; }
      const marker = buf[i + 1];
      if (marker === 0xd8 || marker === 0xd9 || (marker >= 0xd0 && marker <= 0xd7)) { i += 2; continue; }
      if (marker === 0xc0 || marker === 0xc1 || marker === 0xc2 || marker === 0xc3 || marker === 0xc5 || marker === 0xc6 || marker === 0xc7 || marker === 0xc9 || marker === 0xca || marker === 0xcb || marker === 0xcd || marker === 0xce || marker === 0xcf) {
        const height = buf.readUInt16BE(i + 5);
        const width = buf.readUInt16BE(i + 7);
        return { width: width, height: height };
      }
      const len = buf.readUInt16BE(i + 2);
      i += 2 + len;
    }
  }
  if (ext === '.svg') {
    const text = buf.toString('utf8');
    const viewBox = text.match(/viewBox=["']\s*[\d.]+\s+[\d.]+\s+([\d.]+)\s+([\d.]+)/i);
    if (viewBox) return { width: Math.round(Number(viewBox[1])), height: Math.round(Number(viewBox[2])) };
    const w = text.match(/\bwidth=["'](\d+(?:\.\d+)?)(?:px)?["']/i);
    const h = text.match(/\bheight=["'](\d+(?:\.\d+)?)(?:px)?["']/i);
    if (w && h) return { width: Math.round(Number(w[1])), height: Math.round(Number(h[1])) };
  }
  return null;
}

function findReferences(relPath) {
  const base = path.basename(relPath);
  const refs = new Set();
  function searchDir(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        if (entry.name === 'node_modules' || entry.name === 'dist' || entry.name === '.git') continue;
        searchDir(full);
      } else if (/\.(ts|tsx|js|jsx|css|md|html)$/.test(entry.name)) {
        const content = fs.readFileSync(full, 'utf8');
        const normalized = relPath.replace(/\\/g, '/');
        if (content.includes(base) || content.includes(normalized)) refs.add(path.relative(root, full));
      }
    }
  }
  searchDir(path.join(root, 'src'));
  searchDir(path.join(root, 'docs'));
  if (fs.existsSync(path.join(root, 'index.html'))) {
    const content = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
    if (content.includes(base)) refs.add('index.html');
  }
  return [...refs].sort();
}

const files = [];
for (const d of scanDirs) {
  for (const f of walk(path.join(root, d))) {
    files.push(path.relative(root, f));
  }
}

const rows = files.map((rel) => {
  const full = path.join(root, rel);
  const stat = fs.statSync(full);
  const dims = readDimensions(full);
  const refs = findReferences(rel);
  return {
    path: rel.replace(/\\/g, '/'),
    type: path.extname(rel).slice(1).toLowerCase(),
    dimensions: dims ? (dims.width + 'x' + dims.height) : 'unknown',
    bytes: stat.size,
    references: refs.length ? refs.join(', ') : '(none found)',
  };
}).sort((a, b) => b.bytes - a.bytes);

const outDir = path.join(root, 'docs', 'baseline');
fs.mkdirSync(outDir, { recursive: true });
const lines = [];
lines.push('# Baseline Asset Inventory');
lines.push('');
lines.push('Generated: ' + new Date().toISOString());
lines.push('');
lines.push('| Path | Type | Dimensions | Bytes | Referenced by |');
lines.push('|---|---|---:|---:|---|');
for (const r of rows) {
  lines.push('| `' + r.path + '` | ' + r.type + ' | ' + r.dimensions + ' | ' + r.bytes + ' | ' + r.references + ' |');
}
lines.push('');
lines.push('Total assets: ' + rows.length);
lines.push('Total bytes: ' + rows.reduce((s, r) => s + r.bytes, 0));
fs.writeFileSync(path.join(outDir, 'asset-inventory.md'), lines.join('\n') + '\n');
console.log('Wrote ' + rows.length + ' assets to docs/baseline/asset-inventory.md');
console.log('Top 5:');
for (const r of rows.slice(0, 5)) console.log(r.path, r.bytes, r.dimensions);
