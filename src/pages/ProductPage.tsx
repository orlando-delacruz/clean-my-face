import { useEffect } from 'react';
import styled, { useTheme } from 'styled-components';
import type { ProductContent, RangeContent } from '../data/content';
import { rangePages, labels } from '../data/rangePages';
import { Link } from '../router';
import { img } from '../data/images';
import { ProductGallery } from '../components/product/ProductGallery';
import { ProductCard } from '../components/product/ProductCard';
import { ArrowRightIcon, CheckIcon } from '../components/icons';
import {
  Container,
  Reveal,
  Section,
  SnapRow,
  TextureSwatch,
} from '../components/ui';
import { RangeTheme } from '../components/ui/RangeTheme';

const TopRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.75rem 1rem;
  margin-bottom: 2rem;
`;

const Back = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  min-height: 2.75rem;
  font-weight: 600;
  font-size: 0.9375rem;
  color: ${({ theme }) => theme.range.deep};
  text-decoration: none;
  border-bottom: 1px solid currentColor;
  padding-bottom: 0.125rem;

  &:focus-visible {
    outline-color: ${({ theme }) => theme.range.deep};
  }
`;

const StepPosition = styled.p`
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.muted};
`;

const HeroGrid = styled.div`
  display: grid;
  gap: 2.5rem;
  align-items: start;

  > * {
    min-width: 0;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: minmax(0, 5fr) minmax(0, 6fr);
    gap: 4.5rem;
  }
`;

const StickyVisual = styled.div`
  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    /* No header-height token exists; header is 4.5rem, plus 1rem gap. */
    position: sticky;
    top: 5.5rem;
  }
`;

const VisualCaption = styled.p`
  margin-top: 0.875rem;
  font-size: 0.8125rem;
  color: ${({ theme }) => theme.colors.muted};
  text-align: center;
`;

const Meta = styled.p`
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.range.deep};
  margin-bottom: 0.875rem;
`;

const Title = styled.h1`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(2.25rem, 5vw, 3.5rem);
  letter-spacing: -0.02em;
  margin-bottom: 0.625rem;
  text-wrap: balance;
`;

const Positioning = styled.p`
  font-family: ${({ theme }) => theme.fonts.display};
  font-style: italic;
  font-size: 1.375rem;
  line-height: 1.35;
  margin-bottom: 1.125rem;
`;

const Purpose = styled.p`
  font-size: 1.0625rem;
  color: ${({ theme }) => theme.colors.muted};
  max-width: 56ch;
  margin-bottom: 1.75rem;
`;

const RightColumn = styled.div`
  display: grid;
  gap: 2.5rem;
  align-content: start;
  min-width: 0;
`;

const BlockTitle = styled.h2`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(1.5rem, 3vw, 1.875rem);
  letter-spacing: -0.01em;
  margin-bottom: 0.5rem;
`;

const BlockLead = styled.p`
  color: ${({ theme }) => theme.colors.muted};
  font-size: 1rem;
  margin-bottom: 1.5rem;
  max-width: 56ch;
`;

const BenefitList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
`;

const BenefitRow = styled.li`
  display: flex;
  gap: 1.25rem;
  align-items: flex-start;
  padding: 1.125rem 0;
  border-top: 1px solid ${({ theme }) => theme.colors.border};

  &:last-child {
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  }
`;

const BenefitIndex = styled.span`
  font-family: ${({ theme }) => theme.fonts.display};
  font-style: italic;
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.muted};
  min-width: 2ch;
  padding-top: 0.125rem;
`;

const BenefitText = styled.p`
  font-size: 1.0625rem;
  line-height: 1.6;
  display: flex;
  gap: 0.625rem;
  align-items: flex-start;
  min-width: 0;

  svg {
    flex: none;
    margin-top: 0.3rem;
    color: ${({ theme }) => theme.range.deep};
  }
`;

const IngredientList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
`;

const IngredientRow = styled.li`
  display: flex;
  gap: 1.125rem;
  align-items: center;
  padding: 1rem 0;
  border-top: 1px solid ${({ theme }) => theme.colors.border};

  &:last-child {
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  }

  > div {
    min-width: 0;
  }
`;

const CircleThumb = styled.img`
  width: 3.5rem;
  height: 3.5rem;
  flex: none;
  border-radius: 50%;
  object-fit: cover;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
`;

const CircleFallback = styled.span`
  width: 3.5rem;
  height: 3.5rem;
  flex: none;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: ${({ theme }) => theme.fonts.display};
  font-style: italic;
  font-size: 1.25rem;
  border: 1px solid ${({ theme }) => theme.colors.gold55};
  background: ${({ theme }) => theme.range.soft};
  color: ${({ theme }) => theme.colors.text};
`;

const IngredientName = styled.h3`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.125rem;
`;

const IngredientFunction = styled.p`
  font-size: 0.9375rem;
  color: ${({ theme }) => theme.colors.muted};
`;

const Complex = styled.p`
  margin-top: 1.25rem;
  font-size: 0.9375rem;

  strong {
    font-weight: 600;
  }
`;

const TextureIntro = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const RitualList = styled.ol`
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
`;

const RitualRow = styled.li`
  display: flex;
  gap: 1.125rem;
  align-items: center;
  padding: 0.875rem 0;
  border-top: 1px solid ${({ theme }) => theme.colors.border};

  &:last-child {
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  }
`;

const RitualText = styled.p`
  font-size: 0.975rem;
  color: ${({ theme }) => theme.colors.muted};
  min-width: 0;
  overflow-wrap: break-word;
`;

const RitualIndex = styled.span`
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: ${({ theme }) => theme.colors.muted};
  min-width: 2ch;
`;

const RoutineNav = styled.nav`
  display: grid;
  gap: 1rem;
`;

const RoutineLinks = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
`;

const RoutineLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  min-height: 2.75rem;
  padding: 0.625rem 1.25rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.sm};
  font-size: 0.875rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;

  &:hover {
    border-color: ${({ theme }) => theme.range.deep};
    color: ${({ theme }) => theme.range.deep};
  }

  &:focus-visible {
    outline-color: ${({ theme }) => theme.range.deep};
  }
`;

const PositionNote = styled.p`
  font-size: 0.8125rem;
  color: ${({ theme }) => theme.colors.muted};
`;

const Related = styled.div`
  margin-top: 5rem;
  padding-top: 2.5rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

const RelatedTitle = styled.h2`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(1.5rem, 3vw, 2rem);
  margin-bottom: 0.5rem;
  text-wrap: balance;
`;

const RelatedGrid = styled.div`
  margin-top: 1.75rem;
`;

const RangeCta = styled.div`
  margin-top: 2.5rem;
`;

const RangeLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  min-height: 2.75rem;
  font-weight: 600;
  font-size: 0.9375rem;
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

function ingredientTiles(product: ProductContent): string[] {
  return product.gallery.filter(
    (path) =>
      path !== product.image &&
      path.toLowerCase().includes('ingredient') &&
      img(path) !== '',
  );
}

export function ProductPage({
  range,
  product,
}: {
  range: RangeContent;
  product: ProductContent;
}) {
  const related = range.products.filter((p) => p.slug !== product.slug).slice(0, 3);
  const rangeTheme = useTheme().range;
  const ingredientImages = ingredientTiles(product);
  const stepIndex = range.products.findIndex((p) => p.slug === product.slug);  const previous = stepIndex > 0 ? range.products[stepIndex - 1] : undefined;
  const next =
    stepIndex !== -1 && stepIndex < range.products.length - 1
      ? range.products[stepIndex + 1]
      : undefined;

  useEffect(() => {
    const previousTitle = document.title;
    document.title = `${product.name} · ${range.name} | CleanMyFace`;
    return () => {
      document.title = previousTitle;
    };
  }, [product.name, range.name]);

  return (
    <RangeTheme id={product.rangeId}>
      <Section aria-labelledby="product-title">
        <Container>
          <TopRow>
            <Back to={`/ranges/${rangePages[range.id].slug}`}>
              <ArrowRightIcon size={15} style={{ transform: 'rotate(180deg)' }} />
              {labels.backToRange}
            </Back>
            <StepPosition>
              Step {product.step} of {range.products.length} · {product.role}
            </StepPosition>
          </TopRow>

          <HeroGrid>
            <StickyVisual>
              <ProductGallery
                productName={product.name}
                image={product.image}
                tint={rangeTheme.soft}
              />
              <VisualCaption>
                {range.name} for {range.skinType.toLowerCase()}
              </VisualCaption>
            </StickyVisual>

            <RightColumn>
              <Reveal>
                <Meta>
                  {range.name} · {range.skinType} · Step {product.step}
                </Meta>
                <Title id="product-title">{product.name}</Title>
                <Positioning>{product.tagline}</Positioning>
                <Purpose>{product.positioning}</Purpose>
              </Reveal>

              {product.benefits.length > 0 && (
                <section aria-label="Benefits">
                  <BenefitList>
                    {product.benefits.map((benefit, i) => (
                      <BenefitRow key={benefit}>
                        <BenefitIndex aria-hidden="true">
                          {String(i + 1).padStart(2, '0')}
                        </BenefitIndex>
                        <BenefitText>
                          <CheckIcon size={16} aria-hidden="true" />
                          <span>{benefit}</span>
                        </BenefitText>
                      </BenefitRow>
                    ))}
                  </BenefitList>
                </section>
              )}

              {product.ingredients.length > 0 && (
                <section aria-label="Key ingredients">
                  <BlockTitle>Key ingredients</BlockTitle>
                  <BlockLead>
                    Purposeful actives chosen for {product.skinType.toLowerCase()}.
                  </BlockLead>
                  <IngredientList>
                    {product.ingredients.map((ingredient, i) => {
                      const tile =
                        ingredientImages.length > 0
                          ? ingredientImages[i % ingredientImages.length]
                          : undefined;
                      const src = tile !== undefined ? img(tile) : '';
                      return (
                        <IngredientRow key={ingredient.name}>
                          {src !== '' ? (
                            <CircleThumb src={src} alt="" loading="lazy" decoding="async" />
                          ) : (
                            <CircleFallback aria-hidden="true">
                              {ingredient.name.charAt(0)}
                            </CircleFallback>
                          )}
                          <div>
                            <IngredientName>{ingredient.name}</IngredientName>
                            <IngredientFunction>{ingredient.function}</IngredientFunction>
                          </div>
                        </IngredientRow>
                      );
                    })}
                  </IngredientList>
                  {product.complex !== undefined && (
                    <Complex>
                      Formula complex: <strong>{product.complex}</strong>
                    </Complex>
                  )}
                </section>
              )}

              {product.textureNotes.length > 0 && (
                <section aria-label="Texture">
                  <BlockTitle>Texture</BlockTitle>
                  <TextureIntro>
                    <TextureSwatch
                      color={rangeTheme.soft}
                      ariaLabel={`${product.name} texture`}
                    />
                    <RitualText>{product.tagline}</RitualText>
                  </TextureIntro>
                  <RitualList>
                    {product.textureNotes.map((note) => (
                      <RitualRow key={note}>
                        <RitualText>{note}</RitualText>
                      </RitualRow>
                    ))}
                  </RitualList>
                </section>
              )}

              {product.usageSteps !== undefined && (
                <section aria-label="How to use">
                  <BlockTitle>How to use</BlockTitle>
                  <BlockLead>
                    Step {product.step} in the {range.name} routine.
                  </BlockLead>
                  <RitualList>
                    {product.usageSteps.map((step, i) => (
                      <RitualRow key={step}>
                        <RitualIndex aria-hidden="true">
                          {String(i + 1).padStart(2, '0')}
                        </RitualIndex>
                        <RitualText>{step}</RitualText>
                      </RitualRow>
                    ))}
                  </RitualList>
                </section>
              )}

              <section aria-label="Your routine">
                <BlockTitle>{labels.yourRoutine}</BlockTitle>
                <RoutineNav aria-label={`Steps around ${product.name}`}>
                  <RoutineLinks>
                    {previous !== undefined && (
                      <RoutineLink to={`/products/${previous.slug}`}>
                        <ArrowRightIcon size={15} style={{ transform: 'rotate(180deg)' }} />
                        {labels.previousStep}: {previous.name}
                      </RoutineLink>
                    )}
                    {next !== undefined && (
                      <RoutineLink to={`/products/${next.slug}`}>
                        {labels.nextStep}: {next.name}
                        <ArrowRightIcon size={15} />
                      </RoutineLink>
                    )}
                  </RoutineLinks>
                  {stepIndex !== -1 && (
                    <PositionNote>
                      Step {stepIndex + 1} of {range.products.length} in the{' '}
                      {range.name} routine
                    </PositionNote>
                  )}
                </RoutineNav>
              </section>
            </RightColumn>
          </HeroGrid>

          <Related aria-label="Related products">
            <RelatedTitle>Related products</RelatedTitle>
            <Purpose>
              More from {range.name} for {range.skinType.toLowerCase()}.
            </Purpose>
            <RelatedGrid>
              <SnapRow itemWidth="78%" label="Related products" columns={3}>
                {related.map((item) => (
                  <ProductCard key={item.slug} product={item} rangeName={range.name} />
                ))}
              </SnapRow>
            </RelatedGrid>
            <RangeCta>
              <RangeLink to={`/ranges/${rangePages[range.id].slug}`}>
                See the full {range.name} routine
                <ArrowRightIcon size={15} />
              </RangeLink>
            </RangeCta>
          </Related>
        </Container>
      </Section>
    </RangeTheme>
  );
}
