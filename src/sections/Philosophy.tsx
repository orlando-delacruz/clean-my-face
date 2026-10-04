import styled from 'styled-components';
import { brand } from '../data/content';
import { DropletIcon } from '../components/icons';
import {
  Container,
  EyebrowRow,
  Lead,
  Reveal,
  Section,
  SectionTitle,
} from '../components/primitives';

const Grid = styled.div`
  display: grid;
  gap: 2.5rem;
  margin-top: ${({ theme }) => theme.spacing.sm};

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 5fr 7fr;
    gap: 4rem;
    align-items: start;
  }
`;

const Intro = styled.div`
  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    position: sticky;
    top: 7rem;
  }
`;

const PillarList = styled.ol`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const Pillar = styled.li`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 1.25rem 1.5rem;
  align-items: baseline;
  padding-block: 1.75rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border};

  &:last-child {
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    gap: 1.25rem 2rem;
  }
`;

const Number = styled.span`
  font-family: ${({ theme }) => theme.fonts.display};
  font-style: italic;
  font-size: clamp(1.75rem, 3vw, 2.5rem);
  line-height: 1;
  color: ${({ theme }) => theme.colors.muted};
  transition: color 240ms cubic-bezier(0.22, 1, 0.36, 1);

  ${Pillar}:hover & {
    color: ${({ theme }) => theme.colors.plumpDeep};
  }
`;

const PillarTitle = styled.h3`
  font-size: 1.375rem;
  margin-bottom: 0.5rem;
`;

const PillarText = styled.p`
  font-size: 0.9375rem;
  color: ${({ theme }) => theme.colors.muted};
  max-width: 52ch;
`;

export function Philosophy() {
  return (
    <Section id="philosophy" aria-labelledby="philosophy-title">
      <Container>
        <Reveal>
          <EyebrowRow $tight>
            <DropletIcon size={14} aria-hidden="true" />
            {brand.pillarsEyebrow}
          </EyebrowRow>
          <Grid>
            <Intro>
              <SectionTitle id="philosophy-title">
                {brand.pillarsTitle}
              </SectionTitle>
              <Lead>{brand.pillarsLead}</Lead>
            </Intro>
            <PillarList>
              {brand.pillars.map((pillar, i) => (
                <Pillar key={pillar.title}>
                  <Number aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </Number>
                  <div>
                    <PillarTitle>{pillar.title}</PillarTitle>
                    <PillarText>{pillar.text}</PillarText>
                  </div>
                </Pillar>
              ))}
            </PillarList>
          </Grid>
        </Reveal>
      </Container>
    </Section>
  );
}
