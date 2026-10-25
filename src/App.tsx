import { Suspense, lazy } from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from './theme';
import { GlobalStyle } from './GlobalStyle';
import { usePathname } from './router';
import { SkipLink } from './components/ui';
import { Header } from './sections/Header';
import { Footer } from './sections/Footer';
import { Home } from './pages/Home';
import { LegalPage } from './pages/LegalPage';
import { NotFound } from './pages/NotFound';
import { ProductPage } from './pages/ProductPage';
import { privacyPolicy, termsConditions } from './data/legal';
import { findProductBySlug } from './data/content';

const SystemPage = import.meta.env.DEV
  ? lazy(() => import('./pages/SystemPage'))
  : null;

function App() {
  const path = usePathname();
  const productMatch = path.startsWith('/products/')
    ? findProductBySlug(path.slice('/products/'.length))
    : null;
  const showSystem = path === '/_system' && import.meta.env.DEV && SystemPage !== null;

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
        {path !== '/' &&
          !showSystem &&
          path !== privacyPolicy.slug &&
          path !== termsConditions.slug &&
          productMatch === null && <NotFound />}
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
