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
    cta: labels.exploreNow,
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
  bestSellers: {
    heading: 'Featured Products',
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
    support: 'Three essentials, two ranges, one routine.',
    viewProduct: labels.viewProduct,
    explorePlump: labels.explorePlump,
    exploreClear: labels.exploreClear,
  },
  closing: {
    headline: 'Clean with Purpose.',
    support: 'Skincare for real skin, real routines, and real results.',
    cta: labels.exploreNow,
  },
  faq: {
    heading: 'Frequently asked questions',
    support: 'Common questions, clear answers.',
    items: [
      {
        question: 'What does Clean with Purpose mean?',
        answer:
          'It is our promise: skincare for real skin, real routines, and real results.',
      },
      {
        question: 'Which range is right for my skin?',
        answer:
          'Plump It Up is built for normal to dry skin. Stay Clear is built for oily to troubled skin.',
      },
      {
        question: 'How many steps are in a routine?',
        answer:
          'Each range follows the same logic. Use the daily core every day, then add targeted care when skin needs it.',
      },
      {
        question: 'Is CleanMyFace hypoallergenic?',
        answer:
          'Hypoallergenic skincare, made to remove everyday impurities while keeping skin comfort in focus.',
      },
      {
        question: 'Who is behind CleanMyFace?',
        answer:
          'CleanMyFace is made by Peerpharm, built on two decades of research and development experience helping beauty brands.',
      },
      {
        question: 'How do I get a recommendation for my skin?',
        answer:
          'Tell us what your skin needs and we will point you to the range built for it: Plump It Up for normal to dry skin, Stay Clear for oily to troubled skin.',
      },
    ],
  },
  contact: {
    heading: labels.talkToUs,
    lead: 'Tell us what your skin needs.',
  },
};
