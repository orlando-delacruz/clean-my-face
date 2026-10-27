import { useCallback, useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { brand, headerCta, navItems } from '../../../data/site';
import { findRangePageBySlug } from '../../../data/rangePages';
import { Link, usePathname } from '../../../router';
import { Container } from '../../ui';
import { ArrowRightIcon, CloseIcon, MenuIcon } from '../../icons';

const isRangeHref = (href: string): boolean => href.startsWith('/ranges/');
const primaryNav = navItems.filter((item) => !isRangeHref(item.href));
const rangeNav = navItems.filter((item) => isRangeHref(item.href));

function hashOf(href: string): string {
  const index = href.indexOf('#');
  return index === -1 ? '' : href.slice(index + 1);
}

const Bar = styled.header<{ $transparent: boolean; $scrolled: boolean }>`
  position: sticky;
  top: 0;
  z-index: ${({ theme }) => theme.zIndex.modal};
  color: ${({ theme, $transparent }) =>
    $transparent ? theme.colors.textInverse : theme.colors.text};
  background: ${({ theme, $transparent }) =>
    $transparent ? 'transparent' : theme.colors.background};
  border-bottom: 1px solid
    ${({ theme, $transparent }) =>
      $transparent ? 'transparent' : theme.colors.border};
  transition: background-color 280ms cubic-bezier(0.22, 1, 0.36, 1),
    border-color 280ms cubic-bezier(0.22, 1, 0.36, 1),
    color 220ms cubic-bezier(0.22, 1, 0.36, 1);

  ${({ theme, $scrolled, $transparent }) =>
    $scrolled &&
    !$transparent &&
    css`
      box-shadow: 0 1px 0 ${theme.colors.border},
        0 18px 36px -24px ${theme.colors.text28};
    `}
`;

const Inner = styled(Container)`
  position: relative;
  z-index: ${({ theme }) => theme.zIndex.raised};
  display: flex;
  align-items: center;
  gap: 1.5rem;
  min-height: 4rem;
  padding-block: 0.625rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    min-height: 4.5rem;
    gap: 2rem;
  }
`;

const Brand = styled(Link)<{ $onDark: boolean }>`
  text-decoration: none;
  line-height: 1.15;
  margin-right: auto;
  padding-block: 0.25rem;
  border-radius: ${({ theme }) => theme.radius.sm};

  &:focus-visible {
    outline-color: ${({ theme, $onDark }) =>
      $onDark ? theme.colors.focusInverse : theme.colors.focus};
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    margin-right: 0;
  }
`;

const BrandName = styled.span`
  display: block;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 1.3rem;
  font-weight: 600;
  letter-spacing: -0.01em;
  line-height: 1.05;
`;

const BrandSub = styled.span<{ $onDark: boolean }>`
  display: block;
  margin-top: 0.2rem;
  font-size: 0.625rem;
  font-weight: 600;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: ${({ theme, $onDark }) =>
    $onDark ? theme.colors.textInverse72 : theme.colors.muted};
  transition: color 220ms cubic-bezier(0.22, 1, 0.36, 1);
`;

const Nav = styled.nav`
  display: none;
  align-items: center;
  gap: 2rem;
  margin-inline: auto;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    display: flex;
  }
`;

const NavLink = styled(Link)<{ $active: boolean; $onDark: boolean }>`
  position: relative;
  display: inline-flex;
  align-items: center;
  min-height: 2.75rem;
  padding-block: 0;
  font-size: 0.775rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  text-decoration: none;
  text-underline-offset: 0.3em;
  color: ${({ theme, $onDark }) =>
    $onDark ? theme.colors.surface : theme.colors.text};
  transition: color 220ms cubic-bezier(0.22, 1, 0.36, 1);

  &::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0.2rem;
    height: 1px;
    background: currentColor;
    transform: scaleX(${({ $active }) => ($active ? 1 : 0)});
    transform-origin: left center;
    transition: transform 320ms cubic-bezier(0.22, 1, 0.36, 1);
  }

  &:hover {
    color: ${({ theme, $onDark }) =>
      $onDark ? theme.colors.surface : theme.colors.plumpDeep};
  }

  &:hover::after,
  &:focus-visible::after {
    transform: scaleX(1);
  }

  &:focus-visible {
    outline-color: ${({ theme, $onDark }) =>
      $onDark ? theme.colors.focusInverse : theme.colors.focus};
  }
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-left: auto;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    margin-left: 0;
  }
`;

const HeaderCta = styled(Link)<{ $onDark: boolean }>`
  display: none;
  align-items: center;
  gap: 0.55rem;
  min-height: 2.75rem;
  padding: 0.65rem 1.2rem;
  font-size: 0.775rem;
  font-weight: 700;
  letter-spacing: 0.11em;
  text-transform: uppercase;
  text-decoration: none;
  white-space: nowrap;
  border: 1px solid transparent;
  border-radius: ${({ theme }) => theme.radius.pill};
  background: ${({ theme, $onDark }) =>
    $onDark ? theme.colors.surface : theme.colors.plumpDeep};
  color: ${({ theme, $onDark }) =>
    $onDark ? theme.colors.text : theme.colors.surface};
  transition: background-color 220ms cubic-bezier(0.22, 1, 0.36, 1),
    color 220ms cubic-bezier(0.22, 1, 0.36, 1),
    transform 220ms cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 220ms cubic-bezier(0.22, 1, 0.36, 1);

  svg {
    flex: none;
  }

  &:hover {
    background: ${({ theme, $onDark }) =>
      $onDark
        ? theme.colors.surfaceWarm
        : `color-mix(in srgb, ${theme.colors.plumpDeep} 82%, ${theme.colors.text})`};
    transform: translateY(-1px);
    box-shadow: ${({ theme, $onDark }) =>
      $onDark
        ? `0 12px 32px ${theme.colors.black35}`
        : `0 14px 26px -18px ${theme.colors.text50}`};
  }

  &:active {
    transform: none;
    box-shadow: none;
  }

  &:focus-visible {
    outline-color: ${({ theme, $onDark }) =>
      $onDark ? theme.colors.focusInverse : theme.colors.focus};
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    display: inline-flex;
  }
`;

const MenuButton = styled.button<{ $onDark: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 2.75rem;
  min-height: 2.75rem;
  padding-inline: 0.6rem;
  background: ${({ theme, $onDark }) =>
    $onDark ? 'transparent' : theme.colors.surface};
  border: 1px solid
    ${({ theme, $onDark }) =>
      $onDark ? theme.colors.textInverse40 : theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.sm};
  cursor: pointer;
  color: ${({ theme, $onDark }) =>
    $onDark ? theme.colors.surface : theme.colors.text};
  transition: border-color 200ms cubic-bezier(0.22, 1, 0.36, 1),
    background-color 200ms cubic-bezier(0.22, 1, 0.36, 1),
    color 220ms cubic-bezier(0.22, 1, 0.36, 1);

  &:hover {
    border-color: ${({ theme, $onDark }) =>
      $onDark ? theme.colors.surface : theme.colors.text};
  }

  &:focus-visible {
    outline-color: ${({ theme, $onDark }) =>
      $onDark ? theme.colors.focusInverse : theme.colors.focus};
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`;

const MobilePanel = styled.nav`
  position: fixed;
  inset: 0;
  z-index: ${({ theme }) => theme.zIndex.base};
  display: flex;
  flex-direction: column;
  padding: 5.25rem 1.25rem 2rem;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  overflow-y: auto;
  overscroll-behavior: contain;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`;

const MobileList = styled.div`
  display: flex;
  flex-direction: column;
`;

const MobileLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  min-height: 3.75rem;
  padding-block: 0.75rem;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(2rem, 9vw, 3rem);
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  line-height: 1.05;
  text-decoration: none;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  animation: mobile-rise 480ms cubic-bezier(0.22, 1, 0.36, 1) both;

  svg {
    flex: none;
    color: ${({ theme }) => theme.colors.muted};
  }

  &:hover {
    color: ${({ theme }) => theme.colors.plumpDeep};
    text-decoration: underline;
    text-underline-offset: 0.2em;
  }

  &:hover svg {
    color: ${({ theme }) => theme.colors.plumpDeep};
  }

  &:focus-visible {
    outline-color: ${({ theme }) => theme.colors.focus};
  }

  @keyframes mobile-rise {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: none;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const MobileCta = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  width: 100%;
  min-height: 3.25rem;
  margin-top: 1.5rem;
  padding: 0.85rem 1.5rem;
  font-size: 0.9375rem;
  font-weight: 600;
  text-decoration: none;
  border-radius: ${({ theme }) => theme.radius.pill};
  background: ${({ theme }) => theme.colors.plumpDeep};
  color: ${({ theme }) => theme.colors.surface};

  &:hover {
    background: color-mix(
      in srgb,
      ${({ theme }) => theme.colors.plumpDeep} 82%,
      ${({ theme }) => theme.colors.text}
    );
  }

  &:focus-visible {
    outline-color: ${({ theme }) => theme.colors.focus};
  }
`;

const MobileRanges = styled.div`
  display: grid;
  gap: 0.625rem;
  margin-top: 2rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

const ShortcutLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  min-height: 3.25rem;
  padding: 0.75rem 1rem;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 1.375rem;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  text-decoration: none;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.sm};

  &:hover {
    border-color: ${({ theme }) => theme.colors.text};
  }

  &:focus-visible {
    outline-color: ${({ theme }) => theme.colors.focus};
  }
`;

export function Header() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hash, setHash] = useState(() =>
    typeof window === 'undefined' ? '' : window.location.hash.replace('#', ''),
  );
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLElement>(null);

  const rangeSlug = path.startsWith('/ranges/')
    ? path.slice('/ranges/'.length)
    : '';
  const onRangePage = findRangePageBySlug(rangeSlug) !== null;
  // Transparent over the homepage hero and range heroes; solid elsewhere and
  // once scrolled or when the mobile menu is open.
  const transparent = (path === '/' || onRangePage) && !scrolled && !open;

  const closeMenu = useCallback(() => {
    setOpen(false);
    toggleRef.current?.focus();
  }, []);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24);
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    function onHash() {
      setHash(window.location.hash.replace('#', ''));
    }
    window.addEventListener('hashchange', onHash);
    window.addEventListener('popstate', onHash);
    return () => {
      window.removeEventListener('hashchange', onHash);
      window.removeEventListener('popstate', onHash);
    };
  }, []);

  // Scroll-spy: highlight the nav link for the section currently in view.
  // Visual only: the URL hash is left untouched so scrolling never pollutes
  // history. Untracked sections keep the last active link instead of clearing.
  useEffect(() => {
    if (path !== '/') {
      setHash('');
      return;
    }
    const ids = navItems
      .map((link) => hashOf(link.href))
      .filter((id) => id !== '');
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setHash(entry.target.id);
        }
      },
      { rootMargin: '-40% 0px -55% 0px' },
    );
    for (const id of ids) {
      const section = document.getElementById(id);
      if (section !== null) observer.observe(section);
    }
    return () => observer.disconnect();
  }, [path]);

  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    panel?.querySelector<HTMLElement>('a[href]')?.focus();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        event.preventDefault();
        closeMenu();
        return;
      }
      if (event.key !== 'Tab') return;
      const panel = panelRef.current;
      const toggle = toggleRef.current;
      if (panel === null || toggle === null) return;
      const focusable = [
        toggle,
        ...Array.from(
          panel.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'),
        ),
      ];
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
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, closeMenu]);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  useEffect(() => {
    function onResize() {
      if (window.innerWidth >= 768 && panelRef.current !== null) setOpen(false);
    }
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <Bar $transparent={transparent} $scrolled={scrolled}>
      <Inner>
        <Brand to="/" aria-label="CleanMyFace home" $onDark={transparent}>
          <BrandName>{brand.name}</BrandName>
          <BrandSub $onDark={transparent}>{brand.sub}</BrandSub>
        </Brand>
        <Nav aria-label="Primary">
          {navItems.map((link) => {
            const target = hashOf(link.href);
            const active = target !== '' && target === hash;
            return (
              <NavLink
                key={link.href}
                to={link.href}
                $active={active}
                $onDark={transparent}
                aria-current={active ? 'location' : undefined}
              >
                {link.label}
              </NavLink>
            );
          })}
        </Nav>
        <Actions>
          <HeaderCta to={headerCta.href} $onDark={transparent}>
            {headerCta.label}
            <ArrowRightIcon size={15} />
          </HeaderCta>
          <MenuButton
            ref={toggleRef}
            type="button"
            $onDark={transparent}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </MenuButton>
        </Actions>
      </Inner>
      {open && (
        <MobilePanel id="mobile-menu" aria-label="Mobile" ref={panelRef}>
          <MobileList>
            {primaryNav.map((link, index) => (
              <MobileLink
                key={link.href}
                to={link.href}
                onClick={closeMenu}
                style={{ animationDelay: `${index * 55}ms` }}
              >
                {link.label}
                <ArrowRightIcon size={20} />
              </MobileLink>
            ))}
          </MobileList>
          <MobileCta to={headerCta.href} onClick={closeMenu}>
            {headerCta.label}
            <ArrowRightIcon size={16} />
          </MobileCta>
          <MobileRanges role="group" aria-label="Ranges">
            {rangeNav.map((link) => (
              <ShortcutLink key={link.href} to={link.href} onClick={closeMenu}>
                {link.label}
                <ArrowRightIcon size={16} />
              </ShortcutLink>
            ))}
          </MobileRanges>
        </MobilePanel>
      )}
    </Bar>
  );
}
