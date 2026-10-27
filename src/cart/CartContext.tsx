import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import type { ReactNode } from 'react';

/**
 * In-memory cart store. No persistence, no prices, no checkout: the
 * prototype stops at the cart drawer (Phase 4). Product pages call
 * addItem; the drawer reads items and calls openCart/closeCart.
 */
export interface CartState {
  /** slug -> quantity. */
  items: Record<string, number>;
  count: number;
  isOpen: boolean;
  addItem: (slug: string, qty?: number) => void;
  setQty: (slug: string, qty: number) => void;
  removeItem: (slug: string) => void;
  openCart: () => void;
  closeCart: () => void;
}

const CartContext = createContext<CartState | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Record<string, number>>({});
  const [isOpen, setIsOpen] = useState(false);

  const addItem = useCallback((slug: string, qty = 1) => {
    const amount = Number.isFinite(qty) ? Math.max(1, Math.floor(qty)) : 1;
    setItems((prev) => ({ ...prev, [slug]: (prev[slug] ?? 0) + amount }));
  }, []);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const setQty = useCallback((slug: string, qty: number) => {
    if (!Number.isFinite(qty)) return;
    const amount = Math.max(1, Math.floor(qty));
    setItems((prev) => {
      if (prev[slug] === undefined || prev[slug] === amount) return prev;
      return { ...prev, [slug]: amount };
    });
  }, []);

  const removeItem = useCallback((slug: string) => {
    setItems((prev) => {
      if (prev[slug] === undefined) return prev;
      const next = { ...prev };
      delete next[slug];
      return next;
    });
  }, []);

  const count = useMemo(
    () => Object.values(items).reduce((sum, qty) => sum + qty, 0),
    [items],
  );

  const value = useMemo(
    () => ({ items, count, isOpen, addItem, setQty, removeItem, openCart, closeCart }),
    [items, count, isOpen, addItem, setQty, removeItem, openCart, closeCart],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartState {
  const cart = useContext(CartContext);
  if (cart === null) throw new Error('useCart must be used inside CartProvider.');
  return cart;
}
