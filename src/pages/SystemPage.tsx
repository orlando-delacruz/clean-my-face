import styled from 'styled-components';
import { useReducedMotion } from 'motion/react';
import { theme } from '../theme';
import {
  ButtonPrimary,
  ButtonSecondary,
  Chip,
  Container,
  Divider,
  Eyebrow,
  Heading,
  Lead,
  MediaFrame,
  Parallax,
  RangeTheme,
  Reveal,
  Section,
  SectionTitle,
  Text,
  TextAction,
  TextureSwatch,
} from '../components/ui';

/** Bundle marker: proves this dev-only page is eliminated from production. */
export const CMF_SYSTEM_PAGE_MARKER = 'CMF_SYSTEM_PAGE_MARKER';

function luminance(hex: string): number {
  const clean = hex.replace('#', '');
  const full =
    clean.length === 3
      ? clean
          .split('')
          .map((c) => c + c)
          .join('')
      : clean;
  const [r, g, b] = [
    parseInt(full.slice(0, 2), 16),
    parseInt(full.slice(2, 4), 16),
    parseInt(full.slice(4, 6), 16),
  ].map((v) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function ratio(a: string, b: string): string {
  const l1 = luminance(a);
  const l2 = luminance(b);
  const hi = Math.max(l1, l2);
  const lo = Math.min(l1, l2);
  return ((hi + 0.05) / (lo + 0.05)).toFixed(2);
}

const SwatchGrid = styled.div`
  display: grid;
  gap: 0.75rem;
  margin-top: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr));
`;

const Swatch = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.sm};
  overflow: hidden;
  background: ${({ theme }) => theme.colors.surface};
`;

const SwatchColor = styled.div<{ $color: string }>`
  height: 3.5rem;
  background: ${({ $color }) => $color};
`;

const SwatchMeta = styled.div`
  padding: 0.5rem 0.75rem;
  font-size: ${({ theme }) => theme.fontSizes.small};
`;

const Block = styled.section`
  margin-top: 2.5rem;
`;

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  align-items: center;
  margin-top: 1rem;
`;

const ScaleRow = styled.div`
  display: grid;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const ScaleItem = styled.div`
  display: grid;
  grid-template-columns: 10rem 1fr;
  gap: 1rem;
  align-items: center;
  font-size: ${({ theme }) => theme.fontSizes.small};
`;

const Bar = styled.div<{ $width: string }>`
  height: 1rem;
  width: ${({ $width }) => $width};
  max-width: 100%;
  background: ${({ theme }) => theme.colors.plumpTint};
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const DemoBox = styled.div`
  padding: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.sm};
  background: ${({ theme }) => theme.colors.surface};
`;

const CompareGrid = styled.div`
  display: grid;
  gap: 1rem;
  margin-top: 1rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr 1fr;
  }
`;

const StyledTable = styled.table`
  width: 100%;
  margin-top: 1rem;
  border-collapse: collapse;
  font-size: ${({ theme }) => theme.fontSizes.small};

  th,
  td {
    text-align: left;
    padding: 0.5rem 0.75rem;
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  }
`;

type ColorEntry = [string, string];

const colorGroups: Array<{ title: string; entries: ColorEntry[] }> = [
  {
    title: 'Base',
    entries: [
      ['background', theme.colors.background],
      ['surface', theme.colors.surface],
      ['text', theme.colors.text],
      ['muted', theme.colors.muted],
      ['border', theme.colors.border],
    ],
  },
  {
    title: 'Inverse',
    entries: [
      ['surfaceInverse', theme.colors.surfaceInverse],
      ['textInverse', theme.colors.textInverse],
      ['mutedInverse', theme.colors.mutedInverse],
      ['borderInverse', theme.colors.borderInverse],
      ['borderStrong', theme.colors.borderStrong],
    ],
  },
  {
    title: 'Range',
    entries: [
      ['accent', theme.colors.accent],
      ['accentContrast', theme.colors.accentContrast],
      ['plumpTint', theme.colors.plumpTint],
      ['plumpDeep', theme.colors.plumpDeep],
      ['plumpSoft', theme.colors.plumpSoft],
      ['clearTint', theme.colors.clearTint],
      ['clearDeep', theme.colors.clearDeep],
      ['clearSoft', theme.colors.clearSoft],
      ['gold', theme.colors.gold],
    ],
  },
  {
    title: 'Feedback',
    entries: [
      ['error', theme.colors.error],
      ['errorSurface', theme.colors.errorSurface],
      ['success', theme.colors.success],
      ['successSurface', theme.colors.successSurface],
      ['focus', theme.colors.focus],
      ['focusInverse', theme.colors.focusInverse],
    ],
  },
  {
    title: 'Overlays',
    entries: [
      ['scrimSoft', theme.colors.scrimSoft],
      ['scrimStrong', theme.colors.scrimStrong],
      ['surfaceWarm', theme.colors.surfaceWarm],
      ['inkDark', theme.colors.inkDark],
      ['cardDark', theme.colors.cardDark],
      ['heroScrim', theme.colors.heroScrim],
      ['rangeScrim', theme.colors.rangeScrim],
      ['black', theme.colors.black],
    ],
  },
];

const contrastPairs: Array<[string, string, string]> = [
  ['text / background', theme.colors.text, theme.colors.background],
  ['text / surface', theme.colors.text, theme.colors.surface],
  ['muted / background', theme.colors.muted, theme.colors.background],
  ['muted / surface', theme.colors.muted, theme.colors.surface],
  ['textInverse / surfaceInverse', theme.colors.textInverse, theme.colors.surfaceInverse],
  ['mutedInverse / surfaceInverse', theme.colors.mutedInverse, theme.colors.surfaceInverse],
  ['plumpDeep / plumpSoft', theme.colors.plumpDeep, theme.colors.plumpSoft],
  ['plumpDeep / plumpTint', theme.colors.plumpDeep, theme.colors.plumpTint],
  ['clearDeep / clearSoft', theme.colors.clearDeep, theme.colors.clearSoft],
  ['clearDeep / clearTint', theme.colors.clearDeep, theme.colors.clearTint],
  ['error / errorSurface', theme.colors.error, theme.colors.errorSurface],
  ['success / successSurface', theme.colors.success, theme.colors.successSurface],
  ['focus / background', theme.colors.focus, theme.colors.background],
  ['focusInverse / surfaceInverse', theme.colors.focusInverse, theme.colors.surfaceInverse],
];

const ratios = ['1/1', '4/5', '3/4', '16/9', '21/9', 'auto'] as const;

function SampleCard() {
  return (
    <DemoBox>
      <Eyebrow tone="range">Range sample</Eyebrow>
      <Heading as="h3" size="h3">
        Same card, both ranges
      </Heading>
      <Text tone="muted">Range theming flows through the theme.</Text>
      <Row>
        <Chip variant="plump">Plump</Chip>
        <Chip variant="clear">Clear</Chip>
      </Row>
    </DemoBox>
  );
}

export default function SystemPage() {
  const reduceMotion = useReducedMotion();
  return (
    <main id="main-content" tabIndex={-1} data-marker={CMF_SYSTEM_PAGE_MARKER}>
      <Section>
        <Container>
          <Eyebrow>Design system</Eyebrow>
          <Heading as="h1" size="display">
            Brand system foundations
          </Heading>
          <Lead>
            Tokens, primitives, and motion in one place for later phases.
          </Lead>

          <Block aria-label="Colors">
            <Heading as="h2" size="h2">
              Colors
            </Heading>
            {colorGroups.map((group) => (
              <div key={group.title}>
                <Heading as="h3" size="title">
                  {group.title}
                </Heading>
                <SwatchGrid>
                  {group.entries.map(([name, value]) => (
                    <Swatch key={name}>
                      <SwatchColor $color={value} />
                      <SwatchMeta>
                        {name}
                        <br />
                        {value}
                      </SwatchMeta>
                    </Swatch>
                  ))}
                </SwatchGrid>
              </div>
            ))}
          </Block>

          <Block aria-label="Contrast">
            <Heading as="h2" size="h2">
              Contrast
            </Heading>
            <StyledTable>
              <thead>
                <tr>
                  <th>Pair</th>
                  <th>Foreground</th>
                  <th>Background</th>
                  <th>Ratio</th>
                </tr>
              </thead>
              <tbody>
                {contrastPairs.map(([name, fg, bg]) => (
                  <tr key={name}>
                    <td>{name}</td>
                    <td>{fg}</td>
                    <td>{bg}</td>
                    <td>{ratio(fg, bg)}</td>
                  </tr>
                ))}
              </tbody>
            </StyledTable>
          </Block>

          <Block aria-label="Typography">
            <Heading as="h2" size="h2">
              Typography
            </Heading>
            <Heading as="h3" size="display">
              Display specimen
            </Heading>
            <Heading as="h3" size="h1">
              Heading one specimen
            </Heading>
            <Heading as="h3" size="h2">
              Heading two specimen
            </Heading>
            <Heading as="h3" size="h3">
              Heading three specimen
            </Heading>
            <Heading as="h3" size="title">
              Title specimen
            </Heading>
            <Text variant="bodyLg">Body large in the body typeface.</Text>
            <Text variant="body">Body in the body typeface.</Text>
            <Text variant="small">Small in the body typeface.</Text>
            <Text variant="caption">Caption in the body typeface.</Text>
            <Text tone="muted">Muted tone sample.</Text>
            <Text tone="inverse">Inverse tone sample.</Text>
          </Block>

          <Block aria-label="Scale">
            <Heading as="h2" size="h2">
              Spacing, radius, shadow, z-index
            </Heading>
            <ScaleRow>
              {(
                [
                  ['xs', theme.spacing.xs],
                  ['sm', theme.spacing.sm],
                  ['md', theme.spacing.md],
                  ['lg', theme.spacing.lg],
                  ['xl', theme.spacing.xl],
                ] as Array<[string, string]>
              ).map(([name, value]) => (
                <ScaleItem key={name}>
                  <span>
                    {name} {value}
                  </span>
                  <Bar $width={value} />
                </ScaleItem>
              ))}
            </ScaleRow>
            <Row>
              <Chip>Radius sm {theme.radius.sm}</Chip>
              <Chip>Radius md {theme.radius.md}</Chip>
              <Chip>Radius lg {theme.radius.lg}</Chip>
              <Chip>Radius pill {theme.radius.pill}</Chip>
            </Row>
            <Text variant="small">zIndex base {theme.zIndex.base}</Text>
            <Text variant="small">zIndex raised {theme.zIndex.raised}</Text>
            <Text variant="small">zIndex sticky {theme.zIndex.sticky}</Text>
            <Text variant="small">zIndex overlay {theme.zIndex.overlay}</Text>
            <Text variant="small">zIndex modal {theme.zIndex.modal}</Text>
            <Text variant="small">zIndex skip {theme.zIndex.skip}</Text>
          </Block>

          <Block aria-label="Motion">
            <Heading as="h2" size="h2">
              Motion
            </Heading>
            <Text variant="small">
              Reduced motion: {reduceMotion ? 'on' : 'off'}
            </Text>
            <Reveal>
              <DemoBox>Reveal demo content</DemoBox>
            </Reveal>
            <Parallax>
              <DemoBox>Parallax demo content</DemoBox>
            </Parallax>
          </Block>

          <Block aria-label="Primitives">
            <Heading as="h2" size="h2">
              Primitives
            </Heading>
            <Row>
              <Chip variant="neutral">Neutral</Chip>
              <Chip variant="plump">Plump</Chip>
              <Chip variant="clear">Clear</Chip>
              <Chip variant="inverse">Inverse</Chip>
              <Chip variant="neutral" onClick={() => undefined}>
                Interactive
              </Chip>
            </Row>
            <Row>
              <Divider variant="line" />
            </Row>
            <Row>
              <Divider variant="short" />
              <Divider variant="dot" />
            </Row>
            <Row>
              <TextureSwatch color={theme.colors.plumpTint} label="Milky texture" />
              <TextureSwatch color={theme.colors.clearTint} label="Gel texture" />
              <TextureSwatch color={theme.colors.gold} label="Gold detail" />
            </Row>
            <Row>
              <ButtonPrimary href="#main-content">Primary</ButtonPrimary>
              <ButtonSecondary href="#main-content">Secondary</ButtonSecondary>
              <TextAction href="#main-content">Text action</TextAction>
            </Row>
          </Block>

          <Block aria-label="Media">
            <Heading as="h2" size="h2">
              Media frames
            </Heading>
            {ratios.map((r) => (
              <MediaFrame
                key={r}
                ratio={r}
                standIn
                caption={`Ratio ${r}`}
              >
                <img
                  src={`https://picsum.photos/seed/cmf-${r.replace('/', 'x')}/800/600`}
                  alt=""
                  loading="lazy"
                  decoding="async"
                />
              </MediaFrame>
            ))}
          </Block>

          <Block aria-label="Range themes">
            <Heading as="h2" size="h2">
              Range themes
            </Heading>
            <CompareGrid>
              <RangeTheme id="plump">
                <SampleCard />
              </RangeTheme>
              <RangeTheme id="clear">
                <SampleCard />
              </RangeTheme>
            </CompareGrid>
          </Block>

          <Block aria-label="Type reference">
            <SectionTitle>Section title reference</SectionTitle>
          </Block>
        </Container>
      </Section>
    </main>
  );
}
