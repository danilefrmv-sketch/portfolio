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

    // Astro's view-transition swap restores <html> to the new page's server-rendered
    // classes, wiping this class even though the Cursor island itself persists.
    // Re-add it after every swap, not just on first mount.
    const addClass = () => document.documentElement.classList.add('has-custom-cursor');
    addClass();
    document.addEventListener('astro:after-swap', addClass);

    // Whatever was hovered on the previous page no longer exists after a
    // navigation, so the cursor must not stay stuck in "view"/"link" mode.
    const resetMode = () => setMode('default');
    document.addEventListener('astro:before-swap', resetMode);

    // The cursor island persists across Astro view transitions (transition:persist).
    // Guard so re-running this effect (e.g. during a page swap) never attaches
    // a second set of pointer listeners or tears down the first one mid-navigation.
    const win = window as typeof window & { __cursorInit?: boolean };
    if (win.__cursorInit) {
      return () => {
        document.removeEventListener('astro:after-swap', addClass);
        document.removeEventListener('astro:before-swap', resetMode);
      };
    }
    win.__cursorInit = true;

    enabledRef.current = true;

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
        <svg viewBox="0 0 256 256" width="8" height="8" fill="currentColor" className="text-bg shrink-0">
          <path d="M200,64V168a8,8,0,0,1-16,0V83.31L69.66,197.66a8,8,0,0,1-11.32-11.32L172.69,72H88a8,8,0,0,1,0-16H192A8,8,0,0,1,200,64Z" />
        </svg>
      )}
    </motion.div>
  );
}
