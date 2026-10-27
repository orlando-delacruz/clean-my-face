/**
 * Prototype-only merchandising samples for product displays.
 *
 * Every price and rating below is an invented sample value for layout and
 * visual review only. Actual commercial prices have not been supplied, and
 * the ratings are decorative placeholders, not customer reviews. Replace or
 * remove this file once the client approves real merchandising information.
 *
 * Canonical product facts stay in src/data/content.ts; this module only maps
 * a product slug to its sample display values so callers can pass them into
 * ProductCard's optional `price` / `rating` props or equivalent displays.
 * All 12 catalog products are covered so every product listing can render
 * price and rating consistently from this single source of truth.
 */

export interface MerchandisingSample {
  /** Display price, PHP-formatted sample (e.g. "₱1,250"). */
  price: string;
  /** Decorative sample rating on a 0-5 scale. No review count exists. */
  rating: number;
}

export const merchandising: Record<string, MerchandisingSample> = {
  'cleansing-balm': { price: '₱1,250', rating: 5 },
  'milky-cushion-cleanser': { price: '₱1,180', rating: 4 },
  'fermented-milky-essence-toner': { price: '₱1,320', rating: 5 },
  'soft-peeling-gel': { price: '₱980', rating: 4 },
  'rice-barrier-cream-mask': { price: '₱1,450', rating: 5 },
  'dry-spot-rescue-balm': { price: '₱890', rating: 4 },
  'heartleaf-cleansing-oil': { price: '₱1,190', rating: 5 },
  '2-bha-gel-cleanser': { price: '₱1,120', rating: 4 },
  'balancing-daily-toner': { price: '₱1,050', rating: 4 },
  'exfoliating-toner': { price: '₱1,150', rating: 5 },
  'clarifying-clay-mask': { price: '₱1,280', rating: 4 },
  'blemish-mark-spot-treatment': { price: '₱950', rating: 5 },
};

/** Sample merchandising for a slug, or undefined when the product has none. */
export function merchandisingFor(slug: string): MerchandisingSample | undefined {
  return merchandising[slug];
}
