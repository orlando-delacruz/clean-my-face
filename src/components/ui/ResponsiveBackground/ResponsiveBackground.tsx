import type { CSSProperties, ReactNode } from 'react';
import styled from 'styled-components';
import type { ImageMeta } from '../../../data/images';
import { buildImageSet } from '../../../data/images';

export interface ResponsiveBackgroundProps {
  image: ImageMeta;
  tint: string;
  /**
   * Element tag for the backdrop. Named `tag` (not `as`) on purpose: the
   * styled-components `as` prop on a styled(CustomComponent) wrapper would
   * bypass this component entirely. `tag` is forwarded to the inner
   * styled.div Layer, where `as` switching works as documented.
   */
  tag?: 'div' | 'section';
  size?: string;
  position?: string;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
  id?: string;
}

const Layer = styled.div<{
  $src: string;
  $set: string | null;
  $tint: string;
  $size: string;
  $position: string;
}>`  background-color: ${({ $tint }) => $tint};
  background-image: ${({ $tint, $src }) =>
    `linear-gradient(color-mix(in srgb, ${$tint} 86%, transparent), color-mix(in srgb, ${$tint} 86%, transparent)), url("${$src}")`};
  ${({ $tint, $set }) =>
    $set !== null &&
    `background-image: linear-gradient(color-mix(in srgb, ${$tint} 86%, transparent), color-mix(in srgb, ${$tint} 86%, transparent)), ${$set};`};
  background-size: ${({ $size }) => $size};
  background-position: ${({ $position }) => $position};
`;

/**
 * ResponsiveBackground: tinted overlay plus a responsive background image.
 *
 * The layering is exactly the one used by Closing today: a
 * tint gradient at 86 percent over the image, cover, centered. The plain
 * url() declaration comes first as the fallback; when variants exist, an
 * image-set() override (1x smallest, 2x largest, WebP) follows it, so
 * browsers without image-set keep the original rendering.
 *
 * In DEV the generated variants may not exist, so imageMeta() returns an
 * empty variant list and only the fallback url() is emitted (no 404s).
 */
export function ResponsiveBackground({
  image,
  tint,
  tag = 'div',
  size = 'cover',
  position = 'center',
  className,
  style,
  children,
  id,
}: ResponsiveBackgroundProps) {
  if (image === null || image === undefined) {
    throw new Error(
      'ResponsiveBackground: image is required. Pass imageMeta("<key>") and keep the img() guard at the call site so missing images render nothing.',
    );
  }
  return (
    <Layer
      as={tag}
      $src={image.src}
      $set={buildImageSet(image)}
      $tint={tint}
      $size={size}
      $position={position}
      className={className}
      style={style}
      id={id}
    >
      {children}
    </Layer>
  );
}
