import { MediaFrame } from '../MediaFrame';
import type { MediaRadius, MediaRatio } from '../MediaFrame';

/**
 * StandInImage: decorative Picsum placeholder for the redesign.
 *
 * Only seeds starting with "cmf-" are accepted, so a real asset path can never
 * be mistaken for a stand-in. The data-stand-in marker is emitted in dev only
 * (MediaFrame handles that); production output stays clean.
 */
export function StandInImage({
  seed,
  ratio = '4/5',
  width = 800,
  height = 1000,
  className,
  rounded = 'sm',
}: {
  /** Picsum seed. Must start with "cmf-". */
  seed: string;
  /** Frame aspect ratio, reserves space before the image loads. */
  ratio?: MediaRatio;
  /** Requested image width in pixels. */
  width?: number;
  /** Requested image height in pixels. */
  height?: number;
  /** Optional class on the MediaFrame wrapper. */
  className?: string;
  /** Frame corner radius. */
  rounded?: MediaRadius;
}) {
  if (!seed.startsWith('cmf-')) {
    throw new Error(
      `StandInImage: seed must start with "cmf-". Received "${seed}".`,
    );
  }

  return (
    <MediaFrame ratio={ratio} radius={rounded} standIn className={className}>
      <img
        src={`https://picsum.photos/seed/${seed}/${width}/${height}`}
        width={width}
        height={height}
        loading="lazy"
        decoding="async"
        alt=""
        aria-hidden="true"
      />
    </MediaFrame>
  );
}
