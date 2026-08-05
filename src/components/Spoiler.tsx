import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { CaretDown } from '@phosphor-icons/react';

interface SpoilerProps {
  label: string;
  labelOpen: string;
  children: React.ReactNode;
}

export default function Spoiler({ label, labelOpen, children }: SpoilerProps) {
  const [open, setOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  return (
    <div>
      <button
        type="button"
        data-cursor="link"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="glass-panel flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium text-fg transition-colors hover:text-accent"
      >
        {open ? labelOpen : label}
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={reduceMotion ? { duration: 0 } : { type: 'spring', stiffness: 300, damping: 24 }}
          className="inline-flex"
        >
          <CaretDown size={14} weight="bold" />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={reduceMotion ? false : { height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 220, damping: 28, mass: 0.9 }}
            className="overflow-hidden"
          >
            <div className="mt-8">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
