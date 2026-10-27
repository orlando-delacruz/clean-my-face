import styled from 'styled-components';
import { theme } from '../../../theme';
import { StarIcon } from '../../icons';

const Row = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
`;

/**
 * ProductStars: decorative five-star row for a 0-5 sample rating.
 * Aria-hidden by design: sample ratings are prototype placeholders, never
 * customer reviews, so no count or verified-review claim is rendered.
 */
export function ProductStars({
  rating,
  size = 14,
}: {
  /** Sample rating on a 0-5 scale; rounded and clamped to filled stars. */
  rating: number;
  /** Star icon size in pixels. */
  size?: number;
}) {
  const filled = Math.max(0, Math.min(5, Math.round(rating)));
  return (
    <Row aria-hidden="true">
      {Array.from({ length: 5 }, (_, index) => {
        const isFilled = index < filled;
        return (
          <StarIcon
            key={index}
            size={size}
            fill={isFilled ? theme.colors.gold : 'none'}
            color={isFilled ? theme.colors.gold : theme.colors.borderStrong}
          />
        );
      })}
    </Row>
  );
}
