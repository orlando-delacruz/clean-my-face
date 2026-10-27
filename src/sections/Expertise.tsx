import styled from 'styled-components';
import { home } from '../data/home';
import { Container, Heading, Reveal, Text } from '../components/ui';
import { StandInImage } from '../components/ui/StandInImage';
import { Parallax } from '../components/ui/Parallax';

const Section = styled.section`
  background: ${({ theme }) => theme.colors.surfaceInverse};
  color: ${({ theme }) => theme.colors.textInverse};
  padding-block: ${({ theme }) => theme.spacing.sectionMobile};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding-block: ${({ theme }) => theme.spacing.section};
  }
`;

const TopGrid = styled.div`
  display: grid;
  gap: 3rem;
  align-items: start;

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 5fr 7fr;
    gap: 4rem;
    align-items: center;
  }
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const NumeralRow = styled.div`
  display: flex;
  align-items: baseline;
  gap: 1.5rem;
  flex-wrap: wrap;
`;

const Numeral = styled.span`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: ${({ theme }) => theme.fontSizes.display};
  line-height: 0.9;
  color: ${({ theme }) => theme.colors.gold};
  letter-spacing: -0.02em;
`;

const HeadlineBlock = styled.div`
  display: grid;
  gap: 1rem;
  max-width: 34ch;
`;

const ImagePair = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  align-items: start;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    gap: 1.5rem;
  }
`;

const ImageA = styled.div`
  margin-top: 0;

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    margin-top: 0;
  }
`;

const ImageB = styled.div`
  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    margin-top: 4rem;
  }
`;

const Hairline = styled.div`
  margin-block: 4rem 2rem;
  border-top: 1px solid ${({ theme }) => theme.colors.borderInverse};
`;

const BottomGrid = styled.div`
  display: grid;
  gap: 2.5rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
  }
`;

const Statement = styled.div`
  display: grid;
  gap: 0.75rem;
`;

export function Expertise() {
  return (
    <Section id="expertise" aria-labelledby="expertise-title">
      <Container>
        <TopGrid>
          <Left>
            <Reveal>
              <NumeralRow>
                <Numeral aria-hidden="true">20</Numeral>
                <HeadlineBlock>
                  <Heading
                    as="h2"
                    size="h2"
                    tone="inverse"
                    id="expertise-title"
                  >
                    {home.expertise.headline}
                  </Heading>
                  <Text variant="bodyLg" tone="mutedInverse" balance>
                    {home.expertise.support}
                  </Text>
                </HeadlineBlock>
              </NumeralRow>
            </Reveal>
          </Left>
          <Reveal>
            <Parallax distance={24}>
              <ImagePair>
                <ImageA>
                  <StandInImage
                    seed="cmf-expertise-ingredient"
                    ratio="4/5"
                  />
                </ImageA>
                <ImageB>
                  <StandInImage seed="cmf-expertise-lab" ratio="1/1" />
                </ImageB>
              </ImagePair>
            </Parallax>
          </Reveal>
        </TopGrid>

        <Hairline aria-hidden="true" />

        <Reveal>
          <BottomGrid>
            <Statement>
              <Heading as="h3" size="h3" tone="inverse">
                {home.formulation.headline}
              </Heading>
              <Text variant="body" tone="mutedInverse" balance>
                {home.formulation.support}
              </Text>
            </Statement>
            <Statement>
              <Heading as="h3" size="h3" tone="inverse">
                {home.innovation.headline}
              </Heading>
              <Text variant="body" tone="mutedInverse" balance>
                {home.innovation.support}
              </Text>
            </Statement>
          </BottomGrid>
        </Reveal>
      </Container>
    </Section>
  );
}
