import styled from 'styled-components';
import { imageMeta } from '../data/images';
import { ResponsiveImage } from './ui';

const Figure = styled.figure<{ $tint: string }>`
  margin: 0;
  position: relative;
  overflow: hidden;
  background:
    radial-gradient(
      120% 90% at 50% 0%,
      ${({ $tint }) => $tint} 0%,
      transparent 62%
    ),
    ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.sm};
  box-shadow: 0 32px 64px -40px ${({ theme }) => theme.colors.text28};
  aspect-ratio: 1 / 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: clamp(2rem, 5vw, 3.5rem);

  &::after {
    content: '';
    position: absolute;
    inset: 0.625rem;
    border: 1px solid ${({ theme }) => theme.colors.gold35};
    border-radius: ${({ theme }) => theme.radius.sm};
    pointer-events: none;
  }
`;

const HeroImage = styled(ResponsiveImage)`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

/**
 * Luxury hero visual. Renders the product hero image only.
 * Step, ingredient, and purpose tiles are intentionally excluded here:
 * they are low-resolution details and render as small circles beside
 * their own copy instead of competing with the hero at large size.
 */
export function ProductGallery({
  productName,
  image,
  tint,
}: {
  productName: string;
  image: string;
  tint: string;
}) {
  const meta = imageMeta(image);
  if (meta === null) return null;
  return (
    <Figure $tint={tint}>
      <HeroImage
        image={meta}
        alt={`${productName} packaging`}
        sizes="(min-width: 1024px) 520px, 100vw"
        priority
      />
    </Figure>
  );
}
