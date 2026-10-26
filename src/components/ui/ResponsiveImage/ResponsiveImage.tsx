import type { CSSProperties } from 'react';
import type { ImageMeta } from '../../../data/images';
import { buildSrcSet } from '../../../data/images';

export interface ResponsiveImageProps {
  image: ImageMeta;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
  style?: CSSProperties;
}

/**
 * ResponsiveImage: picture element with AVIF and WebP sources plus the
 * original file as the fallback img.
 *
 * The fallback src is always the exact original URL used before Phase 2, so
 * if every derivative fails the rendered result is byte-identical to today.
 * Width and height attributes reserve space from the intrinsic dimensions.
 * className and style land on the inner img, so styled(ResponsiveImage)
 * keeps the exact CSS that styled.img had before. The picture wrapper uses
 * display: contents and therefore introduces no box, no layout change.
 *
 * In DEV the generated variants may not exist, so imageMeta() returns an
 * empty variant list and this renders the fallback img only (no 404s).
 */
export function ResponsiveImage({
  image,
  alt,
  sizes,
  priority = false,
  className,
  style,
}: ResponsiveImageProps) {
  if (image === null || image === undefined) {
    throw new Error(
      'ResponsiveImage: image is required. Pass imageMeta("<key>") and keep the img() guard at the call site so missing images render nothing.',
    );
  }
  const avifSrcSet = buildSrcSet(image, 'avif');
  const webpSrcSet = buildSrcSet(image, 'webp');
  return (
    <picture style={{ display: 'contents' }}>
      {avifSrcSet !== '' && (
        <source type="image/avif" srcSet={avifSrcSet} sizes={sizes} />
      )}
      {webpSrcSet !== '' && (
        <source type="image/webp" srcSet={webpSrcSet} sizes={sizes} />
      )}
      <img
        src={image.src}
        alt={alt}
        sizes={sizes}
        width={image.width}
        height={image.height}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding={priority ? 'sync' : 'async'}
        className={className}
        style={style}
      />
    </picture>
  );
}
