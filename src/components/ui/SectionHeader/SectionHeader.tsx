import styled from 'styled-components';
import type { ReactNode } from 'react';
import { Eyebrow } from '../Eyebrow';
import { Heading } from '../Heading';
import type { HeadingLevel, HeadingSize } from '../Heading';
import { Text } from '../Text';

export type SectionHeaderAlign = 'left' | 'center';
export type SectionHeaderTone = 'default' | 'inverse';

const Wrap = styled.div<{ $align: SectionHeaderAlign }>`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  max-width: 46rem;
  text-align: ${({ $align }) => $align};
  align-items: ${({ $align }) => ($align === 'center' ? 'center' : 'flex-start')};
  margin-inline: ${({ $align }) => ($align === 'center' ? 'auto' : '0')};
`;

const Support = styled(Text)`
  max-width: 58ch;
`;

/**
 * SectionHeader: eyebrow, heading and support copy for a section intro.
 * Built from the Eyebrow, Heading and Text primitives so tones and type stay
 * consistent across homepage and range pages.
 */
export function SectionHeader({
  eyebrow,
  heading,
  level = 'h2',
  size = 'h2',
  support,
  align = 'left',
  tone = 'default',
  id,
  className,
}: {
  /** Optional label above the heading. */
  eyebrow?: ReactNode;
  /** Heading text. */
  heading: ReactNode;
  /** Semantic heading level, independent of visual size. */
  level?: HeadingLevel;
  /** Visual heading size. */
  size?: HeadingSize;
  /** Optional supporting paragraph. */
  support?: ReactNode;
  /** Left by default; center for a full-width intro. */
  align?: SectionHeaderAlign;
  /** Use inverse tones on dark backgrounds. */
  tone?: SectionHeaderTone;
  /** Optional id, for aria-labelledby on the section. */
  id?: string;
  /** Optional class on the wrapper. */
  className?: string;
}) {
  const inverse = tone === 'inverse';

  return (
    <Wrap $align={align} className={className}>
      {eyebrow !== undefined ? (
        <Eyebrow tone={inverse ? 'inverse' : 'default'}>{eyebrow}</Eyebrow>
      ) : null}
      <Heading as={level} size={size} tone={tone} align={align} id={id}>
        {heading}
      </Heading>
      {support !== undefined ? (
        <Support
          variant="bodyLg"
          tone={inverse ? 'mutedInverse' : 'muted'}
          balance
        >
          {support}
        </Support>
      ) : null}
    </Wrap>
  );
}
