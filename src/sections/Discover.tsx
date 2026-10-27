import styled from 'styled-components';
import { featured, findProduct, ranges } from '../data/content';
import { home } from '../data/home';
import { Link } from '../router';
import { ArrowRightIcon } from '../components/icons';
import {
  Container,
  Reveal,
  Section,
  SectionHeader,
  SnapRow,
} from '../components/ui';
import { RangeTheme } from '../components/ui/RangeTheme';
import { ProductCard } from '../components/product/ProductCard';

const Grid = styled(SnapRow)`
  margin-top: 3rem;
`;

const RangeLinks = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 2rem;
  margin-top: 2.5rem;
`;

const RangeLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  min-height: 2.75rem;
  font-size: 0.9375rem;
  font-weight: 600;
  color: ${({ theme }) => theme.range.deep};
  text-decoration: none;
  border-bottom: 1px solid currentColor;
  padding-bottom: 0.125rem;

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }

  &:focus-visible {
    outline-color: ${({ theme }) => theme.range.deep};
  }
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
            id="discover-title"
          />
        </Reveal>
        <Reveal>
          <Grid itemWidth="78%" label="Featured products" columns={3}>
            {picks.map(({ product, range }) => (
              <ProductCard
                key={product.slug}
                product={product}
                rangeName={range.name}
              />
            ))}
          </Grid>
        </Reveal>
        <Reveal>
          <RangeLinks>
            <RangeTheme id="plump">
              <RangeLink to="/ranges/plump-it-up">
                {home.discover.explorePlump}
                <ArrowRightIcon size={15} />
              </RangeLink>
            </RangeTheme>
            <RangeTheme id="clear">
              <RangeLink to="/ranges/stay-clear">
                {home.discover.exploreClear}
                <ArrowRightIcon size={15} />
              </RangeLink>
            </RangeTheme>
          </RangeLinks>
        </Reveal>
      </Container>
    </Section>
  );
}
