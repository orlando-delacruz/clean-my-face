import styled from 'styled-components';

/**
 * Divider: decorative horizontal rule variants.
 */
export type DividerVariant = 'line' | 'short' | 'dot';

const StyledDivider = styled.span<{ $variant: DividerVariant }>`
  display: block;
  background: ${({ theme }) => theme.colors.gold};
  ${({ $variant }) =>
    $variant === 'short'
      ? 'width: 3.5rem; height: 2px; border-radius: 2px;'
      : $variant === 'dot'
        ? 'width: 6px; height: 6px; border-radius: 50%;'
        : 'width: 100%; height: 1px;'}
`;

export function Divider({
  variant = 'line',
  label,
}: {
  variant?: DividerVariant;
  label?: string;
}) {
  if (label) {
    return (
      <span role="separator" aria-label={label}>
        <StyledDivider $variant={variant} aria-hidden="true" />
      </span>
    );
  }
  return <StyledDivider $variant={variant} aria-hidden="true" />;
}
