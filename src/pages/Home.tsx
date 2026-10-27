import { Hero } from '../sections/Hero';
import { BrandPromise } from '../sections/BrandPromise';
import { Expertise } from '../sections/Expertise';
import { GentlePerformance } from '../sections/GentlePerformance';
import { SkinSolutions } from '../sections/SkinSolutions';
import { Featured } from '../sections/Featured';
import { Closing } from '../sections/Closing';

export function Home() {
  return (
    <main id="main-content">
      <Hero />
      <BrandPromise />
      <Expertise />
      <GentlePerformance />
      <SkinSolutions />
      <Featured />
      <Closing />
    </main>
  );
}
