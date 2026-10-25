import { useRef } from 'react';
import type { ReactNode } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';

/**
 * Parallax: tiny wrapper using Motion scroll transforms.
 * Disabled entirely when prefers-reduced-motion is set.
 */
export function Parallax({
  distance = 40,
  children,
  className,
}: {
  distance?: number;
  children: ReactNode;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance]);

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}
