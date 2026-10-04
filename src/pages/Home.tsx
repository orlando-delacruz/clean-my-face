import { theme } from '../theme';
import { ranges } from '../data/content';
import { Hero } from '../sections/Hero';
import { Philosophy } from '../sections/Philosophy';
import { SkinNeeds } from '../sections/SkinNeeds';
import { RangeSystem } from '../sections/RangeSystem';
import { Featured } from '../sections/Featured';
import { RoutineGuide } from '../sections/RoutineGuide';
import { Closing } from '../sections/Closing';

export function Home() {
  const plump = ranges.find((r) => r.id === 'plump');
  const clear = ranges.find((r) => r.id === 'clear');

  return (
    <main id="main-content">
      <Hero />
      <Philosophy />
      <SkinNeeds />
      {plump && <RangeSystem range={plump} tint={theme.colors.plumpTint} />}
      {clear && <RangeSystem range={clear} tint={theme.colors.clearTint} />}
      <Featured />
      <RoutineGuide />
      <Closing />
    </main>
  );
}
