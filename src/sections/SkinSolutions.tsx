import styled from 'styled-components';
import { home } from '../data/home';
import { skinNeeds } from '../data/content';
import { Container, Reveal, Section, SectionHeader } from '../components/ui';
import { RangePanel } from '../components/ranges/RangePanel';

const Panels = styled.div`
  margin-top: 3rem;
  display: grid;
  gap: 1.5rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 2rem;
  }
`;

function skinTypeFor(rangeId: 'plump' | 'clear'): string {
  const card = skinNeeds.cards.find((c) => c.rangeId === rangeId);
  if (card === undefined) {
    throw new Error(`SkinSolutions: no skinNeeds card for "${rangeId}".`);
  }
  return card.skinType;
}

export function SkinSolutions() {
  return (
    <Section id="solutions" aria-labelledby="solutions-title">
      <Container>
        <Reveal>
          <SectionHeader
            heading={home.solutions.headline}
            support={home.solutions.support}
            align="center"
            id="solutions-title"
          />
        </Reveal>
        <Reveal>
          <Panels>
            <RangePanel
              rangeId="plump"
              eyebrow={home.solutions.plump.eyebrow}
              headline={home.solutions.plump.headline}
              support={home.solutions.plump.support}
              skinType={skinTypeFor('plump')}
              href="/ranges/plump-it-up"
              imageKey="CLEANSING BALM/CLEANSING BALM.png"
              index="01"
            />
            <RangePanel
              rangeId="clear"
              eyebrow={home.solutions.clear.eyebrow}
              headline={home.solutions.clear.headline}
              support={home.solutions.clear.support}
              skinType={skinTypeFor('clear')}
              href="/ranges/stay-clear"
              imageKey="heartleaf-cleansing-oil.jpg"
              index="02"
            />
          </Panels>
        </Reveal>
      </Container>
    </Section>
  );
}
