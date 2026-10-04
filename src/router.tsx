import { useEffect, useState } from 'react';
import type { ComponentProps, MouseEvent as ReactMouseEvent, ReactNode } from 'react';

/**
 * Minimal history-based router. No dependency: the site has static routes
 * plus `/products/<slug>` detail pages. Vercel serves index.html for all
 * of them (see vercel.json). Supports `/#anchor` links from any page.
 */

function normalize(path: string): string {
  const trimmed = path.replace(/\/+$/, '');
  return trimmed === '' ? '/' : trimmed;
}

function readPath(): string {
  return normalize(window.location.pathname);
}

function scrollToHash(hash: string): void {
  document.getElementById(hash)?.scrollIntoView();
}

export function usePathname(): string {
  const [path, setPath] = useState(readPath);

  useEffect(() => {
    const onChange = () => setPath(readPath());
    window.addEventListener('popstate', onChange);
    return () => window.removeEventListener('popstate', onChange);
  }, []);

  return path;
}

export function navigate(to: string): void {
  const hashIndex = to.indexOf('#');
  const rawPath = hashIndex === -1 ? to : to.slice(0, hashIndex);
  const hash = hashIndex === -1 ? '' : to.slice(hashIndex + 1);
  const queryIndex = rawPath.indexOf('?');
  const cleanPath = queryIndex === -1 ? rawPath : rawPath.slice(0, queryIndex);
  const target = normalize(cleanPath === '' ? window.location.pathname : cleanPath);
  const currentPath = normalize(window.location.pathname);
  const currentHash = window.location.hash.replace('#', '');
  if (target === currentPath && (hash === '' || hash === currentHash)) {
    if (hash !== '') scrollToHash(hash);
    return;
  }
  const pageChanged = target !== currentPath;
  // Suppress the global `scroll-behavior: smooth` BEFORE the page swaps, so
  // no animated sweep can start from deep in the previous page. Same-page
  // anchor glides keep the smooth behavior.
  const root = document.documentElement;
  const previous = root.style.scrollBehavior;
  if (pageChanged) root.style.scrollBehavior = 'auto';
  window.history.pushState({}, '', target + (hash !== '' ? `#${hash}` : ''));
  window.dispatchEvent(new PopStateEvent('popstate'));
  // Double rAF: let the new page commit AND paint (attaching scroll
  // observers with correct pre-scroll geometry) before jumping. Jumping in
  // the first frame can leave IntersectionObservers with a stale
  // not-intersecting delivery that never updates, sticking reveals
  // invisible until the next manual scroll.
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      if (!pageChanged) {
        if (hash !== '') scrollToHash(hash);
        return;
      }
      window.scrollTo({ top: 0, left: 0 });
      if (hash === '') {
        requestAnimationFrame(() => {
          root.style.scrollBehavior = previous;
        });
        return;
      }
      // The new page may not have committed yet, so retry until the anchor
      // exists. Smooth stays suppressed throughout: cross-page landings are
      // always instant jumps, never sweeps.
      let attempts = 0;
      const tryHash = () => {
        if (document.getElementById(hash) !== null) {
          scrollToHash(hash);
          root.style.scrollBehavior = previous;
        } else if (attempts++ < 8) {
          requestAnimationFrame(tryHash);
        } else {
          root.style.scrollBehavior = previous;
        }
      };
      requestAnimationFrame(tryHash);
    });
  });
}

interface LinkProps extends Omit<ComponentProps<'a'>, 'href'> {
  to: string;
  children: ReactNode;
}

export function Link({ to, children, onClick, ...rest }: LinkProps) {
  function handleClick(event: ReactMouseEvent<HTMLAnchorElement>) {
    onClick?.(event);
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }
    event.preventDefault();
    navigate(to);
  }

  return (
    <a href={to} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
}
