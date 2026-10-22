// A small floating "Orieb G" badge that bobs gently; still when reduced motion is on.
import { motion, useReducedMotion } from 'framer-motion';

export default function FloatBadge({ label }: { label: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.span
      aria-hidden="true"
      animate={reduce ? undefined : { y: [0, -6, 0] }}
      transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
      style={{ display: 'inline-block' }}
    >
      {label}
    </motion.span>
  );
}
