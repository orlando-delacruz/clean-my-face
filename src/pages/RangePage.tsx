import type { RangeContent } from '../data/content';
import { routineGuide } from '../data/content';
import type { RangePageData } from '../data/rangePages';
import { RangeTheme } from '../components/ui/RangeTheme';
import { RangeHero } from '../components/ranges/RangeHero';
import { SystemSteps } from '../components/ranges/SystemSteps';
import { RoutineGuideTabs } from '../components/ranges/RoutineGuideTabs';
import { RangeCrossover } from '../components/ranges/RangeCrossover';

/**
 * Full range page (Phase 8): hero, system steps, routine tabs, crossover.
 * Wrapped in the range's RangeTheme; the footer is rendered by App.
 */
export function RangePage({
  page,
  range,
}: {
  /** Range page copy from src/data/rangePages.ts. */
  page: RangePageData;
  /** Range facts from src/data/content.ts. */
  range: RangeContent;
}) {
  const routine = routineGuide.routines.find((r) => r.rangeId === range.id);
  // Registry data guarantees a routine per range; this never executes.
  if (routine === undefined) {
    throw new Error(`RangePage: no routine for range "${range.id}".`);
  }

  return (
    <RangeTheme id={range.id}>
      <main id="main-content">
        <RangeHero page={page} range={range} />
        <SystemSteps range={range} />
        <RoutineGuideTabs routine={routine} />
        <RangeCrossover currentId={range.id} />
      </main>
    </RangeTheme>
  );
}
