import styled from 'styled-components';

const Cue = styled.span`
  display: inline-block;
  width: 1px;
  height: 2.25rem;
  background: ${({ theme }) => theme.colors.textInverse72};
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    top: -40%;
    left: 0;
    width: 100%;
    height: 40%;
    background: ${({ theme }) => theme.colors.textInverse};
    animation: cue-slide 1.6s cubic-bezier(0.22, 1, 0.36, 1) infinite;
  }

  @keyframes cue-slide {
    0% {
      top: -40%;
    }
    100% {
      top: 100%;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    display: none;
  }
`;

/**
 * ScrollCue: decorative scroll indicator for the hero.
 * aria-hidden and hidden under prefers-reduced-motion.
 */
export function ScrollCue({ className }: { className?: string }) {
  return <Cue aria-hidden="true" className={className} />;
}
