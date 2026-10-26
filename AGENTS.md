# AGENTS.md

Vite 8 + React 19 + TypeScript + styled-components v6 + Motion for React. Single-page marketing site with a few static routes. No backend, no CMS, no ecommerce, no analytics. Tests: Vitest (unit/integration) + Playwright (e2e, Chromium). No CI.

## Commands

- `npm run dev` / `npm run build` / `npm run preview` / `npm run lint` (oxlint, no config file)
- `npm run typecheck` for types (`tsc -b`; `build` runs it first, so a green build implies clean types)
- `npm run test` (Vitest, watch with `test:watch`), `npm run test:e2e` (Playwright)
- `npm run check` runs typecheck + lint + test + build + check:bundle, in that order, failing fast
- `npm run check:bundle` fails the build if internal metadata leaked into `dist/`
- `npm run snapshot:styles` records computed color styles per route for visual regression-proof baselines
- `npm run measure:images` records per-image usage (sizes, viewports, DPR) for the Phase 2 image pass
- **npm only.** Never pnpm/yarn/bun.

## TypeScript strictness (bites often)

`tsconfig.app.json` sets `strict: true`, `erasableSyntaxOnly` (no enums, namespaces, or parameter properties), `verbatimModuleSyntax` (use `import type` for type-only imports), and `noUnusedLocals`/`noUnusedParameters` (unused imports fail the build).

## Docs are the source of truth

Read before changing behavior: `docs/PROJECT.md` (scope), `docs/REQUIREMENTS.md` (FR/BR/CR rules + OQ open questions), `docs/TECH_STACK.md` (approved deps), `docs/UI_UX.md` (visual rules). `docs/ARCHITECTURE.md` and `docs/FRONTEND.md` describe the implemented system.

## Content rules (will fail review if broken)

- `src/data/content.ts` is the single content source. Product copy is client-approved: never invent ingredients, benefits, claims, or usage. Unresolved conflicts live in `PLACEHOLDER_INVENTORY` — report them, never silently resolve.
- Never render internal language in the UI **or ship it in the bundle**: no `OQ-*`, `pending`, `TBD`, `placeholder`, bracket notes. (A previous leak came from a data field that was bundled but unrendered; keep metadata in comments.)
- Internal metadata (statuses, review tags, stand-in registries) must never live in `src/` data that is bundled: keep it in `docs/` or `scripts/`, and detect stand-in imagery by scanning for `picsum.photos`.
- No em dashes in rendered copy.

## Images (`images/`)

- Filenames are filesystem labels, not copy. Never derive names/alt text from them. Two folders were renamed to URL-safe slugs (`2-bha-gel-cleanser`, `blemish-mark-spot-treatment`).
- Vite dev 404s on `%`/`+` in asset paths, so new assets must use slug-safe names (lowercase, hyphens). Spaces are tolerated but discouraged.
- Register every used image as an explicit static import in `src/data/images.ts` (`import.meta.glob` did not match reliably). `img()` returns `''` for unmapped paths and callers guard on it.

## Routing

Custom history router in `src/router.tsx` (no dependency). Routes: `/`, `/privacy-policy`, `/terms-and-conditions`, `/products/<slug>`, else `NotFound`. `/_system` is a dev-only design-system page: it must never exist in production (verify via the `CMF_SYSTEM_PAGE_MARKER` bundle check). `vercel.json` rewrites everything to `index.html`. Always navigate via `Link`/`navigate()` — never raw `<a href>` for in-app links — and use `/#anchor` form for homepage sections so they work from any page.

## Design conventions

- styled-components, co-located, one styling system. `radius.sm` everywhere — the hero's pill CTAs are a deliberate, user-approved exception, not a pattern to copy.
- Shared UI primitives live in `src/components/ui/<Name>/` (component file, `index.ts`, colocated test where logic exists), re-exported from `src/components/ui/index.ts`. Homepage sections stay in `src/sections/`. Pages stay in `src/pages/`.
- Colors come only from theme tokens — never literals in `src/` outside `src/theme.ts` (enforced by `tests/tokens.test.ts`; a small documented allowlist covers the `withAlpha` helper and its tests). For new translucent colors use `withAlpha(theme.colors.x, a)` from `src/styles/color.ts`; do not add rgba tokens to the theme.
- Fonts are self-hosted (Inter variable + Cormorant Garamond via Fontsource `?url` imports). No external font hosts; no Google Fonts tags.
- MediaFrame's `standIn` prop is dev-only: its `data-stand-in` attribute renders only when `import.meta.env.DEV` is true, so production output never contains it.
- Icons: only `src/components/icons.tsx` (single stroke, currentColor). No emoji icons.
- Motion: Motion for React is the approved animation library. Storytelling sections may use several Reveal moments where the narrative benefits. Parallax only in the hero and at most one other section. Every animation honors `prefers-reduced-motion`. No new animation library.
- Mobile-first; provisional breakpoints in `src/theme.ts` (`md` 768, `lg` 1024, plus `sm`/`xl`/`xxl`) are recommendations, not confirmed requirements.

## Scope guardrails

No ecommerce, checkout, auth, CMS, backend, analytics, or new npm package without an explicitly confirmed requirement — and any approved addition goes in `docs/TECH_STACK.md` first. A dependency and its `docs/TECH_STACK.md` row go in the SAME commit. GSAP/Zod are documented as install-only-when-justified.
