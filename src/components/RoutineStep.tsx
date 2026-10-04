import styled from 'styled-components';
import { theme } from '../theme';
import { img } from '../data/images';
import type { ProductContent } from '../data/content';
import { Link } from '../router';
import { ArrowRightIcon } from './icons';

const Step = styled.li<{ $ink: string }>`
  position: relative;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.sm};
  overflow: hidden;
  box-shadow: 0 18px 40px -24px rgba(33, 26, 19, 0.28);
  cursor: pointer;
  transition: box-shadow 220ms cubic-bezier(0.22, 1, 0.36, 1),
    border-color 220ms ease;

  &:hover {
    border-color: ${({ $ink }) => $ink};
    box-shadow: 0 26px 54px -24px rgba(33, 26, 19, 0.38);
  }

  &:focus-within {
    border-color: ${({ $ink }) => $ink};
  }
`;

const ThumbLink = styled.div<{ $tint: string }>`
  display: block;
  overflow: hidden;
  background: color-mix(
    in srgb,
    ${({ $tint }) => $tint} 42%,
    ${({ theme }) => theme.colors.surface}
  );
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const Thumb = styled.img`
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: contain;
`;

const StepBody = styled.div`
  display: grid;
  gap: 0.5rem;
  align-content: start;
  flex: 1;
  padding: 1.25rem 1.25rem 1.375rem;
`;

const StepMeta = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
`;

const StepChip = styled.span<{ $ink: string }>`
  display: inline-flex;
  align-items: center;
  padding: 0.32rem 0.7rem;
  background: ${({ $ink }) => $ink};
  color: ${({ theme }) => theme.colors.surface};
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  border-radius: ${({ theme }) => theme.radius.sm};
  white-space: nowrap;
`;

const Role = styled.span<{ $ink: string }>`
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${({ $ink }) => $ink};
  text-align: right;
`;

const Name = styled.h3`
  font-size: 1.25rem;
  line-height: 1.25;
  margin-top: 0.375rem;
`;

const NameLink = styled(Link)<{ $ink: string }>`
  text-decoration: none;
  color: inherit;

  /* Stretched link: the whole card clicks through to the product page. */
  &::after {
    content: '';
    position: absolute;
    inset: 0;
  }

  &:hover {
    color: ${({ $ink }) => $ink};
  }
`;

const Tagline = styled.p`
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.925rem;
  line-height: 1.6;
  opacity: 0.78;
`;

const ViewCta = styled.span<{ $ink: string }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  margin-top: 0.75rem;
  padding-top: 0.875rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  font-size: 0.875rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  transition: color 200ms ease;

  ${Step}:hover & {
    color: ${({ $ink }) => $ink};
  }
`;

const CircleArrow = styled.span<{ $ink: string }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.25rem;
  height: 2.25rem;
  flex: none;
  border-radius: 50%;
  border: 1px solid ${({ $ink }) => $ink};
  color: ${({ $ink }) => $ink};
  transition: background-color 220ms cubic-bezier(0.22, 1, 0.36, 1),
    color 220ms cubic-bezier(0.22, 1, 0.36, 1),
    transform 220ms cubic-bezier(0.22, 1, 0.36, 1);

  ${Step}:hover & {
    background: ${({ $ink }) => $ink};
    color: ${({ theme }) => theme.colors.surface};
    transform: translateX(3px);
  }
`;

export function RoutineStep({ product }: { product: ProductContent }) {
  const src = img(product.image);
  const to = `/products/${product.slug}`;
  const ink = product.rangeId === 'plump' ? theme.colors.plumpDeep : theme.colors.clearDeep;
  const tint = product.rangeId === 'plump' ? theme.colors.plumpTint : theme.colors.clearTint;
  return (
    <Step $ink={ink}>
      {src !== '' && (
        <ThumbLink $tint={tint}>
          <Thumb src={src} alt={`${product.name} packaging`} loading="lazy" decoding="async" />
        </ThumbLink>
      )}
      <StepBody>
        <StepMeta>
          <StepChip $ink={ink}>Step {product.step}</StepChip>
          <Role $ink={ink}>{product.role}</Role>
        </StepMeta>
        <Name>
          <NameLink to={to} $ink={ink}>
            {product.name}
          </NameLink>
        </Name>
        <Tagline>{product.tagline}</Tagline>
        <ViewCta aria-hidden="true" $ink={ink}>
          View product
          <CircleArrow $ink={ink}>
            <ArrowRightIcon size={14} />
          </CircleArrow>
        </ViewCta>
      </StepBody>
    </Step>
  );
}
