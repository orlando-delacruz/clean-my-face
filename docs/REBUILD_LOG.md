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

## Phase 2: Image pipeline

Date: 2026-10-26

### Commits (on rebuild/brand-experience, on top of phase-1-fixed)

- d30e2ca feat(images): add sharp devDependency and TECH_STACK row
- 3aa231e feat(images): build-time optimizer, derivative manifest, generated output ignored
- c1509b7 feat(ui): ResponsiveImage and ResponsiveBackground primitives with tests
- 7a3e65a feat(images): migrate hero, sections and cards to responsive images
- 0c33f62 perf(lcp): hero preload with generated variants
- 3bfffc8 feat(phase-2): tests, geometry snapshot script, ResponsiveBackground tag prop
- 5e9b1a3 chore(test): remove Playwright e2e setup and snapshot scripts
- cc2101b chore(test): update check script, Vitest config, tsconfig references
- 49bd086 docs: manual QA checklist and docs update for Playwright removal

### Derivative totals (measured with fs.statSync in scripts/optimize-images.mjs)

- Original source files referenced by the manifest: 86 files, 11,971,798 bytes on disk.
- Delivered variants in public/img/: 84 files, 1,167,717 bytes. (manifest.json itself is 24,821 bytes and is not counted in the variant total.)
- The manifest excludes 9 files (additional-img-1/2/4/5/6, two unreferenced product PNGs, three unreferenced HEARTLEAF/GEL/BALANCING PNGs, and public/og-image.png). No files were deleted.
- Quality settings: AVIF quality 55, effort 4; WebP quality 75. Metadata stripped. Never upscale: 26 requested widths were skipped because they exceeded their source width, and 0 derivatives were larger than their original.

### Audit findings and fixes in this pass

- The first Phase 2 audit found 13 declared widths that exceeded their source width. These were never produced (the optimizer skips them), but they remained listed in scripts/image-manifest.mjs and in VARIANT_WIDTHS in src/data/images.ts. This pass removed them: CLEANSING BALM/CLEANSING BALM.png (640), ESSENCE TONER/ESSENCE TONER.png (480, 640), dry spot rescue balm/dry spot rescue balm.png (480, 640), 2-bha-gel-cleanser/2-bha-gel-cleanser.png (480, 640), EXFOLIATING TONER/EXFOLIATING TONER.png (480, 640), CLARIFYING CLAY MASK/CLARIFYING CLAY MASK.png (480, 640), and blemish-mark-spot-treatment/blemish-mark-spot-treatment.png (480, 640).
- The default Vitest run timed out on two suites under parallel jsdom load. Capped maxWorkers to 2 in vite.config.ts. The default run now passes three consecutive times (21 files, 88 tests).
- Playwright and all browser-based e2e tests were removed (see the Playwright Removal entry above). Manual QA is now the project owner's responsibility.

### Known limitations

The supplied images are used at their current sizes. Some will look soft on high-density (retina) screens, and larger source files are not planned for this prototype. See docs/IMAGE_LIMITATIONS.md.

### UNVERIFIED (owner's manual checks)

- Real browser bytes on first load for / at 390 and 1440 (expect roughly 350 KB at 390 and 450 KB at 1440, down from about 9.4 MB before).
- Hero crop on desktop and mobile, including object-position and the 1.02 scale.
- The preload link for the hero image in dist/index.html.
- Any 404 responses in the Network tab.
- Reduced motion behavior.

### Notes

- docs/baseline/image-usage.md is retained. A byte-identical copy exists at docs/baseline/image-usage-phase-1.md for Phase 1 reference.
- Automated browser testing must not be re-added without an explicit requirement and a docs/TECH_STACK.md row in the same commit.

## Phase 3: Redesign plan and rules

Date: 2026-10-27

### What was done

- Created `docs/REDESIGN_PLAN.md`: the redesign source of truth for phases 4 to 12 (north star, scope decisions D1 to D7, flow and sitemap, copy deck, visual direction, homepage and page specifications, image roles, phase list). Written verbatim from the owner's brief.
- Created `docs/STAND_INS.md`: the Picsum stand-in registry for the nine stand-in image roles in plan section 8. Delete a row when the real image replaces it.
- Rewrote `AGENTS.md` in full: added the Redesign standing rules (11 items), pointed the docs list at `docs/REDESIGN_PLAN.md`, and added the StandInImage and `docs/STAND_INS.md` rule to the Images section. All still-valid rules kept.
- Rewrote `docs/QA_CHECKLIST.md` in full: added the Redesign header explaining that each phase appends its own manual QA section.

### Files

- Modified: `AGENTS.md`, `docs/QA_CHECKLIST.md`, `docs/REBUILD_LOG.md`.
- Created: `docs/REDESIGN_PLAN.md`, `docs/STAND_INS.md`.
- No file under `src/`, `public/`, `images/`, `scripts/`, or `tests/` was changed.

### Validation

- `git diff --stat -- src/ public/ images/ scripts/ tests/` empty.
- `npm run check` passed: typecheck, lint, Vitest (21 files, 88 tests), build, check:bundle.
- `npm audit --omit=dev`: found 0 vulnerabilities.

### Notes

- Documentation only. Phase 3 introduces no visual or behavioral change.
- Tag `phase-3-candidate` created. The owner does the final tag.

## Phase 4: Foundations and the global shell

Date: 2026-10-27

### Commits (on rebuild/brand-experience, none pushed)

- `15fad94` feat(data): add redesign site, home and range copy
- `891e457` feat(ui): add StandInImage, SnapRow and SectionHeader
- `1758ecb` feat(layout): move header and footer, add range routes
- `3c0cfc9` fix(home): add temporary anchor aliases for shell links
- docs(phase-4) commit follows (this commit)

### What changed

- Data: added `src/data/site.ts` (nav, header CTA, footer groups, legal links, brand statement, social link registry), `src/data/home.ts` (every homepage copy id from plan 4.2 plus homepage labels), and `src/data/rangePages.ts` (plump and clear range copy, slugs, and all 4.3 labels). Strings are copied from the plan or reused from `content.ts`; `src/data/content.ts` was not modified.
- Shared UI: added `StandInImage` (Picsum img wrapped in MediaFrame, `cmf-` seed guard, dev-only marker), `SnapRow` (mobile scroll-snap row with hidden scrollbar, keyboard focus, lg grid via `columns`), and `SectionHeader` (Eyebrow + Heading + Text). Exported from `src/components/ui/index.ts`. No tests added.
- Layout: moved `Header` and `Footer` to `src/components/layout/<Name>/` (component and index). Updated `App.tsx` and the single test import. Deleted the old `src/sections/Header.tsx` and `src/sections/Footer.tsx` after confirming nothing imported them.
- Header: kept sticky behavior, scroll-spy active link, Escape handling with focus return, resize close, and the skip-link target. Added transparent inverse text on `/` and valid range pages until 24px of scroll, solid cream elsewhere; nav and CTA from `site.ts`; full-screen mobile menu with focus trap, scroll lock, range shortcut cards, 44px targets, and focusInverse rings on dark.
- Footer: rewritten dark with inverse tokens, links from `site.ts`, legal links, and a social row that renders only for real URLs. The previous placeholder socials (all `#`) are not rendered.
- Routes: `/ranges/plump-it-up` and `/ranges/stay-clear` render a temporary minimal `RangePage` (h1 range name, range support copy, current `RangeSystem` reused as-is). Any other `/ranges/<x>` renders `NotFound`. `/_system` dev-only behavior is unchanged.
- No theme tokens added; no dependencies added.
- Home.tsx gained two zero-height anchor aliases (`#expertise`, `#solutions`) so the Phase 4 header and footer links land on the current homepage sections; they are removed when the redesigned sections arrive.

### Validation

- Each commit passed `npm run check` (typecheck, lint, Vitest 21 files / 88 tests, build, check:bundle).
- `check:bundle`: PASS (2 files scanned in dist/); no `data-stand-in` and no picsum string in production output (StandInImage is unused until Phase 5, so it is tree-shaken).
- Test edit: only the `Header` import path in `tests/accessibility.test.tsx` changed; no assertion changed.
- `npm audit` (full): 1 high severity in `vite@8.3.2`, a devDependency. Not fixed in this phase.

### UNVERIFIED (owner's manual checks)

- Header transparency, sticky state, active link, mobile menu layout, focus trap, scroll lock, and 44px targets in a real browser.
- Range page rendering at 360, 390, 430, 768, 1024, 1280 and 1440.
- Footer appearance and link behavior on every page.
- Focus rings on dark backgrounds.

### Notes

- `src/data/content.ts` is untouched; `navigation` and `footer` in it are now unused but retained.
- Tag `phase-4-candidate` created. The owner does the final tag.

## Phase 4 corrective pass

Date: 2026-10-27

### What was done

- Patched the dev-only vite advisory by installing `vite@8.3.3` (was 8.3.2). Only `vite` changed in `package.json` and `package-lock.json`; no other package moved.
- Updated `docs/TECH_STACK.md` vite row to 8.3.3 with the reason (patches dev-server advisories; dev dependency only).
- Moved the `phase-4-candidate` tag from `5af8d11` to `1f07f88` after the patch commit.

### Audit before and after

- Before: 1 high severity vulnerability in `vite@8.3.0 - 8.3.2` (dev dependency; GHSA-698v-4r3x-3vcv, GHSA-r825-w8mm-5pxw, GHSA-587h-7wmj-h5pm, GHSA-9jrq-w75r-8gcw, GHSA-rq7h-c2jc-7f22, GHSA-vfpm-58rq-9qcg).
- After: `found 0 vulnerabilities`.

### Task 2 grep results

- Footer social links: `grep -rn 'href="#"' src/components/layout/Footer/` and `to="#"` — no matches.
- Em dashes in rendered copy: `grep -rn "—" src/data/site.ts src/data/home.ts src/data/rangePages.ts` — no matches.
- Internal markers in bundle: `grep -rI "PLACEHOLDER_INVENTORY|OQ-|TBD|data-stand-in|picsum" dist/` — no text matches (binary PNG false positives excluded with -I).
- Temporary aliases present: `src/pages/Home.tsx` lines 31 and 33 (`<Anchor id="expertise" />`, `<Anchor id="solutions" />`).

### Validation

- `npm run check` passed (typecheck, lint, 21 files / 88 tests, build, check:bundle) with exit code 0.
- Dev server (`npm run dev`) started on http://localhost:5174/ (port 5173 in use) with Vite 8.3.3, no errors.
- `git status --short` empty after commit and tag move.

### Commit

- `1f07f88` chore(deps): patch vite dev-server advisories

## Phase 5: Homepage sections 01 to 03

Date: 2026-10-27

### Commits (on rebuild/brand-experience, none pushed)

- `b383e7d` feat(home): rebuild campaign hero and add ScrollCue
- `0a5a016` feat(home): add brand promise and expertise sections
- docs(phase-5) commit follows (this commit)

### What changed

- Removed the temporary `#expertise` alias from `src/pages/Home.tsx`; the real `Expertise` section now owns that id. Kept the `#solutions` alias until Phase 6.
- Removed the old `Philosophy` section from `Home.tsx` (file retained for now).
- Rewrote `src/sections/Hero.tsx`: full-viewport hero, copy from `src/data/home.ts`, primary button to `/#solutions`, secondary text link to `/#promise`, floating stand-in card (cmf-hero-texture) on desktop only, ScrollCue at the bottom, parallax on the image (distance 32, ~3.3%), no stats or pills. Object-position unchanged (62% 22% mobile, 68% 28% lg).
- Added `src/sections/BrandPromise.tsx` (id="promise"): cream, 7/5 grid, eyebrow, statement at display size, support, four pillars numbered 01 to 04 with hairline dividers, stand-in image (cmf-promise-texture) offset 4rem on desktop. Section uses overflow-x clip only.
- Added `src/sections/Expertise.tsx` (id="expertise"): dark surfaceInverse, gold numeral 20 (aria-hidden) beside the h2 headline, expertise support, two stand-in images (cmf-expertise-ingredient 4/5, cmf-expertise-lab 1/1) staggered with parallax, then formulation and innovation statements in a two-column row separated by a borderInverse hairline.
- Added `src/components/ui/ScrollCue/ScrollCue.tsx` and barrel export.
- Updated `docs/STAND_INS.md` status for the four seeds used to "in use (Phase 5)".

### Contrast (dark Expertise section, surfaceInverse #121814)

- textInverse #FFFDF8: 17.71:1
- mutedInverse #B9B2A6: 8.56:1
- gold #C9A96A (decoration only, display size): 8.03:1

### Validation

- Each commit passed `npm run check` (typecheck, lint, Vitest 21 files / 88 tests, build, check:bundle).
- `grep -rn 'id="expertise"' src/` shows exactly one match.
- No hex literals added; colors from tokens only.

### UNVERIFIED (owner's manual checks)

- Hero fill, headline legibility, parallax, floating card, scroll cue at 390 and 1440.
- Promise overlap and pillar numbering.
- Expertise numeral, staggered images, two-column statements.
- No horizontal scroll from 320 to 1440; reduced motion behavior.

### Notes

- Tag `phase-5-candidate` created. The owner does the final tag.

## Phase 6: Homepage sections 04 and 05

Date: 2026-10-27

### Commits (on rebuild/brand-experience, none pushed)

- `9dae3ff` feat(home): add gentle performance section
- `89b6b5f` feat(home): add RangePanel and skin solutions section
- docs(phase-6) commit follows (this commit)

### What changed

- Added `src/sections/GentlePerformance.tsx` (id="gentle"): surfaceWarm background, SectionHeader with gentle headline and support, three product columns resolved with findProductBySlug (throws with the real slug when missing). Each column: tall stand-in texture image (3/4), real packshot overlapping its lower corner, product name, tagline from content.ts, View product link. Desktop stagger 0/3rem/6rem (literals; no spacing token matches). Removes row: label plus four items as a list with thin dividers, then the note. Mobile uses SnapRow (itemWidth 78% with peek, columns 3 at lg).
- Added `src/components/ranges/RangePanel/` (RangePanel.tsx, index.ts): props rangeId, eyebrow, headline, support, skinType, href, standInSeed. Wraps content in RangeTheme; background theme.range.soft, text and button theme.range.deep, button text textInverse. Mood image (16/9) with soft overlay; hover and focus-within scale the image to 1.04 and lighten the overlay. Transitions from theme.motion tokens; disabled under prefers-reduced-motion. Only the button is a link.
- Added `src/sections/SkinSolutions.tsx` (id="solutions"): centered intro, two RangePanels 50/50 at lg and stacked below (min-height 78svh at lg, 560px stacked). Skin type text from skinNeeds data; button labels Explore Plump It Up and Explore Stay Clear link to the range pages.
- Rewrote `src/pages/Home.tsx`: Hero, BrandPromise, Expertise, GentlePerformance, SkinSolutions, Featured, Closing. Removed SkinNeeds, both RangeSystem blocks, RoutineGuide, and the temporary #solutions alias. Source files kept on disk.
- Updated `docs/STAND_INS.md` status for the five seeds used to "in use (Phase 6)".

### Contrast (range panels)

- plumpDeep #2C4763 on plumpSoft #DFE8F3: 7.76:1
- plumpDeep #2C4763 on plumpTint #B0C5E0: 5.44:1
- clearDeep #3F6034 on clearSoft #EDF3E6: 6.33:1
- clearDeep #3F6034 on clearTint #D3E2C1: 5.25:1
- textInverse #FFFDF8 on plumpDeep (button): 9.44:1
- textInverse #FFFDF8 on clearDeep (button): 7.04:1

All text pairs meet 4.5:1.

### Validation

- Each commit passed `npm run check` (typecheck, lint, Vitest 21 files / 88 tests, build, check:bundle).
- `grep -rn 'id="solutions"' src/` shows exactly one match; same for `id="gentle"`.
- Remaining `/#range-plump` and `/#range-clear` hrefs exist only in the unused `navigation` export of `src/data/content.ts` (untouched per constraints); nothing imports that export, and SkinNeeds (its only renderer) is off the homepage.
- No hex literals added; colors from tokens only, alpha via withAlpha.

### UNVERIFIED (owner's manual checks)

- Gentle stagger, snap row peek, packshot overlap, product links, Removes row.
- Solutions split, panel colors, hover and focus scale, button-only links.
- No horizontal scroll at any width; reduced motion behavior.
- Header Expertise link and Find your routine button landing.

### Notes

- Tag `phase-6-candidate` created. The owner does the final tag.

## Phase 7: Curated discovery, closing, contact, assembly

Date: 2026-10-27

### Commits (on rebuild/brand-experience, none pushed)

- `99cf8fa` feat(home): add curated discovery section
- `0f65c5f` feat(home): rewrite closing and add contact band
- docs(phase-7) commit follows (this commit)

### What changed

- Added `src/sections/CuratedDiscovery.tsx` (id="discover"): cream background, SectionHeader with eyebrow "Hero products" and heading "Where to begin". Three products from featured.picks (cleansing-balm, rice-barrier-cream-mask, 2-bha-gel-cleanser; 2-bha-gel-cleanser is Stay Clear step 02) resolved with findProductBySlug (throws with the real slug when missing). Correction: an earlier draft of this entry named balancing-daily-toner here; that was wrong and the code was not affected. Desktop bento: first card spans 7 columns over two rows, other two stacked in 5 columns (12-column grid from layout breakpoints). Each card: packshot on a field tinted with that product's range token (RangeTheme per card), step and role, name, tagline, View product link. Below: quiet text links Explore Plump It Up and Explore Stay Clear. Mobile: SnapRow (itemWidth 78% with peek, label "Curated products").
- Rewrote `src/sections/Closing.tsx` (id="closing"): full-bleed bg-mage-1.jpg through ResponsiveBackground (cover, center preserved), dark scrim from the rangeScrim token (#0C0906, layered at 86% by the primitive). Centered closing headline at display size, support in mutedInverse, exactly one button Find your routine to /#solutions. Form and social buttons removed.
- Added `src/sections/Contact.tsx` (id="contact"): cream quiet two-column band. Left: heading "Talk to us" and the closing lead verbatim. Right: the inquiry form moved from the old Closing with fields, validation messages, submit handler, and success state copied exactly; token styling only. Social links (all "#") not rendered.
- Rewrote `src/pages/Home.tsx`: Hero, BrandPromise, Expertise, GentlePerformance, SkinSolutions, CuratedDiscovery, Closing, Contact.
- Deleted with git rm (nothing imported them): `src/sections/Featured.tsx` (superseded by CuratedDiscovery), `src/sections/Philosophy.tsx` (superseded by BrandPromise), `src/sections/SkinNeeds.tsx` (superseded by SkinSolutions). Kept `src/sections/RangeSystem.tsx` and `src/sections/RoutineGuide.tsx` for Phase 8. Featured/closing exports in content.ts untouched.

### Form success text (verbatim) and delivery assessment

- Success text: "This concept preview does not send inquiries yet. Once connected, your message would go to the Peerpharm team."
- Assessment: it explicitly states nothing is sent, so it does not imply a message was delivered. No change made; no owner flag needed beyond this note.

### Validation

- Each commit passed `npm run check` (typecheck, lint, Vitest 21 files / 88 tests, build, check:bundle).
- Each homepage anchor id (hero, promise, expertise, gentle, solutions, discover, closing, contact) appears exactly once in src/.
- Heading outline: exactly one h1 (hero headline); h2s in section order with h3s beneath (pillars, statements, product names, panel headlines, card names); no duplicate ids.
- No hex literals added; colors from tokens only.

### UNVERIFIED (owner's manual checks)

- Whole-homepage walk at 1440 and 390; section differentiation; product grid appears once.
- Discover bento and snap row; card and range links.
- Closing readability and single button; contact validation and success state.
- Header Expertise/Contact links; hero button landing.
- Reduced motion; horizontal scroll; console errors.

### Notes

- Tag `phase-7-candidate` created. The owner does the final tag.

## Phase 8: Range pages

Date: 2026-10-27

### Commits (on rebuild/brand-experience, none pushed)

- `a3542c2` feat(ranges): add range page components and fix product links
- `77608b0` feat(ranges): assemble RangePage and delete legacy sections
- docs(phase-8) commit follows (this commit)

### What changed

- Added `src/components/ranges/RangeHero/` (RangeHero.tsx, index.ts): full-bleed tinted field via ResponsiveBackground (bg-image-2.png for plump, bg-image-3.png for clear, cover/center as RangeSystem used, tint from the range's soft token), page eyebrow/headline/support, range skin type and promise, system image as MediaFrame 4/3 on desktop. Slides under the sticky header with the same negative-margin pattern as the homepage hero. The h1 is the range headline.
- Added `src/components/ranges/SystemSteps/` (SystemSteps.tsx, index.ts): the range's products in step order (count from data) as an ol; desktop editorial rows alternating image side with large display step number, packshot, name, role, tagline, View product link; stacked cards on mobile.
- Added `src/components/ranges/RoutineGuideTabs/` (RoutineGuideTabs.tsx, index.ts): routine groups as tabs for the page's range. Preserved from RoutineGuide: tablist/tab/tabpanel roles, aria-selected, aria-controls, Left/Right/Home/End keys with focus following selection, group structure from routineGuide data. Restyled with tokens and range accents. Deleted `src/sections/RoutineGuide.tsx` after migration; no behavior lost (only the per-range tab switcher and section header were dropped, replaced by the page-chosen range and the Your routine heading).
- Added `src/components/ranges/RangeCrossover/` (RangeCrossover.tsx, index.ts): card to the other range in the other range's RangeTheme, with the other range's eyebrow, solutions.headline, and the Explore button linking to the other range page. Only the button links.
- Rewrote `src/pages/RangePage.tsx`: RangeTheme wrap, order RangeHero, SystemSteps, RoutineGuideTabs, RangeCrossover. Unknown range ids already route to NotFound in App.tsx (lines 30-36 lookup, 68-73 guard).
- Fixed two dead links in `src/pages/ProductPage.tsx`: the Back link and the See the full routine link pointed to `/#range-<id>` (anchors that no longer exist); both now point to `/ranges/<slug>` via rangePages. Header, footer, and CuratedDiscovery range links already pointed at the range routes; no change needed there.
- Deleted with git rm: `src/sections/RangeSystem.tsx` (superseded by RangeHero/SystemSteps), `src/sections/RoutineGuide.tsx` (superseded by RoutineGuideTabs). No remaining importers (verified by grep). No export from content.ts touched.
- Extended `MediaRatio` with `'4/3'` for the hero system image; fixed a stale RangeSystem mention in a ResponsiveBackground comment.

### Tab accessibility preserved (list)

- role="tablist" with aria-label per routine, role="tab" with aria-selected and aria-controls, role="tabpanel" with aria-labelledby.
- ArrowLeft/ArrowRight move selection, Home/End jump to first/last; preventDefault on handled keys.
- Focus follows selection via tabRefs; roving tabIndex (selected 0, others -1).
- Panel content re-animates per tab with fadeUp; disabled under prefers-reduced-motion.

### Header transparency over /ranges/*

- Header lines 395-401: `rangeSlug` from the path, `onRangePage = findRangePageBySlug(rangeSlug) !== null`, `transparent = (path === '/' || onRangePage) && !scrolled && !open`. Any valid range slug gets the transparent inverse header until 24px of scroll; unknown slugs render NotFound (solid header).

### Validation

- Each commit passed `npm run check` (typecheck, lint, Vitest 21 files / 88 tests, build, check:bundle).
- `grep -rI 'data-stand-in' dist/`: empty. `grep -rn "RangeSystem|src/sections/RoutineGuide" src/`: only the fixed comment (since corrected). `id="routine"`: no matches (no anchor needed; nothing links to it).
- No em dashes in new copy; colors from tokens only, alpha via withAlpha; copy from range data, rangePages.ts, and plan labels only.

### UNVERIFIED (owner's manual checks)

- Blue/green theme consistency hero to crossover at 1440 and 390.
- Six steps in order; View product links; tab mouse and keyboard behavior; routine copy.
- Crossover navigation; transparent header over hero; background fill; horizontal scroll.
- Reduced motion behavior.

### Notes

- Plan 7.1 item (5), a short closing line without the Find your routine button, was skipped: the task's page order ends at the crossover and no copy source exists for the line.
- Tag `phase-8-candidate` created. The owner does the final tag.

## Phase 9: Product page redesign

Date: 2026-10-27

### Commits (on rebuild/brand-experience, none pushed)

- `d11d825` refactor(product): move product components into components/product
- `5a8ad94` feat(product): redesign product page
- docs(phase-9) commit follows (this commit)

### What changed

- Moved `src/components/ProductCard.tsx` to `src/components/product/ProductCard/` (plus index.ts) and `src/components/ProductGallery.tsx` to `src/components/product/ProductGallery/` (plus index.ts); updated the ProductPage imports. `src/components/RoutineStep.tsx` still exists but is imported nowhere, so it was left in place rather than moved.
- Rewrote `src/pages/ProductPage.tsx` in RangeTheme for the product's range. Desktop two columns with the gallery sticky (top 5.5rem, documented constant; no header-height token exists); mobile stacks with the gallery on top and no sticky. Right column order: Back to range link, Step N of total label, h1 name, tagline, positioning, benefits, Key ingredients, Texture, How to use (only when usageSteps exists), Your routine (previous/next links plus position indicator; the missing side renders nothing), Related products (existing same-range logic, SnapRow on mobile).
- Product data, URLs, and copy untouched. usageSteps exists on three plump products only (04/05/06); the other nine render no How to use section. Texture section pairs one TextureSwatch with the textureNotes list. Ingredient tiles and gallery keep intrinsic sizes; packshot keeps the existing sizes string.

### Data fields used per section

- Back link: labels.backToRange, range route via rangePages. Step label: product.step, range.products.length, product.role. Heading: product.name. Copy: product.tagline, product.positioning. Benefits: product.benefits. Ingredients: product.ingredients plus gallery tiles via ingredientTiles, product.complex. Texture: product.textureNotes. How to use: product.usageSteps. Routine: range.products neighbors, labels.previousStep/nextStep. Related: same-range filter, ProductCard, range route link.

### Sizes strings

- Packshot: kept "(min-width: 1024px) 520px, 100vw" (5-column field of the 72rem container renders near 480px; full width below lg).
- Ingredient tiles and gallery thumbs: intrinsic sizes (3.5rem circles; no sizes string).
- Gallery has no thumbnail strip: the existing ProductGallery renders the hero image only by design, with detail tiles as circles beside their own copy. Preserved exactly.

### Sticky offset and document.title

- Sticky top 5.5rem: documented constant (header is 4.5rem; no header-height token in theme.layout). Mobile has no sticky.
- document.title behavior kept exactly: `${product.name} · ${range.name} | CleanMyFace`, restored on cleanup.

### Validation

- Each commit passed `npm run check` (typecheck, lint, Vitest 21 files / 88 tests, build, check:bundle).
- No em dashes in rendered copy; colors from tokens only; copy from product data and plan labels only.
- Post-change greps: no `data-stand-in` in dist; no old component import paths; every `/#` link resolves to an existing id.

### UNVERIFIED (owner's manual checks)

- Four-product pass (first/last of each range) at 1440 and 390 per the QA list.
- Sticky gallery, h1 order, ingredient tiles, snap row, prev/next edges, absent How to use, back link, solid header, reduced motion, horizontal scroll, console errors.

### Notes

- Tag `phase-9-candidate` created. The owner does the final tag.

## Phase 10: Legal pages, 404, route-change focus

Date: 2026-10-27

### Commits (on rebuild/brand-experience, none pushed)

- `475031b` feat(legal): restyle legal and 404 pages
- `612948d` feat(router): move focus to main on route change
- docs(phase-10) commit follows (this commit)

### What changed

- Rewrote `src/pages/LegalPage.tsx`: narrow reading column (layout.container.narrow), display-face title, updated date, draft notice verbatim, numbered sections with generous spacing from the document data, contact line, kept the back link to home. Desktop-only sticky "On this page" list (renders only when 4+ sections; both documents qualify with 10 and 11) using in-page anchors; each section id appears exactly once; no list on mobile. No legal text, data, or structure changed.
- Rewrote `src/pages/NotFound.tsx`: cream background, large aria-hidden display "404", kept the existing strings verbatim ("404", "This page is not here", the mistyped-address text, "Back to CleanMyFace"), one h1, links to home and both range pages via the router Link.
- Added `useRouteFocus` in `src/router.tsx` (separate documented effect, pathname-only, preventScroll focus on #main-content; no scroll logic touched) and called it in App. Added tabIndex={-1} to the main landmark in Home, RangePage, LegalPage, NotFound; ProductPage had no main-content id at all, so both id and tabIndex were added there.

### 404 strings kept (verbatim)

- "404" (numeral decoration, aria-hidden; also the existing small-caps label)
- "This page is not here" (h1)
- "The address may be mistyped, or the page may have moved. The CleanMyFace homepage is one click away."
- "Back to CleanMyFace"

### Route-change focus

- Implemented: the effect runs only when usePathname value changes, so hash-only navigation never retriggers it; focus uses preventScroll, so position stays owned by the existing scrollTo/rAF/hash-retry logic. No scrollTo added; verified by diff.
- Files changed for tabIndex: Home.tsx, RangePage.tsx, ProductPage.tsx (also gained the missing id), LegalPage.tsx, NotFound.tsx.

### Footer legal links

- Both footer legal links come from site.ts legalLinks and point to /privacy-policy and /terms-and-conditions, matching the App.tsx routes. Confirmed, no change needed.

### Validation

- Each commit passed `npm run check` (typecheck, lint, Vitest 21 files / 88 tests, build, check:bundle).
- No legal text changes; no em dashes in rendered copy; colors from tokens only.
- Post-build: no `data-stand-in` in dist; every main-content id listed per page file.

### UNVERIFIED (owner's manual checks)

- Legal reading column, title, date, draft notice at 1440/390; desktop section list jumps.
- 404 h1, numeral, and three links on unknown routes.
- Keyboard: first Tab after navigation enters new page content; scroll behavior unchanged.
- Footer legal links.

### Notes

- Tag `phase-10-candidate` created. The owner does the final tag.

## Phase 10.5: Corrective pass from the final review

Date: 2026-10-27

### Commits (on rebuild/brand-experience, none pushed)

- `aa1e3b3` fix(home): cream promise background and image overlap
- `4609f1c` fix(home): anchor hero copy lower-left on desktop
- docs(phase-10.5) commit follows (this commit)

### What changed

- `src/sections/BrandPromise.tsx`: section background `theme.colors.surface` to `theme.colors.background` (cream per plan 5.1). Adjacent sections (Hero, Expertise) are dark, so no light-on-light adjacency. Desktop image column gains `margin-bottom: -4rem`, `position: relative`, `z-index: 1` so the image crosses into the next section; the section keeps `overflow-x: clip` and no body/html overflow changed.
- `src/sections/Hero.tsx`: desktop (`md` and up) content alignment `center` to `flex-end`, so the copy sits lower-left; mobile was already bottom-anchored and unchanged. No copy or button changes.
- Added `docs/CLAIM_REVIEW.md`: internal review record (not rendered) with six rendered claims awaiting client confirmation (hypoallergenic line, R&D support line, innovation headline + support, cleansing headline + support). No tags added to src/.
- Corrected the Phase 7 entry: the clear step 02 curated pick is 2-bha-gel-cleanser (see fix 5 diff); code unaffected.
- Deleted `src/components/RoutineStep.tsx` (zero importers). Post-delete grep for RoutineStep in src/ is empty.

### Validation

- Each commit passed `npm run check` (typecheck, lint, Vitest 21 files / 88 tests, build, check:bundle).
- No em dashes in rendered copy; colors from tokens only; no copy changes.
- Post-build: no `data-stand-in` in dist; no internal markers in dist.

### UNVERIFIED (owner's manual checks)

- Cream promise distinct from dark neighbors; image overlap at 1440 without horizontal scroll or covered pillar text; hero lower-left at 1440, bottom full-width at 390.

### Notes

- Tag `phase-10.5-candidate` created. The owner does the final tag.
