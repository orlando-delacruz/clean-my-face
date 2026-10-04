import { ThemeProvider } from 'styled-components';
import { theme } from './theme';
import { GlobalStyle } from './GlobalStyle';
import { usePathname } from './router';
import { SkipLink } from './components/primitives';
import { Header } from './sections/Header';
import { Footer } from './sections/Footer';
import { Home } from './pages/Home';
import { LegalPage } from './pages/LegalPage';
import { NotFound } from './pages/NotFound';
import { ProductPage } from './pages/ProductPage';
import { privacyPolicy, termsConditions } from './data/legal';
import { findProductBySlug } from './data/content';

function App() {
  const path = usePathname();
  const productMatch = path.startsWith('/products/')
    ? findProductBySlug(path.slice('/products/'.length))
    : null;

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <div id="top">
        <SkipLink href="#main-content">Skip to content</SkipLink>
        <Header />
        {path === '/' && <Home />}
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
          path !== privacyPolicy.slug &&
          path !== termsConditions.slug &&
          productMatch === null && <NotFound />}
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
