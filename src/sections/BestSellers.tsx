import styled from 'styled-components';
import { findProductBySlug } from '../data/content';
import { home } from '../data/home';
import { merchandisingFor } from '../data/merchandising';
import {
  Container,
  Reveal,
  Section,
  SectionHeader,
  SnapRow,
} from '../components/ui';
import { ProductCard } from '../components/product/ProductCard';

const SLUGS = [
  'cleansing-balm',
  'milky-cushion-cleanser',
  'rice-barrier-cream-mask',
  '2-bha-gel-cleanser',
] as const;

const Wrap = styled(Section)`
  background: ${({ theme }) => theme.colors.surfaceWarm};
`;

const Grid = styled(SnapRow)`
  margin-top: 3rem;
`;

/**
 * Featured Products: a discovery-only collection of four existing products.
 * Cards link to their product pages; prices and stars are prototype samples
 * from src/data/merchandising.ts (never sales or review claims).
 */
export function BestSellers() {
  const cards = SLUGS.map((slug) => {
    const match = findProductBySlug(slug);
    if (match === null) {
      throw new Error(`BestSellers: unknown product slug "${slug}".`);
    }
    return match;
  });

  return (
    <Wrap id="bestsellers" aria-labelledby="bestsellers-title">
      <Container>
        <Reveal>
          <SectionHeader
            heading={home.bestSellers.heading}
            support={home.gentle.support}
            id="bestsellers-title"
          />
        </Reveal>
        <Reveal>
          <Grid itemWidth="78%" label="Featured products" columns={4}>
            {cards.map(({ product, range }) => {
              const sample = merchandisingFor(product.slug);
              return (
                <ProductCard
                  key={product.slug}
                  product={product}
                  rangeName={range.name}
                  price={sample?.price}
                  rating={sample?.rating}
                />
              );
            })}
          </Grid>
        </Reveal>
      </Container>
    </Wrap>
  );
}
