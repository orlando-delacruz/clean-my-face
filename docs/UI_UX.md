# UI/UX

> Reusable UI/UX rules for the CleanMyFace website. OpenCode and future AI coding agents must follow this document when designing or modifying the site.
> Verified state: **no implementation exists** — no components, styles, design tokens, fonts, colors, or logo in the repo. In-repo inputs are `docs/` and `images/` (90 rasters: product images, `ingredient(s)-` / `step-` / `purpose-` tiles, `hero.png`, `bg-*`, system and additional images). No logo, font, or brand-color package exists (see OQ-6).
> The supplied brand brief is the primary source of truth for brand/content direction. Labels used here: **[Confirmed]** = supported by `docs/PROJECT.md` / `docs/REQUIREMENTS.md`; **[Recommendation]** / **TBD** = project working convention proposed by this document, not a client-supplied brand rule. Do not present recommendations as established brand fact.

## Design Direction

**[Confirmed intent]** — the site must read as a credible premium skincare/dermocosmetics brand:

- Modern, premium, clean, refined, editorial, cosmetic/skincare appropriate.
- Approachable rather than clinical; sophisticated but not complicated.
- Strong visual hierarchy, generous whitespace, high-quality product presentation.
- The premium feel comes from design quality — typography, spacing, composition, imagery, hierarchy, interaction — not from effects or libraries (see `docs/TECH_STACK.md`).
- Avoid visual clutter. Avoid generic SaaS styling, dashboard components, template-like layouts, and overly decorative beauty-site tropes. One homepage concept with a clear narrative beats a collection of widgets.

## Brand

**[Confirmed]** — communicate this positioning visually (brief wording, do not rephrase into new claims):

- CLEAN WITH PURPOSE; SKINCARE THAT GETS TO THE POINT.
- Effective Formulas, Gentle on Skin, Approachable Skincare.
- Dermocosmetics made for real skin, real routines, real results.
- "Every product has a clear job." Four pillars: Clear Job, Purposeful Ingredients, Intentional Texture, Right Format.
- "Different skin needs. Same gentle standard."

Rules:

- The homepage narrative should follow the intended hierarchy as strong content direction (hero → philosophy → two skin needs → two product systems → featured products → routine guidance → closing area). The visual design/UX may adjust the section sequence when there is a clear reason to improve storytelling, hierarchy, or conversion. Final structure subject to client review.
- Never reproduce the full brief on the homepage; summarize with hierarchy (NFR-2).
- The two ranges must feel like one brand (shared type, spacing, section rhythm) while remaining visually distinguishable (see Colors, Product/range presentation below). Never blend them into one undifferentiated product list.
- Never invent product claims, ingredients, benefits, pricing, or brand elements (BR-2). Never silently resolve the OQ-1 Step 02 name conflict or the OQ-2 description issue.
- Use only brief-approved copy and supplied `images/` visuals. Asset folder/file names are filesystem labels, not copy authority.

## Colors

No confirmed brand palette exists — **do not present any palette below as a client brand rule.**

**[Recommendation]** — restrained color strategy for premium skincare:

- Foundation: neutral light background, neutral surface, dark primary text, muted secondary text, subtle borders.
- Accent: **one** controlled accent reserved for meaningful emphasis (active range indicator, key CTA, small highlights). Never use accent as section decoration.
- Range differentiation: distinguish PLUMP IT UP vs STAY CLEAR through restrained means — e.g. a muted range tint confined to labels/eyebrows and small markers — while sharing background, text, and surface colors so the brand stays unified.
- Semantic roles to establish once (names, not values — values TBD): `background`, `surface`, `text`, `muted`, `border`, `accent`, `accent-contrast`, plus interactive states (`hover`, `active`, `focus`, `disabled`).
- TBD: final palette, accent choice, and usage rules pending client assets (OQ-6). Until the final palette is confirmed, keep color usage restrained and cohesive. Do not invent arbitrary colors, but allow appropriate range-specific color direction if supported by approved brand assets or later design decisions.

## Typography

No confirmed font family exists (TBD, OQ-6). Do not claim any typeface as the brand font.

**[Recommendation]** — hierarchy and behavior rules:

- Keep the type system intentionally limited and cohesive, with clear roles for display headings, section headings, body text, and utility/label text. Use as few font families as practical while maintaining an appropriate premium editorial hierarchy.
- Hierarchy: display (hero + major section statements, used sparingly) → section heading → subheading/eyebrow → body → caption/label. One H1 per page; section headings follow document order.
- Eyebrow labels (e.g. range names, step numbers, routine roles) may use restrained uppercase with letter spacing; keep body copy in sentence case.
- Weights: regular body, medium/semibold for emphasis and headings only. Line height: tight for display, comfortable for body (body must never feel cramped). No decorative typography without purpose.
- Rules for large editorial headings: one per viewport at most, short lines, never sacrifice readability for size. If a heading wraps poorly on mobile, shorten the line or reduce the scale — never let display type cause overflow.
- TBD: actual families, scale values, and weights pending brand assets.

## Spacing

No spacing tokens exist yet. **[Recommendation]** — establish and follow one scale rather than one-off values:

- Define section, container, component, text, and card spacing from a single base scale (e.g. multiples of a base unit) and reuse it everywhere.
- Section spacing: generous and consistent; philosophy, range, and guidance sections share the same rhythm so the page reads as one narrative.
- Container spacing: consistent page gutters; wider on desktop, narrower on mobile — never zero, never cramped.
- Component/text spacing: group related elements tightly (step number + role + product), separate unrelated groups clearly.
- Once the first section sets the scale, extend it — do not invent parallel spacing for new sections.

## Layout

- Maximum content width: one shared page container for text-led sections; full-bleed treatments allowed only for imagery-led moments (hero, system imagery) and must still align inner content to the container.
- Grid: simple, stable grids (single column for narrative; 2-up for the two ranges; steps as an ordered sequence, not a scattered grid). Alignment consistent within a section.
- Section composition: alternate composition across the page (editorial split, centered statement, image-led, sequence) instead of forcing every section into the same centered-card layout. Whitespace is a compositional tool.
- Image/text relationships: imagery supports copy, never replaces it. Product images keep consistent proportions and treatment within a section.
- Product presentation: each 6-step system reads as an ordered routine (step number + routine role always visible); the two systems share the same skeleton with differentiated content.

## Components

No components exist. Principles for building reusable components with consistent styling and composition:

- Consistency first: one visual language for headings, labels, buttons, steps, and imagery treatment across both ranges.
- Variants: add a variant only after the second real use appears; prefer props/composition over parallel components.
- States: every interactive element defines default, hover, focus-visible, active, and disabled. No hover-only meaning.
- Hierarchy: components visually defer to content — chrome stays quiet, product and copy lead.
- Reusability: build the repeated shapes once (range section, routine step, product/ingredient visual, section heading) and feed per-range content. Never fork a shared shape into two one-off copies.
- Never build components for unconfirmed functionality (purchase, booking, accounts, CMS).

## Buttons

No buttons exist. **[Recommendation]** — establish this language when actions are needed and keep it unchanged afterwards:

- **Primary:** solid, high-contrast button for the single most important action in view (e.g. range exploration, closing-area action once OQ-4 is confirmed). Use sparingly — at most one primary per section.
- **Secondary:** outline or quiet filled button for alternative exploration (e.g. the second range).
- **Text/tertiary:** minimal text action for low-emphasis in-page moves (e.g. "See the routine").
- Sizing: comfortable touch targets (minimum ~44px height), consistent padding ratio, restrained border radius shared with the rest of the system (not pill-everywhere, not sharp-everywhere by accident).
- Typography: short labels, sentence or title case consistently, never full-uppercase paragraphs.
- States: visible hover, clearly visible keyboard focus, pressed feedback, and a genuinely disabled appearance that is also `disabled` semantically. Icons only where they aid understanding, never decoration-only.
- Never render buttons for unconfirmed flows (purchase, booking, auth). Never invent a second button style because a section "needs variety".

## Forms

No forms exist and none are confirmed (closing-area behavior open, OQ-4; EmailJS conditional). These rules apply **only if** a form is confirmed — do not build a form preemptively:

- Every input (input, select, textarea) has a visible associated label; required fields are marked as such in the label, not by placeholder alone.
- Inputs: calm single-line styling, generous padding, clear borders that strengthen on focus; never remove focus visibility.
- Validation: validate on submit with inline field errors; re-validate on change after an error is shown. Error text sits with the field, names the problem plainly, and never uses invented urgency.
- Success: confirm inline near the form with a calm statement; do not redirect to invented pages.
- Mobile: stacked single-column layout, full-width inputs, keyboard-appropriate input types, no cramped side-by-side fields.
- Keep the whole form visually light — polished and simple, not heavy chrome.

## Tables

No tables exist and none are required. Use a table **only** for genuinely tabular comparison; for the routine systems, prefer the ordered step sequence (step number + role), not a data table.

- If a table is ever justified: minimal header, generous row spacing, left-aligned text, right- or center-aligned only where the data warrants it, no heavy gridlines or zebra striping by default.
- Responsive: tables must reflow readably on mobile (stacked or horizontally contained without breaking layout); never let a table cause page overflow.
- Never introduce a table where a step list, definition pair, or short section would communicate better.

## Modals

No modals exist and none are confirmed. Prefer page content over dialogs: if information matters, place it on the page.

- Use a modal only for a short, focused interruption the user explicitly requested (none currently in scope). Never use modals for product information, routine guidance, navigation, or forms that could live inline.
- Rules when one is ever justified: dimmed overlay, constrained content width, comfortable internal spacing, obvious close control plus overlay-click and `Esc` dismissal, keyboard focus trapped while open and restored on close, full usability on mobile (bottom-sheet or full-screen treatment, no tiny centered box).
- No modal, popover, or tooltip shall carry content that has no equivalent reachable place on the page.

## Cards

No cards exist. Use cards sparingly — they are a grouping tool, not the default container:

- Appropriate: grouping a product with its image and step/role metadata so the routine scans cleanly.
- For product/range presentation: lead with imagery and hierarchy; consistent image proportions within a set; quiet surfaces; avoid stacking borders, shadows, badges, and decorative elements on the same card.
- Never turn every content block into a card grid. Narrative sections (philosophy, guidance, closing) should be editorial layouts, not cards.

## Navigation

No navigation exists. Secondary pages are unconfirmed (OQ-3), so keep navigation minimal and do not invent destinations:

- Desktop: simple header — brand mark area (logo TBD, OQ-6; use a calm wordmark-style placeholder treatment, never an invented logo), a small set of in-page anchors at most, and at most one CTA placement. No invented links to unconfirmed pages, purchase, booking, or accounts.
- Mobile: collapsed navigation (menu button opening a simple panel); full-width touch targets; closes on selection and on `Esc`; keyboard accessible.
- Header behavior: static or simply sticky; no hide-on-scroll cleverness unless it demonstrably helps. Active states reflect the section in view for in-page anchors. Spacing stays consistent with the page container — never a cramped bar.
- Never add dead-end links or buttons implying unconfirmed pages or transactions.

## Responsive Rules

Breakpoints, devices, and acceptance criteria are unconfirmed (OQ-7) — define principles, not numbers:

- Desktop: full composition — ranges side-by-side or in rich sequence, editorial splits, generous section spacing.
- Tablet: graceful intermediate — reduce columns before reducing clarity; never an awkward stretched mobile layout or a squeezed desktop one.
- Mobile: first-class layout, not a reduced desktop — stacked content, preserved hierarchy, full-width imagery kept proportional.
- Fluid sizing: type and spacing scale smoothly; display headings step down rather than overflowing; images never overflow their container and keep aspect ratios.
- Grid changes: columns collapse (2-up → 1-up) while step numbers, roles, and range differentiation stay visible. Never hide routine information to force a layout.
- Navigation changes per the Navigation section; section spacing reduces proportionally on mobile but never to cramped.

## Mobile Behavior

- Navigation: collapsed menu pattern; reachable, tappable, dismissible; no hover-dependent behavior.
- Hero composition: stacked, short lines, imagery proportional — no cropped unreadable headlines beside oversized visuals.
- Product imagery: full-width or near-full-width with consistent proportions; no tiny thumbnails as the primary product view.
- Product grids: single-column sequences for routines; the ordered step structure must survive the stacking.
- Typography: display sizes step down; body stays comfortably readable; no uppercase walls of text.
- Buttons: full-width or comfortably large where primary; adequate spacing between adjacent actions.
- Content stacking order must preserve meaning (step order, range identity). Horizontal scrolling only when genuinely useful (never as the default section pattern).
- Touch targets ≥ ~44px; adjacent targets clearly separated. Premium feel on mobile comes from rhythm and restraint, not density.

## Accessibility

Practical requirements, not an afterthought:

- Color contrast: body text and interactive elements must meet at least WCAG AA contrast against their backgrounds. Muted text is for secondary content only — never for essential information at low contrast. (No palette confirmed; verify every color choice at adoption time.)
- Keyboard navigation: all interactive elements reachable and operable by keyboard in a logical order; custom widgets (menu, accordion, dialog — if ever added) follow standard keyboard patterns.
- Visible focus states: always present, high-contrast, never removed without an equally clear replacement.
- Semantic HTML: landmarks, one H1, ordered section headings, lists for steps (`ol` for routines), native `button`/`a` semantics — never a clickable `div`.
- Form labels: real associated labels for every input if a form is confirmed; errors programmatically associated with their fields.
- Image alt text: descriptive alt for meaningful product/ingredient imagery; empty alt for purely decorative images. Never derive alt text from file/folder names.
- Button/link semantics: navigations are links, actions are buttons. Disabled looks disabled *and* is semantically disabled.
- Touch target sizing per Mobile Behavior.
- Reduced motion: honor `prefers-reduced-motion` — disable entrance/scroll reveals and transitions for users who request it. Motion must never be required for understanding.

## Interaction Patterns

Philosophy: interaction improves understanding, navigation, product discovery, feedback, and polish — nothing else. Prefer CSS and native browser capabilities when sufficient. Use animation only when it improves usability, hierarchy, feedback, or polish. Use more advanced animation tooling only when genuinely necessary and justified by the implementation. Respect accessibility and reduced-motion preferences. Avoid unnecessary dependencies.

- Small transitions: hover/focus fades, gentle image zoom caps, state changes measured in milliseconds, not seconds.
- Controlled hover states: subtle elevation or image response; content never depends on hover.
- Restrained reveals may be used when they genuinely improve hierarchy, product discovery, or polish: short, quiet entrances for sections and product reveals, skippable via reduced-motion settings.
- Image transitions: crossfades or gentle scale within fixed-aspect frames to avoid layout shift.

Avoid: excessive parallax, distracting scroll effects, long or chained animations, animation on every element, decoration-only motion, and anything that harms performance, usability, or accessibility. Never add a dependency solely for visual effects.

## Do Not

- Don't introduce unnecessary animations or turn the site into an animation showcase.
- Don't create inconsistent button styles — one button language, reused everywhere.
- Don't use random colors or decorate sections with unrelated hues; accent is for emphasis only.
- Don't invent unsupported brand guidelines — no palette, typeface, logo, or voice presented as client fact until confirmed (OQ-6). Mark working conventions as recommendations.
- Don't overload sections with content — summarize with hierarchy; never reproduce the full brief.
- Don't make every section a card grid; prefer editorial composition.
- Don't use excessive gradients, shadows, borders, glassmorphism, or decorative effects.
- Don't make the site look like a generic SaaS template, dashboard, or checkout flow.
- Don't sacrifice readability for visual novelty (display type, low contrast, cramped spacing).
- Don't introduce unnecessary UI patterns — no tables, modals, or forms without a confirmed need.
- Don't add dependencies solely for visual effects; CSS and browser APIs first.
- Don't redesign unrelated working components without reason; extend shared components instead of forking them.
- Don't use inconsistent spacing or typography — one scale, one hierarchy.
- Don't use placeholder/lorem content where approved brief copy or supplied imagery already exists.
- Don't imply unconfirmed functionality — no purchase, booking, account, or secondary-page UI without explicit confirmation.
- Don't treat asset file/folder names as approved copy or alt text.
