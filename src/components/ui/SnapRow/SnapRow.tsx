import styled, { css } from 'styled-components';
import type { ReactNode } from 'react';

const Scroller = styled.div<{
  $itemWidth: string;
  $gap: string;
  $columns?: number;
}>`
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: ${({ $itemWidth }) => $itemWidth};
  gap: ${({ $gap }) => $gap};
  overflow-x: auto;
  overscroll-behavior-x: contain;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
  -ms-overflow-style: none;
  padding-bottom: 0.25rem;

  &::-webkit-scrollbar {
    display: none;
  }

  > * {
    scroll-snap-align: start;
    min-width: 0;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    ${({ $columns }) =>
      $columns === undefined
        ? ''
        : css`
            grid-auto-flow: row;
            grid-template-columns: repeat(${$columns}, minmax(0, 1fr));
            overflow-x: visible;
            padding-bottom: 0;
          `}
  }
`;

/**
 * SnapRow: horizontal scroll-snap row for mobile stories.
 * The next item peeks in; at lg it becomes a normal grid when columns is set.
 * The scrollbar is visually hidden but scrolling (wheel, touch, arrow keys)
 * still works. tabIndex makes the region keyboard-scrollable.
 */
export function SnapRow({
  children,
  itemWidth,
  gap = '1rem',
  columns,
  label,
  className,
}: {
  /** Items in the row; each child becomes one snap item. */
  children: ReactNode;
  /** Width of each item on mobile, as a CSS length (for example "78%"). */
  itemWidth: string;
  /** Gap between items. */
  gap?: string;
  /** Number of columns at lg and up; omit to keep the row at all widths. */
  columns?: number;
  /** Accessible name for the scroll region. Required. */
  label: string;
  /** Optional class on the scroller. */
  className?: string;
}) {
  return (
    <Scroller
      role="region"
      aria-label={label}
      tabIndex={0}
      $itemWidth={itemWidth}
      $gap={gap}
      $columns={columns}
      className={className}
    >
      {children}
    </Scroller>
  );
}
