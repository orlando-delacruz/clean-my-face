# CleanMyFace

Premium skincare / dermocosmetics marketing website for **CleanMyFace by Peerpharm**. A paid design/development test delivering a polished homepage/landing page plus product detail pages and legal pages.

## Stack

- React 19 + TypeScript + Vite 8
- styled-components v6 (sole styling system)
- Custom history router (no routing dependency)
- npm only · Deploy target: Vercel (`vercel.json` rewrites all routes to `index.html`)

## Getting started

```bash
npm install
npm run dev      # local dev server
npm run build    # typecheck (tsc -b) + production build
npm run preview  # serve the production build locally
npm run lint     # oxlint
```

No tests or CI are configured. No backend, database, auth, or CMS — the site is fully static content.

## Project structure

```
src/
  data/        # content.ts (single content source), images.ts (asset map), legal.ts
  sections/    # homepage sections (Hero, Philosophy, SkinNeeds, RangeSystem, ...)
  pages/       # Home, ProductPage, LegalPage, NotFound
  components/  # primitives, ProductCard, RoutineStep, ProductGallery, icons, Reveal
  router.tsx   # custom history router (Link / navigate / usePathname)
  theme.ts     # design tokens (provisional — see below)
images/        # client-supplied product and brand assets (90 files)
docs/          # project documentation (see below)
```

## Routes

| Route | Page |
| --- | --- |
| `/` | Homepage |
| `/products/<slug>` | Product detail (12 products) |
| `/privacy-policy`, `/terms-and-conditions` | Legal drafts |
| anything else | 404 page |

## Content and assets

- All copy lives in `src/data/content.ts`. Product information is client-approved — do not invent ingredients, benefits, claims, or usage. Open conflicts are tracked in `PLACEHOLDER_INVENTORY` inside that file.
- Product imagery lives in `images/` and is registered as explicit static imports in `src/data/images.ts`. Filenames are filesystem labels, not copy — never derive product names or alt text from them. New assets must use URL-safe slug names (lowercase, hyphens).
- Theme values, fonts (Fraunces + Inter), and spacing are provisional stand-ins pending final brand assets (see `docs/REQUIREMENTS.md` OQ-6).

## Docs

- `docs/PROJECT.md` — project context, scope, brand, business rules
- `docs/REQUIREMENTS.md` — functional/non-functional requirements and open questions
- `docs/TECH_STACK.md` — approved technology and dependency rules
- `docs/UI_UX.md` — visual/UX rules for contributors
- `docs/FRONTEND.md`, `docs/ARCHITECTURE.md` — note: these still describe the pre-implementation state
- `AGENTS.md` — working conventions for AI coding agents
