# Architecture — CleanMyFace

> Current-state architecture for the CleanMyFace website.
> Verified against repository files, the local production build, and a comparison of the live `index.html` and JavaScript bundle (Phase 1: Brand System V2, 2026-10-26).
> Stack: React 19, TypeScript, Vite 8, styled-components 6, Motion for React, npm.
> There is no backend, database, authentication, CMS, ecommerce, analytics, or email integration.

## System Overview

CleanMyFace is a client-side single-page application. Vercel serves `index.html` for all routes, and the browser router resolves the route.

- Frontend: React 19 with TypeScript (app config; tests/scripts/configs type-checked in strict mode via `tsconfig.tests.json`) and Vite 8.
- Styling: styled-components 6, with Brand System V2 tokens in `src/theme.ts` and global styles plus self-hosted `@font-face` rules in `src/GlobalStyle.ts`.
- Fonts: self-hosted via `@fontsource-variable/inter` and `@fontsource/cormorant-garamond` (`src/styles/fonts.ts`); no Google Fonts requests.
- Motion: Motion for React, used through `src/components/ui/Reveal` and selected sections; presets in `theme.motion`.
- Routing: custom history-based router in `src/router.tsx`.
- Content: centralized in `src/data/content.ts`.
- Images: explicit static imports mapped in `src/data/images.ts`.
- Deployment: Vercel SPA rewrite to `/index.html`.

## Repository Conventions

- `src/components/ui/` — shared UI primitives, one folder per component (`<Name>.tsx` + `index.ts`, test colocated where logic exists), re-exported from `src/components/ui/index.ts`.
- `src/components/` — `icons.tsx`, `ProductCard.tsx`, `ProductGallery.tsx`, `RoutineStep.tsx` (unchanged this phase; placement to review later).
- `src/styles/` — `fonts.ts` (Fontsource `?url` imports, `fontFaces` CSS), `media.ts` (`up()` breakpoint helper).
- `src/sections/` — homepage section components (structure unchanged this phase).
- `src/pages/` — route-level page components, plus dev-only `SystemPage` (eliminated from production).
- `src/data/` — content model, image map, and legal copy.
- `tests/` — Vitest unit tests.
- `scripts/` — helper scripts.
- `docs/` — project documentation.
- `images/` — supplied raster assets.
- `public/` — static files served at site root.

## Folder Structure

- `src/App.tsx` — route matching and app shell (dev-only `/_system` lazy route)
- `src/main.tsx` — React root
- `src/router.tsx` — custom router and `Link`
- `src/theme.ts`, `src/GlobalStyle.ts`, `src/styles/`
- `src/components/ui/` — shared primitives (Container, Section, EyebrowRow, SectionRule, SectionTitle, Lead, Button*, TextAction, SkipLink, Reveal, Heading, Text, Eyebrow, Chip, Divider, TextureSwatch, MediaFrame, Parallax, RangeTheme)
- `src/components/` — icons and product components
- `src/sections/` — homepage sections
- `src/pages/` — Home, ProductPage, LegalPage, NotFound, SystemPage (dev-only)
- `src/data/` — content, image map, legal copy
- `images/` — supplied raster assets
- `public/` — static files served at site root
- `docs/` — project documentation
- `tests/` — Vitest unit tests only. Manual QA is performed by the project owner (see `docs/QA_CHECKLIST.md`). Playwright was removed.
- `scripts/` — helper scripts
- `docs/baseline/` — baseline measurements

## Routing

Routes are defined in `src/App.tsx` using `usePathname()` from `src/router.tsx`.

- `/` renders `Home`
- `/privacy-policy` renders `LegalPage` with `privacyPolicy`
- `/terms-and-conditions` renders `LegalPage` with `termsConditions`
- `/products/<slug>` resolves through `findProductBySlug()` and renders `ProductPage`
- Any other path renders `NotFound`

The router uses `window.history.pushState`, listens to `popstate`, handles `/#anchor` navigation, and suppresses smooth scrolling during page changes. `document.title` is set in `ProductPage` for product routes.

## Content Model

`src/data/content.ts` is the single content source. It defines:

- `brand`
- `skinNeeds`
- `ranges` with six products each
- `featured`
- `routineGuide`
- `closing`
- `navigation`
- `footer`
- `PLACEHOLDER_INVENTORY`

Product records include slug, range, step, role, name, skin type, purpose, positioning, tagline, description, benefits, ingredients, optional complex, texture notes, optional usage steps, image path, gallery paths, and a placeholder flag.

Known unresolved content items are documented in `PLACEHOLDER_INVENTORY` and in `docs/REQUIREMENTS.md`.

## Image Handling

`src/data/images.ts` contains explicit static imports for supplied assets. The `img(path)` function returns the bundled URL or an empty string if the path is not mapped. Callers guard on empty results.

Asset filenames contain spaces and mixed casing. They are filesystem labels, not approved copy.

## Theme and Global Styles

`src/theme.ts` defines the Brand System V2 tokens: colors (base/inverse/range/feedback/overlay roles), fonts (self-hosted Inter + Cormorant Garamond), fluid `fontSizes`, `lineHeights`, `letterSpacings`, `fontWeights`, `layout` (containers, gutter, section rhythm), extended breakpoints (sm/md/lg/xl/xxl), `radius`, `shadows`, `zIndex`, `motion` presets, and `rangeThemes` + current `range`. `src/GlobalStyle.ts` sets base reset, typography, image, link, selection, focus (from `theme.colors.focus`), the self-hosted `@font-face` rules, and reduced-motion behavior. The fluid type scale is consumed only by new primitives; existing sections keep their sizes.

## Component Inventory

Shared components:
- `ui/` primitives — Container, Section, EyebrowRow, SectionRule, SectionTitle, Lead, ButtonPrimary/ButtonSecondary, TextAction, SkipLink, Reveal, Heading, Text, Eyebrow, Chip, Divider, TextureSwatch, MediaFrame, Parallax, RangeTheme (+ `getRangeTheme`)
- `icons.tsx` — single-stroke SVG icons
- `ProductCard.tsx` — product link card
- `RoutineStep.tsx` — routine step card
- `ProductGallery.tsx` — product gallery

Sections:
- Header, Hero, Philosophy, SkinNeeds, RangeSystem, Featured, RoutineGuide, Closing, Footer

Pages:
- Home, ProductPage, LegalPage, NotFound, SystemPage (dev-only, `/_system`)

## Styling Approach

styled-components 6 is the only styling system. Theme tokens are provided through `ThemeProvider`. Motion for React is used for reveals and staggered entrances. Reduced-motion preferences are respected in both CSS and Motion.

## Build and Deployment

- `npm run dev` starts Vite.
- `npm run build` runs TypeScript and Vite.
- `npm run preview` serves the production build.
- `vercel.json` rewrites all routes to `/index.html`.
- No backend or server-side rendering is used.

## Reconciled Bundle Numbers

- Current branch head JS bundle: 508,156 bytes raw / 150,252 bytes gzip.
- Baseline tag `pre-rebuild-baseline` JS bundle: 508,156 bytes raw / 150,252 bytes gzip.
- Live bundle `/assets/index-BsqEaAv5.js`: 374,502 bytes raw / 107,136 bytes gzip.
- The live bundle is smaller because it is an older deployment that predates the prior-session changes and Motion for React.

## Testing

- Vitest with jsdom and Testing Library for unit/integration tests (colocated primitive tests included).
- Guard tests: `tests/tokens.test.ts` (zero hardcoded colors outside `theme.ts`), `tests/contrast.test.ts` (WCAG ratios), `tests/theme.test.ts` (frozen legacy values + new groups).
- Test setup is in `tests/setup.ts`.
- Vitest config is in `vite.config.ts`.

## Known Limitations

- The inquiry form is visual-only and does not submit data.
- Legal copy contains draft placeholders.
- OQ-1 and OQ-2 remain unresolved.
- Final brand assets, typography, and palette are unconfirmed.
- No analytics, SEO infrastructure, or backend integrations exist.
- The live deployment is older than the local repository.