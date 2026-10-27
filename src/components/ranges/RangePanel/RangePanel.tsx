import styled from 'styled-components';
import { Link } from '../../../router';
import { RangeTheme } from '../../ui/RangeTheme';
import type { RangeId } from '../../ui/RangeTheme';
import { ResponsiveImage } from '../../ui/ResponsiveImage';
import { imageMeta } from '../../../data/images';
import { withAlpha } from '../../../styles/color';
import { labels } from '../../../data/rangePages';
import { ArrowRightIcon } from '../../icons';

const Panel = styled.article`
  background: ${({ theme }) => theme.range.soft};
  color: ${({ theme }) => theme.range.deep};
  border-radius: ${({ theme }) => theme.radius.sm};
  overflow: hidden;
  display: flex;
  flex-direction: column;
  min-height: 560px;

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    min-height: 78svh;
  }
`;

const Media = styled.div`
  position: relative;
  overflow: hidden;
  background: ${({ theme }) => theme.range.soft};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  padding: 2rem 2rem 1.5rem;
  display: flex;
  justify-content: center;
`;

const MediaImage = styled(ResponsiveImage)`
  height: 12rem;
  width: auto;
  max-width: 100%;
  object-fit: contain;
  transition: transform ${({ theme }) => theme.motion.css.base}
    ${({ theme }) => theme.motion.cssEasings.standard};

  ${Panel}:hover &,
  ${Panel}:focus-within & {
    transform: scale(1.04);
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;

    ${Panel}:hover &,
    ${Panel}:focus-within & {
      transform: none;
    }
  }
`;

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background: ${({ theme }) => withAlpha(theme.range.deep, 0.16)};
  transition: background-color ${({ theme }) => theme.motion.css.base}
    ${({ theme }) => theme.motion.cssEasings.standard};
  pointer-events: none;

  ${Panel}:hover &, ${Panel}:focus-within & {
    background: ${({ theme }) => withAlpha(theme.range.deep, 0.06)};
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 2rem;
  flex: 1;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 2.5rem;
  }
`;

const IndexRow = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 1rem;
`;

const IndexNumber = styled.span`
  font-family: ${({ theme }) => theme.fonts.display};
  font-style: italic;
  font-size: 1rem;
  color: ${({ theme }) => theme.range.deep};
  letter-spacing: 0.08em;
`;

const EyebrowText = styled.p`
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
`;

const Headline = styled.h3`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(1.75rem, 2.5vw, 2.5rem);
  line-height: 1.1;
  letter-spacing: -0.01em;
  text-wrap: balance;
`;

const Support = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  max-width: 44ch;
`;

const SkinType = styled.p`
  font-size: 0.8125rem;
  font-weight: 600;
  letter-spacing: 0.08em;
`;

const Button = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  min-height: 2.75rem;
  margin-top: auto;
  padding: 0.75rem 1.5rem;
  font-size: 0.875rem;
  font-weight: 600;
  text-decoration: none;
  border-radius: ${({ theme }) => theme.radius.sm};
  background: ${({ theme }) => theme.range.deep};
  color: ${({ theme }) => theme.colors.textInverse};

  &:hover {
    transform: translateY(-1px);
  }

  &:focus-visible {
    outline-color: ${({ theme }) => theme.range.deep};
  }

  @media (prefers-reduced-motion: reduce) {
    &:hover {
      transform: none;
    }
  }
`;

/**
 * RangePanel: one half of the solutions split. Background and text come from
 * the range theme (soft/deep); only the button is a link.
 */
export function RangePanel({
  rangeId,
  eyebrow,
  headline,
  support,
  skinType,
  href,
  imageKey,
  index,
}: {
  /** Range theme to apply. */
  rangeId: RangeId;
  /** Small label above the headline. */
  eyebrow: string;
  /** Panel headline. */
  headline: string;
  /** Supporting copy. */
  support: string;
  /** Skin type line from the existing skinNeeds data. */
  skinType: string;
  /** Range page href. Only the button links. */
  href: string;
  /** Real project photo for the panel (repo-relative asset key). */
  imageKey: string;
  /** Decorative panel number, e.g. "01". */
  index: string;
}) {
  const meta = imageMeta(imageKey);
  // Registry-mapped keys, so this branch never executes in practice.
  if (meta === null) return null;

  return (
    <RangeTheme id={rangeId}>
      <Panel>
        <Media>
          <MediaImage
            image={meta}
            alt=""
            sizes="(min-width: 1024px) 480px, 90vw"
          />
          <Overlay aria-hidden="true" />
        </Media>
        <Body>
          <IndexRow>
            <EyebrowText>{eyebrow}</EyebrowText>
            <IndexNumber aria-hidden="true">{index}</IndexNumber>
          </IndexRow>
          <Headline>{headline}</Headline>
          <Support>{support}</Support>
          <SkinType>{skinType}</SkinType>
          <Button to={href}>
            {rangeId === 'plump' ? labels.explorePlump : labels.exploreClear}
            <ArrowRightIcon size={15} />
          </Button>
        </Body>
      </Panel>
    </RangeTheme>
  );
}
