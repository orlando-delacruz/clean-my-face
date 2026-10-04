import { useEffect } from 'react';
import styled from 'styled-components';
import type { ProductContent, RangeContent } from '../data/content';
import { Link } from '../router';
import { theme } from '../theme';
import { img } from '../data/images';
import { ProductGallery } from '../components/ProductGallery';
import { ProductCard } from '../components/ProductCard';
import { ArrowRightIcon, CheckIcon } from '../components/icons';
import { Container, Reveal, Section } from '../components/primitives';

const TopRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.75rem 1rem;
  margin-bottom: 2rem;
`;

const Back = styled(Link)<{ $ink: string }>`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  font-size: 0.9375rem;
  color: ${({ $ink }) => $ink};
  text-decoration: none;
  border-bottom: 1px solid currentColor;
  padding-bottom: 0.125rem;
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

  /* Grid items default to min-width: auto, which lets one wide child push
     the whole page sideways on small screens. */
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

const Meta = styled.p<{ $ink: string }>`
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${({ $ink }) => $ink};
  margin-bottom: 0.875rem;
`;

const Title = styled.h1`
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

const FactList = styled.dl`
  margin: 0;
  display: grid;
`;

const FactRow = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 1.5rem;
  padding: 0.7rem 0;
  border-top: 1px solid ${({ theme }) => theme.colors.border};

  &:last-child {
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  }
`;

const FactTerm = styled.dt`
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.muted};
  flex: none;
`;

const FactValue = styled.dd`
  margin: 0;
  font-size: 0.9375rem;
  font-weight: 600;
  text-align: right;
  min-width: 0;
  overflow-wrap: break-word;
`;

const RoutineNav = styled.nav`
  margin-top: 1.75rem;
`;

const RoutineLabel = styled.p`
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.muted};
  margin-bottom: 0.75rem;
`;

const StepTrack = styled.ol`
  list-style: none;
  margin: 0;
  padding: 0.5rem 0.125rem;
  display: flex;
  gap: 0.5rem;
  overflow-x: auto;
`;

const StepItem = styled.li`
  flex: 1 0 auto;
  min-width: 4.5rem;
`;

const StepLink = styled(Link)<{ $active: boolean; $ink: string }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.375rem;
  padding: 0.625rem 0.25rem;
  border: 1px solid
    ${({ theme, $active }) => ($active ? theme.colors.text : theme.colors.border)};
  border-radius: ${({ theme }) => theme.radius.sm};
  background: ${({ theme, $active }) =>
    $active ? theme.colors.text : theme.colors.surface};
  color: ${({ theme, $active }) => ($active ? theme.colors.surface : theme.colors.text)};
  text-decoration: none;
  font-size: 0.75rem;
  font-weight: 700;
  transition: border-color 160ms ease, transform 160ms ease;

  &:hover {
    border-color: ${({ $ink }) => $ink};
    transform: translateY(-1px);
  }

  small {
    font-size: 0.6875rem;
    font-weight: 600;
    color: ${({ theme, $active }) =>
      $active ? 'rgba(255,255,255,0.75)' : theme.colors.muted};
  }
`;

const Detail = styled.div`
  margin-top: 4rem;
  display: grid;
  gap: 3.5rem;
  max-width: 46rem;
`;

const BlockTitle = styled.h2`
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

const BenefitText = styled.p<{ $ink: string }>`
  font-size: 1.0625rem;
  line-height: 1.6;
  display: flex;
  gap: 0.625rem;
  align-items: flex-start;
  min-width: 0;

  svg {
    flex: none;
    margin-top: 0.3rem;
    color: ${({ $ink }) => $ink};
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

const CircleFallback = styled.span<{ $tint: string }>`
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
  border: 1px solid rgba(201, 169, 106, 0.55);
  background: ${({ $tint }) => $tint};
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

const RitualList = styled.ul`
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

const Related = styled.div`
  margin-top: 5rem;
  padding-top: 2.5rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

const RelatedTitle = styled.h2`
  font-size: clamp(1.5rem, 3vw, 2rem);
  margin-bottom: 0.5rem;
  text-wrap: balance;
`;

const RelatedGrid = styled.div`
  display: grid;
  gap: 1.5rem;
  margin-top: 1.75rem;

  > * {
    min-width: 0;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const RangeCta = styled.div`
  margin-top: 2.5rem;
`;

const RangeLink = styled(Link)<{ $ink: string }>`
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  font-weight: 600;
  font-size: 0.9375rem;
  color: ${({ $ink }) => $ink};
  text-decoration: none;
  border-bottom: 1px solid currentColor;
  padding-bottom: 0.125rem;

  &:hover {
    color: ${({ theme }) => theme.colors.text};
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

function ritualTiles(product: ProductContent): string[] {
  return product.gallery.filter(
    (path) =>
      path !== product.image &&
      (path.includes('step-') || path.includes('purpose-')) &&
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
  const tint = range.id === 'plump' ? theme.colors.plumpTint : theme.colors.clearTint;
  const ink = range.id === 'plump' ? theme.colors.plumpDeep : theme.colors.clearDeep;
  const related = range.products.filter((p) => p.slug !== product.slug).slice(0, 3);
  const ingredientImages = ingredientTiles(product);
  const ritualImages = ritualTiles(product);
  const stepIndex = range.products.findIndex((p) => p.slug === product.slug);

  useEffect(() => {
    const previous = document.title;
    document.title = `${product.name} · ${range.name} | CleanMyFace`;
    return () => {
      document.title = previous;
    };
  }, [product.name, range.name]);

  return (
    <Section aria-labelledby="product-title">
      <Container>
        <TopRow>
          <Back to={`/#range-${range.id}`} $ink={ink}>
            <ArrowRightIcon size={15} style={{ transform: 'rotate(180deg)' }} />
            Back to {range.name}
          </Back>
          <StepPosition>
            Step {product.step} of {String(range.products.length).padStart(2, '0')} · {product.role}
          </StepPosition>
        </TopRow>

        <HeroGrid>
          <StickyVisual>
            <ProductGallery
              productName={product.name}
              image={product.image}
              tint={tint}
            />
            <VisualCaption>
              {range.name} for {range.skinType.toLowerCase()}
            </VisualCaption>
          </StickyVisual>

          <div>
            <Reveal>
              <Meta $ink={ink}>
                {range.name} · {range.skinType} · Step {product.step}
              </Meta>
              <Title id="product-title">{product.name}</Title>
              <Positioning>{product.positioning}</Positioning>
              <Purpose>{product.purpose}</Purpose>
            </Reveal>

            <FactList aria-label="Product facts">
              <FactRow>
                <FactTerm>Routine step</FactTerm>
                <FactValue>
                  {product.step} · {product.role}
                </FactValue>
              </FactRow>
              <FactRow>
                <FactTerm>Skin need</FactTerm>
                <FactValue>{product.skinType}</FactValue>
              </FactRow>
              <FactRow>
                <FactTerm>Range</FactTerm>
                <FactValue>{range.name}</FactValue>
              </FactRow>
              {product.complex !== undefined && (
                <FactRow>
                  <FactTerm>Complex</FactTerm>
                  <FactValue>{product.complex}</FactValue>
                </FactRow>
              )}
            </FactList>

            <RoutineNav aria-label={`Routine position in ${range.name}`}>
              <RoutineLabel>
                In the {range.name} routine
              </RoutineLabel>
              <StepTrack>
                {range.products.map((item) => (
                  <StepItem key={item.slug}>
                    <StepLink
                      to={`/products/${item.slug}`}
                      $active={item.slug === product.slug}
                      $ink={ink}
                      aria-current={item.slug === product.slug ? 'step' : undefined}
                      aria-label={`Step ${item.step}: ${item.name}`}
                    >
                      {item.step}
                      <small>{item.role}</small>
                    </StepLink>
                  </StepItem>
                ))}
              </StepTrack>
            </RoutineNav>
          </div>
        </HeroGrid>

        <Detail>
          <section aria-label="Benefits">
            <BlockTitle>Benefits</BlockTitle>
            <BlockLead>{product.positioningLong}</BlockLead>
            <BenefitList>
              {product.benefits.map((benefit, i) => (
                <BenefitRow key={benefit}>
                  <BenefitIndex aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </BenefitIndex>
                  <BenefitText $ink={ink}>
                    <CheckIcon size={16} aria-hidden="true" />
                    <span>{benefit}</span>
                  </BenefitText>
                </BenefitRow>
              ))}
            </BenefitList>
          </section>

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
                      <CircleFallback $tint={tint} aria-hidden="true">
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

          {product.textureNotes.length > 0 && (
            <section aria-label="Texture">
              <BlockTitle>Texture and experience</BlockTitle>
              <BlockLead>Designed for real daily use.</BlockLead>
              <RitualList>
                {product.textureNotes.map((note, i) => {
                  const tile =
                    ritualImages.length > 0
                      ? ritualImages[i % ritualImages.length]
                      : undefined;
                  const src = tile !== undefined ? img(tile) : '';
                  return (
                    <RitualRow key={note}>
                      {src !== '' ? (
                        <CircleThumb
                          src={src}
                          alt=""
                          loading="lazy"
                          decoding="async"
                        />
                      ) : (
                        <RitualIndex aria-hidden="true">
                          {String(i + 1).padStart(2, '0')}
                        </RitualIndex>
                      )}
                      <RitualText>{note}</RitualText>
                    </RitualRow>
                  );
                })}
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
                {product.usageSteps.map((step, i) => {
                  const offset = product.textureNotes.length + i;
                  const tile =
                    ritualImages.length > 0
                      ? ritualImages[offset % ritualImages.length]
                      : undefined;
                  const src = tile !== undefined ? img(tile) : '';
                  return (
                    <RitualRow key={step}>
                      {src !== '' ? (
                        <CircleThumb
                          src={src}
                          alt=""
                          loading="lazy"
                          decoding="async"
                        />
                      ) : (
                        <RitualIndex aria-hidden="true">
                          {String(i + 1).padStart(2, '0')}
                        </RitualIndex>
                      )}
                      <RitualText>{step}</RitualText>
                    </RitualRow>
                  );
                })}
              </RitualList>
            </section>
          )}
        </Detail>

        <Related aria-label="Related products">
          <RelatedTitle>More from {range.name}</RelatedTitle>
          <Purpose as="p">
            Step {product.step} sits alongside a six-step routine built for{' '}
            {range.skinType.toLowerCase()}.
            {stepIndex !== -1 &&
              ` You are viewing step ${stepIndex + 1} of ${range.products.length}.`}
          </Purpose>
          <RelatedGrid>
            {related.map((item) => (
              <ProductCard key={item.slug} product={item} rangeName={range.name} />
            ))}
          </RelatedGrid>
          <RangeCta>
            <RangeLink to={`/#range-${range.id}`} $ink={ink}>
              See the full {range.name} routine
              <ArrowRightIcon size={15} />
            </RangeLink>
          </RangeCta>
        </Related>
      </Container>
    </Section>
  );
}
