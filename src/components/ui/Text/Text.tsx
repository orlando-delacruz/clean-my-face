import styled from 'styled-components';
import type { ReactNode } from 'react';

/**
 * Text primitive for body copy.
 */
export type TextVariant = 'bodyLg' | 'body' | 'small' | 'caption';
export type TextTone = 'default' | 'muted' | 'inverse' | 'mutedInverse';

const StyledText = styled.p<{
  $variant: TextVariant;
  $tone: TextTone;
  $balance: boolean;
  $pretty: boolean;
}>`
  margin: 0;
  font-size: ${({ theme, $variant }) =>
    $variant === 'bodyLg'
      ? theme.fontSizes.bodyLg
      : $variant === 'body'
        ? theme.fontSizes.body
        : theme.fontSizes.small};
  line-height: ${({ theme }) => theme.lineHeights.body};
  color: ${({ theme, $tone }) =>
    $tone === 'muted'
      ? theme.colors.muted
      : $tone === 'inverse'
        ? theme.colors.textInverse
        : $tone === 'mutedInverse'
          ? theme.colors.mutedInverse
          : theme.colors.text};
  text-wrap: ${({ $balance, $pretty }) =>
    $balance ? 'balance' : $pretty ? 'pretty' : 'normal'};
`;

export function Text({
  variant = 'body',
  tone = 'default',
  as = 'p',
  balance = false,
  pretty = false,
  children,
  className,
}: {
  variant?: TextVariant;
  tone?: TextTone;
  as?: 'p' | 'span' | 'div';
  balance?: boolean;
  pretty?: boolean;
  children: ReactNode;
  className?: string;
}) {
  return (
    <StyledText
      as={as}
      $variant={variant}
      $tone={tone}
      $balance={balance}
      $pretty={pretty}
      className={className}
    >
      {children}
    </StyledText>
  );
}
