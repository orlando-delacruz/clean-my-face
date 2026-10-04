import styled from 'styled-components';
import type { RangeContent } from '../data/content';
import { img } from '../data/images';
import { theme } from '../theme';
import { RoutineStep } from '../components/RoutineStep';
import { DropletIcon, LeafIcon } from '../components/icons';
import {
  Container,
  EyebrowRow,
  Lead,
  Reveal,
  Section,
  SectionRule,
  SectionTitle,
} from '../components/primitives';

const Tinted = styled.div<{ $tint: string; $bg: string }>`
  background-color: ${({ $tint }) => $tint};
  ${({ $tint, $bg }) =>
    $bg !== '' &&
    `
    background-image: linear-gradient(color-mix(in srgb, ${$tint} 86%, transparent), color-mix(in srgb, ${$tint} 86%, transparent)), url("${$bg}");
    background-size: cover;
    background-position: center;
    `};
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
`;

const HeroCard = styled.figure`
  position: relative;
  margin: 0;
  overflow: hidden;
  border-radius: ${({ theme }) => theme.radius.sm};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: #17110b;
  box-shadow: 0 28px 60px -28px rgba(33, 26, 19, 0.45);
`;

// Reserve space before load (1136x592 and 1126x587, same aspect) so late
// image loads don't shift the layout under an anchor jump landing here.
const HeroImage = styled.img`
  width: 100%;
  height: auto;
  aspect-ratio: 1136 / 592;
  display: block;
`;

const HeroScrim = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    rgba(12, 9, 6, 0.04) 28%,
    rgba(12, 9, 6, 0.52) 62%,
    rgba(12, 9, 6, 0.84) 100%
  );
`;

const HeroContent = styled.figcaption`
  position: absolute;
  inset-inline: 0;
  bottom: 0;
  padding: 1.5rem 1.5rem 1.625rem;
  color: #fff;

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
  color: #fff;
  margin-bottom: 0.6rem;
  text-wrap: balance;
`;

const HeroDesc = styled.p`
  display: none;
  font-size: 1rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.88);
  max-width: 56ch;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    display: block;
  }
`;

const Steps = styled.ol`
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 1.25rem;
  grid-template-columns: 1fr;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
  }
`;

export function RangeSystem({ range, tint }: { range: RangeContent; tint: string }) {
  const bg = img(range.id === 'plump' ? 'bg-image-2.png' : 'bg-image-3.png');
  const ink = range.id === 'plump' ? theme.colors.plumpDeep : theme.colors.clearDeep;
  return (
    <Tinted $tint={tint} $bg={bg}>
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
              {img(range.systemImage) !== '' && (
                <HeroCard>
                  <HeroImage
                    src={img(range.systemImage)}
                    alt={`The six-product ${range.name} system`}
                    loading="lazy"
                    decoding="async"
                  />
                  <HeroScrim aria-hidden="true" />
                  <HeroContent>
                    <HeroRule aria-hidden="true" />
                    <HeroTitle>{range.name}</HeroTitle>
                    <HeroDesc>{range.description}</HeroDesc>
                  </HeroContent>
                </HeroCard>
              )}
              <Steps>
                {range.products.map((product) => (
                  <RoutineStep key={product.step} product={product} />
                ))}
              </Steps>
            </Body>
          </Reveal>
        </Container>
      </Section>
    </Tinted>
  );
}
