import styled from 'styled-components';
import { home } from '../data/home';
import { Container, Eyebrow, Heading, Reveal, Text } from '../components/ui';
import { StandInImage } from '../components/ui/StandInImage';

const Section = styled.section`
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  padding-block: ${({ theme }) => theme.spacing.sectionMobile};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding-block: ${({ theme }) => theme.spacing.section};
  }

  overflow-x: clip;
  overflow-y: visible;
`;

const Grid = styled.div`
  display: grid;
  gap: 3rem;
  align-items: start;

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 7fr 5fr;
    gap: 4rem;
  }
`;

const Left = styled.div`
  display: grid;
  gap: 1.5rem;
`;

const Pillars = styled.ol`
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
`;

const Pillar = styled.li`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 1rem 1.5rem;
  align-items: baseline;
  padding-block: 1.25rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border};

  &:last-child {
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  }
`;

const PillarNumber = styled.span`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 1rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.muted};
  letter-spacing: 0.08em;
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

const ImageWrap = styled.div`
  order: -1;

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    order: 0;
    margin-top: 4rem;
    /* Pull the next section up so the image crosses the section boundary.
       Only visible where the image column is tallest; the section keeps
       overflow-x clipping so this never causes horizontal scroll. */
    margin-bottom: -4rem;
    position: relative;
    z-index: 1;
  }
`;

export function BrandPromise() {
  const pillars = home.promise.pillars;

  return (
    <Section id="promise" aria-labelledby="promise-title">
      <Container>
        <Grid>
          <Left>
            <Reveal>
              <Eyebrow tone="default">{home.promise.eyebrow}</Eyebrow>
              <Heading as="h2" size="display" id="promise-title">
                {home.promise.statement}
              </Heading>
              <Text variant="bodyLg" tone="muted" balance>
                {home.promise.support}
              </Text>
            </Reveal>
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
          </Left>
          <ImageWrap>
            <Reveal>
              <StandInImage seed="cmf-promise-texture" ratio="4/5" />
            </Reveal>
          </ImageWrap>
        </Grid>
      </Container>
    </Section>
  );
}
