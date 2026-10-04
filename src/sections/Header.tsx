import { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { navigation } from '../data/content';
import { Link, usePathname } from '../router';
import { Container } from '../components/primitives';
import { ArrowRightIcon, CloseIcon, MenuIcon } from '../components/icons';

const Bar = styled.header<{ $scrolled: boolean; $open: boolean; $transparent: boolean }>`
  position: sticky;
  top: 0;
  z-index: 50;
  color: ${({ theme, $transparent }) =>
    $transparent ? theme.colors.surface : theme.colors.text};
  background: ${({ theme, $transparent, $scrolled, $open }) =>
    $transparent
      ? 'transparent'
      : `color-mix(in srgb, ${theme.colors.background} ${$scrolled || $open ? 96 : 86}%, transparent)`};
  backdrop-filter: ${({ $transparent }) =>
    $transparent ? 'none' : 'blur(14px) saturate(1.15)'};
  -webkit-backdrop-filter: ${({ $transparent }) =>
    $transparent ? 'none' : 'blur(14px) saturate(1.15)'};
  border-bottom: 1px solid
    ${({ theme, $transparent }) =>
      $transparent ? 'transparent' : theme.colors.border};
  transition: background-color 280ms cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 280ms cubic-bezier(0.22, 1, 0.36, 1),
    border-color 280ms cubic-bezier(0.22, 1, 0.36, 1),
    color 220ms cubic-bezier(0.22, 1, 0.36, 1);

  ${({ theme, $scrolled, $open, $transparent }) =>
    ($scrolled || $open) &&
    !$transparent &&
    css`
      box-shadow: 0 1px 0 ${theme.colors.border},
        0 18px 36px -24px rgba(33, 26, 19, 0.28);
    `}
`;

const Inner = styled(Container)`
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

const Brand = styled(Link)`
  text-decoration: none;
  line-height: 1.15;
  margin-right: auto;
  padding-block: 0.25rem;

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
    $onDark ? 'rgba(255, 253, 248, 0.72)' : theme.colors.muted};
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
  padding-block: 0.625rem;
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
  border-radius: 999px;
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
        ? '#ede4d3'
        : `color-mix(in srgb, ${theme.colors.plumpDeep} 82%, ${theme.colors.text})`};
    transform: translateY(-1px);
    box-shadow: ${({ $onDark }) =>
      $onDark
        ? '0 12px 32px rgba(0, 0, 0, 0.35)'
        : '0 14px 26px -18px rgba(33, 26, 19, 0.5)'};
  }

  &:active {
    transform: none;
    box-shadow: none;
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
      $onDark ? 'rgba(255, 253, 248, 0.4)' : theme.colors.border};
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

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`;

const MobilePanel = styled.nav`
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.background};
  padding: 0.75rem 1.25rem 1.5rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`;

const MobileLink = styled(Link)`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 1rem;
  padding: 1.05rem 0.15rem;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 1.45rem;
  font-weight: 500;
  letter-spacing: -0.01em;
  line-height: 1.2;
  text-decoration: none;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  animation: mobile-rise 480ms cubic-bezier(0.22, 1, 0.36, 1) both;

  svg {
    flex: none;
    align-self: center;
    color: ${({ theme }) => theme.colors.muted};
  }

  &:hover {
    color: ${({ theme }) => theme.colors.plumpDeep};
    text-decoration: underline;
    text-underline-offset: 0.25em;
  }

  &:hover svg {
    color: ${({ theme }) => theme.colors.plumpDeep};
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
  min-height: 3rem;
  margin-top: 1.25rem;
  padding: 0.8rem 1.5rem;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.11em;
  text-transform: uppercase;
  text-decoration: none;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.plumpDeep};
  color: ${({ theme }) => theme.colors.surface};

  &:hover {
    background: color-mix(
      in srgb,
      ${({ theme }) => theme.colors.plumpDeep} 82%,
      ${({ theme }) => theme.colors.text}
    );
  }
`;

function hashOf(href: string): string {
  const index = href.indexOf('#');
  return index === -1 ? '' : href.slice(index + 1);
}

export function Header() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hash, setHash] = useState(() =>
    typeof window === 'undefined' ? '' : window.location.hash.replace('#', ''),
  );
  // Transparent only over the homepage hero: solid everywhere else, and solid
  // on the homepage once scrolled or when the mobile menu is open.
  const transparent = path === '/' && !scrolled && !open;

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
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
  // history. Untacked sections (philosophy, ranges detail, featured) keep
  // the last active link instead of clearing it.
  useEffect(() => {
    if (path !== '/') {
      setHash('');
      return;
    }
    const ids = navigation.links
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
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpen(false);
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open ]);

  useEffect(() => {
    function onResize() {
      if (window.innerWidth >= 768) setOpen(false);
    }
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <Bar $scrolled={scrolled} $open={open} $transparent={transparent}>
      <Inner>
        <Brand to="/" aria-label="CleanMyFace home">
          <BrandName>{navigation.brandMark}</BrandName>
          <BrandSub $onDark={transparent}>{navigation.brandSub}</BrandSub>
        </Brand>
        <Nav aria-label="Primary">
          {navigation.links.map((link) => {
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
          <HeaderCta to={navigation.cta.href} $onDark={transparent}>
            {navigation.cta.label}
            <ArrowRightIcon size={15} />
          </HeaderCta>
          <MenuButton
            type="button"
            $onDark={transparent}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </MenuButton>
        </Actions>
      </Inner>
      {open && (
        <MobilePanel id="mobile-menu" aria-label="Mobile">
          {navigation.links.map((link, index) => (
            <MobileLink
              key={link.href}
              to={link.href}
              onClick={() => setOpen(false)}
              style={{ animationDelay: `${index * 55}ms` }}
            >
              {link.label}
              <ArrowRightIcon size={18} />
            </MobileLink>
          ))}
          <MobileCta to={navigation.cta.href} onClick={() => setOpen(false)}>
            {navigation.cta.label}
            <ArrowRightIcon size={16} />
          </MobileCta>
        </MobilePanel>
      )}
    </Bar>
  );
}
