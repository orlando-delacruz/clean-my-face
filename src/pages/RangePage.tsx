import styled from 'styled-components';
import type { RangeContent } from '../data/content';
import type { RangePageData } from '../data/rangePages';
import { RangeSystem } from '../sections/RangeSystem';
import { Container, Heading, Text } from '../components/ui';
import { theme } from '../theme';

const Hero = styled.header`
  background: ${({ theme }) => theme.colors.surfaceInverse};
  color: ${({ theme }) => theme.colors.textInverse};
  padding-block: 9rem 4.5rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding-block: 11rem 6rem;
  }
`;

const Intro = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.sm};
  max-width: 48rem;
`;

/**
 * Temporary minimal range page for Phase 4. It exists so the new range routes
 * never 404 and reuses the current RangeSystem as-is. Phase 8 replaces it with
 * the full range page from docs/REDESIGN_PLAN.md section 7.1.
 */
export function RangePage({
  page,
  range,
}: {
  /** Range page copy from src/data/rangePages.ts. */
  page: RangePageData;
  /** Range facts from src/data/content.ts. */
  range: RangeContent;
}) {
  return (
    <main id="main-content">
      <Hero>
        <Container>
          <Intro>
            <Heading as="h1" size="h1" tone="inverse">
              {range.name}
            </Heading>
            <Text variant="bodyLg" tone="mutedInverse" balance>
              {page.support}
            </Text>
          </Intro>
        </Container>
      </Hero>
      <RangeSystem
        range={range}
        tint={
          range.id === 'plump'
            ? theme.colors.plumpTint
            : theme.colors.clearTint
        }
      />
    </main>
  );
}
