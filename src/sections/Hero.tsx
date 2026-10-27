import styled from 'styled-components';
import { brand } from '../data/content';
import { home } from '../data/home';
import { imageMeta } from '../data/images';
import { Link } from '../router';
import { ArrowRightIcon } from '../components/icons';
import { Container, Parallax, ResponsiveImage, Reveal } from '../components/ui';
import { ScrollCue } from '../components/ui/ScrollCue';
import { motion, useReducedMotion } from 'motion/react';
import { withAlpha } from '../styles/color';

const HeroSection = styled.section`
  position: relative;
  isolation: isolate;
  display: flex;
  align-items: flex-end;
  min-height: clamp(640px, 100svh, 960px);
  margin-top: calc(-4rem - 1px);
  padding-block: calc(6rem + 4rem + 1px) 5rem;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.surfaceInverse};
  color: ${({ theme }) => theme.colors.textInverse};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    margin-top: calc(-4.5rem - 1px);
    padding-block: calc(7.5rem + 4.5rem + 1px) 6.5rem;
    align-items: flex-end;
  }
`;

const HeroBg = styled.div`
  position: absolute;
  inset: 0;
  z-index: -2;
  overflow: hidden;
`;

const BgParallax = styled(Parallax)`
  width: 100%;
  height: 100%;
`;

const HeroImage = styled(ResponsiveImage)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 62% 22%;
  transform: scale(1.02);
  animation: hero-drift 26s ease-in-out infinite alternate;

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    object-position: 68% 28%;
  }

  @keyframes hero-drift {
    from {
      transform: scale(1.02);
    }
    to {
      transform: scale(1.09);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  z-index: -1;
  background:
    radial-gradient(
      120% 90% at 50% 40%,
      transparent 55%,
      ${({ theme }) => withAlpha(theme.colors.inkDark, 0.35)} 100%
    ),
    linear-gradient(
      180deg,
      ${({ theme }) => theme.colors.heroScrim60} 0%,
      ${({ theme }) => theme.colors.heroScrim78} 52%,
      ${({ theme }) => theme.colors.heroScrim88} 100%
    );

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    background:
      radial-gradient(
        120% 90% at 50% 40%,
        transparent 55%,
        ${({ theme }) => withAlpha(theme.colors.inkDark, 0.35)} 100%
      ),
      linear-gradient(
        100deg,
        ${({ theme }) => theme.colors.heroScrim92} 0%,
        ${({ theme }) => theme.colors.heroScrim78} 34%,
        ${({ theme }) => theme.colors.heroScrim44} 62%,
        ${({ theme }) => theme.colors.heroScrim18} 100%
      ),
      linear-gradient(
        to top,
        ${({ theme }) => theme.colors.heroScrim60} 0%,
        transparent 30%
      );
  }
`;

const Content = styled(Container)`
  position: relative;
  z-index: 1;
  width: 100%;
`;

const Copy = styled.div`
  max-width: 40rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    align-items: flex-start;
    text-align: left;
  }
`;

const Rule = styled.span`
  display: block;
  width: 5.5rem;
  height: 1px;
  background: ${({ theme }) => theme.colors.gold};
  margin-bottom: 1.75rem;
`;

const Title = styled.h1`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: ${({ theme }) => theme.fontSizes.display};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  line-height: 1.02;
  letter-spacing: -0.015em;
  color: ${({ theme }) => theme.colors.textInverse};
  margin-bottom: 1.75rem;
  text-wrap: balance;
  max-width: 16ch;

  em {
    font-style: italic;
    font-weight: 400;
  }
`;

const HeroLead = styled.p`
  font-size: clamp(1.0625rem, 1.4vw, 1.25rem);
  line-height: 1.65;
  color: ${({ theme }) => theme.colors.textInverse88};
  max-width: 38ch;
  margin-bottom: 2.75rem;
`;

const CtaRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  width: 100%;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: row;
    align-items: center;
    gap: 1.75rem;
    width: auto;
  }
`;

const CtaDivider = styled.span`
  display: none;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    display: block;
    width: 1px;
    align-self: stretch;
    background: ${({ theme }) => withAlpha(theme.colors.textInverse, 0.3)};
  }
`;

const HeroPrimary = styled(Link)`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  min-height: 3.5rem;
  padding: 0.875rem 1.25rem 0.875rem 1.75rem;
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 0.9375rem;
  font-weight: 600;
  letter-spacing: 0.01em;
  text-decoration: none;
  border-radius: ${({ theme }) => theme.radius.pill};
  border: 1px solid ${({ theme }) => theme.colors.textInverse};
  background: ${({ theme }) => theme.colors.textInverse};
  color: ${({ theme }) => theme.colors.inkDark};
  white-space: nowrap;
  overflow: hidden;

  svg {
    flex: none;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: -60%;
    width: 40%;
    background: linear-gradient(
      100deg,
      transparent 0%,
      ${({ theme }) => withAlpha(theme.colors.surfaceWarm, 0.7)} 50%,
      transparent 100%
    );
    transform: skewX(-18deg);
    transition: left 600ms cubic-bezier(0.22, 1, 0.36, 1);
    pointer-events: none;
  }

  &:hover {
    background: ${({ theme }) => theme.colors.surfaceWarm};
    border-color: ${({ theme }) => theme.colors.surfaceWarm};
    transform: translateY(-1px);
  }

  &:hover::after {
    left: 130%;
  }

  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.gold};
    outline-offset: 3px;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 1rem 1.25rem 1rem 2rem;
  }

  @media (prefers-reduced-motion: reduce) {
    &::after {
      display: none;
    }

    &:hover {
      transform: none;
    }
  }
`;

const CtaArrow = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.75rem;
  height: 1.75rem;
  flex: none;
  border: 1px solid currentColor;
  border-radius: 50%;
  transition: background-color 220ms cubic-bezier(0.22, 1, 0.36, 1),
    color 220ms cubic-bezier(0.22, 1, 0.36, 1),
    transform 220ms cubic-bezier(0.22, 1, 0.36, 1);

  ${HeroPrimary}:hover & {
    background: ${({ theme }) => theme.colors.inkDark};
    color: ${({ theme }) => theme.colors.textInverse};
    transform: translateX(2px);
  }

  @media (prefers-reduced-motion: reduce) {
    ${HeroPrimary}:hover & {
      transform: none;
    }
  }
`;

const HeroSecondary = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  min-height: 3.5rem;
  padding: 0.875rem 2rem;
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 0.9375rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  color: ${({ theme }) => theme.colors.textInverse};
  text-decoration: none;
  white-space: nowrap;
  border: 1px solid ${({ theme }) => withAlpha(theme.colors.textInverse, 0.5)};
  border-radius: ${({ theme }) => theme.radius.pill};
  background: transparent;
  transition: border-color 220ms cubic-bezier(0.22, 1, 0.36, 1),
    background-color 220ms cubic-bezier(0.22, 1, 0.36, 1),
    transform 220ms cubic-bezier(0.22, 1, 0.36, 1);

  svg {
    flex: none;
    transition: transform 220ms cubic-bezier(0.22, 1, 0.36, 1);
  }

  &:hover {
    border-color: ${({ theme }) => theme.colors.textInverse};
    background: ${({ theme }) => withAlpha(theme.colors.textInverse, 0.1)};
    transform: translateY(-1px);
  }

  &:hover svg {
    transform: translateX(3px);
  }

  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.gold};
    outline-offset: 3px;
  }

  @media (prefers-reduced-motion: reduce) {
    &:hover {
      transform: none;
    }

    &:hover svg {
      transform: none;
    }
  }
`;

const CueWrap = styled.div`
  position: absolute;
  left: 50%;
  bottom: 1.5rem;
  transform: translateX(-50%);
  z-index: 2;
`;

const ShimmerMark = styled.span`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: ${({ theme }) => theme.fonts.display};
  font-style: italic;
  font-size: clamp(6rem, 10vw, 9rem);
  line-height: 1;
  color: ${({ theme }) => withAlpha(theme.colors.textInverse, 0.3)};
  user-select: none;
`;

const ShimmerRow = styled.div`
  display: none;

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    display: flex;
    gap: 1rem;
    position: absolute;
    right: clamp(2rem, 6vw, 6rem);
    top: 50%;
    transform: translateY(-54%);
    z-index: 0;
    pointer-events: none;

    > *:nth-child(2)::after {
      animation-delay: 1.1s;
    }

    > *:nth-child(3)::after {
      animation-delay: 2.2s;
    }
  }
`;

const ShimmerPanel = styled.div`
  position: relative;
  flex: none;
  width: clamp(5rem, 8vw, 7rem);
  height: clamp(20rem, 50svh, 30rem);
  border: 1px solid ${({ theme }) => withAlpha(theme.colors.textInverse, 0.22)};
  border-radius: ${({ theme }) => theme.radius.sm};
  background: linear-gradient(
    180deg,
    ${({ theme }) => withAlpha(theme.colors.textInverse, 0.1)} 0%,
    ${({ theme }) => withAlpha(theme.colors.textInverse, 0.02)} 100%
  );
  overflow: hidden;
  pointer-events: none;

  &::after {
    content: '';
    position: absolute;
    top: -20%;
    bottom: -20%;
    left: -70%;
    width: 55%;
    background: linear-gradient(
      100deg,
      transparent 0%,
      ${({ theme }) => withAlpha(theme.colors.textInverse, 0.22)} 50%,
      transparent 100%
    );
    transform: skewX(-12deg);
    animation: panel-sheen 5.5s cubic-bezier(0.22, 1, 0.36, 1) infinite;
  }

  @keyframes panel-sheen {
    0% {
      left: -70%;
    }
    55%,
    100% {
      left: 135%;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    &::after {
      animation: none;
      display: none;
    }
  }
`;

export function Hero() {
  const reduceMotion = useReducedMotion();
  const heroMeta = imageMeta(brand.heroImage);
  // Style the second sentence in italic. Copy still comes from home.ts only.
  const [headlineStart, headlineRest] = home.hero.headline.split('. ');

  return (
    <HeroSection id="hero" aria-labelledby="hero-title">
      <HeroBg aria-hidden="true">
        <BgParallax distance={32}>
          {heroMeta !== null && (
            <HeroImage image={heroMeta} alt="" sizes="100vw" priority />
          )}
        </BgParallax>
      </HeroBg>
      <Overlay aria-hidden="true" />
      <Content>
        <Reveal>
          <Copy>
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              transition={{
                duration: reduceMotion ? 0 : 0.62,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <Rule aria-hidden="true" />
              <Title id="hero-title">
                {headlineStart}.
                {headlineRest !== undefined && headlineRest !== '' ? (
                  <>
                    {' '}
                    <em>{headlineRest}</em>
                  </>
                ) : null}
              </Title>
            </motion.div>
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              transition={{
                duration: reduceMotion ? 0 : 0.5,
                delay: reduceMotion ? 0 : 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <HeroLead>{home.hero.support}</HeroLead>
            </motion.div>
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 10 }}
              animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              transition={{
                duration: reduceMotion ? 0 : 0.42,
                delay: reduceMotion ? 0 : 0.24,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <CtaRow>
                <HeroPrimary to="/#solutions">
                  {home.hero.cta}
                  <CtaArrow aria-hidden="true">
                    <ArrowRightIcon size={15} />
                  </CtaArrow>
                </HeroPrimary>
                <CtaDivider aria-hidden="true" />
                <HeroSecondary to="/#promise">
                  {home.hero.secondaryLink}
                  <ArrowRightIcon size={14} />
                </HeroSecondary>
              </CtaRow>
            </motion.div>
          </Copy>
        </Reveal>
        <ShimmerRow aria-hidden="true">
          {['C', 'M', 'F'].map((letter) => (
            <ShimmerPanel key={letter}>
              <ShimmerMark>{letter}</ShimmerMark>
            </ShimmerPanel>
          ))}
        </ShimmerRow>
      </Content>
      <CueWrap aria-hidden="true">
        <ScrollCue />
      </CueWrap>
    </HeroSection>
  );
}
