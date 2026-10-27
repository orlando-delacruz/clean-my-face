# Manual QA Checklist

This checklist is performed manually by the project owner. Automated browser testing has been removed from this project; Vitest unit tests remain for the data and token guards.

To test: run `npm run dev`, or run `npm run build` and `npm run preview`, then open the printed URL.

## Redesign

The redesign runs in phases 4 to 12 (see `docs/REDESIGN_PLAN.md`). Each phase appends its own subsection below with that phase's manual checks. The sections after this one describe the build as it stood before the redesign.

### Phase 3: Redesign plan and rules

- [ ] Documentation only. There is no new UI to test in this phase; confirm the pre-redesign sections below still pass.

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
