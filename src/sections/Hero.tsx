import styled from 'styled-components';
import { brand } from '../data/content';
import { home } from '../data/home';
import { imageMeta } from '../data/images';
import { Link } from '../router';
import { ArrowRightIcon } from '../components/icons';
import { Container, Parallax, ResponsiveImage, Reveal } from '../components/ui';
import { StandInImage } from '../components/ui/StandInImage';
import { ScrollCue } from '../components/ui/ScrollCue';
import { motion, useReducedMotion } from 'motion/react';

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
    align-items: center;
  }
`;

const HeroBg = styled.div`
  position: absolute;
  inset: 0;
  z-index: -2;
  overflow: hidden;
`;

const HeroImage = styled(ResponsiveImage)`
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
      ${({ theme }) => theme.colors.heroScrim60} 0%,
      ${({ theme }) => theme.colors.heroScrim78} 52%,
      ${({ theme }) => theme.colors.heroScrim88} 100%
    );

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    background:
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
  max-width: 38rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    align-items: flex-start;
    text-align: left;
  }
`;

const Title = styled.h1`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: ${({ theme }) => theme.fontSizes.display};
  line-height: ${({ theme }) => theme.lineHeights.heading};
  letter-spacing: ${({ theme }) => theme.letterSpacings.heading};
  color: ${({ theme }) => theme.colors.textInverse};
  margin-bottom: 1.25rem;
  text-wrap: balance;
  max-width: 14ch;
`;

const HeroLead = styled.p`
  font-size: clamp(1.0625rem, 1.4vw, 1.25rem);
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.textInverse88};
  max-width: 40ch;
  margin-bottom: 2.25rem;
`;

const CtaRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  width: 100%;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: row;
    gap: 0.875rem;
    width: auto;
  }
`;

const HeroPrimary = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  min-height: 3.25rem;
  padding: 0.875rem 1.25rem;
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

  svg {
    flex: none;
  }

  &:hover {
    background: ${({ theme }) => theme.colors.surfaceWarm};
    border-color: ${({ theme }) => theme.colors.surfaceWarm};
    transform: translateY(-1px);
  }

  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.gold};
    outline-offset: 3px;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 0.875rem 2rem;
  }
`;

const HeroSecondary = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  min-height: 3.25rem;
  padding: 0.875rem 1.25rem;
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 0.9375rem;
  font-weight: 600;
  letter-spacing: 0.01em;
  text-decoration: none;
  border-radius: ${({ theme }) => theme.radius.pill};
  background: transparent;
  color: ${({ theme }) => theme.colors.textInverse};
  border: 1px solid ${({ theme }) => theme.colors.textInverse48};
  white-space: nowrap;

  svg {
    flex: none;
  }

  &:hover {
    border-color: ${({ theme }) => theme.colors.textInverse};
    background: ${({ theme }) => theme.colors.textInverse10};
    transform: translateY(-1px);
  }

  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.gold};
    outline-offset: 3px;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 0.875rem 2rem;
  }
`;

const FloatingCard = styled.div`
  display: none;

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    display: block;
    position: absolute;
    right: 2rem;
    bottom: -2rem;
    width: 220px;
    z-index: 2;
  }
`;

const CueWrap = styled.div`
  position: absolute;
  left: 50%;
  bottom: 1.5rem;
  transform: translateX(-50%);
  z-index: 2;
`;

export function Hero() {
  const reduceMotion = useReducedMotion();
  const heroMeta = imageMeta(brand.heroImage);

  return (
    <HeroSection id="hero" aria-labelledby="hero-title">
      <HeroBg aria-hidden="true">
        <Parallax distance={32}>
          {heroMeta !== null && (
            <HeroImage image={heroMeta} alt="" sizes="100vw" priority />
          )}
        </Parallax>
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
              <Title id="hero-title">{home.hero.headline}</Title>
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
                  <ArrowRightIcon size={16} />
                </HeroPrimary>
                <HeroSecondary to="/#promise">
                  {home.hero.secondaryLink}
                </HeroSecondary>
              </CtaRow>
            </motion.div>
          </Copy>
        </Reveal>
        <FloatingCard aria-hidden="true">
          <StandInImage seed="cmf-hero-texture" ratio="4/5" width={220} height={275} />
        </FloatingCard>
      </Content>
      <CueWrap aria-hidden="true">
        <ScrollCue />
      </CueWrap>
    </HeroSection>
  );
}
