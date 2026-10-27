import styled from 'styled-components';
import { home } from '../data/home';
import { findProductBySlug } from '../data/content';
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
import { StandInImage } from '../components/ui/StandInImage';
import { ArrowRightIcon } from '../components/icons';

const COLUMNS = [
  { slug: 'cleansing-balm', seed: 'cmf-texture-balm' },
  { slug: 'milky-cushion-cleanser', seed: 'cmf-texture-milk' },
  { slug: 'heartleaf-cleansing-oil', seed: 'cmf-texture-oil' },
] as const;

const Wrap = styled(Section)`
  background: ${({ theme }) => theme.colors.surfaceWarm};
`;

const Rows = styled(SnapRow)`
  margin-top: 3rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    /* Stagger: 0, 3rem, 6rem. No spacing token matches, so literals. */
    > *:nth-child(2) {
      margin-top: 3rem;
    }

    > *:nth-child(3) {
      margin-top: 6rem;
    }
  }
`;

const Column = styled.article`
  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    /* Stagger: 0, 3rem, 6rem. No spacing token matches, so literals. */
    &:nth-child(2) {
      margin-top: 3rem;
    }

    &:nth-child(3) {
      margin-top: 6rem;
    }
  }
`;

const Media = styled.div`
  position: relative;
  margin-bottom: 1.5rem;
`;

const Packshot = styled.div`
  position: absolute;
  right: 0.75rem;
  bottom: -1.25rem;
  width: 44%;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.sm};
  background: ${({ theme }) => theme.colors.surface};
  overflow: hidden;
`;

const Name = styled.h3`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 1.375rem;
  margin-bottom: 0.25rem;
`;

const Tagline = styled.p`
  color: ${({ theme }) => theme.colors.muted};
  font-size: 0.9375rem;
  line-height: 1.6;
  margin-bottom: 0.75rem;
`;

const CardLink = styled(Link)`
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

const Removes = styled.div`
  margin-top: 4rem;
  padding-top: 2rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  display: grid;
  gap: 1rem;
  text-align: center;
`;

const RemovesLabel = styled.p`
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.muted};
`;

const RemovesList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: baseline;

  li {
    font-family: ${({ theme }) => theme.fonts.display};
    font-size: 1.25rem;
    padding-inline: 1rem;

    & + li {
      border-left: 1px solid ${({ theme }) => theme.colors.border};
    }
  }
`;

const Note = styled.p`
  color: ${({ theme }) => theme.colors.muted};
  font-size: 0.9375rem;
`;

export function GentlePerformance() {
  const columns = COLUMNS.map(({ slug, seed }) => {
    const match = findProductBySlug(slug);
    if (match === null) {
      throw new Error(
        `GentlePerformance: unknown product slug "${slug}".`,
      );
    }
    return { ...match, seed };
  });

  return (
    <Wrap id="gentle" aria-labelledby="gentle-title">
      <Container>
        <Reveal>
          <SectionHeader
            heading={home.gentle.headline}
            support={home.gentle.support}
            id="gentle-title"
          />
        </Reveal>
        <Reveal>
          <Rows itemWidth="78%" label="Gentle cleansers" columns={3}>
              {columns.map(({ product, seed }) => {
                const meta = imageMeta(product.image);
                return (
                  <Column key={product.slug}>
                    <Media>
                      <StandInImage seed={seed} ratio="3/4" />
                      {meta !== null && (
                        <Packshot>
                          <ResponsiveImage
                            image={meta}
                            alt=""
                            sizes="(min-width: 1024px) 160px, 140px"
                          />
                        </Packshot>
                      )}
                    </Media>
                    <Name>{product.name}</Name>
                    <Tagline>{product.tagline}</Tagline>
                    <CardLink to={`/products/${product.slug}`}>
                      {home.discover.viewProduct}
                      <ArrowRightIcon size={15} />
                    </CardLink>
                  </Column>
                );
              })}
            </Rows>
        </Reveal>
        <Reveal>
          <Removes>
            <RemovesLabel>{home.gentle.removesLabel}</RemovesLabel>
            <RemovesList>
              {home.gentle.removes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </RemovesList>
            <Note>{home.gentle.note}</Note>
          </Removes>
        </Reveal>
      </Container>
    </Wrap>
  );
}
