import { Hero } from '../sections/Hero';
import { BrandPromise } from '../sections/BrandPromise';
import { Expertise } from '../sections/Expertise';
import { GentlePerformance } from '../sections/GentlePerformance';
import { SkinSolutions } from '../sections/SkinSolutions';
import { CuratedDiscovery } from '../sections/CuratedDiscovery';
import { Closing } from '../sections/Closing';
import { Contact } from '../sections/Contact';

export function Home() {
  return (
    <main id="main-content" tabIndex={-1}>
      <Hero />
      <BrandPromise />
      <Expertise />
      <GentlePerformance />
      <SkinSolutions />
      <CuratedDiscovery />
      <Closing />
      <Contact />
    </main>
  );
}
