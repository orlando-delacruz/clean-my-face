# Frontend — CleanMyFace

> Current-state frontend architecture for the CleanMyFace website.
> Verified against the repository on 2026-10-25.

## Framework

- React 19 with TypeScript.
- Vite 8 build tooling.
- styled-components 6 for styling.
- Motion for React for animation.
- Custom history-based router with no routing dependency.

## Folder Structure

- `src/App.tsx` — route matching and app shell.
- `src/main.tsx` — React root.
- `src/router.tsx` — router, `Link`, and `navigate`.
- `src/theme.ts` — theme tokens.
- `src/GlobalStyle.ts` — global styles.
- `src/components/` — shared components and icons.
- `src/sections/` — homepage sections.
- `src/pages/` — page components.
- `src/data/` — content, image map, legal copy.

## Component Architecture

- Homepage sections are composed in `src/pages/Home.tsx`.
- Shared components live in `src/components/`.
- Product detail pages are data-driven from `src/data/content.ts`.
- Legal pages use `LegalDocument` data from `src/data/legal.ts`.
- Icons are centralized in `src/components/icons.tsx`.

## Page Structure

- Single homepage at `/`.
- Product detail pages at `/products/<slug>`.
- Legal pages at `/privacy-policy` and `/terms-and-conditions`.
- 404 page for unmatched routes.

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
- Breakpoints: md 768px, lg 1024px.
- Responsive grids and mobile navigation are implemented.

## Accessibility

- Skip link, semantic landmarks, focus-visible styles, reduced-motion support.
- Mobile menu supports keyboard Escape.
- Form inputs have labels and validation messages.

## Component Reuse Rules

- Shared components are reused across pages.
- Range and product components share structure while varying content.
- New shared components should be added only after a second real use.

## UI Patterns

- Typography hierarchy follows homepage section order.
- Spacing uses theme tokens.
- Buttons use one shared button language.
- Cards are used for product and range presentation.
- Forms are visual-only unless a requirement is confirmed.
- Animations use CSS and Motion for React, with reduced-motion support.

## Visual Consistency

- styled-components is the only styling system.
- Theme tokens define colors, fonts, spacing, radius, and breakpoints.
- Range differentiation uses tint, icon, and ink colors.