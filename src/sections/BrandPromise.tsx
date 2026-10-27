import styled from 'styled-components';
import { home } from '../data/home';
import {
  Container,
  Eyebrow,
  Heading,
  Reveal,
  Text,
} from '../components/ui';

const Section = styled.section`
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  padding-block: ${({ theme }) => theme.spacing.sectionMobile};
  overflow: clip;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding-block: ${({ theme }) => theme.spacing.section};
  }
`;

const Stack = styled.div`
  display: grid;
  gap: 2.5rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    gap: 3rem;
  }
`;

const Intro = styled.div`
  display: grid;
  gap: 1.25rem;
  align-content: start;
`;

const Rule = styled.span`
  display: block;
  width: 3.5rem;
  height: 1px;
  background: ${({ theme }) => theme.colors.gold};
`;

const Pillars = styled.ol`
  list-style: none;
  margin: 3rem 0 0;
  padding: 0;
  display: grid;
  gap: 0;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr 1fr;
    gap: 0 3rem;
  }
`;

const Pillar = styled.li`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 1rem 1.5rem;
  align-items: baseline;
  padding-block: 1.5rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    &:nth-last-child(-n + 2) {
      border-bottom: 1px solid ${({ theme }) => theme.colors.border};
    }
  }

  &:last-child {
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  }
`;
const PillarNumber = styled.span`
  font-family: ${({ theme }) => theme.fonts.display};
  font-style: italic;
  font-size: 2rem;
  line-height: 1;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.gold};
  letter-spacing: 0;
`;

const PillarTitle = styled.h3`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 1.375rem;
  margin-bottom: 0.25rem;
`;

const PillarText = styled.p`
  font-size: 0.9375rem;
  color: ${({ theme }) => theme.colors.muted};
  line-height: 1.6;
  max-width: 46ch;
`;

export function BrandPromise() {
  const pillars = home.promise.pillars;

  return (
    <Section id="promise" aria-labelledby="promise-title">
      <Container>
        <Stack>
          <Intro>
            <Reveal>
              <Rule aria-hidden="true" />
              <Eyebrow tone="default">{home.promise.eyebrow}</Eyebrow>
              <Heading as="h2" size="h2" id="promise-title">
                {home.promise.statement}
              </Heading>
              <Text variant="bodyLg" tone="muted" balance>
                {home.promise.support}
              </Text>
            </Reveal>
          </Intro>
          <Reveal>
            <Pillars>
              {pillars.map((pillar, index) => (
                <Pillar key={pillar.title}>
                  <PillarNumber aria-hidden="true">
                    {String(index + 1).padStart(2, '0')}
                  </PillarNumber>
                  <div>
                    <PillarTitle>{pillar.title}</PillarTitle>
                    <PillarText>{pillar.text}</PillarText>
                  </div>
                </Pillar>
              ))}
            </Pillars>
          </Reveal>
        </Stack>
      </Container>
    </Section>
  );
}
