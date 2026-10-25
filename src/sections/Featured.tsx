import styled from 'styled-components';
import { featured, findProduct, ranges } from '../data/content';
import { ProductCard } from '../components/ProductCard';
import { StarIcon } from '../components/icons';
import { motion, useReducedMotion } from 'motion/react';
import {
  Container,
  EyebrowRow,
  Lead,
  Reveal,
  SectionRule,
  SectionTitle,
} from '../components/ui';

const DarkSection = styled.section`
  scroll-margin-top: 5rem;
  padding-block: ${({ theme }) => theme.spacing.sectionMobile};
  background-color: ${({ theme }) => theme.colors.text};
  color: ${({ theme }) => theme.colors.textInverse};
  border-block: 1px solid ${({ theme }) => theme.colors.gold32};
  position: relative;
  isolation: isolate;
  overflow: hidden;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding-block: ${({ theme }) => theme.spacing.section};
  }
`;

const Glow = styled.div`
  position: absolute;
  inset: 0;
  z-index: -1;
  background: radial-gradient(
    58rem 26rem at 50% -8%,
    ${({ theme }) => theme.colors.gold14},
    transparent 70%
  );
  pointer-events: none;
`;

const Header = styled.div`
  max-width: 48rem;
  margin-inline: auto;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const DarkTitle = styled(SectionTitle)`
  color: ${({ theme }) => theme.colors.textInverse};
  text-wrap: balance;
`;

const DarkLead = styled(Lead)`
  color: ${({ theme }) => theme.colors.textInverse82};
  max-width: 58ch;
`;

const Grid = styled.div`
  display: grid;
  gap: 1.5rem;
  margin-top: 3rem;
  align-items: stretch;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export function Featured() {
  const reduceMotion = useReducedMotion();

  return (
    <DarkSection id="featured" aria-labelledby="featured-title">
      <Glow aria-hidden="true" />
      <Container>
        <Reveal>
          <Header>
            <EyebrowRow $onDark>
              <StarIcon size={14} aria-hidden="true" />
              {featured.eyebrow}
            </EyebrowRow>
            <DarkTitle id="featured-title">{featured.title}</DarkTitle>
            <SectionRule aria-hidden="true" />
            <DarkLead>{featured.lead}</DarkLead>
          </Header>
          <Grid>
            {featured.picks.map((pick, index) => {
              const product = findProduct(pick.rangeId, pick.step);
              const rangeName =
                ranges.find((r) => r.id === pick.rangeId)?.name ?? '';
              return (
                <motion.div
                  key={`${pick.rangeId}-${pick.step}`}
                  initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                  whileInView={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: reduceMotion ? 0 : 0.45,
                    delay: reduceMotion ? 0 : index * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <ProductCard
                    product={product}
                    rangeName={rangeName}
                    tone="dark"
                  />
                </motion.div>
              );
            })}
          </Grid>
        </Reveal>
      </Container>
    </DarkSection>
  );
}
