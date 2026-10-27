import styled from 'styled-components';
import { home } from '../data/home';
import { imageMeta } from '../data/images';
import { Link } from '../router';
import { theme } from '../theme';
import { Container, Heading, Reveal, Text } from '../components/ui';
import { ResponsiveBackground } from '../components/ui/ResponsiveBackground';
import { ArrowRightIcon } from '../components/icons';
import { withAlpha } from '../styles/color';

const Backdrop = styled(ResponsiveBackground)`
  scroll-margin-top: 5rem;
  padding-block: ${({ theme }) => theme.spacing.sectionMobile};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding-block: ${({ theme }) => theme.spacing.section};
  }
`;

const Copy = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 1.5rem;
  max-width: 48rem;
  margin-inline: auto;
`;

const Rule = styled.span`
  display: block;
  width: 3.5rem;
  height: 1px;
  background: ${({ theme }) => theme.colors.gold};
`;

const Button = styled(Link)`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  min-height: 3.5rem;
  margin-top: 1rem;
  padding: 0.875rem 1.25rem 0.875rem 2rem;
  font-size: 0.9375rem;
  font-weight: 600;
  letter-spacing: 0.01em;
  text-decoration: none;
  white-space: nowrap;
  overflow: hidden;
  border-radius: ${({ theme }) => theme.radius.pill};
  background: ${({ theme }) => theme.colors.textInverse};
  color: ${({ theme }) => theme.colors.inkDark};

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
    transform: translateY(-1px);
  }

  &:hover::after {
    left: 130%;
  }

  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.gold};
    outline-offset: 3px;
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

  ${Button}:hover & {
    background: ${({ theme }) => theme.colors.inkDark};
    color: ${({ theme }) => theme.colors.textInverse};
    transform: translateX(2px);
  }

  @media (prefers-reduced-motion: reduce) {
    ${Button}:hover & {
      transform: none;
    }
  }
`;

export function Closing() {
  const bgMeta = imageMeta('bg-mage-1.jpg');

  // Registry-mapped constant, so this branch never executes. It keeps the
  // guard contract (missing images render nothing) without forking markup.
  if (bgMeta === null) return null;

  return (
    <Backdrop
      tag="section"
      image={bgMeta}
      tint={theme.colors.rangeScrim}
      size="cover"
      position="center"
      id="closing"
      aria-labelledby="closing-title"
    >
      <Container>
        <Reveal>
          <Copy>
            <Rule aria-hidden="true" />
            <Heading as="h2" size="display" tone="inverse" id="closing-title">
              {home.closing.headline}
            </Heading>
            <Text variant="bodyLg" tone="mutedInverse" balance>
              {home.closing.support}
            </Text>
            <Button to="/#solutions">
              {home.closing.cta}
              <CtaArrow aria-hidden="true">
                <ArrowRightIcon size={15} />
              </CtaArrow>
            </Button>
          </Copy>
        </Reveal>
      </Container>
    </Backdrop>
  );
}
