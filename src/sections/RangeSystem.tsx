import styled from 'styled-components';
import type { RangeContent } from '../data/content';
import { imageMeta } from '../data/images';
import { theme } from '../theme';
import { Link } from '../router';
import { DropletIcon, LeafIcon } from '../components/icons';
import {
  Container,
  EyebrowRow,
  Lead,
  ResponsiveBackground,
  ResponsiveImage,
  Reveal,
  Section,
  SectionRule,
  SectionTitle,
} from '../components/ui';

const Tinted = styled(ResponsiveBackground)`
  border-block: 1px solid ${({ theme }) => theme.colors.border};

  /* Muted secondary text fails contrast on the pastel tints, so labels and
     supporting copy inside range sections use the dark ink instead. */
  ${EyebrowRow}, ${Lead} {
    color: ${({ theme }) => theme.colors.text};
  }
`;

const Header = styled.div`
  max-width: 52rem;
  margin-inline: auto;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CenteredLead = styled(Lead)`
  margin-inline: auto;
  text-align: center;
  max-width: 58ch;
`;

const Promise = styled.p`
  font-family: ${({ theme }) => theme.fonts.display};
  font-style: italic;
  font-size: 1.25rem;
  margin-top: 0.5rem;
`;

const BenefitList = styled.ul`
  list-style: none;
  margin: 2.5rem 0 0;
  padding: 0;
  display: grid;
  gap: 1.5rem;
  width: 100%;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(3, 1fr);
    gap: 0;
  }
`;

const Benefit = styled.li`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  font-size: 1.0625rem;
  font-weight: 500;
  letter-spacing: 0.01em;
  line-height: 1.45;
  text-wrap: balance;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding-inline: 2rem;

    &:not(:first-child) {
      border-left: 1px solid ${({ theme }) => theme.colors.border};
    }
  }
`;

const Tick = styled.span`
  width: 8px;
  height: 8px;
  flex: none;
  background: ${({ theme }) => theme.colors.gold};
  transform: rotate(45deg);
`;

const Body = styled.div`
  display: grid;
  gap: 2rem;
  margin-top: 2.25rem;

  > * {
    min-width: 0;
  }
`;

const HeroCard = styled.figure`
  position: relative;
  margin: 0;
  overflow: hidden;
  border-radius: ${({ theme }) => theme.radius.sm};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.cardDark};
  box-shadow: 0 28px 60px -28px ${({ theme }) => theme.colors.text45};
`;

// Reserve space before load (1136x592 and 1126x587, same aspect) so late
// image loads don't shift the layout under an anchor jump landing here.
const HeroImage = styled(ResponsiveImage)`
  width: 100%;
  height: auto;
  aspect-ratio: 1136 / 592;
  display: block;
  object-fit: cover;
  object-position: center;
`;

const HeroScrim = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    ${({ theme }) => theme.colors.rangeScrim04} 28%,
    ${({ theme }) => theme.colors.rangeScrim52} 62%,
    ${({ theme }) => theme.colors.rangeScrim84} 100%
  );
`;

const HeroContent = styled.figcaption`
  position: absolute;
  inset-inline: 0;
  bottom: 0;
  padding: 1.5rem 1.5rem 1.625rem;
  color: ${({ theme }) => theme.colors.surface};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 2.5rem 2.75rem 2.5rem;
    max-width: 46rem;
  }
`;

const HeroRule = styled.span`
  display: block;
  width: 3rem;
  height: 2px;
  background: ${({ theme }) => theme.colors.gold};
  margin-bottom: 0.9rem;
`;

const HeroTitle = styled.p`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(1.65rem, 3.4vw, 2.5rem);
  line-height: 1.08;
  letter-spacing: -0.01em;
  color: ${({ theme }) => theme.colors.surface};
  margin-bottom: 0.6rem;
  text-wrap: balance;
`;

const HeroDesc = styled.p`
  display: none;
  font-size: 1rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.surface88};
  max-width: 56ch;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    display: block;
  }
`;

const RoutineList = styled.ol`
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 0.5rem;
`;

const RoutineRow = styled.li`
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 0.75rem;
  align-items: center;
  padding: 0.625rem 0.75rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.sm};
  background: ${({ theme }) => theme.colors.surface72};
`;

const StepTag = styled.span`
  font-size: 0.6875rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.muted};
`;

const RoleTag = styled.span`
  font-size: 0.8125rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

const RoutineLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  font-size: 0.8125rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.plumpDeep};
  text-decoration: none;
  border-bottom: 1px solid currentColor;
  padding-bottom: 0.125rem;

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }
`;

export function RangeSystem({ range, tint }: { range: RangeContent; tint: string }) {
  const bgMeta = imageMeta(range.id === 'plump' ? 'bg-image-2.png' : 'bg-image-3.png');
  const systemMeta = imageMeta(range.systemImage);
  // Both keys are registry-mapped constants, so this branch never executes.
  // It keeps the guard contract (missing images render nothing) without
  // forking the section markup.
  if (bgMeta === null || systemMeta === null) return null;
  const ink = range.id === 'plump' ? theme.colors.plumpDeep : theme.colors.clearDeep;
  return (
    <Tinted image={bgMeta} tint={tint}>
      <Section id={`range-${range.id}`} aria-labelledby={`range-${range.id}-title`}>
        <Container>
          <Reveal>
            <Header>
              <EyebrowRow $iconColor={ink}>
                {range.id === 'plump' ? (
                  <DropletIcon size={14} aria-hidden="true" />
                ) : (
                  <LeafIcon size={14} aria-hidden="true" />
                )}
                {range.eyebrow}
              </EyebrowRow>
              <SectionTitle id={`range-${range.id}-title`}>
                {range.name}
              </SectionTitle>
              <Promise>{range.promise}</Promise>
              <SectionRule aria-hidden="true" />
              <CenteredLead>{range.description}</CenteredLead>
              <BenefitList>
                {range.benefits.map((benefit) => (
                  <Benefit key={benefit}>
                    <Tick aria-hidden="true" />
                    {benefit}
                  </Benefit>
                ))}
              </BenefitList>
            </Header>
            <Body>
              <HeroCard>
                <HeroImage
                  image={systemMeta}
                  alt={`The six-product ${range.name} system`}
                  sizes="(min-width: 1024px) 1080px, 100vw"
                />
                <HeroScrim aria-hidden="true" />
                <HeroContent>
                  <HeroRule aria-hidden="true" />
                  <HeroTitle>{range.name}</HeroTitle>
                  <HeroDesc>{range.description}</HeroDesc>
                </HeroContent>
              </HeroCard>
              <RoutineList aria-label={`${range.name} routine steps`}>
                {range.products.map((product) => (
                  <RoutineRow key={product.slug}>
                    <StepTag>Step {product.step}</StepTag>
                    <RoleTag>{product.role} · {product.name}</RoleTag>
                    <RoutineLink to={`/products/${product.slug}`}>
                      View
                    </RoutineLink>
                  </RoutineRow>
                ))}
              </RoutineList>
            </Body>
          </Reveal>
        </Container>
      </Section>
    </Tinted>
  );
}
