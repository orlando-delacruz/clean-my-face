import styled from 'styled-components';
import { home } from '../data/home';
import { imageMeta } from '../data/images';
import { Link } from '../router';
import { theme } from '../theme';
import { Container, Heading, Reveal, Text } from '../components/ui';
import { ResponsiveBackground } from '../components/ui/ResponsiveBackground';
import { ArrowRightIcon } from '../components/icons';

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
  gap: 1.25rem;
  max-width: 46rem;
  margin-inline: auto;
`;

const Button = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  min-height: 3.25rem;
  margin-top: 1rem;
  padding: 0.875rem 2rem;
  font-size: 0.9375rem;
  font-weight: 600;
  text-decoration: none;
  border-radius: ${({ theme }) => theme.radius.pill};
  background: ${({ theme }) => theme.colors.textInverse};
  color: ${({ theme }) => theme.colors.inkDark};

  &:hover {
    background: ${({ theme }) => theme.colors.surfaceWarm};
    transform: translateY(-1px);
  }

  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.gold};
    outline-offset: 3px;
  }

  @media (prefers-reduced-motion: reduce) {
    &:hover {
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
            <Heading as="h2" size="display" tone="inverse" id="closing-title">
              {home.closing.headline}
            </Heading>
            <Text variant="bodyLg" tone="mutedInverse" balance>
              {home.closing.support}
            </Text>
            <Button to="/#solutions">
              {home.closing.cta}
              <ArrowRightIcon size={16} />
            </Button>
          </Copy>
        </Reveal>
      </Container>
    </Backdrop>
  );
}
