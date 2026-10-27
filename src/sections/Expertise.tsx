import styled from 'styled-components';
import { home } from '../data/home';
import { imageMeta } from '../data/images';
import {
  Container,
  Heading,
  MediaFrame,
  ResponsiveImage,
  Reveal,
  Text,
} from '../components/ui';
import { Parallax } from '../components/ui/Parallax';

const Section = styled.section`
  background: ${({ theme }) => theme.colors.surfaceInverse};
  color: ${({ theme }) => theme.colors.textInverse};
  padding-block: ${({ theme }) => theme.spacing.sectionMobile};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding-block: ${({ theme }) => theme.spacing.section};
  }

  overflow-x: clip;
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

const FramedFigure = styled.figure`
  position: relative;
  margin: 0;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    transform: translate(0.75rem, 0.75rem);
    border: 1px solid ${({ theme }) => theme.colors.gold};
    border-radius: ${({ theme }) => theme.radius.sm};
    pointer-events: none;
  }
`;

const FramedImage = styled(MediaFrame)`
  transition: transform 420ms cubic-bezier(0.22, 1, 0.36, 1);

  ${FramedFigure}:hover &,
  ${FramedFigure}:focus-within & {
    transform: scale(1.02);
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;

    ${FramedFigure}:hover &,
    ${FramedFigure}:focus-within & {
      transform: none;
    }
  }
`;

/**
 * ContainImage: fills the MediaFrame box while showing the whole photograph
 * (object-fit: contain, never cropped). The className lands on the inner
 * img, so the sizing below applies directly to the rendered image element.
 */
const ContainImage = styled(ResponsiveImage)`
  width: 100%;
  height: 100%;
  object-fit: contain;
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

const BottomGrid = styled.div`
  display: grid;
  gap: 2.5rem;
  margin-top: 3rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
  }
`;

const Statement = styled.div`
  display: grid;
  gap: 0.75rem;
  align-content: start;
  border-top: 1px solid ${({ theme }) => theme.colors.borderInverse};
  padding-top: 1.5rem;
`;

export function Expertise() {
  const labMeta = imageMeta('expertise-lab.jpg');
  const skincareMeta = imageMeta('expertise-skincare.jpg');
  // Registry-mapped keys, so this branch never executes in practice.
  if (labMeta === null || skincareMeta === null) return null;

  return (
    <Section id="expertise" aria-labelledby="expertise-title">
      <Container>
        <TopGrid>
          <Left>
            <Reveal>
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
            </Reveal>
          </Left>
          <Reveal>
            <Parallax distance={24}>
              <ImagePair>
                <ImageA>
                  <FramedFigure>
                    <FramedImage ratio="4/5" radius="sm" fit="contain">
                      <ContainImage
                        image={labMeta}
                        alt="Scientist in a lab coat and gloves handling a flask in a modern laboratory"
                        sizes="(min-width: 1024px) 300px, 45vw"
                      />
                    </FramedImage>
                  </FramedFigure>
                </ImageA>
                <ImageB>
                  <FramedFigure>
                    <FramedImage ratio="1/1" radius="sm" fit="contain">
                      <ContainImage
                        image={skincareMeta}
                        alt="Asian woman in a white robe holding a skincare product in soft natural light"
                        sizes="(min-width: 1024px) 300px, 45vw"
                      />
                    </FramedImage>
                  </FramedFigure>
                </ImageB>
              </ImagePair>
            </Parallax>
          </Reveal>
        </TopGrid>

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
