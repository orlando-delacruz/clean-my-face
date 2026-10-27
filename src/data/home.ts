/**
 * Homepage copy for the redesign.
 * Every string is copied from docs/REDESIGN_PLAN.md section 4.2 or 4.3.
 * Pillars and other product facts are reused from src/data/content.ts.
 */

import { brand } from './content';
import { labels, rangeCopy } from './rangePages';

export const home = {
  hero: {
    headline: 'Clean with Purpose. Care with Confidence.',
    support:
      'Skincare thoughtfully developed for real skin, real routines, and real results.',
    cta: labels.findYourRoutine,
    secondaryLink: labels.ourPromise,
  },
  promise: {
    eyebrow: labels.ourPromise,
    statement: 'Clean with Purpose',
    support: 'Skincare for real skin, real routines, and real results.',
    pillars: brand.pillars,
  },
  expertise: {
    headline: '20 Years of Expertise. A New Era of Skincare.',
    support:
      'Built on two decades of research and development experience helping beauty brands.',
  },
  formulation: {
    headline: 'Every Ingredient Has a Purpose. Every Texture Has a Reason.',
    support: 'Thoughtful formulas designed around real skin needs.',
  },
  innovation: {
    headline: 'Inspired by Japanese & Korean Skincare Innovation.',
    support: 'Modern cosmetic ingredients meet purposeful formulation expertise.',
  },
  gentle: {
    headline: 'Effective Cleansing. Exceptional Gentleness.',
    support: 'Remove everyday impurities while keeping skin comfort in focus.',
    removesLabel: labels.removes,
    removes: ['Makeup', 'Sunscreen', 'Oil', 'Daily impurities'],
    note: 'Hypoallergenic skincare.',
  },
  solutions: {
    headline: 'Different Skin Needs. Same Gentle Standard.',
    support: 'Discover solutions designed for your routine.',
    plump: rangeCopy.plump,
    clear: rangeCopy.clear,
  },
  discover: {
    eyebrow: labels.heroProducts,
    heading: labels.whereToBegin,
    viewProduct: labels.viewProduct,
    explorePlump: labels.explorePlump,
    exploreClear: labels.exploreClear,
  },
  closing: {
    headline: 'Clean with Purpose.',
    support: 'Skincare for real skin, real routines, and real results.',
    cta: labels.findYourRoutine,
  },
  contact: {
    heading: labels.talkToUs,
  },
};
