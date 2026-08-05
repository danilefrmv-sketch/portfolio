import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import type { Dictionary } from '../i18n/ru';
import ContactMenuButton from './ContactMenuButton';

interface ContactButtonProps {
  dict: Dictionary;
}

export default function ContactButton({ dict }: ContactButtonProps) {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    // This island persists across Astro view transitions, but each navigated
    // page has its own (or no) #hero element. Re-attach the observer to the
    // CURRENT page's hero after every swap instead of watching a stale,
    // detached node from whichever page first mounted this component.
    let observer: IntersectionObserver | null = null;

    const attach = () => {
      observer?.disconnect();
      setOpen(false);

      const hero = document.getElementById('hero');
      if (!hero) {
        setVisible(true);
        return;
      }

      setVisible(false);
      observer = new IntersectionObserver(
        ([entry]) => {
          setVisible(!entry.isIntersecting);
          if (entry.isIntersecting) setOpen(false);
        },
        { threshold: 0.2 }
      );
      observer.observe(hero);
    };

    attach();
    document.addEventListener('astro:after-swap', attach);

    return () => {
      observer?.disconnect();
      document.removeEventListener('astro:after-swap', attach);
    };
  }, []);

  return (
    <motion.div
      id="contact"
      initial={false}
      animate={visible ? { opacity: 1, y: 0, pointerEvents: 'auto' } : { opacity: 0, y: 24, pointerEvents: 'none' }}
      transition={{ duration: reduceMotion ? 0 : 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="fixed bottom-6 right-6 z-50"
    >
      <ContactMenuButton dict={dict} dropdownPosition="above" align="right" open={open} onOpenChange={setOpen} />
    </motion.div>
  );
}
