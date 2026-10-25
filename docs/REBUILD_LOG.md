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

- Type coverage: added `tsconfig.tests.json` (strict) covering `tests/`, `scripts/`, `playwright.config.ts`, `vite.config.ts`; wired into `tsconfig.json` references. App config (`tsconfig.app.json`) intentionally left non-strict (pre-existing; enabling it is an open question).
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
- `tsconfig.app.json` `strict` is not effectively true (pre-existing); tests config is strict. Asked as an open question, not enabled silently.
- The live deployment is older than the local repository and was not deployed in this phase.
