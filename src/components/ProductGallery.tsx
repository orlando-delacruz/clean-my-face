import styled from 'styled-components';
import { img } from '../data/images';

const Figure = styled.figure<{ $tint: string }>`
  margin: 0;
  position: relative;
  overflow: hidden;
  background:
    radial-gradient(
      120% 90% at 50% 0%,
      ${({ $tint }) => $tint} 0%,
      rgba(255, 255, 255, 0) 62%
    ),
    ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.sm};
  box-shadow: 0 32px 64px -40px rgba(33, 26, 19, 0.28);
  aspect-ratio: 1 / 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: clamp(2rem, 5vw, 3.5rem);

  &::after {
    content: '';
    position: absolute;
    inset: 0.625rem;
    border: 1px solid rgba(201, 169, 106, 0.35);
    border-radius: ${({ theme }) => theme.radius.sm};
    pointer-events: none;
  }
`;

const HeroImage = styled.img`
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
  const src = img(image);
  if (src === '') return null;
  return (
    <Figure $tint={tint}>
      <HeroImage
        src={src}
        alt={`${productName} packaging`}
        decoding="async"
        fetchPriority="high"
      />
    </Figure>
  );
}
