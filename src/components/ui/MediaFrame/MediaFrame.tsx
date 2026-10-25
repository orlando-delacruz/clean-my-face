import styled from 'styled-components';
import type { ReactNode } from 'react';

/**
 * MediaFrame: layout wrapper for child media.
 * Reserves space via aspect-ratio to prevent layout shift.
 */
export type MediaRatio = '1/1' | '4/5' | '3/4' | '16/9' | '21/9' | 'auto';
export type MediaRadius = 'sm' | 'md' | 'lg' | 'pill';
export type MediaFit = 'cover' | 'contain';
export type MediaOverlay = 'none' | 'soft' | 'strong';

const StyledFrame = styled.div<{
  $ratio: MediaRatio;
  $radius: MediaRadius;
  $overlay: MediaOverlay;
  $fit: MediaFit;
  $focal: string;
}>`
  position: relative;
  overflow: hidden;
  width: 100%;
  aspect-ratio: ${({ $ratio }) => ($ratio === 'auto' ? 'auto' : $ratio.replace('/', ' / '))};
  border-radius: ${({ theme, $radius }) => theme.radius[$radius]};
  background: ${({ theme }) => theme.colors.surface};

  & > img,
  & > picture,
  & > video {
    width: 100%;
    height: 100%;
    object-fit: ${({ $fit }) => $fit};
    object-position: ${({ $focal }) => $focal};
    display: block;
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    pointer-events: none;
    background: ${({ theme, $overlay }) =>
      $overlay === 'soft'
        ? theme.colors.scrimSoft
        : $overlay === 'strong'
          ? theme.colors.scrimStrong
          : 'transparent'};
  }
`;

export function MediaFrame({
  ratio = '16/9',
  radius = 'sm',
  fit = 'cover',
  focal = 'center',
  overlay = 'none',
  caption,
  placeholder = false,
  children,
  className,
}: {
  ratio?: MediaRatio;
  radius?: MediaRadius;
  fit?: MediaFit;
  focal?: string;
  overlay?: MediaOverlay;
  caption?: string;
  placeholder?: boolean;
  children: ReactNode;
  className?: string;
}) {
  return (
    <figure className={className} style={{ margin: 0 }}>
      <StyledFrame
        $ratio={ratio}
        $radius={radius}
        $overlay={overlay}
        $fit={fit}
        $focal={focal}
        data-placeholder={placeholder ? 'true' : undefined}
      >
        {children}
      </StyledFrame>
      {caption ? <figcaption>{caption}</figcaption> : null}
    </figure>
  );
}
