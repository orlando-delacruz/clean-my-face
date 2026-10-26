/**
 * Declarative derivative manifest for the Phase 2 image pipeline.
 *
 * Each entry names ONE source file in images/ (repo-relative path, the same
 * key used in src/data/images.ts) and the derivative widths to generate.
 * Widths are chosen from the measured max rendered CSS widths in
 * docs/baseline/image-usage.md: every derivative covers its rendered use at
 * DPR 2 without ever upscaling past the intrinsic source width (the
 * optimizer in scripts/optimize-images.mjs skips any width larger than the
 * source and logs it).
 *
 * Entries with widths: [] are delivered as the original file only, with the
 * reason recorded in `note`. Files not listed here are excluded from the
 * pipeline (see EXCLUDED at the bottom) and are never generated or deleted.
 */

export const IMAGE_QUALITY = {
  avif: { quality: 55, effort: 4 },
  webp: { quality: 75, effort: 4 },
  lqip: { width: 24, quality: 50 },
};

export const IMAGE_FORMATS = ['avif', 'webp'];

export const IMAGE_MANIFEST = [
  {
    key: 'hero.png',
    widths: [640, 960, 1280, 1417],
    note: 'Hero full-bleed background. Measured max 1468.8 CSS px wide; DPR 2 need is 2938 px but the source is 1417 px, so 1417 is the largest (shortfall reported as a client-asset request).',
  },
  {
    key: 'bg-image-2.png',
    widths: [640, 960, 1280],
    note: 'RangeSystem tinted CSS background (cover, boxes up to 1440x1470). Source 1416 px wide; 1280 is the largest that stays under the source.',
  },
  {
    key: 'bg-image-3.png',
    widths: [640, 960, 1280],
    note: 'RangeSystem tinted CSS background (cover, boxes up to 1440x1470). Source 1417 px wide; 1280 is the largest that stays under the source.',
  },
  {
    key: 'bg-mage-1.jpg',
    widths: [640, 960, 1280],
    note: 'Closing tinted CSS background (cover, boxes up to 1440x788). Source 1416 px wide.',
  },
  {
    key: '6 products system.jpg',
    widths: [640, 960, 1080],
    note: 'SkinNeeds range card, rendered max 1086 CSS px. 1080 covers 1x fully; DPR 2 would need 2172 px, which the 1136 px source cannot supply (shortfall reported).',
  },
  {
    key: '6 products system-2.jpg',
    widths: [640, 960, 1080],
    note: 'SkinNeeds range card, rendered max 1086 CSS px. 1080 covers 1x fully; DPR 2 would need 2172 px, which the 1126 px source cannot supply (shortfall reported).',
  },
  {
    key: 'RICE BARRIER CREAM MASK/RICE BARRIER CREAM MASK.png',
    widths: [360, 560, 720],
    note: 'ProductCard thumb, rendered max 280.67 CSS px. 560 covers DPR 2; 720 kept as the largest. Source 2523 px is oversized, so derivatives save most bytes here.',
  },
  {
    key: 'CLEANSING BALM/CLEANSING BALM.png',
    widths: [320, 480, 640],
    note: 'ProductCard/ProductGallery hero, rendered max 347.81 CSS px (needs 696 at DPR 2; source is 576 px, so DPR 2 is a shortfall). 640 is skipped by the optimizer because it exceeds the source width.',
  },
  {
    key: 'milky-cushion-cleanser.jpg',
    widths: [320, 480, 640],
    note: 'ProductCard thumb, rendered max 159.72 CSS px (needs 319 at DPR 2). 640 covers 2x.',
  },
  {
    key: 'ESSENCE TONER/ESSENCE TONER.png',
    widths: [320, 480, 640],
    note: 'ProductCard thumb, rendered max 159.84 CSS px (needs 320 at DPR 2). Widths above the 414 px source are skipped by the optimizer.',
  },
  {
    key: 'soft-peeling-gel.jpg',
    widths: [320, 480, 640],
    note: 'ProductCard thumb, rendered max 160.06 CSS px (needs 320 at DPR 2). 640 covers 2x.',
  },
  {
    key: 'dry spot rescue balm/dry spot rescue balm.png',
    widths: [320, 480, 640],
    note: 'ProductCard thumb in the same card grid as the other heroes (about 160 to 348 CSS px). Widths above the source width are skipped by the optimizer.',
  },
  {
    key: 'heartleaf-cleansing-oil.jpg',
    widths: [320, 480, 640],
    note: 'ProductCard/ProductGallery hero, rendered max 347.81 CSS px (needs 696 at DPR 2; source 920 px covers it).',
  },
  {
    key: '2-bha-gel-cleanser/2-bha-gel-cleanser.png',
    widths: [320, 480, 640],
    note: 'ProductCard thumb, rendered max 160.39 CSS px (needs 321 at DPR 2). Widths above the 405 px source are skipped by the optimizer.',
  },
  {
    key: 'balancing-daily-toner.jpg',
    widths: [320, 480, 640],
    note: 'ProductCard thumb, rendered max 159.89 CSS px (needs 320 at DPR 2). Source 921 px is oversized, so derivatives save most bytes here.',
  },
  {
    key: 'EXFOLIATING TONER/EXFOLIATING TONER.png',
    widths: [320, 480, 640],
    note: 'ProductCard thumb, rendered max 160 CSS px (needs 320 at DPR 2). Widths above the 396 px source are skipped by the optimizer.',
  },
  {
    key: 'CLARIFYING CLAY MASK/CLARIFYING CLAY MASK.png',
    widths: [320, 480, 640],
    note: 'ProductCard thumb in the same card grid as the other heroes (about 160 to 348 CSS px). Widths above the source width are skipped by the optimizer.',
  },
  {
    key: 'blemish-mark-spot-treatment/blemish-mark-spot-treatment.png',
    widths: [320, 480, 640],
    note: 'ProductCard thumb in the same card grid as the other heroes (about 160 to 348 CSS px). Widths above the source width are skipped by the optimizer.',
  },
  {
    key: 'additional-img-7.png',
    widths: [],
    note: 'RoutineGuide figure, rendered 280 CSS px (needs 560 at DPR 2) but the source is only 229 px. Original only; replacement requested from the client.',
  },
  {
    key: 'additional-img-3.png',
    widths: [],
    note: 'Closing portrait, rendered 176 CSS px (needs 352 at DPR 2) but the source is only 283 px. Original only; replacement requested from the client.',
  },
  {
    key: 'CLEANSING BALM/ingredients-1.png',
    widths: [],
    note: 'Ingredient tile, rendered 56 CSS px (needs 112 at DPR 2; source 99 to 100 px is marginal). Original only; do not upscale.',
  },
  {
    key: 'CLEANSING BALM/ingredients-2.png',
    widths: [],
    note: 'Ingredient tile, rendered 56 CSS px. Original only; do not upscale.',
  },
  {
    key: 'CLEANSING BALM/ingredients-3.png',
    widths: [],
    note: 'Ingredient tile, rendered 56 CSS px. Original only; do not upscale.',
  },
  {
    key: 'CLEANSING BALM/ingredients-4.png',
    widths: [],
    note: 'Ingredient tile, rendered 56 CSS px. Original only; do not upscale.',
  },
  {
    key: 'CLEANSING BALM/step-1.png',
    widths: [],
    note: 'Step tile, rendered 56 CSS px. Original only; do not upscale.',
  },
  {
    key: 'CLEANSING BALM/step-2.png',
    widths: [],
    note: 'Step tile, rendered 56 CSS px. Original only; do not upscale.',
  },
  {
    key: 'CLEANSING BALM/step-3.png',
    widths: [],
    note: 'Step tile, rendered 56 CSS px. Original only; do not upscale.',
  },
  {
    key: 'GEL CLEANSER/ingredients-1.png',
    widths: [],
    note: 'Ingredient tile, rendered 56 CSS px. Original only; do not upscale.',
  },
  {
    key: 'GEL CLEANSER/ingredients-2.png',
    widths: [],
    note: 'Ingredient tile, rendered 56 CSS px. Original only; do not upscale.',
  },
  {
    key: 'GEL CLEANSER/ingredients-3.png',
    widths: [],
    note: 'Ingredient tile, rendered 56 CSS px. Original only; do not upscale.',
  },
  {
    key: 'GEL CLEANSER/step-1.png',
    widths: [],
    note: 'Step tile, rendered 56 CSS px. Original only; do not upscale.',
  },
  {
    key: 'GEL CLEANSER/step-2.png',
    widths: [],
    note: 'Step tile, rendered 56 CSS px. Original only; do not upscale.',
  },
  {
    key: 'GEL CLEANSER/step-3.png',
    widths: [],
    note: 'Step tile, rendered 56 CSS px. Original only; do not upscale.',
  },
  {
    key: 'ESSENCE TONER/ingredients-1.png',
    widths: [],
    note: 'Ingredient tile, rendered 56 CSS px. Original only; do not upscale.',
  },
  {
    key: 'ESSENCE TONER/ingredients-2.png',
    widths: [],
    note: 'Ingredient tile, rendered 56 CSS px. Original only; do not upscale.',
  },
  {
    key: 'ESSENCE TONER/ingredients-3.png',
    widths: [],
    note: 'Ingredient tile, rendered 56 CSS px. Original only; do not upscale.',
  },
  {
    key: 'ESSENCE TONER/ingredients-4.png',
    widths: [],
    note: 'Ingredient tile, rendered 56 CSS px. Original only; do not upscale.',
  },
  {
    key: 'ESSENCE TONER/step-1.png',
    widths: [],
    note: 'Step tile, rendered 56 CSS px. Original only; do not upscale.',
  },
  {
    key: 'ESSENCE TONER/step-2.png',
    widths: [],
    note: 'Step tile, rendered 56 CSS px. Original only; do not upscale.',
  },
  {
    key: 'ESSENCE TONER/step-3.png',
    widths: [],
    note: 'Step tile, rendered 56 CSS px. Original only; do not upscale.',
  },
  {
    key: 'SOFT PEELING GEL/purpose-1.png',
    widths: [],
    note: 'Purpose tile, rendered 56 CSS px. Original only; do not upscale.',
  },
  {
    key: 'SOFT PEELING GEL/purpose-2.png',
    widths: [],
    note: 'Purpose tile, rendered 56 CSS px. Original only; do not upscale.',
  },
  {
    key: 'SOFT PEELING GEL/purpose-3.png',
    widths: [],
    note: 'Purpose tile, rendered 56 CSS px. Original only; do not upscale.',
  },
  {
    key: 'SOFT PEELING GEL/ingredients-1.png',
    widths: [],
    note: 'Ingredient tile, rendered 56 CSS px. Original only; do not upscale.',
  },
  {
    key: 'SOFT PEELING GEL/ingredients-2.png',
    widths: [],
    note: 'Ingredient tile, rendered 56 CSS px. Original only; do not upscale.',
  },
  {
    key: 'SOFT PEELING GEL/ingredients-3.png',
    widths: [],
    note: 'Ingredient tile, rendered 56 CSS px. Original only; do not upscale.',
  },
  {
    key: 'SOFT PEELING GEL/ingredients-4.png',
    widths: [],
    note: 'Ingredient tile, rendered 56 CSS px. Original only; do not upscale.',
  },
  {
    key: 'SOFT PEELING GEL/ingredients-5.png',
    widths: [],
    note: 'Ingredient tile, rendered 56 CSS px. Original only; do not upscale.',
  },
  {
    key: 'RICE BARRIER CREAM MASK/ingredients-1.png',
    widths: [],
    note: 'Ingredient tile, rendered 56 CSS px. Original only; do not upscale.',
  },
  {
    key: 'RICE BARRIER CREAM MASK/ingredients-2.png',
    widths: [],
    note: 'Ingredient tile, rendered 56 CSS px. Original only; do not upscale.',
  },
  {
    key: 'RICE BARRIER CREAM MASK/ingredients-3.png',
    widths: [],
    note: 'Ingredient tile, rendered 56 CSS px. Original only; do not upscale.',
  },
  {
    key: 'RICE BARRIER CREAM MASK/ingredients-4.png',
    widths: [],
    note: 'Ingredient tile, rendered 56 CSS px. Original only; do not upscale.',
  },
  {
    key: 'RICE BARRIER CREAM MASK/ingredients-5.png',
    widths: [],
    note: 'Ingredient tile, rendered 56 CSS px. Original only; do not upscale.',
  },
  {
    key: 'RICE BARRIER CREAM MASK/purpose-1.png',
    widths: [],
    note: 'Purpose tile, rendered 56 CSS px. Original only; do not upscale.',
  },
  {
    key: 'RICE BARRIER CREAM MASK/purpose-2.png',
    widths: [],
    note: 'Purpose tile, rendered 56 CSS px. Original only; do not upscale.',
  },
  {
    key: 'RICE BARRIER CREAM MASK/purpose-3.png',
    widths: [],
    note: 'Purpose tile, rendered 56 CSS px. Original only; do not upscale.',
  },
  {
    key: 'dry spot rescue balm/ingredients-1.png',
    widths: [],
    note: 'Ingredient tile, rendered 56 CSS px. Original only; do not upscale.',
  },
  {
    key: 'dry spot rescue balm/ingredients-2.png',
    widths: [],
    note: 'Ingredient tile, rendered 56 CSS px. Original only; do not upscale.',
  },
  {
    key: 'dry spot rescue balm/ingredients-3.png',
    widths: [],
    note: 'Ingredient tile, rendered 56 CSS px. Original only; do not upscale.',
  },
  {
    key: 'dry spot rescue balm/ingredients-4.png',
    widths: [],
    note: 'Ingredient tile, rendered 56 CSS px. Original only; do not upscale.',
  },
  {
    key: 'dry spot rescue balm/ingredients-5.png',
    widths: [],
    note: 'Ingredient tile, rendered 56 CSS px. Original only; do not upscale.',
  },
  {
    key: 'dry spot rescue balm/step-1.png',
    widths: [],
    note: 'Step tile, rendered 56 CSS px. Original only; do not upscale.',
  },
  {
    key: 'dry spot rescue balm/step-2.png',
    widths: [],
    note: 'Step tile, rendered 56 CSS px. Original only; do not upscale.',
  },
  {
    key: 'dry spot rescue balm/step-3.png',
    widths: [],
    note: 'Step tile, rendered 56 CSS px. Original only; do not upscale.',
  },
  {
    key: 'HEARTLEAF CLEANSING OI/ingredient-1.png',
    widths: [],
    note: 'Ingredient tile, rendered 56 CSS px. Original only; do not upscale.',
  },
  {
    key: 'HEARTLEAF CLEANSING OI/ingredient-2.png',
    widths: [],
    note: 'Ingredient tile, rendered 56 CSS px. Original only; do not upscale.',
  },
  {
    key: 'HEARTLEAF CLEANSING OI/ingredient-3.png',
    widths: [],
    note: 'Ingredient tile, rendered 56 CSS px. Original only; do not upscale.',
  },
  {
    key: '2-bha-gel-cleanser/ingredient-1.png',
    widths: [],
    note: 'Ingredient tile, rendered 56 CSS px. Original only; do not upscale.',
  },
  {
    key: '2-bha-gel-cleanser/ingredient-2.png',
    widths: [],
    note: 'Ingredient tile, rendered 56 CSS px. Original only; do not upscale.',
  },
  {
    key: '2-bha-gel-cleanser/ingredient-3.png',
    widths: [],
    note: 'Ingredient tile, rendered 56 CSS px. Original only; do not upscale.',
  },
  {
    key: 'BALANCING DAILY TONER/ingredient-1.png',
    widths: [],
    note: 'Ingredient tile, rendered 56 CSS px. Original only; do not upscale.',
  },
  {
    key: 'BALANCING DAILY TONER/ingredient-2.png',
    widths: [],
    note: 'Ingredient tile, rendered 56 CSS px. Original only; do not upscale.',
  },
  {
    key: 'BALANCING DAILY TONER/ingredient-3.png',
    widths: [],
    note: 'Ingredient tile, rendered 56 CSS px. Original only; do not upscale.',
  },
  {
    key: 'BALANCING DAILY TONER/ingredient-4.png',
    widths: [],
    note: 'Ingredient tile, rendered 56 CSS px. Original only; do not upscale.',
  },
  {
    key: 'EXFOLIATING TONER/ingredient-1.png',
    widths: [],
    note: 'Ingredient tile, rendered 56 CSS px. Original only; do not upscale.',
  },
  {
    key: 'EXFOLIATING TONER/ingredient-2.png',
    widths: [],
    note: 'Ingredient tile, rendered 56 CSS px. Original only; do not upscale.',
  },
  {
    key: 'EXFOLIATING TONER/ingredient-3.png',
    widths: [],
    note: 'Ingredient tile, rendered 56 CSS px. Original only; do not upscale.',
  },
  {
    key: 'EXFOLIATING TONER/ingredient-4.png',
    widths: [],
    note: 'Ingredient tile, rendered 56 CSS px. Original only; do not upscale.',
  },
  {
    key: 'CLARIFYING CLAY MASK/ingredient-1.png',
    widths: [],
    note: 'Ingredient tile, rendered 56 CSS px. Original only; do not upscale.',
  },
  {
    key: 'CLARIFYING CLAY MASK/ingredient-2.png',
    widths: [],
    note: 'Ingredient tile, rendered 56 CSS px. Original only; do not upscale.',
  },
  {
    key: 'CLARIFYING CLAY MASK/ingredient-3.png',
    widths: [],
    note: 'Ingredient tile, rendered 56 CSS px. Original only; do not upscale.',
  },
  {
    key: 'CLARIFYING CLAY MASK/ingredient-4.png',
    widths: [],
    note: 'Ingredient tile, rendered 56 CSS px. Original only; do not upscale.',
  },
  {
    key: 'blemish-mark-spot-treatment/ingredient-1.png',
    widths: [],
    note: 'Ingredient tile, rendered 56 CSS px. Original only; do not upscale.',
  },
  {
    key: 'blemish-mark-spot-treatment/ingredient-2.png',
    widths: [],
    note: 'Ingredient tile, rendered 56 CSS px. Original only; do not upscale.',
  },
  {
    key: 'blemish-mark-spot-treatment/ingredient-3.png',
    widths: [],
    note: 'Ingredient tile, rendered 56 CSS px. Original only; do not upscale.',
  },
  {
    key: 'blemish-mark-spot-treatment/ingredient-4.png',
    widths: [],
    note: 'Ingredient tile, rendered 56 CSS px. Original only; do not upscale.',
  },
];

/**
 * Files deliberately excluded from the pipeline in this phase.
 * They are not referenced by any rendered page, and Phase 2 must not
 * delete files. Listed here so the exclusion is explicit and reviewable.
 */
export const IMAGE_EXCLUDED = [
  {
    key: 'additional-img-1.jpg',
    reason: 'Imported in src/data/images.ts but not referenced by any rendered content; removal candidate, not deleted in this phase.',
  },
  {
    key: 'additional-img-6.jpg',
    reason: 'Imported in src/data/images.ts but not referenced by any rendered content; removal candidate, not deleted in this phase.',
  },
  {
    key: 'additional-img-2.png',
    reason: 'Not imported and not referenced; unreferenced candidate from the Phase 1 inventory, not deleted in this phase.',
  },
  {
    key: 'additional-img-4.png',
    reason: 'Not imported and not referenced; unreferenced candidate from the Phase 1 inventory, not deleted in this phase.',
  },
  {
    key: 'additional-img-5.png',
    reason: 'Not imported and not referenced; unreferenced candidate from the Phase 1 inventory, not deleted in this phase.',
  },
  {
    key: 'BALANCING DAILY TONER/BALANCING DAILY TONER.png',
    reason: 'Not imported and not referenced; unreferenced candidate from the Phase 1 inventory, not deleted in this phase.',
  },
  {
    key: 'GEL CLEANSER/GEL CLEANSER.png',
    reason: 'Not imported and not referenced; unreferenced candidate from the Phase 1 inventory, not deleted in this phase.',
  },
  {
    key: 'HEARTLEAF CLEANSING OI/HEARTLEAF CLEANSING OI.png',
    reason: 'Not imported and not referenced; unreferenced candidate from the Phase 1 inventory, not deleted in this phase.',
  },
  {
    key: 'public/og-image.png',
    reason: 'Social preview meta asset only (index.html og:image). Never rendered on a page. Left byte-identical so crawlers keep working.',
  },
];
