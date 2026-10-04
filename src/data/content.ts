/**
 * Centralized product and site content. Acts as the database for the site.
 * Single source of truth for all rendered copy and imagery.
 *
 * CONTENT POLICY:
 * - Product names, purposes, positioning, benefits, ingredients, ingredient
 *   functions, textures, usage, routines, and range content below come from
 *   the client-approved brand and product context. Do not invent additions.
 * - Known source conflicts (OQ-1 Step 02 naming, OQ-2 Stay Clear Step 02
 *   description, packaging-only variant names) are resolved only as far as
 *   the client context allows; the rest is flagged in the report, never
 *   silently merged. See PLACEHOLDER_INVENTORY.
 * - No internal reference language may render in the public UI.
 */

export interface ProductIngredient {
  name: string;
  function: string;
}

export interface ProductContent {
  slug: string;
  rangeId: 'plump' | 'clear';
  step: string;
  role: string;
  name: string;
  skinType: string;
  purpose: string;
  positioning: string;
  positioningLong: string;
  tagline: string;
  description: string;
  benefits: string[];
  ingredients: ProductIngredient[];
  complex?: string;
  textureNotes: string[];
  usageSteps?: string[];
  image: string;
  gallery: string[];
  placeholder: true;
}

export interface RangeContent {
  id: 'plump' | 'clear';
  eyebrow: string;
  name: string;
  promise: string;
  skinType: string;
  description: string;
  benefits: string[];
  systemImage: string;
  products: ProductContent[];
}

const PH = true as const;

function product(input: Omit<ProductContent, 'placeholder'>): ProductContent {
  return { ...input, placeholder: PH };
}

function ing(name: string, fn: string): ProductIngredient {
  return { name, function: fn };
}

export const brand = {
  name: 'CleanMyFace',
  maker: 'Peerpharm',
  heroEyebrow: 'Dermocosmetics by Peerpharm',
  heroTitle: 'Skincare that gets to the point.',
  heroLead: 'Effective formulas. Gentle on skin. Made for real results.',
  heroPrimaryCta: { label: 'Discover', href: '#ranges' },
  heroSecondaryCta: { label: 'Talk to Us', href: '#contact' },
  heroImage: 'hero.png',
  heroImageAlt:
    'CleanMyFace skincare products arranged with fresh botanical elements',
  // Provisional hero stats, added per client request. Counts are factual
  // (12 products across 2 six-step systems), not approved brand claims.
  stats: [
    { value: '12', label: 'Products', icon: 'droplet' as const },
    { value: '02', label: 'Systems', icon: 'layers' as const },
    { value: '06', label: 'Steps', icon: 'list' as const },
  ],
  marquee: 'Clean with purpose',
  pillarsEyebrow: 'Brand philosophy',
  pillarsTitle: 'Every product has a clear job.',
  pillarsLead:
    'Two skin needs. Twelve products. Each formula is built around purposeful ingredients, an intentional texture, and the right format to deliver results, all held to the same gentle standard.',
  pillars: [
    {
      title: 'Clear Job',
      text: 'Targeted skin needs. Each product solves one problem well.',
    },
    {
      title: 'Purposeful Ingredients',
      text: 'Actives chosen with intent and backed by dermatology.',
    },
    {
      title: 'Intentional Texture',
      text: 'Weight, slip, and finish designed for real daily use.',
    },
    {
      title: 'Right Format',
      text: 'Balm, gel, toner, mask, or spot care. The best way to deliver results.',
    },
  ],
};

export const skinNeeds = {
  eyebrow: 'Two skin needs',
  title: 'Different skin needs. Same gentle standard.',
  lead: 'Start with your skin, not with a shelf of products. Choose the system built for you.',
  cards: [
    {
      rangeId: 'plump' as const,
      skinType: 'Normal to Dry Skin',
      title: 'Plump It Up',
      promise: 'Replenish + Comfort',
      text: 'Hydrating care that helps maintain a healthy skin barrier for soft, smooth, and resilient skin.',
      image: '6 products system.jpg',
      imageAlt: 'The six-product Plump It Up system',
    },
    {
      rangeId: 'clear' as const,
      skinType: 'Oily to Troubled Skin',
      title: 'Stay Clear',
      promise: 'Clarify + Balance',
      text: 'Targeted care that helps pores look clear, controls excess oil, and supports clearer-looking skin.',
      image: '6 products system-2.jpg',
      imageAlt: 'The six-product Stay Clear system',
    },
  ],
};

const plumpProducts: ProductContent[] = [
  product({
    slug: 'cleansing-balm',
    rangeId: 'plump',
    step: '01',
    role: 'Remove',
    name: 'Cleansing Balm',
    skinType: 'Normal to Dry Skin',
    purpose: 'Remove makeup, sunscreen, excess oil, and daily impurities.',
    positioning: 'Melt. Cleanse. Comfort.',
    positioningLong:
      'A nourishing balm-to-milk cleanser that effectively removes makeup, sunscreen, excess oil, and daily impurities without stripping the skin.',
    tagline: 'Melt. Cleanse. Comfort.',
    description:
      'A nourishing balm-to-milk cleanser that effectively removes makeup, sunscreen, excess oil, and daily impurities without stripping the skin.',
    benefits: [
      'Removes makeup, sunscreen, and excess oil',
      'Rinses clean without residue',
      'Rich and cushiony balm-to-milk feel',
    ],
    ingredients: [
      ing('Ectoin', 'Helps protect and condition skin'),
      ing('Squalane', 'Nourishes and helps prevent moisture loss'),
      ing('Beta-Glucan', 'Soothes and helps maintain moisture'),
      ing('Jojoba Oil', 'Helps dissolve makeup and excess oil gently'),
    ],
    textureNotes: [
      'Rich and cushiony balm',
      'Transforms from balm to oil to milk on skin',
      'Dissolves makeup and sunscreen',
      'Rinses clean without residue',
    ],
    image: 'CLEANSING BALM/CLEANSING BALM.png',
    gallery: [
      'CLEANSING BALM/CLEANSING BALM.png',
      'CLEANSING BALM/step-1.png',
      'CLEANSING BALM/step-2.png',
      'CLEANSING BALM/step-3.png',
      'CLEANSING BALM/ingredients-1.png',
      'CLEANSING BALM/ingredients-2.png',
      'CLEANSING BALM/ingredients-3.png',
      'CLEANSING BALM/ingredients-4.png',
    ],
  }),
  product({
    slug: 'milky-cushion-cleanser',
    rangeId: 'plump',
    step: '02',
    role: 'Cleanse',
    name: 'Milky Cushion Cleanser',
    skinType: 'Normal to Dry Skin',
    purpose:
      'Cleanse remaining impurities while maintaining skin comfort and hydration.',
    positioning: 'Clean. Balance. Refresh.',
    positioningLong:
      'A gentle, pH-balanced gel cleanser that effectively removes remaining impurities while keeping skin hydrated and comfortable.',
    tagline: 'Clean. Balance. Refresh.',
    description:
      'A gentle, pH-balanced gel cleanser that effectively removes remaining impurities while keeping skin hydrated and comfortable.',
    benefits: [
      'Removes impurities without stripping',
      'Helps protect the skin barrier',
      'Leaves skin feeling clean and comfortable',
      'Gentle yet effective',
    ],
    ingredients: [
      ing('Ectoin', 'Helps protect and condition skin'),
      ing('Beta-Glucan', 'Soothes and helps maintain moisture'),
      ing('Panthenol', 'Helps maintain moisture and soothe skin'),
    ],
    textureNotes: [
      'Gentle gel cleanser with a cushioned feel',
      'pH-balanced, low-stripping cleanse',
    ],
    image: 'milky-cushion-cleanser.jpg',
    gallery: [
      'milky-cushion-cleanser.jpg',
      'GEL CLEANSER/step-1.png',
      'GEL CLEANSER/step-2.png',
      'GEL CLEANSER/step-3.png',
      'GEL CLEANSER/ingredients-1.png',
      'GEL CLEANSER/ingredients-2.png',
      'GEL CLEANSER/ingredients-3.png',
    ],
  }),
  product({
    slug: 'fermented-milky-essence-toner',
    rangeId: 'plump',
    step: '03',
    role: 'Prep',
    name: 'Fermented Milky Essence Toner',
    skinType: 'Normal to Dry Skin',
    purpose:
      'Hydrate, balance, support the skin barrier, and prepare skin for subsequent steps.',
    positioning: 'Hydrate. Prep. Balance.',
    positioningLong:
      'A milky essence toner that replenishes moisture, helps strengthen the skin barrier, and prepares skin for better absorption of the next steps.',
    tagline: 'Hydrate. Prep. Balance.',
    description:
      'A milky essence toner that replenishes moisture, helps strengthen the skin barrier, and prepares skin for better absorption of the next steps.',
    benefits: [
      'Replenishes moisture',
      'Helps strengthen the skin barrier',
      'Preps skin for better absorption',
      'Leaves skin plump and balanced',
    ],
    ingredients: [
      ing('Bifida Ferment Lysate', 'Helps strengthen skin barrier'),
      ing('Saccharomyces Ferment Filtrate', 'Helps improve skin condition'),
      ing('Beta-Glucan', 'Soothes and helps maintain moisture'),
      ing('Ectoin', 'Helps protect and condition skin'),
    ],
    textureNotes: [
      'Lightweight milky texture',
      'Quickly penetrates skin',
      'Leaves skin plump and balanced',
      'Pours, absorbs, and preps',
    ],
    image: 'ESSENCE TONER/ESSENCE TONER.png',
    gallery: [
      'ESSENCE TONER/ESSENCE TONER.png',
      'ESSENCE TONER/step-1.png',
      'ESSENCE TONER/step-2.png',
      'ESSENCE TONER/step-3.png',
      'ESSENCE TONER/ingredients-1.png',
      'ESSENCE TONER/ingredients-2.png',
      'ESSENCE TONER/ingredients-3.png',
      'ESSENCE TONER/ingredients-4.png',
    ],
  }),
  product({
    slug: 'soft-peeling-gel',
    rangeId: 'plump',
    step: '04',
    role: 'Exfoliate',
    name: 'Soft Peeling Gel',
    skinType: 'Normal to Dry Skin',
    purpose: 'Gently remove dead skin cells and surface impurities.',
    positioning: 'Smooth. Renew. Refresh.',
    positioningLong:
      'A gentle, water-based peeling gel that lifts away dead skin cells and surface impurities, revealing smoother, brighter, more refined skin without irritation.',
    tagline: 'Smooth. Renew. Refresh.',
    description:
      'A gentle, water-based peeling gel that lifts away dead skin cells and surface impurities, revealing smoother, brighter, more refined skin without irritation.',
    benefits: [
      'Lifts away dead skin cells',
      'Reveals smoother, brighter skin',
      'Refines skin without irritation',
    ],
    ingredients: [
      ing('Ectoin', 'Helps protect skin barrier'),
      ing('PHA', 'Gentle exfoliant for smoother skin'),
      ing('Papain', 'Helps dissolve dead skin cells'),
      ing('Bamboo', 'Polishes and refines skin texture'),
      ing('Aloe Vera', 'Soothes and hydrates skin'),
    ],
    textureNotes: ['Light, watery gel', 'Gentle massage application'],
    usageSteps: [
      'Apply the light, watery gel to dry skin.',
      'Gently massage to roll away dead skin cells.',
      'Rinse to reveal smoother, brighter skin.',
    ],
    image: 'soft-peeling-gel.jpg',
    gallery: [
      'soft-peeling-gel.jpg',
      'SOFT PEELING GEL/purpose-1.png',
      'SOFT PEELING GEL/purpose-2.png',
      'SOFT PEELING GEL/purpose-3.png',
      'SOFT PEELING GEL/ingredients-1.png',
      'SOFT PEELING GEL/ingredients-2.png',
      'SOFT PEELING GEL/ingredients-3.png',
      'SOFT PEELING GEL/ingredients-4.png',
      'SOFT PEELING GEL/ingredients-5.png',
    ],
  }),
  product({
    slug: 'rice-barrier-cream-mask',
    rangeId: 'plump',
    step: '05',
    role: 'Weekly Care',
    name: 'Rice Barrier Cream Mask',
    skinType: 'Normal to Dry Skin',
    purpose: 'Nourish, repair, comfort, and support the skin barrier.',
    positioning: 'Nourish. Repair. Comfort.',
    positioningLong:
      'A rich cream mask that deeply nourishes, strengthens the skin barrier, and leaves skin soft, plump, and healthy-looking.',
    tagline: 'Nourish. Repair. Comfort.',
    description:
      'A rich cream mask that deeply nourishes, strengthens the skin barrier, and leaves skin soft, plump, and healthy-looking.',
    benefits: [
      'Deeply nourishes skin',
      'Strengthens the skin barrier',
      'Leaves skin soft, plump, and healthy-looking',
    ],
    ingredients: [
      ing('Ectoin', 'Helps protect and condition skin'),
      ing('Rice Ferment Filtrate', 'Helps strengthen skin barrier'),
      ing('Rice Bran Oil', 'Nourishes and softens skin'),
      ing('Ceramide NP', 'Helps support skin barrier'),
      ing('Beta-Glucan', 'Soothes and helps maintain moisture'),
    ],
    textureNotes: ['Thick and creamy', 'Transforms on skin'],
    usageSteps: [
      'Apply a thick, creamy mask on clean, dry skin.',
      'Leave on for 5 to 10 minutes.',
      'Rinse clean. Skin feels soft and comfortable.',
    ],
    image: 'RICE BARRIER CREAM MASK/RICE BARRIER CREAM MASK.png',
    gallery: [
      'RICE BARRIER CREAM MASK/RICE BARRIER CREAM MASK.png',
      'RICE BARRIER CREAM MASK/purpose-1.png',
      'RICE BARRIER CREAM MASK/purpose-2.png',
      'RICE BARRIER CREAM MASK/purpose-3.png',
      'RICE BARRIER CREAM MASK/ingredients-1.png',
      'RICE BARRIER CREAM MASK/ingredients-2.png',
      'RICE BARRIER CREAM MASK/ingredients-3.png',
      'RICE BARRIER CREAM MASK/ingredients-4.png',
      'RICE BARRIER CREAM MASK/ingredients-5.png',
    ],
  }),
  product({
    slug: 'dry-spot-rescue-balm',
    rangeId: 'plump',
    step: '06',
    role: 'Target Care',
    name: 'Dry Spot Rescue Balm',
    skinType: 'Normal to Dry Skin',
    purpose: 'Target dry, rough, and sensitive areas.',
    positioning: 'Calm. Repair. Protect.',
    positioningLong:
      'A concentrated rescue balm that soothes dry, rough areas and supports a stronger, healthier-looking skin barrier. Targeted relief for sensitive areas.',
    tagline: 'Calm. Repair. Protect.',
    description:
      'A concentrated rescue balm that soothes dry, rough areas and supports a stronger, healthier-looking skin barrier. Targeted relief for sensitive areas.',
    benefits: [
      'Soothes dry, rough areas',
      'Supports a stronger skin barrier',
      'Targeted relief for sensitive areas',
    ],
    ingredients: [
      ing('Ectoin', 'Helps maintain moisture and protect skin'),
      ing('Centella Extract', 'Calms and soothes irritated skin'),
      ing('Madecassoside + Asiaticoside', 'Supports skin repair and strengthens barrier'),
      ing('Ceramide NP', 'Helps restore and support skin barrier'),
      ing('Squalane', 'Locks in moisture and softens skin'),
    ],
    textureNotes: ['Concentrated balm for targeted areas'],
    usageSteps: [
      'Apply a small amount on dry areas.',
      'Gently massage until absorbed.',
      'Helps calm, repair, and protect.',
    ],
    image: 'dry spot rescue balm/dry spot rescue balm.png',
    gallery: [
      'dry spot rescue balm/dry spot rescue balm.png',
      'dry spot rescue balm/step-1.png',
      'dry spot rescue balm/step-2.png',
      'dry spot rescue balm/step-3.png',
      'dry spot rescue balm/ingredients-1.png',
      'dry spot rescue balm/ingredients-2.png',
      'dry spot rescue balm/ingredients-3.png',
      'dry spot rescue balm/ingredients-4.png',
      'dry spot rescue balm/ingredients-5.png',
    ],
  }),
];

const clearProducts: ProductContent[] = [
  product({
    slug: 'heartleaf-cleansing-oil',
    rangeId: 'clear',
    step: '01',
    role: 'Remove',
    name: 'Heartleaf Cleansing Oil',
    skinType: 'Oily to Troubled Skin',
    purpose:
      'Remove makeup, sunscreen, excess oil, and impurities while maintaining skin balance.',
    positioning: 'Dissolve. Purify. Refresh.',
    positioningLong:
      'A lightweight cleansing oil that effortlessly melts away makeup, sunscreen, excess oil, and impurities while keeping skin balanced and comfortable.',
    tagline: 'Dissolve. Purify. Refresh.',
    description:
      'A lightweight cleansing oil that effortlessly melts away makeup, sunscreen, excess oil, and impurities while keeping skin balanced and comfortable.',
    benefits: [
      'Lightweight, non-greasy formula',
      'Effectively removes makeup, sunscreen, and buildup',
      'Helps refine the look of pores',
      'Maintains skin natural balance',
      'Suitable for oily to troubled skin',
      'Hypoallergenic',
    ],
    ingredients: [
      ing('Heartleaf', 'Helps soothe and purify skin'),
      ing('Green Tea Seed Oil', 'Helps nourish and maintain skin balance'),
      ing('Jojoba Oil', 'Helps dissolve excess oil and impurities'),
    ],
    complex: 'Clearleaf Complex',
    textureNotes: ['Lightweight, non-greasy oil'],
    image: 'heartleaf-cleansing-oil.jpg',
    gallery: [
      'heartleaf-cleansing-oil.jpg',
      'HEARTLEAF CLEANSING OI/ingredient-1.png',
      'HEARTLEAF CLEANSING OI/ingredient-2.png',
      'HEARTLEAF CLEANSING OI/ingredient-3.png',
    ],
  }),
  product({
    slug: '2-bha-gel-cleanser',
    rangeId: 'clear',
    step: '02',
    role: 'Cleanse',
    name: '2% BHA Gel Cleanser',
    skinType: 'Oily to Troubled Skin',
    purpose:
      'Deeply cleanse pores, control excess oil, and remove dirt, sweat, and impurities.',
    positioning: 'Deep clean. Stay balanced.',
    positioningLong:
      'A BHA gel cleanser that deeply cleanses pores, controls excess oil, and leaves skin feeling smooth and refreshed with a gentle, non-stripping formula.',
    tagline: 'Deep clean. Stay balanced.',
    description:
      'A BHA gel cleanser that deeply cleanses pores, controls excess oil, and leaves skin feeling smooth and refreshed with a gentle, non-stripping formula.',
    benefits: [
      'Deeply cleanses pores',
      'Helps control excess oil',
      'Removes dirt, sweat, and impurities',
      'Leaves skin feeling smooth and refreshed',
      'Gentle, non-stripping formula',
      'Hypoallergenic',
    ],
    ingredients: [
      ing('2% Salicylic Acid', 'Helps unclog pores and remove excess oil'),
      ing('Ceramide NP', 'Helps maintain skin barrier'),
      ing('Betaine', 'Helps keep skin hydrated and comfortable'),
    ],
    textureNotes: ['Gel cleanser', 'Gentle, non-stripping lather'],
    image: '2-bha-gel-cleanser/2-bha-gel-cleanser.png',
    gallery: [
      '2-bha-gel-cleanser/2-bha-gel-cleanser.png',
      '2-bha-gel-cleanser/ingredient-1.png',
      '2-bha-gel-cleanser/ingredient-2.png',
      '2-bha-gel-cleanser/ingredient-3.png',
    ],
  }),
  product({
    slug: 'balancing-daily-toner',
    rangeId: 'clear',
    step: '03',
    role: 'Prep',
    name: 'Balancing Daily Toner',
    skinType: 'Oily to Troubled Skin',
    purpose: 'Rebalance, soothe, hydrate, and prepare skin for better absorption.',
    positioning: 'Tone. Calm. Balance.',
    positioningLong:
      'A gentle, alcohol-free toner that helps rebalance and soothe skin while delivering lightweight hydration and prepping it for better absorption.',
    tagline: 'Tone. Calm. Balance.',
    description:
      'A gentle, alcohol-free toner that helps rebalance and soothe skin while delivering lightweight hydration and prepping it for better absorption.',
    benefits: [
      'Alcohol-free and gentle',
      'Helps calm and soothe irritated skin',
      'Hydrates and rebalances',
      'Preps skin for better absorption',
      'Suitable for oily to troubled skin',
      'Hypoallergenic',
    ],
    ingredients: [
      ing('Witch Hazel', 'Helps calm and soothe skin'),
      ing('Centella', 'Helps support skin recovery'),
      ing('Madecassoside', 'Helps strengthen and protect skin barrier'),
      ing('Asiaticoside', 'Helps maintain skin natural balance'),
    ],
    complex: 'CicaBalance Complex',
    textureNotes: ['Lightweight hydration', 'Alcohol-free'],
    image: 'balancing-daily-toner.jpg',
    gallery: [
      'balancing-daily-toner.jpg',
      'BALANCING DAILY TONER/ingredient-1.png',
      'BALANCING DAILY TONER/ingredient-2.png',
      'BALANCING DAILY TONER/ingredient-3.png',
      'BALANCING DAILY TONER/ingredient-4.png',
    ],
  }),
  product({
    slug: 'exfoliating-toner',
    rangeId: 'clear',
    step: '04',
    role: 'Exfoliate',
    name: 'Exfoliating Toner',
    skinType: 'Oily to Troubled Skin',
    purpose: 'Unclog pores, smooth texture, and improve the appearance of blemish marks.',
    positioning: 'Smoother. Clearer. Brighter.',
    positioningLong:
      'A gentle tri-acid toner that helps unclog pores, smooth texture, and fade the look of blemish marks without over-drying.',
    tagline: 'Smoother. Clearer. Brighter.',
    description:
      'A gentle tri-acid toner that helps unclog pores, smooth texture, and fade the look of blemish marks without over-drying.',
    benefits: [
      'Helps unclog pores and prevent breakouts',
      'Gently exfoliates without over-drying',
      'Smooths skin texture and refines pores',
      'Helps improve the look of blemish marks',
      'Leaves skin clearer, smoother, and brighter',
      'Hypoallergenic',
    ],
    ingredients: [
      ing('BHA: 2% Salicylic Acid', 'Helps unclog pores and target blemishes'),
      ing('AHA: 0.5% Glycolic Acid', 'Exfoliates dead skin and smooths texture'),
      ing('PHA', 'Gently exfoliates and helps maintain skin barrier'),
      ing('Licorice Root', 'Helps reduce visible redness and the look of blemish marks'),
    ],
    complex: 'Tri-Acid Clarifying Complex',
    textureNotes: ['Gentle leave-on liquid', 'No over-drying'],
    image: 'EXFOLIATING TONER/EXFOLIATING TONER.png',
    gallery: [
      'EXFOLIATING TONER/EXFOLIATING TONER.png',
      'EXFOLIATING TONER/ingredient-1.png',
      'EXFOLIATING TONER/ingredient-2.png',
      'EXFOLIATING TONER/ingredient-3.png',
      'EXFOLIATING TONER/ingredient-4.png',
    ],
  }),
  product({
    slug: 'clarifying-clay-mask',
    rangeId: 'clear',
    step: '05',
    role: 'Weekly Care',
    name: 'Clarifying Clay Mask',
    skinType: 'Oily to Troubled Skin',
    purpose:
      'Purify pores, control excess oil, and refine skin texture without over-drying.',
    positioning: 'Detox. Refine. Reset.',
    positioningLong:
      'A purifying clay mask that draws out impurities, controls excess oil, and refines pores without over-drying, leaving skin clearer and smoother.',
    tagline: 'Detox. Refine. Reset.',
    description:
      'A purifying clay mask that draws out impurities, controls excess oil, and refines pores without over-drying, leaving skin clearer and smoother.',
    benefits: [
      'Purifies and detoxifies pores',
      'Helps control excess oil',
      'Refines skin texture',
      'Leaves skin feeling clean and refreshed',
      'Gentle, non-drying formula',
      'Hypoallergenic',
    ],
    ingredients: [
      ing('Calamine', 'Helps calm and soothe skin'),
      ing('Kaolin', 'Absorbs excess oil and impurities'),
      ing('Zinc PCA', 'Helps balance oil production'),
      ing('Colloidal Oat', 'Helps protect and comfort skin'),
    ],
    complex: 'CalmClay Complex',
    textureNotes: ['Creamy clay', 'Gentle, non-drying'],
    image: 'CLARIFYING CLAY MASK/CLARIFYING CLAY MASK.png',
    gallery: [
      'CLARIFYING CLAY MASK/CLARIFYING CLAY MASK.png',
      'CLARIFYING CLAY MASK/ingredient-1.png',
      'CLARIFYING CLAY MASK/ingredient-2.png',
      'CLARIFYING CLAY MASK/ingredient-3.png',
      'CLARIFYING CLAY MASK/ingredient-4.png',
    ],
  }),
  product({
    slug: 'blemish-mark-spot-treatment',
    rangeId: 'clear',
    step: '06',
    role: 'Treat',
    name: 'Blemish + Mark Spot Treatment',
    skinType: 'Oily to Troubled Skin',
    purpose:
      'Target blemishes, fade the look of post-acne marks, calm irritation, and support clearer, more even-looking skin.',
    positioning: 'Target. Calm. Fade.',
    positioningLong:
      'A fast-acting spot treatment that helps reduce blemishes, fade post-acne marks, calm irritation, and support clearer, more even-looking skin.',
    tagline: 'Target. Calm. Fade.',
    description:
      'A fast-acting spot treatment that helps reduce blemishes, fade post-acne marks, calm irritation, and support clearer, more even-looking skin.',
    benefits: [
      'Helps reduce active blemishes',
      'Fades the look of post-acne marks',
      'Calms redness and irritation',
      'Supports clearer, more even skin tone',
      'Lightweight, non-greasy formula',
      'Hypoallergenic',
    ],
    ingredients: [
      ing('Potassium Azeloyl Diglycinate', 'Helps reduce post-acne marks'),
      ing('Sodium Ascorbyl Phosphate', 'Helps brighten and even skin tone'),
      ing('Tea Tree', 'Helps calm breakouts and soothe irritation'),
    ],
    complex: 'ClearFade Complex',
    textureNotes: ['Lightweight, non-greasy spot care'],
    image: 'blemish-mark-spot-treatment/blemish-mark-spot-treatment.png',
    gallery: [
      'blemish-mark-spot-treatment/blemish-mark-spot-treatment.png',
      'blemish-mark-spot-treatment/ingredient-1.png',
      'blemish-mark-spot-treatment/ingredient-2.png',
      'blemish-mark-spot-treatment/ingredient-3.png',
      'blemish-mark-spot-treatment/ingredient-4.png',
    ],
  }),
];

export const ranges: RangeContent[] = [
  {
    id: 'plump',
    eyebrow: 'For normal to dry skin',
    name: 'Plump It Up',
    promise: 'Replenish + Comfort',
    skinType: 'Normal to Dry Skin',
    description:
      'Hydrating care for soft, resilient skin.',
    benefits: ['Hydrate Deeply', 'Comfort Sensitive Skin', 'Support Skin Barrier'],
    systemImage: '6 products system.jpg',
    products: plumpProducts,
  },
  {
    id: 'clear',
    eyebrow: 'For oily to troubled skin',
    name: 'Stay Clear',
    promise: 'Clarify + Balance',
    skinType: 'Oily to Troubled Skin',
    description:
      'Targeted care for clearer-looking skin.',
    benefits: ['Clarify Pores', 'Balance Excess Oil', 'Keep Skin Clear'],
    systemImage: '6 products system-2.jpg',
    products: clearProducts,
  },
];

/** Featured picks: a design recommendation, not a confirmed requirement. */
export const featured = {
  eyebrow: 'Featured products',
  title: 'Three products to start with.',
  lead: 'A first cleanser, a barrier mask, and a daily gel cleanser. One entry point into each half of the range.',
  picks: [
    { rangeId: 'plump' as const, step: '01' },
    { rangeId: 'plump' as const, step: '05' },
    { rangeId: 'clear' as const, step: '02' },
  ],
};

export function findProduct(rangeId: 'plump' | 'clear', step: string): ProductContent {
  const range = ranges.find((r) => r.id === rangeId);
  const fallback = (ranges[0] as RangeContent).products[0] as ProductContent;
  return range?.products.find((p) => p.step === step) ?? fallback;
}

export function findProductBySlug(
  slug: string,
): { range: RangeContent; product: ProductContent } | null {
  for (const range of ranges) {
    const product = range.products.find((p) => p.slug === slug);
    if (product !== undefined) return { range, product };
  }
  return null;
}

export interface RoutineGroup {
  title: string;
  text: string;
  items: string[];
}

export interface RangeRoutine {
  rangeId: 'plump' | 'clear';
  rangeName: string;
  skinType: string;
  groups: RoutineGroup[];
}

export const routineGuide = {
  eyebrow: 'Routine guidance',
  title: 'Six steps. One clear order.',
  lead: 'Each range follows the same logic. Use the daily core every day, then add targeted care when skin needs it.',
  image: 'additional-img-7.png',
  imageAlt: 'The six-step CleanMyFace routine laid out in order',
  routines: [
    {
      rangeId: 'plump',
      rangeName: 'Plump It Up',
      skinType: 'Normal to Dry Skin',
      groups: [
        {
          title: 'Daily Core',
          text: 'The essentials for clean, hydrated skin.',
          items: [
            'Cleansing Balm: first cleanse, as needed',
            'Milky Cushion Cleanser: daily cleanse',
            'Fermented Milky Essence Toner: daily prep',
          ],
        },
        {
          title: 'Add as Needed',
          text: 'Targeted care for extra skin needs.',
          items: [
            'Soft Peeling Gel: exfoliate',
            'Rice Barrier Cream Mask: weekly care',
            'Dry Spot Rescue Balm: target care',
          ],
        },
      ],
    },
    {
      rangeId: 'clear',
      rangeName: 'Stay Clear',
      skinType: 'Oily to Troubled Skin',
      groups: [
        {
          title: 'Morning Routine',
          text: 'Cleanse. Balance. Protect.',
          items: [
            '02 Cleanse: remove oil and impurities',
            '03 Tone: balance and refresh skin',
            '06 Target: use as needed to help reduce blemishes',
          ],
        },
        {
          title: 'Evening Routine',
          text: 'Remove. Cleanse. Balance. Treat.',
          items: [
            '01 Remove: dissolve makeup, sunscreen, and excess oil',
            '02 Cleanse: remove oil and impurities',
            '03 Tone: balance and refresh skin',
            '06 Target: use as needed to help reduce blemishes',
          ],
        },
        {
          title: 'Targeted Care',
          text: 'When skin needs extra care.',
          items: [
            '04 Exfoliate: help unclog pores and smooth skin texture',
            '05 Clay Mask: deep clean and refine pores',
          ],
        },
      ],
    },
  ] as RangeRoutine[],
  message:
    'A healthier-looking you, your way. Same gentle standard. Different solutions for different skin needs.',
};

export const closing = {
  eyebrow: 'Begin your routine',
  title: 'Tell us about your skin.',
  lead: 'Tell us what your skin needs and we will point you to the range built for it: Plump It Up for normal to dry skin, Stay Clear for oily to troubled skin.',
  image: 'additional-img-3.png',
  imageAlt: 'Smiling woman with fresh, glowing skin touching her cheek',
  form: {
    nameLabel: 'Name',
    namePlaceholder: 'Your name',
    emailLabel: 'Email',
    emailPlaceholder: 'you@example.com',
    concernLabel: 'Your main skin concern',
    concernOptions: ['Dryness and tightness', 'Excess oil and shine', 'Blemishes and marks', 'Not sure yet'],
    messageLabel: 'Anything we should know? (optional)',
    messagePlaceholder: 'Tell us about your current routine…',
    submitLabel: 'Submit',
    previewNotice:
      'This concept preview does not send inquiries yet. Once connected, your message would go to the Peerpharm team.',
  },
};

export const navigation = {
  brandMark: 'CleanMyFace',
  brandSub: 'by Peerpharm',
  links: [
    { label: 'Home', href: '/#hero' },
    { label: 'Ranges', href: '/#ranges' },
    { label: 'Routine', href: '/#routine' },
    { label: 'Contact', href: '/#contact' },
  ],
  cta: { label: 'Discover Now', href: '/#ranges' },
};

export const footer = {
  tagline: 'Clean with purpose.',
  blurb: 'Dermocosmetics made for real skin, real routines, real results.',
  columns: [
    {
      title: 'Ranges',
      links: [
        { label: 'Plump It Up', href: '/#range-plump' },
        { label: 'Stay Clear', href: '/#range-clear' },
      ],
    },
    {
      title: 'Brand',
      links: [
        { label: 'Philosophy', href: '/#philosophy' },
        { label: 'Routine guidance', href: '/#routine' },
        { label: 'Contact', href: '/#contact' },
      ],
    },
  ],
  legal: '© 2026 CleanMyFace by Peerpharm. Concept by Orlando Dela Cruz.',
  legalLinks: [
    { label: 'Privacy Policy', href: '/privacy-policy' },
    { label: 'Terms and Conditions', href: '/terms-and-conditions' },
  ],
  // Placeholder destinations: real profile URLs, contact details, and
  // location are pending client confirmation. Links render as `#` until then.
  socials: [
    { label: 'Facebook', href: '#', icon: 'facebook' as const },
    { label: 'Instagram', href: '#', icon: 'instagram' as const },
    { label: 'Phone', href: '#', icon: 'phone' as const },
    { label: 'Email', href: '#', icon: 'email' as const },
    { label: 'Location', href: '#', icon: 'location' as const },
  ],
};

/**
 * Placeholder inventory: remaining invented or provisional items to confirm
 * with the client. Product names, purposes, positioning, benefits,
 * ingredients, textures, usage, and routines above now follow the
 * client-approved brand and product context. The UI must never reveal
 * this list.
 */
export const PLACEHOLDER_INVENTORY: string[] = [
  'Step 02 naming note: system name "Milky Cushion Cleanser" kept; detail copy describes a gel cleanser. Packaging confirms the system name. No rename applied.',
  'Step 02 Stay Clear description uses the corrected client positioning, not the duplicated cleansing-oil text.',
  'Packaging shows "Blemish Spot Treatment"; system name "Blemish + Mark Spot Treatment" kept. Flagged.',
  'Packaging-only names (Cream Cleanser, Moisture Essence, Hydrating Blemish Spot Treatment, Moisture Barrier Clay Mask) have no confirmed products. Kept out.',
  'Featured picks: Cleansing Balm / Rice Barrier Cream Mask / 2% BHA Gel Cleanser (design recommendation).',
  'Inquiry form labels, options, and behavior (visual-only mock; no backend).',
  'Theme palette values, Garamond + Inter pairing, spacing/type scale (TBD per OQ-6).',
  'Decorative image assignments (additional-*, bg-*, system images): placement is a design decision.',
  'SOFT PEELING GEL hero now uses soft-peeling-gel.jpg; purpose tiles retained in gallery.',
  'Model and lifestyle imagery (additional-img-2 to additional-img-5) left unmapped: product assignment unconfirmed.',
  'Privacy Policy and Terms and Conditions drafts (legal.ts), including all [bracketed] placeholders.',
];
