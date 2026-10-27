# AGENTS.md

Vite 8 + React 19 + TypeScript + styled-components v6 + Motion for React. Single-page marketing site with a few static routes. No backend, no CMS, no ecommerce, no analytics. Tests: Vitest (unit). No CI.

## Commands

- `npm run dev` / `npm run build` / `npm run preview` / `npm run lint` (oxlint, no config file)
- `npm run typecheck` for types (`tsc -b`; `build` runs it first, so a green build implies clean types)
- `npm run test` (Vitest, watch with `test:watch`)
- `npm run check` runs typecheck + lint + test + build + check:bundle, in that order, failing fast
- `npm run check:bundle` fails the build if internal metadata leaked into `dist/`
- `npm run build:images` / `npm run images:optimize` generates image derivatives (sharp)
- **npm only.** Never pnpm/yarn/bun.

## TypeScript strictness (bites often)

`tsconfig.app.json` sets `strict: true`, `erasableSyntaxOnly` (no enums, namespaces, or parameter properties), `verbatimModuleSyntax` (use `import type` for type-only imports), and `noUnusedLocals`/`noUnusedParameters` (unused imports fail the build).

## Docs are the source of truth

Read before changing behavior: `docs/PROJECT.md` (scope), `docs/REQUIREMENTS.md` (FR/BR/CR rules + OQ open questions), `docs/TECH_STACK.md` (approved deps), `docs/UI_UX.md` (visual rules), and `docs/REDESIGN_PLAN.md` (redesign phases 4 to 12). `docs/ARCHITECTURE.md` and `docs/FRONTEND.md` describe the implemented system.

## Content rules (will fail review if broken)

- `src/data/content.ts` is the single content source. Product copy is client-approved: never invent ingredients, benefits, claims, or usage. Unresolved conflicts live in `PLACEHOLDER_INVENTORY` — report them, never silently resolve.
- Never render internal language in the UI **or ship it in the bundle**: no `OQ-*`, `pending`, `TBD`, `placeholder`, bracket notes. (A previous leak came from a data field that was bundled but unrendered; keep metadata in comments.)
- Internal metadata (statuses, review tags, stand-in registries) must never live in `src/` data that is bundled: keep it in `docs/` or `scripts/`, and detect stand-in imagery by scanning for `picsum.photos`.
- No em dashes in rendered copy.

## Images (`images/`)

- Filenames are filesystem labels, not copy. Never derive names/alt text from them. Two folders were renamed to URL-safe slugs (`2-bha-gel-cleanser`, `blemish-mark-spot-treatment`).
- Vite dev 404s on `%`/`+` in asset paths, so new assets must use slug-safe names (lowercase, hyphens). Spaces are tolerated but discouraged.
- Register every used image as an explicit static import in `src/data/images.ts` (`import.meta.glob` did not match reliably). `img()` returns `''` for unmapped paths and callers guard on it.
- Phase 2 image pipeline: build-time derivatives via `scripts/optimize-images.mjs` (sharp) into `public/img/` (git-ignored). `ResponsiveImage` / `ResponsiveBackground` consume them and fall back to originals in dev.
- Stand-in imagery uses the `StandInImage` component only. Real assets only in the roles listed in `docs/REDESIGN_PLAN.md` section 8. The registry is `docs/STAND_INS.md`, never bundled `src/` data.

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

## Redesign standing rules

1. Read `docs/REDESIGN_PLAN.md` sections relevant to the current phase before changing code.
2. Copy only from the plan's copy deck, existing `content.ts`, or the labels in section 4.3. Never invent claims. No em dashes in rendered copy.
3. Do not modify `src/data/content.ts`. New copy goes in `src/data/site.ts`, `home.ts`, `rangePages.ts`.
4. Colors only from theme tokens; new alpha via `withAlpha`; no new rgba tokens; adding a hex token needs a stated reason in the report.
5. Stand-in imagery only through the `StandInImage` component. Real assets only in the roles listed in section 8. Do not guess image content.
6. Homepage sections live in `src/sections/`. Layout shell in `src/components/layout/`. Shared UI in `src/components/ui/<Name>/`. Range components in `src/components/ranges/`. Product components in `src/components/product/`.
7. Motion for React only, honoring `prefers-reduced-motion`. Parallax only in the hero and Expertise.
8. No new automated tests. No Playwright or browser automation. Existing Vitest tests must stay green; if a test asserts something a phase intentionally changes, update only that assertion and list it in the report.
9. Each phase appends a manual QA section to `docs/QA_CHECKLIST.md` and an entry to `docs/REBUILD_LOG.md`, then creates a `phase-N-candidate` tag. The owner does the final tag.
10. Do not push, deploy, or touch `main`. npm only. No new dependencies.
11. Rewrite modified files in full. Surface real error text. Never claim a result you did not run; label UNVERIFIED.

## Testing

- Unit tests use Vitest with jsdom and Testing Library (`npm run test`). Manual QA is performed by the project owner. Do not add automated browser testing.
- Guard tests: `tests/tokens.test.ts` (zero hardcoded colors outside `theme.ts`), `tests/contrast.test.ts` (WCAG ratios), `tests/theme.test.ts` (frozen legacy values + new groups).
- Test setup is in `tests/setup.ts`. Vitest config is in `vite.config.ts`.

## Scope guardrails

No ecommerce, checkout, auth, CMS, backend, analytics, or new npm package without an explicitly confirmed requirement — and any approved addition goes in `docs/TECH_STACK.md` first. A dependency and its `docs/TECH_STACK.md` row go in the SAME commit. GSAP/Zod are documented as install-only-when-justified.
