/**
 * Range page copy and labels for the redesign.
 * Strings are copied verbatim from docs/REDESIGN_PLAN.md sections 4.2 and 4.3.
 * Product and range facts stay in src/data/content.ts.
 */

export type RangeId = 'plump' | 'clear';

export interface RangePageCopy {
  eyebrow: string;
  headline: string;
  support: string;
}

export interface RangePageData extends RangePageCopy {
  slug: string;
}

/** UI labels from the plan (section 4.3). Not claims. */
export const labels = {
  exploreNow: 'Explore Now',
  ourPromise: 'Our promise',
  heroProducts: 'Hero products',
  whereToBegin: 'Where to begin',
  viewProduct: 'View product',
  explorePlump: 'Explore Plump It Up',
  exploreClear: 'Explore Stay Clear',
  removes: 'Removes',
  talkToUs: 'Talk to us',
  backToRange: 'Back to range',
  nextStep: 'Next step',
  previousStep: 'Previous step',
  howToUse: 'How to use',
  keyIngredients: 'Key ingredients',
  texture: 'Texture',
  yourRoutine: 'Your routine',
} as const;

export const rangeCopy: Record<RangeId, RangePageCopy> = {
  plump: {
    eyebrow: 'Replenish + Comfort',
    headline: 'A Little More Love for Your Skin.',
    support: 'Moisture, comfort, and natural glow.',
  },
  clear: {
    eyebrow: 'Clarify + Balance',
    headline: 'Clear Skin. Clear Confidence.',
    support: 'Find balance with targeted care.',
  },
};

export const rangePages: Record<RangeId, RangePageData> = {
  plump: { ...rangeCopy.plump, slug: 'plump-it-up' },
  clear: { ...rangeCopy.clear, slug: 'stay-clear' },
};

export function findRangePageBySlug(
  slug: string,
): { id: RangeId; page: RangePageData } | null {
  for (const id of Object.keys(rangePages) as RangeId[]) {
    if (rangePages[id].slug === slug) return { id, page: rangePages[id] };
  }
  return null;
}
