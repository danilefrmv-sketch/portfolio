import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'motion/react';

const VIEW_SELECTOR = '[data-cursor="view"]';
const INTERACTIVE_SELECTOR = 'a, button, [role="button"], input, textarea, [data-cursor]';

type CursorMode = 'default' | 'link' | 'view';

const SCALE_BY_MODE: Record<CursorMode, number> = {
  default: 1,
  link: 2.2,
  view: 4.5
};

export default function Cursor() {
  const reduceMotion = useReducedMotion();
  const enabledRef = useRef(false);
  const [mode, setMode] = useState<CursorMode>('default');

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 500, damping: 40, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 500, damping: 40, mass: 0.5 });

  const scale = useMotionValue(1);
  const springScale = useSpring(scale, { stiffness: 400, damping: 30 });

  useEffect(() => {
    scale.set(SCALE_BY_MODE[mode]);
  }, [mode, scale]);

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
      if (target?.closest(VIEW_SELECTOR)) setMode('view');
      else if (target?.closest(INTERACTIVE_SELECTOR)) setMode('link');
    };

    const handleOut = (event: PointerEvent) => {
      const target = event.target as Element | null;
      if (target?.closest(INTERACTIVE_SELECTOR)) setMode('default');
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
  }, [reduceMotion, x, y]);

  if (reduceMotion) return null;

  const isView = mode === 'view';

  return (
    <motion.div
      aria-hidden="true"
      className={`pointer-events-none fixed left-[-6px] top-[-6px] z-[100] hidden h-3 w-3 items-center justify-center rounded-full [@media(pointer:fine)]:flex ${
        isView ? 'bg-accent' : 'bg-fg mix-blend-difference'
      }`}
      style={{ x: springX, y: springY, scale: springScale }}
      transition={{ duration: 0.2 }}
    >
      {isView && (
        <svg viewBox="0 0 256 256" width="6" height="6" fill="currentColor" className="text-bg">
          <path d="M200,64V168a8,8,0,0,1-16,0V83.31L69.66,197.66a8,8,0,0,1-11.32-11.32L172.69,72H88a8,8,0,0,1,0-16H192A8,8,0,0,1,200,64Z" />
        </svg>
      )}
    </motion.div>
  );
}
