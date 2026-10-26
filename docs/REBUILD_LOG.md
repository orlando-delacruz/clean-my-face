# Rebuild Log

## Phase 0 — Baseline and Test Infrastructure

Date: 2026-10-25

### Prior-session work (legacy Phase 1-4)

- Commit hash: `5b5d266`
- Commit message: `chore: snapshot prior-session work before brand rebuild baseline`
- Tag: `pre-rebuild-baseline`
- Branch created: `rebuild/brand-experience`
- `main` was not modified.

### What was done

- Committed uncommitted prior-session changes as a single snapshot commit.
- Created and switched to `rebuild/brand-experience`.
- Added test infrastructure: Vitest, Testing Library, jsdom, Playwright.
- Added npm scripts: `typecheck`, `test`, `test:watch`, `test:e2e`, `check`.
- Added test setup in `tests/setup.ts`.
- Added Vitest config in `vite.config.ts`.
- Added Playwright config in `playwright.config.ts`.
- Added baseline tests in `tests/content.test.ts`, `tests/routing.test.tsx`, `tests/accessibility.test.tsx`, `tests/theme.test.ts`, and `tests/e2e/smoke.spec.ts`.
- Added asset inventory script and output.
- Rewrote `docs/ARCHITECTURE.md` and `docs/FRONTEND.md`.
- Created baseline measurement files.

### Commands to reproduce

- `npm ci` was blocked by an OS-level file lock. Fallback: `npm install`.
- `npx tsc --noEmit`
- `npm run lint`
- `npm run build`
- `npm run typecheck`
- `npm run test`
- `npm run test:e2e`
- `npm run check`
- `node scripts/asset-inventory.mjs`

### Baseline numbers

- Lighthouse mobile: Performance 0.51, Accessibility 1.00, Best Practices 1.00, SEO 0.92; FCP 2.5 s, LCP 18.6 s, TBT 870 ms, CLS 0, Speed Index 2.9 s, TTI 19.5 s.
- Lighthouse desktop: Performance 0.79, Accessibility 1.00, Best Practices 1.00, SEO 0.92; FCP 0.7 s, LCP 3.1 s, TBT 160 ms, CLS 0, Speed Index 1.0 s, TTI 3.2 s.
- JS bundle: 508.15 KB minified / 151.45 KB gzip in the current build.
- Vitest: 31 passed.
- Playwright Chromium: 92 passed across 3 consecutive runs.

### Notes

- The live deployment is older than the local repository and was not deployed in this phase.
- No visual or behavioral source changes were made in Phase 0 except test and documentation files.

## Phase 0 Fix Pass

Date: 2026-10-25

### What was done

- Verified `package.json` only adds allowed devDependencies and scripts.
- Compared package-lock files: 85 packages added, 0 removed, 0 pre-existing version changes.
- Fixed `npm ci` by removing `node_modules` and reinstalling.
- Reconciled bundle sizes: live 374,502 bytes raw / 107,136 bytes gzip; baseline tag and branch head 508,156 bytes raw / 150,252 bytes gzip.
- Updated tests for image-map count, required product fields, and focus-return gap.
- Updated Playwright config to port 4174 with `reuseExistingServer: false`.
- Rewrote `docs/ARCHITECTURE.md` with reconciled bundle numbers and repository conventions.
- Confirmed focus after Escape is on `body`, not the toggle.

### Validation

- `npm run check`: passed.
- Playwright Chromium: 92 passed plus one expected failure for focus return.

### Notes

- The live bundle is smaller because it is an older deployment.
- No `src/` files were changed.

## Phase 1 — Brand System V2 (foundation)

Date: 2026-10-26

### Commits (all on `rebuild/brand-experience`, none pushed)

- `97d917d` chore(types): typecheck tests, scripts and configs
- `7028461` feat(fonts): self-host Inter and Cormorant Garamond, remove Google Fonts
- `1a1cc8f` feat(theme): brand tokens v2 and contrast tests
- `c867bf9` refactor(tokens,ui): replace hardcoded colors with tokens; split primitives into src/components/ui
- `7190bc1` feat(ui): add Heading, Text, Eyebrow, Chip, Divider, TextureSwatch, MediaFrame, Parallax, RangeTheme
- `7fd0040` feat(system): dev-only /_system design system page
- docs(phase-1) commit follows (docs only)
- Tag `phase-1-complete` created after the docs commit.

### What changed

- Type coverage: added `tsconfig.tests.json` (strict) covering `tests/`, `scripts/`, `vite.config.ts`; wired into `tsconfig.json` references. App config (`tsconfig.app.json`) intentionally left non-strict (pre-existing; enabling it is an open question).
- Fonts: installed `@fontsource-variable/inter` and `@fontsource/cormorant-garamond`; self-hosted latin woff2 via `?url` imports in `src/styles/fonts.ts`; removed Google Fonts tags from `index.html`; display face is now Cormorant Garamond via the single `theme.fonts.display` token. Homepage woff2 total 118,368 bytes (budget 160 KB).
- Theme: rewrote `src/theme.ts` (Brand System V2). All legacy keys kept with identical values except `fonts` (intentional swap). Added colors (inverse/range/feedback/overlay/warm-neutral tokens), fluid `fontSizes`, `lineHeights`, `letterSpacings`, `fontWeights`, `layout`, breakpoints sm/xl/xxl, `radius` lg/pill, `shadows`, `zIndex`, `motion` presets, `rangeThemes` + current `range`. Added `src/styles/media.ts` (`up()` helper; existing sections not converted).
- Primitives: split `src/components/primitives.tsx` into `src/components/ui/<Name>/` (Container, Section, EyebrowRow, SectionRule, SectionTitle, Lead, Button, TextAction, SkipLink, Reveal) with barrel export; migrated all imports; deleted `primitives.tsx`. Props, defaults, and CSS values preserved.
- New primitives: Heading, Text, Eyebrow, Chip, Divider, TextureSwatch, MediaFrame, Parallax, RangeTheme (+ `getRangeTheme`), each with tests.
- Hardcoded colors: replaced all hex/rgba literals outside `theme.ts` with tokens or `color-mix()` equivalents (identical values). Guard test `tests/tokens.test.ts` passes with 0 matches and empty allowlist.
- System page: dev-only `/_system` (`src/pages/SystemPage.tsx`, `React.lazy` + `import.meta.env.DEV`), absent from production bundle (marker check).
- Docs: updated `docs/TECH_STACK.md` (font deps), rewrote `docs/FRONTEND.md` and affected `docs/ARCHITECTURE.md` sections.

### Commands to reproduce

- `npx tsc --showConfig -p tsconfig.app.json`
- `npm run typecheck`
- `npm run lint`
- `npm run test`
- `npm run build`
- `npm run check`
- `npx playwright test`
- `npx lighthouse <preview-url> --quiet --output=json ... --chrome-flags="--headless=new"` (mobile default, `--preset=desktop` for desktop)
- `node scripts/asset-inventory.mjs`

### Before/after numbers

- JS bundle: Phase 0 508,156 raw / 150,252 gzip; Phase 1 `index-BRLYSh0B.js` 517,495 raw (Vite 517.49 kB) / 152,442 gzip node-method (Vite 153.67 kB). Delta +9,339 raw from tokens, primitives, fonts wiring, and App lazy wrapper. Fonts ship as separate woff2 (118,368 bytes total), not in JS.
- Lighthouse mobile: Performance 0.48 (was 0.51), Accessibility 1.00, Best Practices 1.00, SEO 0.92; FCP 0.7 s, LCP 18.6 s (hero image, unchanged), TBT 1,730 ms (noisy local), CLS 0, Speed Index 2.9 s, TTI 19.5 s.
- Lighthouse desktop: Performance 0.75 (was 0.79), Accessibility 1.00, Best Practices 1.00, SEO 0.92; FCP 0.2 s, LCP 3.3 s (was 3.1 s), TBT 200 ms, CLS 0.006, Speed Index 1.0 s, TTI 3.5 s.
- Third-party hosts contacted on `/`: none (only the preview origin).
- Vitest: all passing (incl. fonts, contrast, tokens, theme, SystemPage tests).
- Playwright Chromium: smoke 93 + fonts 5 + system 1 passing.

### Notes

- Only intentional visual change: display typeface (Garamond fallback to self-hosted Cormorant Garamond) and body font loading method (Google Fonts to self-hosted Inter, same family).
- `tsconfig.app.json` `strict`: Phase 1 left it implicit; the fix pass proved strict was already effectively on (canary errors TS7006/TS2322/TS18048 with no explicit flag) and made it explicit. Zero new errors.
- The live deployment is older than the local repository and was not deployed in this phase.

## Phase 1 Fix Pass

Date: 2026-10-26

### What was done

- FIX A (computed-style regression proof): built phase-0-complete in a temp worktree plus the HEAD build, served on ports 4181/4182, and compared every element's color-related computed properties (17 props x element x ::before/::after, 390/1440 widths, reduced motion). Result after harness fixes: 7,808 shared elements, 398,208 properties, 0 differences; interactive states (hover/focus on / and one product page): 161 shared states, 2,737 properties, 0 differences. Only removed keys: the 3 Google Fonts `<link>` tags (intentional). Added `npm run snapshot:styles` (`scripts/computed-style-snapshot.mjs`).
- FIX A found and fixed one real defect: ProductCard dark-tone hover shadow rendered `none` because a token replacement left a template interpolation inside a plain string (`'... ${({ theme }) => ...} ...'`). Fixed to backtick templates with the imported theme (`black60`/`text35` tokens, values identical to the old literals).
- FIX B (strict): canary file proved strict already effective (TS7006/TS2322/TS18048 with no explicit flag; TypeScript 6 defaults). Added explicit `"strict": true` to `tsconfig.app.json`; 0 new errors.
- FIX C (bundle guard): renamed MediaFrame `placeholder` to `standIn`; `data-stand-in` renders only when `import.meta.env.DEV` is true (absent from `dist/`, verified). Added `scripts/check-bundle.mjs` + `npm run check:bundle` (appended to `check`); proves failure modes (forbidden markers, allowlist, strict picsum gate). Em-dash scan of `src/`: only 2 hits, both in comments in `src/data/images.ts` — no rendered-copy violation.
- FIX D (withAlpha): added `src/styles/color.ts` (`withAlpha(theme.colors.x, a)`, validated, throwing real errors) with colocated tests; documented in `docs/FRONTEND.md` that new code must use it instead of adding rgba tokens.
- FIX E (repo hygiene): `.env.local` never committed and untracked (contents never printed); index already all-LF so only `.gitattributes` added (no renormalize); build byte-identical before/after (517,101 raw / 152,678 gzip). Lockfile has linux-x64 (gnu+musl) resolved+integrity entries for every native family with a win32-x64 entry (@rolldown, @oxlint, lightningcss) — no deployment risk. `npm ci` fails locally with EPERM on the Rolldown `.node` binary (no owned process holds it; likely antivirus/indexer); recovered with `npm install` (lockfile untouched).
- FIX F (AGENTS.md): rewrote in full; stale rules updated (tests exist, Motion for React approved, docs accurate, ui/ layout, token-only colors, self-hosted fonts, dev-only /_system and standIn, internal-metadata rule, same-commit TECH_STACK rows).
- FIX G (review package): assembled in the fix report.
- FIX H (image intake): `scripts/measure-image-usage.mjs` + `npm run measure:images`; measured /, first product per range, 390/1440, DPR 1/2. Wrote `docs/baseline/image-usage.md` (+ raw JSON to gitignored `test-results/`). 6 unreferenced images listed as removal candidates (not deleted). Sharp feasibility proven in `%TEMP%/sharp-test` (NOT added to repo): hero.png 1,504,507 B -> 960px AVIF 25,408 B, WebP 17,538 B, no errors.

### Validation

- `npm run check` green (typecheck, lint, Vitest, build, check-bundle).
- Vitest: 66 passed (incl. withAlpha, tokens guard, fonts, SystemPage, contrast suites).
- Playwright Chromium: 99 passed x3 consecutive runs (smoke 93 + fonts 5 + system 1).
- Tokens guard: 0 unallowlisted matches; 3 documented allowlist entries (withAlpha helper + its tests).
- Bundle: `dist/assets/index-C5i6rkQy.js`, 517,101 raw / 152,678 gzip. Marker and `data-stand-in` absent from `dist/`.
- Lighthouse (final tree, local preview): mobile perf 0.51, CLS 0, LCP 18.7 s (hero); desktop perf 0.76, CLS 0.006, LCP 3.2 s. Third-party hosts on `/`: none.

### Notes

## Playwright Removal

Date: 2026-10-26

### What was done

- Removed Playwright and all browser-based e2e tests: `playwright.config.ts`, `tests/e2e/` (smoke, fonts, system, images), `scripts/computed-style-snapshot.mjs`, `scripts/measure-image-usage.mjs`, `scripts/geometry-snapshot.mjs`.
- Removed `@playwright/test` from devDependencies and the `test:e2e`, `snapshot:styles`, `snapshot:geometry`, and `measure:images` npm scripts.
- Updated `check` to run typecheck, lint, test, build, and check:bundle only.
- Updated `tsconfig.tests.json` (dropped `playwright.config.ts` from include) and `vite.config.ts` (dropped the `tests/e2e` exclude entry).
- AGENTS.md updated: Vitest-only testing, no automated browser testing.
- Added `docs/QA_CHECKLIST.md` for manual QA by the project owner.

### Validation

- `npm run typecheck`, `npm run test`, `npm run lint`, `npm run build`, and `npm run check` pass after removal.
- Originals in `images/` untouched. No `src/` visual or copy changes.

### Notes

- Historical Playwright references in earlier REBUILD_LOG entries are retained as project history.
- Automated browser testing must not be re-added without an explicit requirement and a `docs/TECH_STACK.md` row in the same commit.
