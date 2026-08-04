import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'motion/react';

const INTERACTIVE_SELECTOR = 'a, button, [role="button"], input, textarea, [data-cursor]';

export default function Cursor() {
  const reduceMotion = useReducedMotion();
  const enabledRef = useRef(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 500, damping: 40, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 500, damping: 40, mass: 0.5 });

  const scale = useMotionValue(1);
  const springScale = useSpring(scale, { stiffness: 400, damping: 30 });

  useEffect(() => {
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (reduceMotion || !isFinePointer) return;

    enabledRef.current = true;
    document.documentElement.classList.add('has-custom-cursor');

    const handleMove = (event: PointerEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
    };

    const handleOver = (event: PointerEvent) => {
      const target = event.target as Element | null;
      if (target?.closest(INTERACTIVE_SELECTOR)) scale.set(2.2);
    };

    const handleOut = (event: PointerEvent) => {
      const target = event.target as Element | null;
      if (target?.closest(INTERACTIVE_SELECTOR)) scale.set(1);
    };

    window.addEventListener('pointermove', handleMove);
    document.addEventListener('pointerover', handleOver);
    document.addEventListener('pointerout', handleOut);

    return () => {
      document.documentElement.classList.remove('has-custom-cursor');
      window.removeEventListener('pointermove', handleMove);
      document.removeEventListener('pointerover', handleOver);
      document.removeEventListener('pointerout', handleOut);
    };
  }, [reduceMotion, x, y, scale]);

  if (reduceMotion) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-[-6px] top-[-6px] z-[100] hidden h-3 w-3 rounded-full bg-fg mix-blend-difference [@media(pointer:fine)]:block"
      style={{ x: springX, y: springY, scale: springScale }}
    />
  );
}
