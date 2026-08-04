import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { ChatCircleDots, X, TelegramLogo, EnvelopeSimple, DribbbleLogo, Phone } from '@phosphor-icons/react';
import type { Dictionary } from '../i18n/ru';

interface ContactButtonProps {
  dict: Dictionary;
}

const CONTACTS = [
  { key: 'telegram', href: 'https://t.me/efremovdanil', icon: TelegramLogo, value: '@efremovdanil' },
  { key: 'email', href: 'mailto:efremov.job@ya.ru', icon: EnvelopeSimple, value: 'efremov.job@ya.ru' },
  { key: 'dribbble', href: 'https://dribbble.com/danilefremov', icon: DribbbleLogo, value: 'danilefremov' },
  { key: 'phone', href: 'tel:+79994660530', icon: Phone, value: '+7 (999) 466-05-30' }
] as const;

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
      className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3"
    >
      <AnimatePresence>
        {open && (
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="glass-panel flex w-64 flex-col gap-1 rounded-[20px] p-2"
          >
            {CONTACTS.map(({ key, href, icon: Icon, value }) => (
              <a
                key={key}
                href={href}
                target={key === 'dribbble' || key === 'telegram' ? '_blank' : undefined}
                rel={key === 'dribbble' || key === 'telegram' ? 'noreferrer' : undefined}
                data-cursor="link"
                className="flex items-center gap-3 rounded-2xl px-3 py-2.5 transition-colors hover:bg-white/5"
              >
                <Icon size={20} className="shrink-0 text-accent" />
                <span className="flex flex-col">
                  <span className="text-xs uppercase tracking-wide text-fg-muted">
                    {dict.contact[key as keyof typeof dict.contact]}
                  </span>
                  <span className="text-sm font-medium">{value}</span>
                </span>
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        data-cursor="link"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={dict.contact.cta}
        whileTap={reduceMotion ? undefined : { scale: 0.94 }}
        className="flex h-14 items-center gap-2 rounded-full bg-accent px-5 font-medium text-bg shadow-[0_8px_30px_-8px_var(--color-accent)]"
      >
        {open ? <X size={20} weight="bold" /> : <ChatCircleDots size={20} weight="bold" />}
        {dict.contact.cta}
      </motion.button>
    </motion.div>
  );
}
