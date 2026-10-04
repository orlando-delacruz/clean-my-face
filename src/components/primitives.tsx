import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import styled, { css } from 'styled-components';

/**
 * Small section emblem: bordered mark above a section eyebrow.
 * Pass $ink to tint it (e.g. range inks) or $onDark on dark surfaces.
 */
export const Emblem = styled.span<{ $ink?: string; $onDark?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.75rem;
  height: 2.75rem;
  margin-bottom: 1.25rem;
  border: 1px solid
    ${({ theme, $onDark }) =>
      $onDark ? 'rgba(201, 169, 106, 0.55)' : theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.sm};
  color: ${({ theme, $ink, $onDark }) =>
    $ink ?? ($onDark ? theme.colors.gold : theme.colors.plumpDeep)};
`;

export const SkipLink = styled.a`
  position: absolute;
  left: 0.75rem;
  top: 0.75rem;
  z-index: 100;
  padding: 0.625rem 1rem;
  background: ${({ theme }) => theme.colors.accent};
  color: ${({ theme }) => theme.colors.accentContrast};
  font-size: 0.875rem;
  font-weight: 600;
  text-decoration: none;
  border-radius: ${({ theme }) => theme.radius.sm};
  transform: translateY(-150%);

  &:focus-visible {
    transform: none;
  }
`;

export const Container = styled.div`
  width: 100%;
  max-width: 72rem;
  margin-inline: auto;
  padding-inline: 1.25rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding-inline: 2rem;
  }
`;

export const Section = styled.section`
  scroll-margin-top: 5rem;
  padding-block: ${({ theme }) => theme.spacing.sectionMobile};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding-block: ${({ theme }) => theme.spacing.section};
  }
`;

export const Eyebrow = styled.p`
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.muted};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

export const SectionTitle = styled.h2`
  font-size: clamp(1.9rem, 4.5vw, 3rem);
  max-width: 22ch;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

export const Lead = styled.p`
  font-size: 1.0625rem;
  color: ${({ theme }) => theme.colors.muted};
  max-width: 62ch;
`;

const buttonBase = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  min-height: 3rem;
  padding: 0.75rem 1.75rem;
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 0.9375rem;
  font-weight: 600;
  text-decoration: none;
  border-radius: ${({ theme }) => theme.radius.sm};
  border: 1px solid transparent;
  cursor: pointer;
  transition: background-color 160ms ease, color 160ms ease, border-color 160ms ease,
    transform 160ms ease;

  &:hover {
    transform: translateY(-1px);
  }
`;

export const ButtonPrimary = styled.a`
  ${buttonBase}
  background: ${({ theme }) => theme.colors.accent};
  color: ${({ theme }) => theme.colors.accentContrast};

  &:hover {
    background: color-mix(
      in srgb,
      ${({ theme }) => theme.colors.accent} 82%,
      ${({ theme }) => theme.colors.text}
    );
  }
`;

export const ButtonSecondary = styled.a`
  ${buttonBase}
  background: transparent;
  color: ${({ theme }) => theme.colors.text};
  border-color: ${({ theme }) => theme.colors.border};

  &:hover {
    border-color: ${({ theme }) => theme.colors.text};
  }
`;

export const TextAction = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  font-weight: 600;
  font-size: 0.9375rem;
  color: ${({ theme }) => theme.colors.plumpDeep};
  text-decoration: none;
  border-bottom: 1px solid currentColor;
  padding-bottom: 0.125rem;

  svg {
    transition: transform 180ms cubic-bezier(0.22, 1, 0.36, 1);
  }

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }

  &:hover svg {
    transform: translateX(3px);
  }
`;

const RevealWrapper = styled.div<{ $visible: boolean }>`
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transform: ${({ $visible }) => ($visible ? 'none' : 'translateY(14px)')};
  transition: opacity 520ms cubic-bezier(0.22, 1, 0.36, 1),
    transform 520ms cubic-bezier(0.22, 1, 0.36, 1);
`;

/**
 * Single quiet entrance per section. Used once per section, never per item.
 * Renders visible immediately for reduced motion.
 */
export function Reveal({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisible(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <RevealWrapper ref={ref} $visible={visible} className={className}>
      {children}
    </RevealWrapper>
  );
}
