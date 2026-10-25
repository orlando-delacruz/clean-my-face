import styled from 'styled-components';
import { brand, findProduct } from '../data/content';
import { Link } from '../router';
import { DropletIcon } from '../components/icons';
import { motion, useReducedMotion } from 'motion/react';
import {
  Container,
  EyebrowRow,
  Lead,
  Reveal,
  Section,
  SectionTitle,
} from '../components/ui';

const Grid = styled.div`
  display: grid;
  gap: 2.5rem;
  margin-top: ${({ theme }) => theme.spacing.sm};

  > * {
    min-width: 0;
  }

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

const FormulationBlock = styled.div`
  margin-top: ${({ theme }) => theme.spacing.lg};
  padding-top: ${({ theme }) => theme.spacing.lg};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

const FormulationGrid = styled.div`
  display: grid;
  gap: 1rem;
  margin-top: 1.25rem;

  > * {
    min-width: 0;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.25rem;
  }
`;

const FormulationCard = styled.article`
  padding: 1.25rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.sm};
  background: ${({ theme }) => theme.colors.surface};
`;

const FormulationName = styled.h3`
  font-size: 1.0625rem;
  margin-bottom: 0.25rem;
`;

const FormulationComplex = styled.p`
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.plumpDeep};
  margin-bottom: 0.5rem;
`;

const FormulationText = styled.p`
  font-size: 0.9375rem;
  color: ${({ theme }) => theme.colors.muted};
  line-height: 1.6;
`;

const FormulationLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  margin-top: 0.75rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.plumpDeep};
  text-decoration: none;
  border-bottom: 1px solid currentColor;
  padding-bottom: 0.125rem;

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }
`;

export function Philosophy() {
  const reduceMotion = useReducedMotion();
  const formulations = [
    findProduct('clear', '01'),
    findProduct('clear', '03'),
    findProduct('clear', '04'),
    findProduct('clear', '06'),
  ].filter((product) => product.complex !== undefined);
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
          <FormulationBlock>
            <EyebrowRow $tight>
              <DropletIcon size={14} aria-hidden="true" />
              Purposeful formulations
            </EyebrowRow>
            <SectionTitle as="h3">Actives chosen with intent.</SectionTitle>
            <Lead>
              Selected complexes from the CleanMyFace systems, shown with their
              approved product context.
            </Lead>
            <FormulationGrid>
              {formulations.map((product, index) => (
                <motion.div
                  key={product.slug}
                  initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                  whileInView={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: reduceMotion ? 0 : 0.4,
                    delay: reduceMotion ? 0 : index * 0.06,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <FormulationCard>
                    <FormulationName>{product.name}</FormulationName>
                    {product.complex !== undefined && (
                      <FormulationComplex>{product.complex}</FormulationComplex>
                    )}
                    <FormulationText>{product.positioningLong}</FormulationText>
                    <FormulationLink to={`/products/${product.slug}`}>
                      View product
                    </FormulationLink>
                  </FormulationCard>
                </motion.div>
              ))}
            </FormulationGrid>
          </FormulationBlock>
        </Reveal>
      </Container>
    </Section>
  );
}
