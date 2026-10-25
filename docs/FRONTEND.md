# Frontend — CleanMyFace

> Current-state frontend architecture for the CleanMyFace website.
> Verified against the repository on 2026-10-26 (Phase 1: Brand System V2).

## Framework

- React 19 with TypeScript.
- Vite 8 build tooling.
- styled-components 6 for styling.
- Motion for React for animation.
- Custom history-based router with no routing dependency.

## Folder Structure

- `src/App.tsx` — route matching and app shell (includes dev-only `/_system` route).
- `src/main.tsx` — React root.
- `src/router.tsx` — router, `Link`, and `navigate`.
- `src/theme.ts` — Brand System V2 tokens (colors, fonts, type scale, layout, motion, range themes).
- `src/GlobalStyle.ts` — global styles plus self-hosted `@font-face` rules.
- `src/styles/` — `fonts.ts` (Fontsource `?url` imports, `fontFaces` CSS), `media.ts` (`up()` breakpoint helper).
- `src/components/ui/` — shared UI primitives, one folder per component (`<Name>.tsx` + `index.ts` + test where logic exists), re-exported from `src/components/ui/index.ts`.
- `src/components/` — `icons.tsx`, `ProductCard.tsx`, `ProductGallery.tsx`, `RoutineStep.tsx` (unchanged this phase; review placement later).
- `src/sections/` — homepage sections (unchanged structure this phase).
- `src/pages/` — `Home`, `ProductPage`, `LegalPage`, `NotFound`, plus dev-only `SystemPage`.
- `src/data/` — content, image map, legal copy.

## Token Reference Tables

### Colors (roles)

| Group | Tokens |
|---|---|
| Base | `background` #FAF7F1, `surface` #FFFFFF, `text` #211A13, `muted` #6E6459, `border` #E6DCCC |
| Inverse (dark surfaces) | `surfaceInverse` #121814, `textInverse` #FFFDF8, `mutedInverse` #B9B2A6, `borderInverse` #2C3530, `borderStrong` #CBBFAA |
| Range | `accent` #B0C5E0, `accentContrast` #211A13, `plumpTint` #B0C5E0, `plumpDeep` #2C4763, `plumpSoft` #DFE8F3, `clearTint` #D3E2C1, `clearDeep` #3F6034, `clearSoft` #EDF3E6, `gold` #C9A96A (decorative only) |
| Feedback | `error` #9C2B2B, `errorSurface` #F7E6E4, `success` #3F6034, `successSurface` #EDF3E6, `focus` #2C4763, `focusInverse` #FFFDF8 |
| Overlays / scrims | `scrimSoft` rgba(18,24,20,0.35), `scrimStrong` rgba(18,24,20,0.62) |
| Warm neutrals (mapped from legacy hex, identical values) | `surfaceWarm` #EDE4D3, `inkDark` #1B231E, `cardDark` #17110B, `heroScrim` #0E1310, `rangeScrim` #0C0906, `black` #000000 |

Alpha variants of the above are expressed with `color-mix(in srgb, <token> <pct>%, transparent)` so no hex/rgba literals appear outside `src/theme.ts` (enforced by `tests/tokens.test.ts`).

### Typography

- `fontSizes`: `display` clamp(3rem, 2.2rem + 4vw, 6rem); `h1` clamp(2.5rem, 1.9rem + 3vw, 4.5rem); `h2` clamp(2rem, 1.6rem + 2vw, 3.25rem); `h3` clamp(1.5rem, 1.3rem + 1vw, 2rem); `title` clamp(1.25rem, 1.15rem + 0.5vw, 1.5rem); `bodyLg` clamp(1.0625rem, 1rem + 0.3vw, 1.25rem); `body` 1rem; `small` 0.875rem; `eyebrow` 0.75rem.
- `lineHeights`: `tight` 1.05, `heading` 1.12, `snug` 1.3, `body` 1.65.
- `letterSpacings`: `tight` -0.02em, `heading` -0.01em, `normal` 0, `eyebrow` 0.16em.
- `fontWeights`: `regular` 400, `medium` 500, `semibold` 600.
- Display face: Cormorant Garamond (self-hosted latin 400/500/500-italic). Body face: Inter variable latin (400-600). Single `theme.fonts.display` token so the face can be swapped when brand typography is confirmed (OQ-6).

### Layout

- `layout.container`: `narrow` 44rem, `standard` 72rem, `wide` 90rem.
- `layout.gutter`: clamp(1.25rem, 4vw, 3rem).
- `layout.section`: `tight` 4rem, `base` 7rem, `loose` 10rem. `layout.sectionMobile`: `tight` 3rem, `base` 4rem, `loose` 6rem.
- `breakpoints`: `sm` 480px, `md` 768px, `lg` 1024px, `xl` 1280px, `xxl` 1440px (md/lg values unchanged).
- `radius`: `sm` 0.5rem, `md` 0.75rem, `lg` 1.25rem, `pill` 999px.
- `shadows`: `soft`, `lifted`. `zIndex`: base 0, raised 10, sticky 100, overlay 200, modal 300, skip 1000.

### Motion

- `motion.durations`: fast 0.2, base 0.4, slow 0.8, slower 1.2 (seconds, for Motion) plus identical CSS strings under `motion.css`.
- `motion.easings`: `standard` [0.22, 1, 0.36, 1], `emphasized` [0.16, 1, 0.3, 1], `exit` [0.4, 0, 1, 1], plus cubic-bezier strings under `motion.cssEasings`.
- `Reveal` keeps its tuned default (duration 0.52s, standard easing); the easing tuple is now read from `theme.motion.easings.standard` (identical values).

### Range themes

- `rangeThemes.plump`: tint #B0C5E0, deep #2C4763, soft #DFE8F3, ink #2C4763.
- `rangeThemes.clear`: tint #D3E2C1, deep #3F6034, soft #EDF3E6, ink #3F6034.
- `theme.range`: the current range (default = plump values). `RangeTheme` overrides it for a subtree; `getRangeTheme(id)` returns the theme slice.

## Font Loading and License Note

- Inter (variable, latin `wght` subset) and Cormorant Garamond (latin 400, 500, 500-italic) are bundled from `@fontsource-variable/inter` and `@fontsource/cormorant-garamond` via Vite `?url` woff2 imports in `src/styles/fonts.ts`. Total downloadable woff2 for the homepage: 118,368 bytes (budget 160 KB).
- `@font-face` uses `font-display: swap`. No requests to Google Fonts remain on `/` (verified by Playwright).
- License: Fontsource packages carry the SIL Open Font License alongside the files; see `node_modules/@fontsource-variable/inter` and `node_modules/@fontsource/cormorant-garamond` for license text.
- `index.html` contains no font `<link>` tags.

## Primitive Catalog and Props

All primitives live in `src/components/ui/<Name>/` and are re-exported from `src/components/ui/index.ts`. Migrated primitives keep their exact previous props, defaults, and CSS values.

| Primitive | Props | Notes |
|---|---|---|
| `Container` | — | max-width 72rem, responsive gutters |
| `Section` | `id`, standard section props | scroll-margin + section padding |
| `EyebrowRow` | `$color?`, `$iconColor?`, `$onDark?`, `$tight?` | icon-adjacent pre-title (legacy API preserved) |
| `SectionRule` | — | gold hairline divider |
| `SectionTitle` | — | h2 section title |
| `Lead` | — | lede paragraph |
| `ButtonPrimary`, `ButtonSecondary` | anchor props | shared button language |
| `TextAction` | anchor props | inline text link with arrow nudge |
| `SkipLink` | anchor props | skip navigation, zIndex.skip |
| `Reveal` | `children`, `className?` | Motion whileInView reveal, once, reduced-motion aware |
| `Heading` | `as` ('h1'..'h6', default 'h2'), `size` (display/h1/h2/h3/title), `tone` (default/inverse), `align` | semantic level independent of visual size |
| `Text` | `variant` (bodyLg/body/small/caption), `tone` (default/muted/inverse/mutedInverse), `as` (p/span/div), `balance`, `pretty` | body copy |
| `Eyebrow` | `tone` (default/inverse/range) | tracked label; `range` uses `theme.range.deep` |
| `Chip` | `variant` (neutral/plump/clear/inverse), `onClick?` | non-interactive span by default; button with 44px hit area when interactive |
| `Divider` | `variant` (line/short/dot), `label?` | decorative, aria-hidden unless labeled |
| `TextureSwatch` | `color`, `size?`, `label?`, `ariaLabel?` | circular swatch; always exposes an accessible name |
| `MediaFrame` | `ratio` (1/1, 4/5, 3/4, 16/9, 21/9, auto), `radius`, `fit`, `focal?`, `overlay` (none/soft/strong), `caption?`, `placeholder?` | reserves space via aspect-ratio; never loads images itself |
| `Parallax` | `distance?`, `children`, `className?` | Motion scroll transform; renders children untouched under reduced motion |
| `RangeTheme` | `id` (plump/clear) | nested ThemeProvider overriding `theme.range`; `getRangeTheme(id)` helper |

## Rules

- **No hardcoded colors**: no hex, rgb()/rgba(), hsl()/hsla() literals in `src/` outside `src/theme.ts`. Enforced by `tests/tokens.test.ts` (prints match count; allowlist is empty).
- **Range theming via RangeTheme**: range-specific color direction flows through `theme.range`, never hardcoded per-section values.
- **Motion durations from tokens**: new motion uses `theme.motion`; `Reveal` retains its 0.52s tuned default with the standard easing tuple from the theme.
- **Type scale for new work only**: the fluid `fontSizes` scale is consumed only by new primitives; existing sections keep their current sizes.

## How to Run /_system

- Dev only: `npm run dev`, then open the `/_system` path at the printed localhost URL/port.
- Shows swatches, contrast table, type specimens, scales, motion demos, every primitive variant, MediaFrame Picsum placeholders, and plump/clear side-by-side.
- Never ships to production: guarded by `import.meta.env.DEV` + `React.lazy`; the marker string `CMF_SYSTEM_PAGE_MARKER` is absent from `dist/`.

## Component Architecture

- Homepage sections are composed in `src/pages/Home.tsx`.
- Shared UI primitives live in `src/components/ui/`.
- Product detail pages are data-driven from `src/data/content.ts`.
- Legal pages use `LegalDocument` data from `src/data/legal.ts`.
- Icons are centralized in `src/components/icons.tsx`.

## Page Structure

- Single homepage at `/`.
- Product detail pages at `/products/<slug>`.
- Legal pages at `/privacy-policy` and `/terms-and-conditions`.
- 404 page for unmatched routes.
- Dev-only `/_system` design-system page (absent from production).

## Routing

- Custom router in `src/router.tsx`.
- Supports in-app navigation and `/#anchor` links.
- Vercel rewrites all routes to `index.html`.

## State Management

- Local component state only.
- No global state library is used.

## Data Fetching

- No remote data fetching.
- Content is static and imported from `src/data/content.ts`.
- Images are resolved through `src/data/images.ts`.

## Forms

- The inquiry form in `src/sections/Closing.tsx` is visual-only.
- It performs client-side validation and shows a success state, but does not submit data.

## Validation

- Client-side validation exists only for the visual inquiry form.
- No runtime validation library is installed.

## Error Handling

- 404 page handles unmatched routes.
- Missing images return an empty string from `img()` and callers guard on it.
- No error-tracking service is used.

## Loading States

- No async data loading.
- Static content renders synchronously.

## Responsive Behavior

- Mobile-first CSS.
- Breakpoints: sm 480px, md 768px, lg 1024px, xl 1280px, xxl 1440px (md/lg unchanged).
- Responsive grids and mobile navigation are implemented.
- `src/styles/media.ts` exports `up(key)` for min-width queries (new sections should use it; existing sections not converted this phase).

## Accessibility

- Skip link, semantic landmarks, focus-visible styles (sourced from `theme.colors.focus`), reduced-motion support.
- Mobile menu supports keyboard Escape.
- Form inputs have labels and validation messages.
- New primitives are accessible by default (named swatches, labeled dividers, keyboard-activatable chips).

## UI Patterns

- Typography hierarchy follows homepage section order.
- Spacing uses theme tokens.
- Buttons use one shared button language.
- Cards are used for product and range presentation.
- Forms are visual-only unless a requirement is confirmed.
- Animations use CSS and Motion for React, with reduced-motion support.

## Visual Consistency

- styled-components is the only styling system.
- Theme tokens define colors, fonts, type scale, spacing, layout, motion, and range themes.
- Range differentiation uses tint, icon, and ink colors.
