import type { ReactNode } from 'react';
import { useReducedMotion } from 'motion/react';
import { motion } from 'motion/react';
import styled from 'styled-components';
import { theme } from '../../../theme';

const RevealWrapper = styled(motion.div)`
  will-change: transform, opacity;
`;

export function Reveal({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <RevealWrapper
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 14 }}
      whileInView={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{
        duration: reduceMotion ? 0 : 0.52,
        ease: theme.motion.easings.standard,
      }}
    >
      {children}
    </RevealWrapper>
  );
}
