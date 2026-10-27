import styled from 'styled-components';
import { home } from '../data/home';
import { featured, findProduct, findProductBySlug } from '../data/content';
import { imageMeta } from '../data/images';
import { Link } from '../router';
import {
  Container,
  ResponsiveImage,
  Reveal,
  Section,
  SectionHeader,
  SnapRow,
} from '../components/ui';
import { RangeTheme } from '../components/ui/RangeTheme';
import { ArrowRightIcon } from '../components/icons';

const Wrap = styled(Section)`
  background: ${({ theme }) => theme.colors.background};
`;

const Rows = styled(SnapRow)`
  margin-top: 3rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-auto-flow: row;
    grid-template-columns: repeat(12, minmax(0, 1fr));
    overflow-x: visible;
    align-items: stretch;

    > *:nth-child(1) {
      grid-column: 1 / 8;
      grid-row: 1 / 3;
    }

    > *:nth-child(n + 2) {
      grid-column: 8 / 13;
    }
  }
`;

const Card = styled.article`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.sm};
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const Field = styled.div`
  background: ${({ theme }) => theme.range.soft};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  padding: 2rem 2rem 1.5rem;
  display: flex;
  justify-content: center;
`;

const Packshot = styled(ResponsiveImage)`
  height: 11rem;
  width: auto;
  max-width: 100%;
  object-fit: contain;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    height: 12.5rem;
  }
`;

const Body = styled.div`
  padding: 1.5rem 1.5rem 1.625rem;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  flex: 1;
`;

const Meta = styled.p`
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.range.deep};
`;

const Name = styled.h3`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 1.375rem;
  line-height: 1.2;
  letter-spacing: -0.01em;
`;

const Tagline = styled.p`
  font-size: 0.9375rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.muted};
  flex: 1;
`;

const CardLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  min-height: 2.75rem;
  margin-top: 0.85rem;
  padding-top: 0.9rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  font-size: 0.875rem;
  font-weight: 600;
  color: ${({ theme }) => theme.range.deep};
  text-decoration: none;

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }

  &:focus-visible {
    outline-color: ${({ theme }) => theme.range.deep};
  }
`;

const RangeLinks = styled.div`
  margin-top: 2.5rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem 2rem;
`;

const RangeLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  min-height: 2.75rem;
  font-size: 0.9375rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.plumpDeep};
  text-decoration: none;
  border-bottom: 1px solid currentColor;
  padding-bottom: 0.125rem;

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }

  &:focus-visible {
    outline-color: ${({ theme }) => theme.colors.focus};
  }
`;

export function CuratedDiscovery() {
  const cards = featured.picks.map((pick) => {
    const slug = findProduct(pick.rangeId, pick.step).slug;
    const match = findProductBySlug(slug);
    if (match === null) {
      throw new Error(`CuratedDiscovery: unknown product slug "${slug}".`);
    }
    return match;
  });

  return (
    <Wrap id="discover" aria-labelledby="discover-title">
      <Container>
        <Reveal>
          <SectionHeader
            eyebrow={home.discover.eyebrow}
            heading={home.discover.heading}
            id="discover-title"
          />
        </Reveal>
        <Reveal>
          <Rows itemWidth="78%" label="Curated products">
            {cards.map(({ product }) => {
              const meta = imageMeta(product.image);
              return (
                <RangeTheme
                  key={product.slug}
                  id={product.rangeId}
                >
                  <Card>
                    <Field>
                      {meta !== null && (
                        <Packshot
                          image={meta}
                          alt=""
                          sizes="(min-width: 1024px) 420px, (min-width: 768px) 40vw, 74vw"
                        />
                      )}
                    </Field>
                    <Body>
                      <Meta>
                        Step {product.step} · {product.role}
                      </Meta>
                      <Name>{product.name}</Name>
                      <Tagline>{product.tagline}</Tagline>
                      <CardLink to={`/products/${product.slug}`}>
                        {home.discover.viewProduct}
                        <ArrowRightIcon size={15} />
                      </CardLink>
                    </Body>
                  </Card>
                </RangeTheme>
              );
            })}
          </Rows>
        </Reveal>
        <Reveal>
          <RangeLinks>
            <RangeLink to="/ranges/plump-it-up">
              {home.discover.explorePlump}
              <ArrowRightIcon size={15} />
            </RangeLink>
            <RangeLink to="/ranges/stay-clear">
              {home.discover.exploreClear}
              <ArrowRightIcon size={15} />
            </RangeLink>
          </RangeLinks>
        </Reveal>
      </Container>
    </Wrap>
  );
}
