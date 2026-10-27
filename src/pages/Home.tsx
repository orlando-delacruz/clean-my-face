import styled from 'styled-components';
import { theme } from '../theme';
import { ranges } from '../data/content';
import { Hero } from '../sections/Hero';
import { BrandPromise } from '../sections/BrandPromise';
import { Expertise } from '../sections/Expertise';
import { SkinNeeds } from '../sections/SkinNeeds';
import { RangeSystem } from '../sections/RangeSystem';
import { Featured } from '../sections/Featured';
import { RoutineGuide } from '../sections/RoutineGuide';
import { Closing } from '../sections/Closing';

/**
 * Temporary anchor alias for the global shell. The redesigned Solutions section
 * arrives in Phase 6; until then this zero-height marker maps the shell links
 * onto the current SkinNeeds section. Remove it when the real id lands.
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
      <BrandPromise />
      <Expertise />
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
