import styled from 'styled-components';
import type { RangeContent } from '../../../data/content';
import { labels } from '../../../data/rangePages';
import { imageMeta } from '../../../data/images';
import { Link } from '../../../router';
import { Container, ResponsiveImage, Reveal, Section, SectionHeader } from '../../ui';
import { ArrowRightIcon } from '../../icons';

const Steps = styled.ol`
  list-style: none;
  margin: 3rem 0 0;
  padding: 0;
  display: grid;
  gap: 1.5rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    gap: 0;
  }
`;

const Step = styled.li`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.sm};
  overflow: hidden;
  display: grid;

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr 1fr;
    align-items: stretch;
    border: none;
    border-radius: 0;
    border-top: 1px solid ${({ theme }) => theme.colors.border};
    background: transparent;
    overflow: visible;

    &:last-child {
      border-bottom: 1px solid ${({ theme }) => theme.colors.border};
    }

    &:nth-child(even) > *:first-child {
      order: 2;
    }
  }
`;

const Visual = styled.div`
  background: ${({ theme }) => theme.range.soft};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  padding: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    border-bottom: none;
    padding: 2.5rem;
  }
`;

const Packshot = styled(ResponsiveImage)`
  width: 100%;
  height: auto;
  max-height: 22rem;
  object-fit: contain;
`;

const Body = styled.div`
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    padding: 2.5rem;
    justify-content: center;
    gap: 0.625rem;
  }
`;

const Number = styled.span`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(2.5rem, 4vw, 3.5rem);
  line-height: 1;
  color: ${({ theme }) => theme.range.deep};
`;

const Name = styled.h3`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 1.5rem;
  line-height: 1.2;
`;

const Role = styled.p`
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.muted};
`;

const Tagline = styled.p`
  font-size: 0.9375rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.muted};
`;

const StepLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  min-height: 2.75rem;
  margin-top: 0.5rem;
  font-size: 0.9375rem;
  font-weight: 600;
  color: ${({ theme }) => theme.range.deep};
  text-decoration: none;
  border-bottom: 1px solid currentColor;
  padding-bottom: 0.125rem;

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }

  &:focus-visible {
    outline-color: ${({ theme }) => theme.range.deep};
  }
`;

/**
 * SystemSteps: the range's products in step order. Editorial alternating
 * rows on desktop, stacked cards on mobile. Count comes from the data.
 */
export function SystemSteps({ range }: { range: RangeContent }) {
  return (
    <Section aria-labelledby="system-title">
      <Container>
        <Reveal>
          <SectionHeader
            heading={`The ${range.name} routine`}
            id="system-title"
          />
        </Reveal>
        <Steps>
          {range.products.map((product) => {
            const meta = imageMeta(product.image);
            return (
              <Step key={product.slug}>
                <Visual>
                  {meta !== null && (
                    <Packshot
                      image={meta}
                      alt=""
                      sizes="(min-width: 1024px) 440px, (min-width: 768px) 60vw, 84vw"
                    />
                  )}
                </Visual>
                <Body>
                  <Number aria-hidden="true">{product.step}</Number>
                  <Name>{product.name}</Name>
                  <Role>
                    Step {product.step} · {product.role}
                  </Role>
                  <Tagline>{product.tagline}</Tagline>
                  <StepLink to={`/products/${product.slug}`}>
                    {labels.viewProduct}
                    <ArrowRightIcon size={15} />
                  </StepLink>
                </Body>
              </Step>
            );
          })}
        </Steps>
      </Container>
    </Section>
  );
}
