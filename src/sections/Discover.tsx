import styled from 'styled-components';
import { featured, findProduct, ranges } from '../data/content';
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

const Grid = styled(SnapRow)`
  margin-top: 3rem;
`;

/**
 * Curated product discovery: the three featured picks as discovery-only
 * cards (ProductCard links to the detail page; no Add to bag here), plus
 * quiet links to both range pages.
 */
export function Discover() {
  const picks = featured.picks.map(({ rangeId, step }) => {
    const product = findProduct(rangeId, step);
    const range = ranges.find((r) => r.id === product.rangeId);
    if (range === undefined) {
      throw new Error(`Discover: no range for product "${product.slug}".`);
    }
    return { product, range };
  });

  return (
    <Section id="discover" aria-labelledby="discover-title">
      <Container>
        <Reveal>
          <SectionHeader
            eyebrow={home.discover.eyebrow}
            heading={home.discover.heading}
            support={home.discover.support}
            id="discover-title"
          />
        </Reveal>
        <Reveal>
          <Grid itemWidth="78%" label="Featured products" columns={3}>
            {picks.map(({ product, range }) => {
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
    </Section>
  );
}
