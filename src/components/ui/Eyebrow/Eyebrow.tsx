import styled from 'styled-components';
import type { ReactNode } from 'react';

/**
 * Eyebrow: small uppercase tracked label.
 */
export type EyebrowTone = 'default' | 'inverse' | 'range';

const StyledEyebrow = styled.p<{ $tone: EyebrowTone }>`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSizes.eyebrow};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  letter-spacing: ${({ theme }) => theme.letterSpacings.eyebrow};
  text-transform: uppercase;
  color: ${({ theme, $tone }) =>
    $tone === 'inverse'
      ? theme.colors.textInverse
      : $tone === 'range'
        ? theme.range.deep
        : theme.colors.muted};
`;

export function Eyebrow({
  tone = 'default',
  children,
  className,
}: {
  tone?: EyebrowTone;
  children: ReactNode;
  className?: string;
}) {
  return (
    <StyledEyebrow $tone={tone} className={className}>
      {children}
    </StyledEyebrow>
  );
}
