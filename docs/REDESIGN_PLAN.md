# Clean My Face Redesign Plan

Source of truth for redesign phases 4 to 12. Frontend-first prototype. Read the relevant sections before each phase.

## 1. North star
An inspirational, aspirational, sales-driven skincare brand experience. Not a presentation turned into a website. Not a product catalogue. About 80% brand experience and 20% product discovery (a creative emphasis, not a fixed layout ratio). Premium yet approachable. Confident, clean, science-informed, modern, human. Fresh and youthful with the polish of prestige beauty.
Vibe references (feel only, never copy colors, type, layout or copy): Beauty of Joseon (identity and philosophy), SKIN1004 (ingredient and texture storytelling), rhode (campaign imagery, human-centered, desirable products), Then I Met You (emotional, sensory, distinct personality).
Avoid: slides turned into sections, repeated text and image blocks, stock-looking visuals, dense technical copy, badge walls, product grids dominating the homepage, desktop-only decisions.

## 2. Scope and decisions
Out of scope: SEO, analytics, backend, ecommerce, CMS, automated browser tests, new automated tests. The owner tests manually.
D1 Brand name spelling in the wordmark and footer stays exactly as currently rendered.
D2 The company name in index.html meta stays untouched.
D3 The hero image stays hero.png (1417 x 794). Known softness on high-density screens is accepted.
D4 The inquiry form stays visual-only. It is never presented as a live submission. Keep its current validation and success behavior unchanged.
D5 Real image assets are reused only in roles they already hold. All other imagery is a Picsum stand-in (see section 8).
D6 Palette and typography remain the provisional tokens in src/theme.ts.
D7 Do not modify src/data/content.ts (product and range content, client-approved). New copy lives in new files: src/data/site.ts, src/data/home.ts, src/data/rangePages.ts.

## 3. Flow

### 3.1 Journey
1. Land on a campaign hero with one statement and one invitation: Find your routine.
2. Understand why the brand exists (promise), then why to trust it (expertise and innovation).
3. See gentleness and performance through textures (gentle performance).
4. Choose a skin solution (Plump It Up or Stay Clear). This is the main fork.
5. Arrive on a range page: the six-step system, the routine guide, a link across to the other range.
6. Open a product page: why it works, ingredients, texture, how to use, next step in the routine.
7. Return to the range or finish at the closing statement and contact.
The homepage offers a short curated product moment (three hero products) as a shortcut, not a catalogue.

### 3.2 Sitemap
| Route | Page | Status |
|---|---|---|
| / | Home (7 narrative sections plus contact band) | Redesign |
| /ranges/plump-it-up | Range page | New |
| /ranges/stay-clear | Range page | New |
| /products/<slug> (12) | Product page | Redesign, same URLs |
| /privacy-policy | Legal | Restyle |
| /terms-and-conditions | Legal | Restyle |
| any other | 404 | Restyle |
| /_system | Dev-only design system page | Unchanged |

### 3.3 Navigation and CTAs
Header (left to right): wordmark, nav links Expertise (/#expertise), Plump It Up (/ranges/plump-it-up), Stay Clear (/ranges/stay-clear), Contact (/#contact), then the button Find your routine (/#solutions).
Footer: brand statement, range links, Expertise and Contact links, legal links. Social icons only if a real URL exists.
Section anchors on the homepage: hero, promise, expertise, gentle, solutions, discover, closing, contact. Always link to them in the form /#anchor so they work from any page.
CTA map: hero primary goes to /#solutions. Hero secondary text link goes to /#promise. Solution panels go to the range pages. Curated products go to product pages, with quiet links to both range pages. Closing primary goes to /#solutions.

## 4. Content

### 4.1 Sources of truth
Client brief (copy deck below). src/data/content.ts for all product, range, routine and pillar copy (unchanged). New copy goes only in src/data/site.ts, src/data/home.ts, src/data/rangePages.ts. Never invent claims, ingredients, statistics, reviews, certifications or credentials. Internal notes stay in docs/, never in src/ data.

### 4.2 Copy deck (render exactly; no em dashes)
| Id | Text | Brief source |
|---|---|---|
| hero.headline | Clean with Purpose. Care with Confidence. | Hero A |
| hero.support | Skincare thoughtfully developed for real skin, real routines, and real results. | Hero A |
| promise.statement | Clean with Purpose | Brand anchor |
| promise.support | Skincare for real skin, real routines, and real results. | Brand promise |
| promise.pillars | Existing four pillars from content.ts brand data | Existing |
| expertise.headline | 20 Years of Expertise. A New Era of Skincare. | R&D |
| expertise.support | Built on two decades of research and development experience helping beauty brands. | R&D |
| formulation.headline | Every Ingredient Has a Purpose. Every Texture Has a Reason. | Formulation |
| formulation.support | Thoughtful formulas designed around real skin needs. | Formulation |
| innovation.headline | Inspired by Japanese & Korean Skincare Innovation. | Innovation |
| innovation.support | Modern cosmetic ingredients meet purposeful formulation expertise. | Innovation |
| gentle.headline | Effective Cleansing. Exceptional Gentleness. | Cleansing |
| gentle.support | Remove everyday impurities while keeping skin comfort in focus. | Cleansing |
| gentle.removes | Makeup, Sunscreen, Oil, Daily impurities | Core messaging |
| gentle.note | Hypoallergenic skincare. | Core messaging |
| solutions.headline | Different Skin Needs. Same Gentle Standard. | Skin philosophy |
| solutions.support | Discover solutions designed for your routine. | Skin philosophy |
| plump.eyebrow | Replenish + Comfort | Collections |
| plump.headline | A Little More Love for Your Skin. | Plump It Up |
| plump.support | Replenish moisture. Restore comfort. Embrace your natural glow. | Plump It Up |
| clear.eyebrow | Clarify + Balance | Collections |
| clear.headline | Clear Skin. Clear Confidence. | Stay Clear |
| clear.support | Find your balance with targeted care for clearer-looking skin. | Stay Clear |
| closing.headline | Clean with Purpose. | Brand anchor |
| closing.support | Skincare for real skin, real routines, and real results. | Brand promise |

### 4.3 UI labels (proposed, minimal, not claims)
Find your routine; Our promise; Hero products; Where to begin; View product; Explore Plump It Up; Explore Stay Clear; Removes; Talk to us; Back to range; Next step; Previous step; How to use; Key ingredients; Texture; Your routine.

### 4.4 What leaves the homepage
Hero stats row (12 Products, 02 Systems, 06 Steps), hero badge pills, Philosophy section, Skin Needs cards, both six-product range grids, the old Featured grid, the routine tabs, and the old Closing layout. Range grids and routine tabs move to the range pages. Nothing from content.ts is deleted.

## 5. Visual direction

### 5.1 Section rhythm (homepage)
| Section | Background | Composition |
|---|---|---|
| Header | Transparent over hero, solid after scroll | Wordmark left, nav center, button right |
| 01 Hero | Dark, full-bleed image | Full-bleed, text lower left |
| 02 Promise | Cream (background) | Asymmetric 7/5, offset tall image |
| 03 Expertise | Dark (surfaceInverse) | Large numeral, staggered image pair, two statements |
| 04 Gentle | Warm (surfaceWarm) | Three staggered texture columns |
| 05 Solutions | Two soft tints (plumpSoft, clearSoft) | Split panels, full-bleed |
| 06 Discover | Cream | Asymmetric bento: one large, two stacked |
| 07 Closing | Dark image with scrim | Full-bleed, centered statement, one CTA |
| Contact | Cream | Quiet two-column band |
| Footer | Dark | Statement, links |
No two adjacent sections share a composition or background.

### 5.2 Type, color, imagery
Headings use the display token (Cormorant Garamond) at the fluid scale (display, h1, h2, h3). Body uses Inter. Eyebrows use the eyebrow style. Colors come from theme tokens only. Use withAlpha for new alpha values. Gold is decoration only, never text. Range sections use RangeTheme (plump, clear). Imagery rules: large, spacious, one idea per image, no collage walls. Use MediaFrame for ratio, radius and focal point.

### 5.3 Motion
Motion for React only. Reveal may repeat across sections. Parallax only in the hero and in Expertise. Every animation honors prefers-reduced-motion. No hover-only information. No autoplay video or carousels that move on their own.

### 5.4 Responsive
Mobile first at 360, 390, 430, 768, 1024, 1280, 1440. No horizontal page scroll. Tap targets at least 44px. Body text at least 16px. Mobile stories are vertical sequences; horizontal rows use scroll-snap with a visible peek.

## 6. Homepage specifications

### 6.1 Header
Over the hero and on range pages it is transparent with inverse text; elsewhere solid cream. Becomes solid after scrolling past 24px. Mobile: full-screen menu with large serif links, range shortcuts, focus trap, scroll lock, Escape closes and returns focus to the toggle. Active link highlight on scroll is preserved.

### 6.2 Section 01 Campaign hero (id hero)
Full viewport, min height 100svh, capped at 960px. hero.png full-bleed with the existing responsive image and priority loading. Scrim from heroScrim tokens for legibility. Text lower left on desktop: eyebrow-free, headline hero.headline at the display size, hero.support below, primary button Find your routine, quiet text link Our promise. A small floating stand-in texture card (ratio 4/5, about 220px wide) overlaps the bottom right on desktop only. A scroll cue at the bottom. No stats, no pills. Motion: staggered line reveal, slow parallax on the image (at most 4%). Mobile: text anchored bottom, CTA full width, no floating card.

### 6.3 Section 02 Brand promise (id promise)
Cream. 7/5 grid. Left: eyebrow Our promise, promise.statement at the display size, promise.support, then the four pillars as a numbered list (01 to 04) with hairline dividers, name and its existing one-line text from content.ts. Right: tall stand-in texture image (4/5) offset downward by about 4rem and overlapping into the next section. Mobile: image above the list, no overlap.

### 6.4 Section 03 Expertise and innovation (id expertise)
Dark. Left column: a very large numeral 20 in the display face, gold, beside expertise.headline and expertise.support. Right column: two stand-in images (ingredient still life 4/5, lab craft 1/1) staggered with an offset. Below, a two-column row separated by a hairline: formulation (headline and support) and innovation (headline and support). Large type, no bullets, no badges, no icons. The only figure is 20. Parallax on the image pair. Mobile: numeral and headline, then images stacked with offset reduced, then the two statements stacked.

### 6.5 Section 04 Gentle performance (id gentle)
Warm. Header block: gentle.headline, gentle.support. Three staggered columns (offsets 0, 3rem, 6rem on desktop) for the cleansers Cleansing Balm, Milky Cushion Cleanser, Heartleaf Cleansing Oil: a tall stand-in texture image (3/4), the real product packshot overlapping its lower corner, the product name, and the product tagline from content.ts, linking to the product page. Under the columns a quiet row: label Removes then the four items from gentle.removes separated by thin dividers (not badges). Then the single line gentle.note. Mobile: SnapRow with peek.

### 6.6 Section 05 Two skin solutions (id solutions)
Centered intro: solutions.headline, solutions.support. Below, two full-bleed split panels side by side on desktop (50/50, min height 78vh), stacked on mobile (each about 560px). Each panel is wrapped in RangeTheme and has a soft tint background, a stand-in mood image filling part of the panel, the range eyebrow, headline, support, skin type text taken from the existing skinNeeds data, and a button Explore Plump It Up or Explore Stay Clear. On hover and on focus-within the image scales to 1.04 and the overlay lightens. No information appears only on hover. The panel is not one big link; only the button is the link.

### 6.7 Section 06 Curated discovery (id discover)
Cream. Header: eyebrow Hero products, heading Where to begin. Three products from the existing featured data. Desktop bento: first product large (7 columns), two stacked (5 columns). Each card: large packshot on a range-tinted field, step and role, name, tagline, link View product. Below, two quiet text links Explore Plump It Up and Explore Stay Clear. This is the only product grid on the homepage. Mobile: SnapRow with peek.

### 6.8 Section 07 Closing statement (id closing)
Full-bleed bg-mage-1.jpg backdrop (existing responsive background) with a dark scrim. Centered: closing.headline at the display size, closing.support, one button Find your routine. Nothing else.

### 6.9 Contact band (id contact)
Cream, quiet. Two columns: left heading Talk to us with one short line of existing contact copy from the current closing data; right the existing inquiry form with its current fields, validation and success behavior unchanged, restyled with tokens. It is never presented as a live submission.

### 6.10 Footer
Dark. Brand statement (promise.statement), range links, Expertise and Contact links, legal links, social icons only for real URLs. Tidy and compact.

## 7. Page specifications

### 7.1 Range page (/ranges/<id>)
Wrapped in RangeTheme. Sections: (1) range hero: tinted full-bleed field, existing range background image, range eyebrow, headline, support, existing skin type and promise copy; (2) the system: six steps as an editorial vertical list on desktop (large step number, packshot, name, role, one-line tagline, View product) and stacked cards on mobile; (3) routine guide: the existing routine content as tabs (daily core, add as needed; morning, evening, targeted care), restyled; (4) crossover: a card to the other range with solutions.headline and a button; (5) a short closing line with the button Find your routine is NOT repeated; end with the footer.

### 7.2 Product page (/products/<slug>)
Desktop two columns. Left (sticky): large packshot on a range-tinted field, thumbnails from the existing gallery data. Right: back link to the range, Step N of 6 label, product name as the only h1, tagline, positioning, benefits as short statements, then sections Key ingredients (existing tiles), Texture (TextureSwatch and notes), How to use (numbered steps from existing usageSteps), Your routine (previous and next step links, position indicator), Related products. All copy from existing product data. Mobile: gallery on top, content stacked, related products as a SnapRow.

### 7.3 Legal pages
Narrow reading column, large serif title, updated date, numbered sections with generous spacing, a contact line, the draft notice kept visible. No legal text is changed.

### 7.4 404
Brand voice using existing copy, links to both ranges and home, same shell.

## 8. Image roles
| Role | Asset | Type |
|---|---|---|
| Hero background | hero.png via ResponsiveImage priority | Real |
| Closing backdrop | bg-mage-1.jpg via ResponsiveBackground | Real |
| Range page hero backgrounds | bg-image-2.png (Plump), bg-image-3.png (Clear) via ResponsiveBackground | Real |
| Product packshots | Existing product images | Real |
| Range system images | 6 products system images | Real, range pages only |
| Hero floating texture card | Picsum seed cmf-hero-texture | Stand-in |
| Promise tall image | Picsum seed cmf-promise-texture | Stand-in |
| Expertise images | Picsum seeds cmf-expertise-ingredient, cmf-expertise-lab | Stand-in |
| Gentle texture images (3) | Picsum seeds cmf-texture-balm, cmf-texture-milk, cmf-texture-oil | Stand-in |
| Solutions mood images (2) | Picsum seeds cmf-solution-plump, cmf-solution-clear | Stand-in |
Use only the StandInImage component for Picsum. Stand-ins are decorative (empty alt). Do not add any other real asset to a new role. The list of stand-ins is tracked in docs/STAND_INS.md, not in src/.

## 9. Phases
3 plan and rules. 4 foundations and shell. 5 homepage 01 to 03. 6 homepage 04 and 05. 7 homepage 06, 07, contact, assembly. 8 range pages. 9 product page. 10 legal, 404, route-change focus. 11 mobile and polish, cleanup. 12 final review against the brief. Each phase ends with a manual QA checklist and a candidate tag.
