import styled from 'styled-components';
import type { ReactNode } from 'react';

/**
 * Heading primitive.
 * Semantic level (as) is independent of visual size.
 */
export type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
export type HeadingSize = 'display' | 'h1' | 'h2' | 'h3' | 'title';
export type HeadingTone = 'default' | 'inverse';
export type HeadingAlign = 'left' | 'center' | 'right';

const sizes: Record<HeadingSize, 'display' | 'h1' | 'h2' | 'h3' | 'title'> = {
  display: 'display',
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  title: 'title',
};

const StyledHeading = styled.h1<{
  $size: HeadingSize;
  $tone: HeadingTone;
  $align: HeadingAlign;
}>`
  font-family: ${({ theme }) => theme.fonts.display};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  line-height: ${({ theme }) => theme.lineHeights.heading};
  letter-spacing: ${({ theme }) => theme.letterSpacings.heading};
  font-size: ${({ theme, $size }) => theme.fontSizes[sizes[$size]]};
  color: ${({ theme, $tone }) =>
    $tone === 'inverse' ? theme.colors.textInverse : theme.colors.text};
  text-align: ${({ $align }) => $align};
  margin: 0;
`;

export function Heading({
  as = 'h2',
  size = 'h2',
  tone = 'default',
  align = 'left',
  children,
  id,
  className,
}: {
  as?: HeadingLevel;
  size?: HeadingSize;
  tone?: HeadingTone;
  align?: HeadingAlign;
  children: ReactNode;
  id?: string;
  className?: string;
}) {
  return (
    <StyledHeading
      as={as}
      $size={size}
      $tone={tone}
      $align={align}
      id={id}
      className={className}
    >
      {children}
    </StyledHeading>
  );
}
