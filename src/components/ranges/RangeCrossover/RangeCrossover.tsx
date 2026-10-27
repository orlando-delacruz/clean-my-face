import styled from 'styled-components';
import { home } from '../../../data/home';
import { rangeCopy, rangePages } from '../../../data/rangePages';
import type { RangeId } from '../../../data/rangePages';
import { Link } from '../../../router';
import { Container, Reveal, Section } from '../../ui';
import { RangeTheme } from '../../ui/RangeTheme';
import { labels } from '../../../data/rangePages';
import { ArrowRightIcon } from '../../icons';

const Card = styled.div`
  background: ${({ theme }) => theme.range.soft};
  color: ${({ theme }) => theme.range.deep};
  border-radius: ${({ theme }) => theme.radius.sm};
  padding: 2.5rem 2rem;
  display: grid;
  gap: 0.75rem;
  justify-items: center;
  text-align: center;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 3.5rem 3rem;
  }
`;

const EyebrowText = styled.p`
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
`;

const Headline = styled.h2`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(1.75rem, 3vw, 2.5rem);
  line-height: 1.1;
  letter-spacing: -0.01em;
  text-wrap: balance;
  max-width: 24ch;
`;

const Button = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  min-height: 2.75rem;
  margin-top: 0.5rem;
  padding: 0.75rem 1.5rem;
  font-size: 0.875rem;
  font-weight: 600;
  text-decoration: none;
  border-radius: ${({ theme }) => theme.radius.sm};
  background: ${({ theme }) => theme.range.deep};
  color: ${({ theme }) => theme.colors.textInverse};

  &:hover {
    transform: translateY(-1px);
  }

  &:focus-visible {
    outline-color: ${({ theme }) => theme.range.deep};
  }

  @media (prefers-reduced-motion: reduce) {
    &:hover {
      transform: none;
    }
  }
`;

/**
 * RangeCrossover: a card to the other range, rendered in the other range's
 * RangeTheme. Only the button links.
 */
export function RangeCrossover({ currentId }: { currentId: RangeId }) {
  const otherId: RangeId = currentId === 'plump' ? 'clear' : 'plump';

  return (
    <Section aria-label={`More from ${rangeCopy[otherId].headline}`}>
      <Container>
        <Reveal>
          <RangeTheme id={otherId}>
            <Card>
              <EyebrowText>{rangeCopy[otherId].eyebrow}</EyebrowText>
              <Headline>{home.solutions.headline}</Headline>
              <Button to={`/ranges/${rangePages[otherId].slug}`}>
                {otherId === 'plump' ? labels.explorePlump : labels.exploreClear}
                <ArrowRightIcon size={15} />
              </Button>
            </Card>
          </RangeTheme>
        </Reveal>
      </Container>
    </Section>
  );
}
