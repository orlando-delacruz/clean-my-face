# AGENTS.md

Vite 8 + React 19 + TypeScript + styled-components v6. Single-page marketing site with a few static routes. No backend, no tests, no CI.

## Commands

- `npm run dev` / `npm run build` / `npm run preview` / `npm run lint` (oxlint, no config file)
- `npx tsc -b` for typecheck (`build` runs it first, so a green build implies clean types)
- **npm only.** Never pnpm/yarn/bun.

## TypeScript strictness (bites often)

`tsconfig.app.json` sets `erasableSyntaxOnly` (no enums, namespaces, or parameter properties), `verbatimModuleSyntax` (use `import type` for type-only imports), and `noUnusedLocals`/`noUnusedParameters` (unused imports fail the build).

## Docs are the source of truth

Read before changing behavior: `docs/PROJECT.md` (scope), `docs/REQUIREMENTS.md` (FR/BR/CR rules + OQ open questions), `docs/TECH_STACK.md` (approved deps), `docs/UI_UX.md` (visual rules). `docs/ARCHITECTURE.md` and `docs/FRONTEND.md` still describe the pre-implementation state — do not trust their "nothing exists" claims.

## Content rules (will fail review if broken)

- `src/data/content.ts` is the single content source. Product copy is client-approved: never invent ingredients, benefits, claims, or usage. Unresolved conflicts live in `PLACEHOLDER_INVENTORY` — report them, never silently resolve.
- Never render internal language in the UI **or ship it in the bundle**: no `OQ-*`, `pending`, `TBD`, `placeholder`, bracket notes. (A previous leak came from a data field that was bundled but unrendered; keep metadata in comments.)
- No em dashes in rendered copy.

## Images (`images/`)

- Filenames are filesystem labels, not copy. Never derive names/alt text from them. Two folders were renamed to URL-safe slugs (`2-bha-gel-cleanser`, `blemish-mark-spot-treatment`).
- Vite dev 404s on `%`/`+` in asset paths, so new assets must use slug-safe names (lowercase, hyphens). Spaces are tolerated but discouraged.
- Register every used image as an explicit static import in `src/data/images.ts` (`import.meta.glob` did not match reliably). `img()` returns `''` for unmapped paths and callers guard on it.

## Routing

Custom history router in `src/router.tsx` (no dependency). Routes: `/`, `/privacy-policy`, `/terms-and-conditions`, `/products/<slug>`, else `NotFound`. `vercel.json` rewrites everything to `index.html`. Always navigate via `Link`/`navigate()` — never raw `<a href>` for in-app links — and use `/#anchor` form for homepage sections so they work from any page.

## Design conventions

- styled-components, co-located, one styling system. `radius.sm` everywhere — the hero's pill CTAs are a deliberate, user-approved exception, not a pattern to copy.
- Icons: only `src/components/icons.tsx` (single stroke, currentColor). No emoji icons.
- Motion: CSS/native only, one `Reveal` per section max, always honor `prefers-reduced-motion` (see `Reveal` + `GlobalStyle`).
- Mobile-first; provisional breakpoints in `src/theme.ts` (`md` 768, `lg` 1024) are recommendations, not confirmed requirements.

## Scope guardrails

No ecommerce, checkout, auth, CMS, backend, analytics, or new npm package without an explicitly confirmed requirement — and any approved addition goes in `docs/TECH_STACK.md` first. GSAP/Zod are documented as install-only-when-justified.
