import styled from 'styled-components';
import { withAlpha } from '../styles/color';
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
import { RangeTheme } from '../components/ui/RangeTheme';
import { ArrowRightIcon } from '../components/icons';

const COLUMNS = [
  { slug: 'cleansing-balm' },
  { slug: 'milky-cushion-cleanser' },
  { slug: 'heartleaf-cleansing-oil' },
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
  background: ${({ theme }) => theme.range.soft};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.sm};
  padding: 2.25rem 2rem 1.75rem;
  display: flex;
  justify-content: center;
  box-shadow: ${({ theme }) => theme.shadows.soft};
  transition: transform 280ms cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 280ms cubic-bezier(0.22, 1, 0.36, 1);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 1.5rem;
    right: 1.5rem;
    height: 2px;
    border-radius: 2px;
    background: ${({ theme }) => theme.colors.gold};
  }

  ${Column}:hover &,
  ${Column}:focus-within & {
    transform: translateY(-4px);
    box-shadow: ${({ theme }) => theme.shadows.lifted};
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;

    ${Column}:hover &,
    ${Column}:focus-within & {
      transform: none;
    }
  }
`;

const Packshot = styled(ResponsiveImage)`
  height: 12.5rem;
  width: auto;
  max-width: 100%;
  object-fit: contain;
  transition: transform 420ms cubic-bezier(0.22, 1, 0.36, 1);

  ${Column}:hover &,
  ${Column}:focus-within & {
    transform: scale(1.04);
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;

    ${Column}:hover &,
    ${Column}:focus-within & {
      transform: none;
    }
  }
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
  color: ${({ theme }) => theme.range.deep};
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
  margin-top: 5rem;
  padding-block: 2.5rem 0.5rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  display: grid;
  gap: 1.5rem;
  text-align: center;
`;

const RemovesLabel = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.25rem;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.muted};

  &::before,
  &::after {
    content: '';
    width: 3.5rem;
    height: 1px;
    background: ${({ theme }) => theme.colors.gold};
  }
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
    position: relative;
    font-family: ${({ theme }) => theme.fonts.display};
    font-size: clamp(1.375rem, 1.8vw, 1.625rem);
    font-style: italic;
    padding-inline: 1.75rem;

    & + li::before {
      content: '';
      position: absolute;
      left: 0;
      top: 50%;
      width: 7px;
      height: 7px;
      transform: translateY(-50%) rotate(45deg);
      background: ${({ theme }) => withAlpha(theme.colors.gold, 0.7)};
    }
  }
`;

const Note = styled.p`
  font-family: ${({ theme }) => theme.fonts.display};
  font-style: italic;
  font-size: 1.0625rem;
  color: ${({ theme }) => theme.colors.muted};
`;

export function GentlePerformance() {
  const columns = COLUMNS.map(({ slug }) => {
    const match = findProductBySlug(slug);
    if (match === null) {
      throw new Error(
        `GentlePerformance: unknown product slug "${slug}".`,
      );
    }
    return match;
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
              {columns.map(({ product }) => {
                const meta = imageMeta(product.image);
                return (
                  <Column key={product.slug}>
                    <RangeTheme id={product.rangeId}>
                      <Media>
                        {meta !== null && (
                          <Packshot
                            image={meta}
                            alt=""
                            sizes="(min-width: 1024px) 280px, (min-width: 768px) 40vw, 70vw"
                          />
                        )}
                      </Media>
                      <Name>{product.name}</Name>
                      <Tagline>{product.tagline}</Tagline>
                      <CardLink to={`/products/${product.slug}`}>
                        {home.discover.viewProduct}
                        <ArrowRightIcon size={15} />
                      </CardLink>
                    </RangeTheme>
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
