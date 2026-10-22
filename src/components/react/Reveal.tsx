// Framer Motion reveal: children fade and rise into view once, staggered by index.
// Respects prefers-reduced-motion (renders immediately with no movement).
import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

export default function Reveal({ children, delay = 0, as = 'div' }: { children: ReactNode; delay?: number; as?: 'div' | 'li' | 'article' }) {
  const reduce = useReducedMotion();
  const Tag = motion[as];
  return (
    <Tag
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Tag>
  );
}
