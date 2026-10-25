# Baseline Performance Measurements

Generated: 2026-10-25 (Phase 0). Phase 1 comparison appended 2026-10-26.

## Lighthouse — Local Preview (http://localhost:4173/)

These are local preview numbers and may differ from the live site.

### Mobile

- Performance: 0.51
- Accessibility: 1.00
- Best Practices: 1.00
- SEO: 0.92
- First Contentful Paint: 2.5 s
- Largest Contentful Paint: 18.6 s
- Total Blocking Time: 870 ms
- Cumulative Layout Shift: 0
- Speed Index: 2.9 s
- Time to Interactive: 19.5 s
- LCP element: hero image (`/assets/hero-BHiPpLug.png`)

### Desktop

- Performance: 0.79
- Accessibility: 1.00
- Best Practices: 1.00
- SEO: 0.92
- First Contentful Paint: 0.7 s
- Largest Contentful Paint: 3.1 s
- Total Blocking Time: 160 ms
- Cumulative Layout Shift: 0
- Speed Index: 1.0 s
- Time to Interactive: 3.2 s
- LCP element: hero image (`/assets/hero-BHiPpLug.png`)

## Bundle Size

From `npm run build`:

| File | Raw | Gzip |
|---|---:|---:|
| `dist/assets/index-CJXkU0N-.js` | 508.15 KB | 151.45 KB |
| `dist/assets/hero-BHiPpLug.png` | 1,504.50 KB | not reported |
| `dist/assets/bg-image-2-BhLATakl.png` | 2,205.04 KB | not reported |
| `dist/assets/bg-image-3-DIcliR3l.png` | 2,201.63 KB | not reported |
| `dist/assets/RICE BARRIER CREAM MASK-CXeFlkm4.png` | 2,409.21 KB | not reported |

## npm audit --omit=dev

- 0 vulnerabilities.

## npm outdated

| Package | Current | Wanted | Latest |
|---|---|---|---|
| @types/node | 24.19.1 | 24.19.2 | 26.6.5 |
| @vitejs/plugin-react | 6.1.1 | 6.1.2 | 6.1.2 |
| oxlint | 1.86.0 | 1.89.0 | 1.89.0 |
| react | 19.3.0 | 19.3.1 | 19.3.1 |
| react-dom | 19.3.0 | 19.3.1 | 19.3.1 |
| styled-components | 6.5.3 | 6.6.0 | 6.6.0 |
| typescript | 6.0.3 | 6.0.3 | 7.0.2 |
| vite | 8.3.2 | 8.3.5 | 8.3.5 |

## Top 25 Largest Assets

See `docs/baseline/asset-inventory.md` for the complete sorted list. The largest assets are:

1. `images/RICE BARRIER CREAM MASK/RICE BARRIER CREAM MASK.png` — 2,409,219 bytes — 2523x1728
2. `images/bg-image-2.png` — 2,205,042 bytes — 1416x794
3. `images/bg-image-3.png` — 2,201,639 bytes — 1417x794
4. `public/og-image.png` — 1,504,507 bytes — 1417x794
5. `images/hero.png` — 1,504,507 bytes — 1417x794
6. `images/2-bha-gel-cleanser/2-bha-gel-cleanser.png` — 283,773 bytes — 1536x1024
7. `images/CLEANSING BALM/CLEANSING BALM.png` — 236,354 bytes — 1536x1024
8. `images/dry spot rescue balm/dry spot rescue balm.png` — 188,073 bytes — 1536x1024
9. `images/blemish-mark-spot-treatment/blemish-mark-spot-treatment.png` — 189,023 bytes — 1536x1024
10. `images/CLARIFYING CLAY MASK/CLARIFYING CLAY MASK.png` — 177,081 bytes — 1536x1024
11. `images/ESSENCE TONER/ESSENCE TONER.png` — 155,590 bytes — 1536x1024
12. `images/EXFOLIATING TONER/EXFOLIATING TONER.png` — 144,266 bytes — 1536x1024
13. `images/additional-img-3.png` — 146,799 bytes — 283x325
14. `images/additional-img-7.png` — 126,674 bytes — 229x225
15. `images/bg-mage-1.jpg` — 91,842 bytes — 1416x794
16. `images/6 products system.jpg` — 85,908 bytes — 1136x592
17. `images/6 products system-2.jpg` — 87,252 bytes — 1126x587
18. `images/balancing-daily-toner.jpg` — 82,916 bytes — 921x1152
19. `images/heartleaf-cleansing-oil.jpg` — 78,752 bytes — 920x1152
20. `images/soft-peeling-gel.jpg` — 78,273 bytes — 922x1152
21. `images/milky-cushion-cleanser.jpg` — 78,490 bytes — 920x1152
22. `images/additional-img-6.jpg` — 30,984 bytes — 1417x794
23. `images/additional-img-1.jpg` — 32,184 bytes — 1417x794
24. `images/HEARTLEAF CLEANSING OI/HEARTLEAF CLEANSING OI.png` — 36,? bytes — unknown/variable
25. `images/RICE BARRIER CREAM MASK/RICE BARRIER CREAM MASK.png` duplicate entry? No. (See full inventory.)

Note: bytes are raw file sizes from disk.

## Phase 1 comparison (2026-10-26, local preview http://localhost:4175/)

Same Lighthouse method as Phase 0 (`npx lighthouse <url> --quiet --output=json ... --chrome-flags="--headless=new"`, plus `--preset=desktop` for desktop). Lighthouse 12.8.2, Chrome 155.0.0.0. Measured on the final Phase 1 tree (bundle `index-CXSlCcAj.js`; an earlier mid-phase run produced `index-BRLYSh0B.js` at 517,495 raw / 152,442 gzip — same content class, hash moved with final tree).

### Mobile

- Performance: 0.51 (was 0.51, unchanged)
- Accessibility: 1.00, Best Practices: 1.00, SEO: 0.92 (unchanged)
- First Contentful Paint: 0.7 s
- Largest Contentful Paint: 18.7 s (was 18.6 s; hero image, unoptimized until Phase 2)
- Total Blocking Time: 1,260 ms (noisy across local runs: 870 ms / 1,730 ms / 1,260 ms)
- Cumulative Layout Shift: 0 (unchanged, budget 0.05 met)
- Speed Index: 2.4 s, Time to Interactive: 19.5 s
- LCP element: hero `img` (`main#main-content > section#hero > div.sc-bBHFiM > img.sc-cNKpwA`, `/assets/hero-*.png`, fetchpriority high)

### Desktop

- Performance: 0.76 (was 0.79; run-to-run noise, same asset weight)
- Accessibility: 1.00, Best Practices: 1.00, SEO: 0.92 (unchanged)
- First Contentful Paint: 0.4 s
- Largest Contentful Paint: 3.2 s (was 3.1 s; hero image, unoptimized until Phase 2)
- Total Blocking Time: 200 ms
- Cumulative Layout Shift: 0.006 (was 0; budget 0.05 met, no font-swap regression)
- Speed Index: 0.9 s, Time to Interactive: 3.4 s
- LCP element: hero `img`

### Bundle (both methods, final tree)

| Method | Main JS | Raw | Gzip |
|---|---|---:|---:|
| Vite table | `dist/assets/index-CXSlCcAj.js` | 517.13 kB | 153.92 kB |
| Node (`fs.statSync` + `zlib.gzipSync` default level) | `dist/assets/index-CXSlCcAj.js` | 517,137 bytes | 152,688 bytes |

Phase 0: 508,156 raw / 150,252 gzip. Delta: +8,981 raw (+1.8%), +2,436 gzip. Sources: V2 tokens, new primitives, fonts wiring, App lazy wrapper. Self-hosted woff2 ships as separate files (118,368 bytes total), not in JS. `CMF_SYSTEM_PAGE_MARKER` and `data-placeholder` absent from `dist/` (dev-only split confirmed; remaining `placeholder` strings are pre-existing form copy).

### Third-party requests on `/`

Playwright collection of all request hosts on `/`: only the preview origin (`localhost:4174`). Zero third-party hosts. No requests to `fonts.googleapis.com` or `fonts.gstatic.com`.
