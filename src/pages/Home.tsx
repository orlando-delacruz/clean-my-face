import styled from 'styled-components';
import { theme } from '../theme';
import { ranges } from '../data/content';
import { Hero } from '../sections/Hero';
import { Philosophy } from '../sections/Philosophy';
import { SkinNeeds } from '../sections/SkinNeeds';
import { RangeSystem } from '../sections/RangeSystem';
import { Featured } from '../sections/Featured';
import { RoutineGuide } from '../sections/RoutineGuide';
import { Closing } from '../sections/Closing';

/**
 * Temporary anchor aliases for the global shell. The redesigned Expertise and
 * Solutions sections arrive in later phases; until then these zero-height
 * markers map the shell links onto the current homepage sections. Remove them
 * when the real section ids land.
 */
const Anchor = styled.span`
  display: block;
  height: 0;
  scroll-margin-top: 5rem;
`;

export function Home() {
  const plump = ranges.find((r) => r.id === 'plump');
  const clear = ranges.find((r) => r.id === 'clear');

  return (
    <main id="main-content">
      <Hero />
      <Anchor id="expertise" />
      <Philosophy />
      <Anchor id="solutions" />
      <SkinNeeds />
      {plump && <RangeSystem range={plump} tint={theme.colors.plumpTint} />}
      {clear && <RangeSystem range={clear} tint={theme.colors.clearTint} />}
      <Featured />
      <RoutineGuide />
      <Closing />
    </main>
  );
}
