import { Suspense, lazy } from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from './theme';
import { GlobalStyle } from './GlobalStyle';
import { usePathname, useRouteFocus } from './router';
import { SkipLink } from './components/ui';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { Home } from './pages/Home';
import { LegalPage } from './pages/LegalPage';
import { NotFound } from './pages/NotFound';
import { ProductPage } from './pages/ProductPage';
import { RangePage } from './pages/RangePage';
import { privacyPolicy, termsConditions } from './data/legal';
import { findProductBySlug, ranges } from './data/content';
import { findRangePageBySlug } from './data/rangePages';

const SystemPage = import.meta.env.DEV
  ? lazy(() => import('./pages/SystemPage'))
  : null;

function App() {
  const path = usePathname();
  useRouteFocus();
  const productMatch = path.startsWith('/products/')
    ? findProductBySlug(path.slice('/products/'.length))
    : null;
  const rangeSlug = path.startsWith('/ranges/')
    ? path.slice('/ranges/'.length)
    : '';
  const rangePageMatch =
    rangeSlug === '' ? null : findRangePageBySlug(rangeSlug);
  const range =
    rangePageMatch === null
      ? undefined
      : ranges.find((item) => item.id === rangePageMatch.id);
  const hasRangePage = rangePageMatch !== null && range !== undefined;
  const showSystem =
    path === '/_system' && import.meta.env.DEV && SystemPage !== null;

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <div id="top">
        <SkipLink href="#main-content">Skip to content</SkipLink>
        <Header />
        {path === '/' && <Home />}
        {showSystem && SystemPage !== null && (
          <Suspense fallback={null}>
            <SystemPage />
          </Suspense>
        )}
        {path === privacyPolicy.slug && <LegalPage doc={privacyPolicy} />}
        {path === termsConditions.slug && <LegalPage doc={termsConditions} />}
        {productMatch !== null && (
          <ProductPage
            key={productMatch.product.slug}
            range={productMatch.range}
            product={productMatch.product}
          />
        )}
        {rangePageMatch !== null && range !== undefined && (
          <RangePage
            key={rangePageMatch.id}
            page={rangePageMatch.page}
            range={range}
          />
        )}
        {path !== '/' &&
          !showSystem &&
          path !== privacyPolicy.slug &&
          path !== termsConditions.slug &&
          productMatch === null &&
          !hasRangePage && <NotFound />}
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
