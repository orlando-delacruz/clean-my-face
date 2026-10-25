import styled from 'styled-components';
import type { ReactNode, ButtonHTMLAttributes } from 'react';

/**
 * Chip: small pill label. Non-interactive by default.
 */
export type ChipVariant = 'neutral' | 'plump' | 'clear' | 'inverse';

const StyledChip = styled.span<{ $variant: ChipVariant }>`
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.375rem 0.75rem;
  font-size: ${({ theme }) => theme.fontSizes.small};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  border-radius: ${({ theme }) => theme.radius.pill};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme, $variant }) =>
    $variant === 'plump'
      ? theme.colors.plumpTint
      : $variant === 'clear'
        ? theme.colors.clearTint
        : $variant === 'inverse'
          ? theme.colors.surfaceInverse
          : theme.colors.surface};
  color: ${({ theme, $variant }) =>
    $variant === 'plump'
      ? theme.colors.plumpDeep
      : $variant === 'clear'
        ? theme.colors.clearDeep
        : $variant === 'inverse'
          ? theme.colors.textInverse
          : theme.colors.text};
`;

const StyledChipButton = styled.button<{ $variant: ChipVariant }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.375rem;
  min-height: 44px;
  min-width: 44px;
  padding: 0.375rem 0.75rem;
  font-size: ${({ theme }) => theme.fontSizes.small};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  border-radius: ${({ theme }) => theme.radius.pill};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme, $variant }) =>
    $variant === 'plump'
      ? theme.colors.plumpTint
      : $variant === 'clear'
        ? theme.colors.clearTint
        : $variant === 'inverse'
          ? theme.colors.surfaceInverse
          : theme.colors.surface};
  color: ${({ theme, $variant }) =>
    $variant === 'plump'
      ? theme.colors.plumpDeep
      : $variant === 'clear'
        ? theme.colors.clearDeep
        : $variant === 'inverse'
          ? theme.colors.textInverse
          : theme.colors.text};
  cursor: pointer;

  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.focus};
    outline-offset: 2px;
  }
`;

export function Chip({
  variant = 'neutral',
  children,
  onClick,
  ...rest
}: {
  variant?: ChipVariant;
  children: ReactNode;
  onClick?: () => void;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'>) {
  if (onClick) {
    return (
      <StyledChipButton $variant={variant} onClick={onClick} type="button" {...rest}>
        {children}
      </StyledChipButton>
    );
  }
  return <StyledChip $variant={variant}>{children}</StyledChip>;
}
