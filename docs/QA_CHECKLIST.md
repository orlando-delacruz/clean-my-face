# Manual QA Checklist

This checklist is performed manually by the project owner. Automated browser testing has been removed from this project; Vitest unit tests remain for the data and token guards.

To test: run `npm run dev`, or run `npm run build` and `npm run preview`, then open the printed URL.

## Redesign

The redesign runs in phases 4 to 12 (see `docs/REDESIGN_PLAN.md`). Each phase appends its own subsection below with that phase's manual checks. The sections after this one describe the build as it stood before the redesign.

### Phase 3: Redesign plan and rules

- [ ] Documentation only. There is no new UI to test in this phase; confirm the pre-redesign sections below still pass.

### Phase 4: Foundations and global shell

- [ ] Header at 1440: transparent over the hero, solid after scrolling; nav links scroll or navigate; the button works.
- [ ] Header at 390: the menu opens full screen; links work; Escape or the close button closes it; focus returns to the toggle; the page does not scroll behind the menu.
- [ ] `/ranges/plump-it-up` and `/ranges/stay-clear` load; `/ranges/nope` shows the 404 page.
- [ ] Footer on every page; no social icon points to `#`.
- [ ] Fonts are correct; no console errors.

### Phase 5: Homepage sections 01 to 03

- [ ] 1440 and 390: the hero fills the screen; the headline is readable over the image; one primary button; no stats or pills.
- [ ] The hero image loads as AVIF or WebP in the Network tab. Known limitation: soft on high-density screens.
- [ ] Promise: asymmetric layout; the image overlaps the next section on desktop only; pillars numbered 01 to 04.
- [ ] Expertise: large 20; two images staggered on desktop and stacked on mobile; two statements side by side on desktop and stacked on mobile.
- [ ] No horizontal scroll from 320 to 1440. With reduced motion on: no parallax, all content visible.
- [ ] The header "Expertise" link lands on the expertise section.
- [ ] Headings render in Cormorant Garamond; adjacent sections look clearly different.

### Phase 6: Homepage sections 04 and 05

- [ ] Gentle: three columns staggered on desktop; a snap row with a peek on mobile; packshots overlap the texture images; each card links to the correct product page; the Removes row is plain text with dividers, not badges.
- [ ] Solutions: a 50/50 split at 1440, stacked at 390; the two panels are clearly different colors (blue and green); hover and keyboard focus scale the image; only the buttons are clickable; both buttons reach the range pages.
- [ ] No horizontal scroll at any width. With reduced motion on, the hover transform is gone.
- [ ] The homepage no longer shows the product grids or the routine tabs.
- [ ] The header "Expertise" link works; the header "Find your routine" button lands on the solutions section.

### Phase 7: Discovery, closing, contact, assembly

- [ ] Walk the whole homepage at 1440 and 390, top to bottom. Eight sections plus the contact band, each visibly different from its neighbors. The product grid appears once.
- [ ] Discover: bento layout at 1440; snap row with a peek at 390. Each card links to a real product page. The two range links work.
- [ ] Closing: one button only; the text is readable over the image.
- [ ] Contact: the form validates and shows its existing success state. Nothing suggests a message was delivered beyond the existing text.
- [ ] Header links: Expertise and Contact scroll to the right sections. The hero button reaches the solutions section.
- [ ] Reduced motion on: no hover transforms, no parallax. No horizontal scroll at any width. No console errors.

### Phase 8: Range pages

- [ ] /ranges/plump-it-up and /ranges/stay-clear at 1440 and 390: the blue (Plump) and green (Clear) themes stay consistent from hero to crossover.
- [ ] The six steps appear in order; each "View product" link opens the correct product page.
- [ ] Routine tabs switch with mouse and with the keyboard (Left, Right, Home, End); the content matches the routine copy.
- [ ] The crossover card leads to the other range.
- [ ] The header is transparent over the range hero and solid after scrolling; the background image fills the hero; no horizontal scroll.
- [ ] Reduced motion on: no animation; all content visible.

### Phase 9: Product page

Test at least four products: the first and last of each range.
- [ ] Desktop 1440: sticky gallery; one h1; sections in the specified order; ingredient tiles load.
- [ ] Mobile 390: gallery on top; readable stacked layout; related products as a snap row.
- [ ] Previous and next step links work; the first product has no previous link and the last has no next link.
- [ ] Sections with no data are absent (check a product without usageSteps if one exists).
- [ ] Back link goes to the correct range page; the header is solid on product pages.
- [ ] Reduced motion on; no horizontal scroll; no console errors.

### Phase 10: Legal, 404, focus

- [ ] /privacy-policy and /terms-and-conditions at 1440 and 390: the reading column is narrow; the title, updated date, and draft notice are visible; the section list appears on desktop only and its links jump to the right sections.
- [ ] /this-page-does-not-exist and /ranges/nope: the 404 page shows one h1, the 404 numeral, and working links to home and both ranges.
- [ ] Keyboard: after clicking a link to another page, the first Tab moves into the new page's content. Page scroll position behaves as before (no unexpected jumps).
- [ ] Footer legal links work.

### Phase 10.5: Corrective pass

- [ ] Promise section background is cream and reads distinct from the dark hero above and the dark expertise below.
- [ ] At 1440, the promise image overlaps into the top of the expertise section. At 390, no overlap and no horizontal scroll.
- [ ] At 1440, the hero copy sits in the lower left. At 390, it sits at the bottom, full width.

## Homepage (desktop 1440, tablet 768, mobile 390)

- [ ] Hero renders with the brand headline and both range badges; no broken image.
- [ ] Philosophy section renders with the four pillars.
- [ ] Two skin-need cards render side by side on desktop and stack on mobile.
- [ ] Plump It Up range section renders with its tinted background and six routine rows.
- [ ] Stay Clear range section renders with its tinted background and six routine rows.
- [ ] Featured products render three cards on desktop and stack on mobile.
- [ ] Routine guide tabs switch between the two ranges.
- [ ] Closing section renders with the inquiry form and the portrait image.
- [ ] Footer renders with all columns and legal links.
- [ ] No horizontal overflow at any width.

## Range pages

- [ ] Each range system image loads and is not blank.
- [ ] Tinted background fills the section without gaps.

## Product pages (at least one per range)

- [ ] Product name, positioning, and purpose render.
- [ ] Product hero image loads.
- [ ] Benefits list renders.
- [ ] Key ingredients render with their tiles or fallback initials.
- [ ] Texture and usage sections render when present.
- [ ] Routine step track links to the other products in the range.
- [ ] Back link returns to the range section.

## Legal pages

- [ ] Privacy Policy renders all sections.
- [ ] Terms and Conditions renders all sections.
- [ ] Draft notice is visible.

## 404 page

- [ ] Unknown routes show the not-found page with a single heading.

## Header and mobile menu

- [ ] Desktop header shows navigation links and the CTA.
- [ ] Mobile menu opens and closes with Escape.
- [ ] Focus returns to the menu toggle after closing.

## Footer

- [ ] All footer links navigate or scroll as expected.
- [ ] Social icons render.

## Fonts

- [ ] Headings render in Cormorant Garamond.
- [ ] Body copy renders in Inter.

## Reduced motion

- [ ] With the OS reduced-motion setting on, animations are off or minimal and the page is still usable.

## Images

- [ ] No broken images and no blank boxes anywhere.
- [ ] Hero crop and object-position look correct at desktop and mobile.
- [ ] Product cards and gallery tiles are not blurry at 2x display scaling.
