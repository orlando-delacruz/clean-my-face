import styled from 'styled-components';
import { brand } from '../data/content';
import { img } from '../data/images';
import { ArrowRightIcon, ChatIcon, DropletIcon, LayersIcon, LeafIcon, ListIcon } from '../components/icons';
import { Container, Reveal } from '../components/primitives';

const HeroSection = styled.section`
  position: relative;
  isolation: isolate;
  display: flex;
  align-items: center;
  min-height: clamp(640px, 94vh, 920px);
  /* Slide under the sticky transparent header so the hero imagery shows
     through it. Offsets mirror the header height (Inner min-height + 1px
     Bar border): 4rem on mobile, 4.5rem from md up. */
  margin-top: calc(-4rem - 1px);
  padding-block: calc(6rem + 4rem + 1px) 4.5rem;
  overflow: hidden;
  background-color: #121814;
  color: ${({ theme }) => theme.colors.surface};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    margin-top: calc(-4.5rem - 1px);
    padding-block: calc(7.5rem + 4.5rem + 1px) 6.5rem;
  }
`;

const HeroBg = styled.div`
  position: absolute;
  inset: 0;
  z-index: -2;
`;

const HeroImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 62% 22%;
  transform: scale(1.02);

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    object-position: 68% 28%;
  }
`;

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  z-index: -1;
  background:
    linear-gradient(
      180deg,
      rgba(14, 19, 16, 0.6) 0%,
      rgba(14, 19, 16, 0.78) 52%,
      rgba(14, 19, 16, 0.88) 100%
    );

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    background:
      linear-gradient(
        100deg,
        rgba(14, 19, 16, 0.92) 0%,
        rgba(14, 19, 16, 0.78) 34%,
        rgba(14, 19, 16, 0.44) 62%,
        rgba(14, 19, 16, 0.18) 100%
      ),
      linear-gradient(
        to top,
        rgba(14, 19, 16, 0.6) 0%,
        transparent 30%
      );
  }
`;

const Content = styled(Container)`
  width: 100%;
`;

const Copy = styled.div`
  max-width: 37rem;
  margin-inline: auto;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    margin-inline: 0;
    text-align: left;
    align-items: flex-start;
  }
`;

const TopRow = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 1.75rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
  }
`;

const BadgeRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.625rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    justify-content: flex-start;
  }
`;

const Badge = styled.span<{ $tone: 'plump' | 'clear' }>`
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.5rem 1rem;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  border-radius: 999px;
  background: ${({ theme, $tone }) =>
    $tone === 'plump' ? theme.colors.plumpTint : theme.colors.clearTint};
  color: ${({ theme, $tone }) =>
    $tone === 'plump' ? theme.colors.plumpDeep : theme.colors.clearDeep};

  svg {
    flex: none;
  }
`;

const Rule = styled.span`
  display: block;
  width: 3.5rem;
  height: 2px;
  border-radius: 2px;
  background: ${({ theme }) => theme.colors.gold};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    order: -1;
  }
`;

const Title = styled.h1`
  font-size: clamp(2.75rem, 6vw, 5rem);
  line-height: 1.04;
  letter-spacing: -0.02em;
  text-wrap: balance;
  color: #fffdf8;
  margin-bottom: 1.25rem;
  max-width: 12ch;

  em {
    font-style: italic;
    font-weight: 400;
  }
`;

const HeroLead = styled.p`
  font-size: clamp(1.0625rem, 1.4vw, 1.25rem);
  line-height: 1.6;
  color: rgba(255, 253, 248, 0.88);
  max-width: 38ch;
  margin-bottom: 2.25rem;
`;

const CtaRow = styled.div`
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  gap: 0.625rem;
  width: 100%;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    justify-content: flex-start;
    gap: 0.875rem;
    width: auto;
  }
`;

const HeroPrimary = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  min-height: 3.25rem;
  padding: 0.875rem 1rem;
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 0.875rem;
  font-weight: 600;
  letter-spacing: 0.01em;
  text-decoration: none;
  border-radius: 999px;
  border: 1px solid #fffdf8;
  background: #fffdf8;
  color: #1b231e;
  cursor: pointer;
  flex: 1 1 0;
  min-width: 0;
  white-space: nowrap;

  svg {
    flex: none;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    flex: none;
    padding: 0.875rem 2rem;
    font-size: 0.9375rem;
  }
  transition:
    background-color 180ms ease,
    border-color 180ms ease,
    transform 180ms ease,
    box-shadow 180ms ease;

  &:hover {
    background: #ede4d3;
    border-color: #ede4d3;
    transform: translateY(-1px);
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.35);
  }

  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.gold};
    outline-offset: 3px;
  }
`;

const HeroSecondary = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  min-height: 3.25rem;
  padding: 0.875rem 1rem;
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 0.875rem;
  font-weight: 600;
  letter-spacing: 0.01em;
  text-decoration: none;
  border-radius: 999px;
  background: transparent;
  color: #fffdf8;
  border: 1px solid rgba(255, 253, 248, 0.48);
  cursor: pointer;
  flex: 1 1 0;
  min-width: 0;
  white-space: nowrap;

  svg {
    flex: none;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    flex: none;
    padding: 0.875rem 2rem;
    font-size: 0.9375rem;
  }
  transition:
    background-color 180ms ease,
    border-color 180ms ease,
    transform 180ms ease;

  &:hover {
    border-color: #fffdf8;
    background: rgba(255, 253, 248, 0.1);
    transform: translateY(-1px);
  }

  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.gold};
    outline-offset: 3px;
  }
`;

const Stats = styled.ul`
  list-style: none;
  margin: 2rem 0 0;
  padding: 0;
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  gap: 1rem 1.25rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    justify-content: flex-start;
    gap: 1.75rem 2.5rem;
  }
`;

const Stat = styled.li`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const StatMark = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.125rem;
  height: 2.125rem;
  flex: none;
  border: 1px solid rgba(255, 253, 248, 0.35);
  border-radius: 50%;
  color: ${({ theme }) => theme.colors.gold};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    width: 2.5rem;
    height: 2.5rem;
  }
`;

const StatText = styled.span`
  display: flex;
  flex-direction: column;
  line-height: 1.25;
  text-align: left;
`;

const StatValue = styled.span`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 1.125rem;
  color: #fffdf8;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 1.375rem;
  }
`;

const StatLabel = styled.span`
  font-size: 0.625rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(255, 253, 248, 0.72);

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 0.6875rem;
    letter-spacing: 0.14em;
  }
`;

const statIcons = {
  droplet: DropletIcon,
  layers: LayersIcon,
  list: ListIcon,
};

export function Hero() {
  return (
    <HeroSection id="hero" aria-labelledby="hero-title">
      <HeroBg aria-hidden="true">
        <HeroImage
          src={img(brand.heroImage)}
          alt=""
          fetchPriority="high"
          decoding="async"
        />
      </HeroBg>
      <Overlay aria-hidden="true" />
      <Content>
        <Reveal>
          <Copy>
            <TopRow>
              <BadgeRow aria-label="Product ranges">
                <Badge $tone="plump">
                  <DropletIcon size={13} aria-hidden="true" />
                  Plump It Up
                </Badge>
                <Badge $tone="clear">
                  <LeafIcon size={13} aria-hidden="true" />
                  Stay Clear
                </Badge>
              </BadgeRow>
              <Rule aria-hidden="true" />
            </TopRow>
            <Title id="hero-title">
              Skincare that <em>gets to the point.</em>
            </Title>
            <HeroLead>{brand.heroLead}</HeroLead>
            <CtaRow>
              <HeroPrimary href={brand.heroPrimaryCta.href}>
                {brand.heroPrimaryCta.label}
                <ArrowRightIcon size={16} />
              </HeroPrimary>
              <HeroSecondary href={brand.heroSecondaryCta.href}>
                {brand.heroSecondaryCta.label}
                <ChatIcon size={16} />
              </HeroSecondary>
            </CtaRow>
            <Stats aria-label="CleanMyFace at a glance">
              {brand.stats.map((stat) => {
                const Icon = statIcons[stat.icon];
                return (
                  <Stat key={stat.label}>
                    <StatMark aria-hidden="true">
                      <Icon size={17} />
                    </StatMark>
                    <StatText>
                      <StatValue>{stat.value}</StatValue>
                      <StatLabel>{stat.label}</StatLabel>
                    </StatText>
                  </Stat>
                );
              })}
            </Stats>
          </Copy>
        </Reveal>
      </Content>
    </HeroSection>
  );
}
