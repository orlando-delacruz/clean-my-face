import styled from 'styled-components';
import type { RangeContent } from '../../../data/content';
import type { RangePageData } from '../../../data/rangePages';
import { imageMeta } from '../../../data/images';
import { Container, Eyebrow, Heading, MediaFrame, Reveal, Text } from '../../ui';
import { ResponsiveBackground } from '../../ui/ResponsiveBackground';
import { getRangeTheme } from '../../ui/RangeTheme';

const Backdrop = styled(ResponsiveBackground)`
  /* Slide under the sticky transparent header like the homepage hero. */
  margin-top: calc(-4rem - 1px);
  padding-block: calc(6rem + 4rem + 1px) 4.5rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    margin-top: calc(-4.5rem - 1px);
    padding-block: calc(7.5rem + 4.5rem + 1px) 6.5rem;
  }
`;

const Grid = styled.div`
  display: grid;
  gap: 2.5rem;
  align-items: center;

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
  }
`;

const Copy = styled.div`
  display: grid;
  gap: 1rem;
  max-width: 34rem;
  color: ${({ theme }) => theme.range.deep};
`;

const Meta = styled.p`
  font-size: 0.8125rem;
  font-weight: 600;
  letter-spacing: 0.08em;
`;

const Figure = styled(MediaFrame)`
  display: none;

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    display: block;
  }
`;

/**
 * RangeHero: full-bleed tinted hero for a range page. Copy comes from
 * rangePages.ts (eyebrow, headline, support) and the range data
 * (skin type, promise, system image). The header is transparent over this.
 */
export function RangeHero({
  page,
  range,
}: {
  /** Range page copy from src/data/rangePages.ts. */
  page: RangePageData;
  /** Range facts from src/data/content.ts. */
  range: RangeContent;
}) {
  const bgMeta = imageMeta(range.id === 'plump' ? 'bg-image-2.png' : 'bg-image-3.png');
  const systemMeta = imageMeta(range.systemImage);
  // Both keys are registry-mapped constants, so this branch never executes.
  if (bgMeta === null || systemMeta === null) return null;

  return (
    <Backdrop
      tag="section"
      image={bgMeta}
      tint={getRangeTheme(range.id).soft}
      size="cover"
      position="center"
      aria-labelledby="range-title"
    >
      <Container>
        <Reveal>
          <Grid>
            <Copy>
              <Eyebrow tone="range">{page.eyebrow}</Eyebrow>
              <Heading as="h1" size="display" id="range-title">
                {page.headline}
              </Heading>
              <Text variant="bodyLg" balance>
                {page.support}
              </Text>
              <Meta>
                {range.skinType} · {range.promise}
              </Meta>
            </Copy>
            <Figure ratio="4/3" radius="sm">
              <img
                src={systemMeta.src}
                alt={`The six-product ${range.name} system`}
                width={systemMeta.width}
                height={systemMeta.height}
                loading="eager"
                decoding="sync"
              />
            </Figure>
          </Grid>
        </Reveal>
      </Container>
    </Backdrop>
  );
}
