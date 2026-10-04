# Frontend

> Current-state frontend architecture for CleanMyFace (premium skincare / dermocosmetics paid-test site).
> Verified against the repository: **no frontend implementation exists yet** — no `package.json`, no `src/`, no components, pages, router, store, forms, or styles. The only in-repo inputs are `docs/` and `images/` (90 rasters).
> Prescribed direction comes from `docs/TECH_STACK.md` (required stack) and `docs/REQUIREMENTS.md` (homepage scope). Anything labeled **Not implemented** below must not be treated as existing. Anything labeled **Prescribed (not yet implemented)** is direction to follow when scaffolding, not current behavior.

## Framework

- **Frontend framework:** None installed. Prescribed (not yet implemented): **React** with **TypeScript**, per `docs/TECH_STACK.md`. No version is pinned because no `package.json` exists.
- **Build tooling:** None configured. Prescribed: **Vite** for React development/build. No `vite.config`, no scripts, no preview/deploy pipeline exist.
- **Styling approach:** No styles exist. Prescribed: **Styled Components** (required) for component-scoped styling. Do not introduce Tailwind CSS, another styling system, Material UI, or any large UI framework unless explicitly approved.
- **Important frontend libraries/dependencies:** None installed. `docs/TECH_STACK.md` statuses apply when scaffolding: React / TypeScript / Vite / Styled Components = Required; **GSAP** = Optional (add only when CSS/browser APIs are insufficient); **Zod** = Optional (add only when structured user input requires validation). GSAP and Zod must not be in `package.json` until a concrete requirement justifies them. Do not add backend, database, auth, or email packages for the homepage scope.
- **Any relevant configuration:** None exists — no `tsconfig`, no Vite config, no linter/formatter config, no `.env`, no Vercel config. When scaffolding, use Vite React-TS defaults, `npm` (required package manager), and keep the app Vercel-compatible. Record any new config decision in `docs/TECH_STACK.md`.

## Folder Structure

- **Actual state:** No frontend directories exist. The repository contains only `docs/` (PROJECT, REQUIREMENTS, ARCHITECTURE, TECH_STACK, this file) and `images/` (asset input: product images, `ingredient(s)-`, `step-`, `purpose-` tiles, `hero.png`, `bg-*`, `6 products system*`, `additional-img-*`).
- **Where things belong (once scaffolded — guidance, not existing structure):** follow Vite React-TS conventions and keep it flat: pages/sections for the single homepage, reusable components shared by the two ranges, co-located Styled Components styles, static asset imports from `images/`, and small `utils`/`hooks` only when a real reuse need appears. Do not treat this paragraph as an established tree — no `src/pages`, `src/components`, `src/layouts`, `src/styles`, `src/hooks`, or `src/utils` directory exists today.
- **Assets:** `images/` is the asset input. Reference files via sanitized/encoded imports (names contain spaces, `%`, `+`, mixed casing). Folder/file names (e.g. `GEL CLEANSER/`, `HEARTLEAF CLEANSING OI`, `bg-mage-1.jpg`) are filesystem labels, not approved copy. Note the gap: `SOFT PEELING GEL/` has no product hero image.

## Component Architecture

- **Current state:** No components exist. No organization, composition pattern, or convention is established in code.
- **How to structure components when building (follow existing requirements, do not invent a system):**
  - Build the homepage from its intended blocks (`docs/REQUIREMENTS.md` FR-2, intended — not frozen): hero/brand intro, philosophy, two skin-need directions, Plump It Up system, Stay Clear system, featured product(s), routine guidance, closing area.
  - **Page-level:** sections composed only of homepage blocks. **Reusable:** the repeated shapes across the two ranges — range section, routine step (step number + role + product slot), product/ingredient visual. Reuse the shape; vary the content per range so the two ranges stay clearly differentiated (BR-4).
  - Break complex sections down by homepage block (one section component per FR-2 block), not by visual novelty. Keep each section readable on its own.
  - **Conventions to preserve once established:** TypeScript props with clear data contracts; styles co-located via Styled Components; no duplicate styling systems; CSS transitions/animations and native browser APIs first, GSAP only when they are insufficient; no new dependency without updating `docs/TECH_STACK.md`.

## Page Structure

- **Current state:** No pages or layouts exist.
- **How pages are structured (intended):** a single homepage concept. Common layout = one scrolling page following the FR-2 block order; order and final set are subject to client review, not frozen.
- **How sections are organized:** one section per intended block (see Component Architecture). Sections share spacing/rhythm conventions once defined; they must not be treated as an existing design system — no type scale, spacing tokens, or color system are confirmed (brand assets open, OQ-6).
- **Page-specific vs. shared:** nothing exists to classify yet. Rule going forward: content appearing in both ranges (routine step, product slot, ingredient visual) belongs in shared components; brand hero, philosophy, and closing-area copy belong to the homepage. Do not duplicate a range/system layout as two one-off implementations.

## Routing

- **Routing solution:** None. No router is installed and none is required for the confirmed scope.
- **Existing routes:** None. The only confirmed deliverable is the homepage (FR-1); a secondary page is unconfirmed (OQ-3).
- **Route organization / dynamic routes:** Not applicable. No route table, no dynamic segments, no guards.
- **Conventions:** Do not add `react-router` (or any routing library) until OQ-3 confirms a second page. Normal in-page anchor navigation for homepage sections is a design decision, not a routing requirement. Never invent URLs for unconfirmed pages.

## State Management

- **Current approach:** None. No store, context providers, or shared-state library exists.
- **Local vs. shared state:** No state of either kind exists. The homepage scope has no confirmed interactive state beyond presentational UI (e.g. mobile nav toggle, if designed).
- **Existing state libraries:** None. No Redux, Zustand, Jotai, or equivalent is approved.
- **Rules:** Prefer local component state for any presentational interaction. Do not introduce global state or a state library without a confirmed cross-component state need. Keep the dependency count intentionally small per `docs/TECH_STACK.md`.

## Data Fetching

- **How frontend data is retrieved:** It is not — no fetching layer exists and none is required. Homepage content comes from two static inputs: brief-approved copy (external brief, via `docs/REQUIREMENTS.md`) and `images/` files.
- **API/database/client patterns:** None. No API client, no Supabase calls, no backend endpoints (backend/database not required for the homepage).
- **Loading and error behavior:** Not applicable. Static content has no async fetch to suspend, fail, or retry.
- **Conventions:** Import static assets and render brief-approved copy directly. Do not add a data-fetching, caching, or revalidation layer (no React Query/SWR or equivalent is approved) unless a confirmed requirement introduces remote data.

## Forms

- **Existing form architecture:** None. No forms, inputs, or submission handling exist.
- **Reusable form components/patterns:** None exist.
- **Submission handling:** None. No confirmed contact/inquiry form exists (closing-area behavior open, OQ-4). EmailJS is conditional in `docs/TECH_STACK.md` and must not be added until a contact/inquiry requirement is confirmed.
- **Controlled/uncontrolled patterns:** Not applicable until a form is confirmed. If one ever is, keep it minimal and local to the closing area.

## Validation

- **Libraries/utilities:** None installed. **Zod** is Optional in `docs/TECH_STACK.md` — add only when structured user input requires runtime validation. It must not be in `package.json` today.
- **Client-side validation patterns:** None exist (no forms, no inputs).
- **Error message conventions:** None exist. Do not invent copy for unconfirmed forms.
- **Rules:** Keep validation local to the form it serves once a form is confirmed. No global validation abstraction is warranted for the current scope.

## Error Handling

- **Page-level errors:** No error pages or boundaries exist (no routing, no data fetching).
- **Component-level errors:** No error boundaries exist.
- **API/data-fetching errors:** Not applicable — no async data plane.
- **User-facing error states:** None exist. Do not design error copy for unconfirmed flows (purchase, booking, auth).
- **Fallback patterns:** None established. If a coded build is produced, broken/missing-asset handling should degrade gracefully (e.g. do not render a broken image for the `SOFT PEELING GEL` hero gap; request or omit per client confirmation rather than substituting an unrelated image). No error-tracking service is approved.

## Loading States

- **Loading indicators / skeletons / placeholders:** None exist and none are required for static homepage content.
- **Async component behavior:** None — no lazy data, no suspense boundaries.
- **UX expectations:** Content should render synchronously with the page. If code-splitting or deferred assets are introduced later, keep fallbacks visually quiet and consistent with the premium direction (no flashy spinners). Do not add skeleton/shimmer systems preemptively.

## Responsive Behavior

- **Responsive strategy:** Not implemented. Per `docs/REQUIREMENTS.md` RR-1, good behavior across screen sizes is an intended goal; specifics are open (OQ-7).
- **Breakpoints:** None defined. Do not invent breakpoints, tokens, or a device matrix — final breakpoints/devices/acceptance are unconfirmed.
- **Mobile/tablet/desktop behavior:** No implemented behavior to document. Direction from `docs/TECH_STACK.md`: mobile-first usability, clear hierarchy and product presentation preserved at every width.
- **Responsive component patterns:** None established. Once building, let range/system sections stack or reflow without hiding step numbers, roles, or range differentiation.
- **Rules:** Maintain the premium UI/UX (whitespace, typography, imagery) across sizes; never hide routine information to force a layout. Treat REC-2 (desktop/mobile readability check) as good practice, not acceptance, until OQ-7 is confirmed.

## Accessibility

- **Existing practices in code:** None — there is no code to audit. The items below are expectations for future implementation (from `docs/TECH_STACK.md` and REC-1), not current behavior.
- **Semantic HTML:** Use landmarks and heading order that match the FR-2 hierarchy (one H1, section headings in order). Not yet implemented.
- **Keyboard navigation:** No interactive components exist to assess. Any future nav/toggle/accordion must be keyboard-operable with visible focus states.
- **Focus states:** None defined. Do not remove default focus visibility without providing an equally clear custom state.
- **Labels and form accessibility:** No forms exist. If a form is ever confirmed, every input needs an associated label and an accessible error message.
- **Images/alt text:** No rendered images exist. `images/` files will need descriptive alt text (REC-1, recommendation only). Decorative-only images should carry empty alt. Do not derive alt text from folder/file names.
- **ARIA usage:** No ARIA in use. Prefer native elements over ARIA; add ARIA only where native semantics are insufficient.
- **Motion/accessibility:** Honor reduced-motion preferences for entrance/scroll/reveal animation (consistent with the animation guidance to avoid motion that harms accessibility).

## Component Reuse Rules

No reusable components exist yet. Rules for future work, grounded in the repeated range/system structure:

- **Make reusable:** shapes used in both ranges — range section shell, routine-step row/card (step number + role + product slot), product/ingredient visual cell, section heading block. Build once, feed per-range content.
- **Keep page-specific:** brand hero, philosophy/pillars, closing area — homepage-only content with no second consumer.
- **Avoid duplicates:** never copy a range/system layout into two one-off implementations; extend the shared component with props/composition instead.
- **Extend before creating:** add a variant via props or a small wrapper on the existing Styled Component before introducing a parallel component. If two components render the same shape with different copy, that is a duplication bug — merge them.
- **Do not create** generic `Card`/`Button` library abstractions preemptively; introduce shared primitives only after the second real use appears.

## UI Patterns

No UI patterns are implemented and no design system exists — there are no tokens, no components, and no confirmed brand assets (logo, typography, palette open per OQ-6). The patterns below are the **slots and constraints** future implementation must respect, drawn from `docs/REQUIREMENTS.md` and `docs/TECH_STACK.md`, not a new visual system:

- **Typography hierarchy:** Follows the FR-2 block order (brand statement → philosophy/pillars → range headings → step/product detail → guidance → closing). No type scale or font choice is confirmed; do not invent one as a requirement.
- **Spacing/layout:** Generous whitespace and clear hierarchy per the premium direction. Editorial single-column flow with range/system sections as the structural rhythm. No spacing tokens exist.
- **Buttons and interactive elements:** No buttons exist. Only add affordances for confirmed scope (in-page exploration); never render purchase/booking/auth actions for unconfirmed flows.
- **Cards:** No card pattern exists. Avoid generic SaaS cards, excessive rounded corners, gradients, shadows, and glassmorphism.
- **Navigation:** No navigation exists. Secondary-page navigation is unconfirmed (OQ-3); normal homepage anchors are a design decision, not a routing requirement.
- **Hero sections:** Slot reserved by FR-2 (brand introduction). Uses `hero.png` and/or additional imagery as supplied; placement and treatment are design decisions.
- **Product presentation:** Individual product slots within each 6-step routine. Critical constraint: Plump It Up Step 02 has no confirmed display name (OQ-1) — do not invent, select, or work around it as a pattern; follow FR-4/CR-5 exactly.
- **Product/range sections:** The two range systems are the core repeated pattern — same step/role skeleton, clearly differentiated content per BR-4. This is the primary reuse target.
- **Image treatment:** Use `images/` as supplied (product, ingredient/step/purpose tiles, system images). High-quality, restrained presentation; no invented packaging claims; never substitute an unrelated image for a missing one.
- **Content sections:** Philosophy/pillars and routine guidance are copy-led sections from brief-approved text; summarize, do not reproduce the full brief (NFR-2).
- **Forms / modals/dialogs:** None exist and none are confirmed. Do not establish patterns for them preemptively.
- **Hover/focus/active states:** None defined. Future states should be subtle and consistent (refined hover, visible focus) in line with the premium direction.
- **Animations/transitions:** None implemented. CSS transitions/animations and native browser APIs first; GSAP only when they are insufficient; never an animation showcase; respect reduced motion. Lenis evaluation only if smooth scrolling is later required — do not install now.
- **Mobile interactions:** None implemented. Touch targets and stacked range layouts must preserve step/role legibility; no hover-dependent meaning.
- **Visual consistency:** The premium feel must come from design quality — typography, spacing, composition, imagery, color, hierarchy, interaction — not from more libraries. Keep one styling system (Styled Components) and do not duplicate it.
