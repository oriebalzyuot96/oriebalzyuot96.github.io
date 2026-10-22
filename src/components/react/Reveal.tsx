// Framer Motion reveal. The server renders children fully visible (no hidden content without JS, good for SEO).
// After hydration, only elements still below the viewport are hidden and then fade/rise into view once.
// Respects prefers-reduced-motion. The wrapper fills its grid/flex cell so cards keep equal heights.
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState, type ReactNode } from 'react';

export default function Reveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || reduce) return;
    if (el.getBoundingClientRect().top > window.innerHeight) setArmed(true);
  }, [reduce]);

  const hidden = armed && !inView;
  return (
    <motion.div
      ref={ref}
      className="reveal-fm"
      initial={false}
      animate={hidden ? { opacity: 0, y: 24 } : { opacity: 1, y: 0 }}
      transition={hidden ? { duration: 0 } : { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
