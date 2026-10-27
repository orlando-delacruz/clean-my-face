import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from 'styled-components';
import { theme } from '../src/theme';
import { CartProvider } from '../src/cart';
import App from '../src/App';
import { Header } from '../src/components/layout/Header';

describe('accessibility basics', () => {
  it('has a skip link targeting an existing landmark id', () => {
    window.history.replaceState({}, '', '/');
    const { container, unmount } = render(<App />);
    const skipLink = container.querySelector('a[href="#main-content"]');
    expect(skipLink).not.toBeNull();
    expect(document.getElementById('main-content')).not.toBeNull();
    unmount();
  });

  it('has a main landmark', () => {
    window.history.replaceState({}, '', '/');
    const { container, unmount } = render(<App />);
    expect(container.querySelector('main#main-content')).not.toBeNull();
    unmount();
  });

  it('opens and closes the mobile menu with Escape', async () => {
    const user = userEvent.setup();
    const { unmount } = render(
      <ThemeProvider theme={theme}>
        <CartProvider>
          <Header />
        </CartProvider>
      </ThemeProvider>,
    );
    const toggle = screen.getByRole('button', { name: /open menu/i });
    await user.click(toggle);
    expect(screen.getByRole('button', { name: /close menu/i })).toBeInTheDocument();
    await user.keyboard('{Escape}');
    expect(screen.getByRole('button', { name: /open menu/i })).toBeInTheDocument();
    unmount();
  });

  it('returns focus to the toggle after Escape', async () => {
    const user = userEvent.setup();
    const { unmount } = render(
      <ThemeProvider theme={theme}>
        <CartProvider>
          <Header />
        </CartProvider>
      </ThemeProvider>,
    );
    const toggle = screen.getByRole('button', { name: /open menu/i });
    await user.click(toggle);
    await user.keyboard('{Escape}');
    expect(toggle).toHaveFocus();
    unmount();
  });
});