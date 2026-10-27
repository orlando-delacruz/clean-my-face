import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { findProductBySlug } from '../data/content';
import { img } from '../data/images';
import { Link, usePathname } from '../router';
import { CloseIcon } from '../components/icons';
import { up } from '../styles/media';
import { useCart } from './CartContext';

/**
 * Prototype cart drawer. Reads the shared in-memory cart, resolves display
 * metadata from existing product data, and stops at a checkout-unavailable
 * notice: no prices, totals, or payment controls.
 */
const Scrim = styled.div`
  position: fixed;
  inset: 0;
  z-index: ${({ theme }) => theme.zIndex.modal};
  background: ${({ theme }) => theme.colors.scrimStrong};
`;

const Panel = styled.aside`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: ${({ theme }) => theme.zIndex.modal};
  display: flex;
  flex-direction: column;
  width: 100%;
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  box-shadow: ${({ theme }) => theme.shadows.lifted};

  ${up('md')} {
    width: 26.25rem;
    border-left: 1px solid ${({ theme }) => theme.colors.border};
  }
`;

const Head = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1rem 1rem 1rem 1.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const Title = styled.h2`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 1.5rem;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  letter-spacing: -0.01em;
`;

const CloseBtn = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 2.75rem;
  min-height: 2.75rem;
  background: transparent;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.pill};
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;

  &:hover {
    border-color: ${({ theme }) => theme.colors.text};
  }

  &:focus-visible {
    outline-color: ${({ theme }) => theme.colors.focus};
  }
`;

const Status = styled.p`
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
`;

const Body = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1.5rem;
`;

const EmptyText = styled.p`
  font-size: 1.0625rem;
  color: ${({ theme }) => theme.colors.muted};
  margin-bottom: 1.5rem;
`;

const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 1.5rem;
`;

const Row = styled.li`
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }
`;

const Thumb = styled.img`
  width: 4.5rem;
  height: 4.5rem;
  flex: none;
  border-radius: ${({ theme }) => theme.radius.sm};
  object-fit: cover;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.background};
`;

const Info = styled.div`
  display: grid;
  gap: 0.25rem;
  min-width: 0;
  flex: 1;
`;

const Name = styled(Link)`
  font-weight: 600;
  font-size: 1rem;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
    text-underline-offset: 0.2em;
  }

  &:focus-visible {
    outline-color: ${({ theme }) => theme.colors.focus};
  }
`;

const MetaText = styled.p`
  font-size: 0.8125rem;
  color: ${({ theme }) => theme.colors.muted};
`;

const Controls = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  margin-top: 0.5rem;
  flex-wrap: wrap;
`;

const Stepper = styled.div`
  display: inline-flex;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.sm};
`;

const StepBtn = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 2.75rem;
  min-height: 2.75rem;
  font-size: 1.125rem;
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  border-radius: ${({ theme }) => theme.radius.sm};

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.background};
  }

  &:focus-visible {
    outline-color: ${({ theme }) => theme.colors.focus};
    outline-offset: -1px;
  }

  &:disabled {
    opacity: 0.4;
    cursor: default;
  }
`;

const Qty = styled.span`
  min-width: 2ch;
  text-align: center;
  font-weight: 600;
  font-size: 0.9375rem;
`;

const RemoveBtn = styled.button`
  min-height: 2.75rem;
  padding-inline: 0.25rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.muted};
  background: transparent;
  border: none;
  cursor: pointer;
  text-decoration: underline;
  text-underline-offset: 0.2em;

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }

  &:focus-visible {
    outline-color: ${({ theme }) => theme.colors.focus};
  }
`;

const Foot = styled.div`
  display: grid;
  gap: 1rem;
  padding: 1.5rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

const Notice = styled.p`
  font-size: 0.875rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.muted};
`;

const ContinueBtn = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 3rem;
  padding: 0.75rem 1.75rem;
  font-size: 0.9375rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  background: transparent;
  border: 1px solid ${({ theme }) => theme.colors.text};
  border-radius: ${({ theme }) => theme.radius.sm};
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors.background};
  }

  &:focus-visible {
    outline-color: ${({ theme }) => theme.colors.focus};
  }
`;

export function CartDrawer() {
  const { items, count, isOpen, setQty, removeItem, closeCart } = useCart();
  const path = usePathname();
  const panelRef = useRef<HTMLElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);

  // Never linger over a new page when the visitor navigates.
  useEffect(() => {
    closeCart();
  }, [path, closeCart]);

  useEffect(() => {
    if (!isOpen) return;
    openerRef.current =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;
    panelRef.current?.querySelector<HTMLElement>('button')?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        event.preventDefault();
        closeCart();
        return;
      }
      if (event.key !== 'Tab') return;
      const panel = panelRef.current;
      if (panel === null) return;
      const focusable = Array.from(
        panel.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'),
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (first === undefined || last === undefined) return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
    window.addEventListener('keydown', onKeyDown);
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previous;
      openerRef.current?.focus();
    };
  }, [isOpen, closeCart]);

  if (!isOpen) return null;

  const lines = Object.entries(items).flatMap(([slug, qty]) => {
    const found = findProductBySlug(slug);
    return found === null ? [] : [{ ...found, qty }];
  });

  return (
    <>
      <Scrim onClick={closeCart} aria-hidden="true" />
      <Panel ref={panelRef} role="dialog" aria-modal="true" aria-labelledby="cart-title">
        <Head>
          <Title id="cart-title">Your bag</Title>
          <CloseBtn type="button" onClick={closeCart} aria-label="Close bag">
            <CloseIcon />
          </CloseBtn>
        </Head>
        <Status role="status">
          {count} {count === 1 ? 'item' : 'items'} in your bag
        </Status>
        {lines.length === 0 ? (
          <Body>
            <EmptyText>Your bag is empty.</EmptyText>
            <ContinueBtn type="button" onClick={closeCart}>
              Continue shopping
            </ContinueBtn>
          </Body>
        ) : (
          <>
            <Body>
              <List>
                {lines.map(({ range, product, qty }) => {
                  const src = img(product.image);
                  return (
                    <Row key={product.slug}>
                      {src !== '' && (
                        <Thumb src={src} alt="" loading="lazy" decoding="async" />
                      )}
                      <Info>
                        <Name to={`/products/${product.slug}`} onClick={closeCart}>
                          {product.name}
                        </Name>
                        <MetaText>
                          {range.name} · Step {product.step} · {product.role}
                        </MetaText>
                        <Controls>
                          <Stepper
                            role="group"
                            aria-label={`Quantity for ${product.name}`}
                          >
                            <StepBtn
                              type="button"
                              onClick={() => setQty(product.slug, qty - 1)}
                              disabled={qty <= 1}
                              aria-label={`Decrease quantity for ${product.name}`}
                            >
                              −
                            </StepBtn>
                            <Qty aria-hidden="true">{qty}</Qty>
                            <StepBtn
                              type="button"
                              onClick={() => setQty(product.slug, qty + 1)}
                              aria-label={`Increase quantity for ${product.name}`}
                            >
                              +
                            </StepBtn>
                          </Stepper>
                          <RemoveBtn
                            type="button"
                            onClick={() => removeItem(product.slug)}
                            aria-label={`Remove ${product.name} from bag`}
                          >
                            Remove
                          </RemoveBtn>
                        </Controls>
                      </Info>
                    </Row>
                  );
                })}
              </List>
            </Body>
            <Foot>
              <Notice>Checkout is not available in this prototype.</Notice>
              <ContinueBtn type="button" onClick={closeCart}>
                Continue shopping
              </ContinueBtn>
            </Foot>
          </>
        )}
      </Panel>
    </>
  );
}
