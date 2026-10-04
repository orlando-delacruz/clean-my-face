# Requirements — CleanMyFace Website Test

> Single source of truth for **what the website is required to do**.
> Project: CleanMyFace skincare / dermocosmetics by **Peerpharm** — paid website test (₱6,000), coordinated through John Frederick J. Dimas.
> Sources: `docs/PROJECT.md` (confirmed project context), `images/` (90 verified raster assets: 85 PNG + 5 JPG), and the external ~23-page CleanMyFace brand brief (not in repo).
> Status labels: **[Confirmed]** = explicitly supported by `docs/PROJECT.md`; **[Constraint]** = confirmed boundary (out of scope / do-not-do unless explicitly confirmed); **[Intended]** = expected per `docs/PROJECT.md` but final details subject to client review, not a strict acceptance requirement; **[Open]** = unconfirmed, see Open Questions; **[Recommendation]** = good practice if implemented, not a client requirement.
> Requirement IDs (`FR-`, `NFR-`, `BR-`, `CR-`, `UX-`, `RR-`, `REC-`) are for traceability only and imply no implementation.

## 1. Functional Requirements

### Homepage — confirmed deliverable

- **FR-1 [Confirmed]:** The primary deliverable SHALL be a homepage/landing page. It is the only confirmed page; a secondary page is unconfirmed (see OQ-3).
  - Check: the delivered work includes one complete homepage concept covering the confirmed scope. Implementation format (design mock vs. coded/functional build) is unconfirmed — see OQ-10. Do not assume a live site at a site root.
- **FR-2 [Intended]:** Per `docs/PROJECT.md` Core Features and Scope, the homepage content is *intended* to follow this hierarchy (final set and order subject to client review, not frozen):
  1. Hero / brand introduction
  2. Brand philosophy
  3. The two skin-need directions and corresponding ranges
  4. Plump It Up product system
  5. Stay Clear product system
  6. Selected / featured product presentation
  7. Routine guidance
  8. Closing area (form and behavior open — see FR-5 / OQ-4)
  - Check (intended, not acceptance): the homepage concept addresses these areas in a clear hierarchy. Omission or reordering is a client-review matter, not a failure of a confirmed SHALL.
- **FR-3 [Intended]:** The *intended* visitor flow on the homepage, per `docs/PROJECT.md` Main User Flows, is:
  land → learn positioning/philosophy → identify the two range directions → explore Plump It Up and/or Stay Clear → understand the routine system → view featured product information where presented → reach the closing area.
  - Note: no authentication or transactional step is part of this flow. No login, purchase, booking, or form submission is confirmed — see FR-6. Do not add such steps without explicit confirmation.
- **FR-4 [Confirmed in part; product name Open — see OQ-1]:** The homepage SHALL present the two six-product routine systems as defined in `docs/PROJECT.md`:
  - Plump It Up — steps 01–06 with roles Remove / Cleanse / Prep / Exfoliate / Weekly Care / Target. Step 02 official product name is **unresolved** (see OQ-1).
  - Stay Clear: 01 Heartleaf Cleansing Oil (Remove), 02 2% BHA Gel Cleanser (Cleanse), 03 Balancing Daily Toner (Prep), 04 Exfoliating Toner (Exfoliate), 05 Clarifying Clay Mask (Weekly Care), 06 Blemish + Mark Spot Treatment (Treat).
  - Undisputed Plump It Up entries per `docs/PROJECT.md`: 01 Cleansing Balm (Remove), 03 Fermented Milky Essence Toner (Prep), 04 Soft Peeling Gel (Exfoliate), 05 Rice Barrier Cream Mask (Weekly Care), 06 Dry Spot Rescue Balm (Target).
  - Rule: the implementation SHALL NOT invent, select, or silently resolve the Step 02 name before client confirmation, per BR-2, BR-3, and CR-5. OQ-1 is the sole source of truth for the candidates (`Milky Cushion Cleanser` vs `GEL CLEANSER`).
  - Note: the exact UI treatment of the unresolved Step 02 name is a design/implementation decision pending confirmation and is **not** prescribed here. No specific workaround (showing, hiding, or omitting the name; placeholder text; step-only display) is a confirmed requirement.
  - Check: routine structure matches `docs/PROJECT.md`; neither Step 02 candidate is presented as confirmed and no invented name appears. Step 02 naming itself is excluded from confirmation until OQ-1 resolves.
- **FR-5 [Open]:** A closing area is *intended* per the `docs/PROJECT.md` hierarchy, but its goal, action, and conversion behavior are **unconfirmed** (see OQ-4). No contact, inquiry, purchase, booking, social, data-capture, or other conversion behavior SHALL be assumed or implemented without explicit client confirmation.
  - Check: no conversion workflow is present or implied unless explicitly confirmed.

### Functionality not confirmed

- **FR-6 [Constraint]:** The following are **not confirmed** and SHALL NOT be assumed or implemented without explicit client confirmation:
  ecommerce, pricing, checkout, purchase links, product-detail pages, booking/consultation or other transactional workflows, authentication/accounts/admin roles, CMS, or backend functionality.
  - Check: none of the above is implemented or implied by the UI unless explicitly confirmed. This states scope only; it does not decide the final technical implementation (framework, backend architecture, hosting, and deployment are separately unconfirmed — see OQ-5 / OQ-10).

## 2. Non-Functional Requirements

- **NFR-1 [Confirmed intent]:** The homepage concept SHOULD communicate a polished, premium, professional dermocosmetics impression appropriate to beauty/wellness evaluation, per `docs/PROJECT.md` Purpose and Constraints.
  - Note: qualitative client-review matter; no metric or threshold is confirmed.
- **NFR-2 [Confirmed]:** Homepage content SHALL prioritize clarity and hierarchy over completeness; the ~23-page brief SHALL NOT be reproduced wholesale, per `docs/PROJECT.md` Problem and Business Rules.
  - Check (review): the homepage summarizes rather than reproduces the full brief.

No confirmed requirements exist for performance budgets, availability/SLA, WCAG level, Lighthouse scores, browser matrix, hosting, or deployment. See Open Questions and Recommendations.

## 3. Business Rules

- **BR-1 [Confirmed]:** The supplied CleanMyFace brand brief is the primary source of truth for brand and product content.
- **BR-2 [Constraint]:** Do NOT invent product claims, ingredients, benefits, textures, usage, pricing, brand identity elements, or purchase flows. Missing content stays missing until the client supplies it.
- **BR-3 [Constraint]:** Do NOT silently resolve conflicting product information. Flag inconsistencies for client clarification (see OQ-1, OQ-2).
- **BR-4 [Confirmed]:** Product information SHALL be organized by range and routine step, and the two ranges SHALL remain clearly differentiated throughout.
- **BR-5 [Constraint]:** Do NOT assume unconfirmed functionality. Ecommerce, booking, consultation, transactional, auth, or CMS behavior requires explicit client confirmation.
- **BR-6 [Confirmed]:** The website SHALL preserve the brand positioning around purposeful, approachable skincare ("Every product has a clear job"; "Different skin needs. Same gentle standard.").

## 4. Content Requirements

- **CR-1 [Confirmed]:** Brand messaging SHALL reflect the approved core lines without alteration of meaning:
  - `CLEAN WITH PURPOSE`
  - `SKINCARE THAT GETS TO THE POINT`
  - `Effective Formulas, Gentle on Skin, Approachable Skincare.`
  - `Dermocosmetics made for real skin, real routines, real results.`
  - Philosophy: `Every product has a clear job.`
  - Supporting: `Different skin needs. Same gentle standard.`
  - Four pillars: (1) Clear Job — Targeted Skin Needs, (2) Purposeful Ingredients — Backed by Dermatology, (3) Intentional Texture — Designed for Real Use, (4) Right Format — The Best Way to Deliver Results.
- **CR-2 [Confirmed]:** Range positioning SHALL be stated as supplied:
  - Plump It Up — Replenish + Comfort — for normal-to-dry skin. Benefits: Hydrate Deeply, Comfort Sensitive Skin, Support Skin Barrier.
  - Stay Clear — Clarify + Balance — for oily-to-troubled skin. Benefits: Clarify Pores, Balance Excess Oil, Keep Skin Clear.
- **CR-3 [Confirmed]:** Detailed product copy (taglines, descriptions, benefits, key ingredients, texture, application) SHALL be taken only from the brand brief and reserved for the appropriate location — not expanded or paraphrased into new claims. Per `docs/PROJECT.md`, detail belongs to appropriate product/range/secondary pages when required, not wholesale on the homepage.
- **CR-4 [Confirmed]:** Homepage visuals, where visuals are used, SHALL use the client-supplied `images/` assets. Verified in-repo asset types (90 files: 85 PNG + 5 JPG):
  - Product images (per-product `<Name>.png`; note: `SOFT PEELING GEL/` contains no product hero image — only ingredient/purpose tiles);
  - `ingredient-*.png` / `ingredients-*.png` tiles;
  - `step-*.png` tiles (in `CLEANSING BALM/`, `GEL CLEANSER/`, `ESSENCE TONER/`, `dry spot rescue balm/`);
  - `purpose-*.png` tiles (in `RICE BARRIER CREAM MASK/`, `SOFT PEELING GEL/`);
  - Shared files: `hero.png`, `bg-image-2.png`, `bg-image-3.png`, `bg-mage-1.jpg` (filename suggests background use; placement not confirmed), `6 products system.jpg`, `6 products system-2.jpg`, `additional-img-1.jpg` … `additional-img-7.png` (purpose/placement not confirmed).
  - Verified absent: no logo, font, or brand-color asset package is in the repo (confirmed by `docs/PROJECT.md` and file listing); none SHALL be invented (see OQ-6).
  - Asset folder/file names (e.g. `GEL CLEANSER/`, `HEARTLEAF CLEANSING OI`, casing variants) are filesystem labels, not approved copy, and SHALL NOT be treated as copy authority.
- **CR-5 [Constraint]:** Known brief inconsistencies SHALL NOT be treated as resolved requirements:
  - Plump It Up Step 02 naming (`Milky Cushion Cleanser` vs `GEL CLEANSER` / `GEL CLEANSER/` asset folder).
  - Stay Clear Step 02 description for `2% BHA Gel Cleanser` (appears duplicated from the cleansing oil).
  - Replacement copy for either item SHALL NOT be published before client confirmation.

## 5. UI/UX Requirements

- **UX-1 [Confirmed]:** The homepage SHALL keep the two skin-need paths (normal-to-dry → Plump It Up; oily-to-troubled → Stay Clear) clearly differentiated, per `docs/PROJECT.md` Problem and Business Rules.
- **UX-2 [Confirmed]:** Each product system SHALL read as an ordered routine (step number + routine role), not as an undifferentiated product list, per the routine tables in `docs/PROJECT.md`.
- **UX-3 [Confirmed]:** The page SHALL remain focused and understandable as a single homepage concept (see FR-2, intended hierarchy). No transactional UI SHALL be implied unless explicitly confirmed.
  - Note: navigation structure beyond the homepage is a design/implementation decision. A secondary page remains open per OQ-3; normal site navigation chrome is not prohibited.
  - Check: no links/buttons suggesting unconfirmed purchases or transactions.
- **UX-4 [Confirmed]:** Product presentation, where imagery is used, SHALL use supplied product/ingredient/step/purpose imagery to support — not replace — brief-approved copy, per `docs/PROJECT.md` Scope.

No confirmed requirements exist for specific layout, visual style, typography, color system, motion, or component library. Those are design proposals, not requirements.

## 6. SEO and Hygiene — Recommendations Only

No SEO requirements are confirmed in the current project context.

- **REC-1 [Recommendation]:** *If* a coded/functional implementation is built (format unconfirmed — see OQ-10), consider standard hygiene: meaningful page title, meta description, a single H1, and descriptive alt text for `images/` assets. These are suggestions only — no targets, keywords, structured data, sitemap, or analytics requirements are confirmed. See OQ-8.

## 7. Responsive — Goal and Recommendation

Good UX across screen sizes is a design goal per `docs/PROJECT.md` Scope; final responsive behavior and breakpoint requirements are not yet confirmed.

- **RR-1 [Intended goal, specifics Open]:** The homepage concept is intended to work well across screen sizes (see OQ-7 for breakpoints/devices/acceptance, all unconfirmed).
- **REC-2 [Recommendation]:** *If* a coded build is produced, check readability of the FR-2 blocks on representative desktop and mobile widths as good practice. This is not an acceptance requirement until OQ-7 is confirmed.

## 8. Constraints / Scope Boundaries

Confirmed scope:

- Homepage/landing page as the primary and only confirmed deliverable.
- Intended content hierarchy — see FR-2 (intended, subject to client review).
- Use of brief-approved copy and `images/` assets as supplied.

Not confirmed — do not assume or implement without explicit client confirmation **[Constraint]**:

- Secondary page (a Products / Product Ranges page is a logical candidate only — a proposal, not a requirement).
- Ecommerce, pricing, checkout, purchase links.
- Product-detail pages.
- Booking, consultation, or other transactional workflows.
- Authentication, accounts, admin roles, CMS, backend functionality (if any — backend architecture itself is unconfirmed).
- Reproducing the entire brand brief on the homepage.
- Inventing logo, typography, color palette, product claims, or CTA conversion behavior.

Project and technical notes (context, not requirements):

- Paid website test (₱6,000), paid after client presentation/meeting; presentation schedule was unfinalized at time of `docs/PROJECT.md`.
- Unconfirmed at time of documentation: implementation format (design-only vs. coded/functional), framework/technology, backend architecture, authentication, CMS, deployment, hosting, responsive/breakpoint specifics, CTA goal, ecommerce, audience demographics, and presentation date/time — see OQ-3–OQ-10.
- The brand brief (~23 pages) is external and not committed to the repo; `images/` rasters are the only in-repo content source besides `docs/`.

## 9. Open Questions / Unconfirmed Requirements

Document here — do NOT implement as requirements until confirmed:

- **OQ-1 — Plump It Up Step 02 name:** Confirm official name (`Milky Cushion Cleanser` vs `GEL CLEANSER`). The exact UI treatment of the unresolved name is a design decision pending confirmation; no workaround is prescribed here.
- **OQ-2 — Stay Clear Step 02 description:** Confirm correct approved description for `2% BHA Gel Cleanser` (current brief copy appears duplicated from cleansing oil). No replacement copy to be invented.
- **OQ-3 — Secondary page:** Is a second page required? If so, which page, URL, content, and navigation?
- **OQ-4 — CTA goal:** What is the closing area's goal, action, and conversion behavior, if any? No behavior is assumed.
- **OQ-5 — Ecommerce/transactional:** Are purchasing, pricing, booking, consultation, accounts, CMS, or backend functionality ever in scope?
- **OQ-6 — Brand assets:** Will final logo, typography, color palette, and usage rules be supplied? Availability outside the repo is unconfirmed.
- **OQ-7 — Responsive/matrix:** Confirm breakpoints, supported devices/browsers, and acceptance criteria, if a coded build is required.
- **OQ-8 — SEO/analytics:** Confirm any SEO targets, keywords, structured data, sitemap, social/preview, or analytics requirements.
- **OQ-9 — Audience:** Confirm any demographic or localization requirements beyond skin-need targeting (currently explicitly unconfirmed).
- **OQ-10 — Schedule/delivery/implementation:** Confirm presentation date/time, implementation format (design mock vs. coded build), framework/technology if coded, delivery format (preview link vs. repo), hosting/deployment, and acceptance process for the paid test.
