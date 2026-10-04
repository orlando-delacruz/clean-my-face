import styled from 'styled-components';
import { featured, findProduct, ranges } from '../data/content';
import { ProductCard } from '../components/ProductCard';
import { StarIcon } from '../components/icons';
import {
  Container,
  EyebrowRow,
  Lead,
  Reveal,
  SectionRule,
  SectionTitle,
} from '../components/primitives';

const DarkSection = styled.section`
  scroll-margin-top: 5rem;
  padding-block: ${({ theme }) => theme.spacing.sectionMobile};
  background-color: ${({ theme }) => theme.colors.text};
  color: #fffdf8;
  border-block: 1px solid rgba(201, 169, 106, 0.32);
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
    rgba(201, 169, 106, 0.14),
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
  color: #fffdf8;
  text-wrap: balance;
`;

const DarkLead = styled(Lead)`
  color: rgba(255, 253, 248, 0.82);
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
            {featured.picks.map((pick) => {
              const product = findProduct(pick.rangeId, pick.step);
              const rangeName =
                ranges.find((r) => r.id === pick.rangeId)?.name ?? '';
              return (
                <ProductCard
                  key={`${pick.rangeId}-${pick.step}`}
                  product={product}
                  rangeName={rangeName}
                  tone="dark"
                />
              );
            })}
          </Grid>
        </Reveal>
      </Container>
    </DarkSection>
  );
}
