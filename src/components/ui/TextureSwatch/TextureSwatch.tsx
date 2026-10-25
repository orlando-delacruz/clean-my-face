import styled from 'styled-components';

/**
 * TextureSwatch: circular swatch for texture/ingredient storytelling.
 * Never relies on color alone: always exposes an accessible name.
 */
const StyledSwatch = styled.span<{ $color: string; $size: string }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: ${({ $size }) => $size};
  height: ${({ $size }) => $size};
  border-radius: 50%;
  background: ${({ $color }) => $color};
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const VisuallyHidden = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
`;

export function TextureSwatch({
  color,
  size = '3.5rem',
  label,
  ariaLabel,
}: {
  color: string;
  size?: string;
  label?: string;
  ariaLabel?: string;
}) {
  const accessibleName = ariaLabel ?? label;
  return (
    <StyledSwatch
      $color={color}
      $size={size}
      role="img"
      aria-label={accessibleName}
    >
      {label ? <VisuallyHidden>{label}</VisuallyHidden> : null}
    </StyledSwatch>
  );
}
