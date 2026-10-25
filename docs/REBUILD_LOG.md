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