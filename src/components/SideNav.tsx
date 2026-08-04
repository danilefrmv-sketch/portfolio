import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { List, X } from '@phosphor-icons/react';
import type { Dictionary } from '../i18n/ru';

interface SideNavProps {
  dict: Dictionary;
  locale: 'ru' | 'en';
}

const sections: Array<{ key: keyof Dictionary['nav']; href: string }> = [
  { key: 'projects', href: '#projects' },
  { key: 'about', href: '#about' },
  { key: 'contact', href: '#contact' },
  { key: 'path', href: '#path' }
];

export default function SideNav({ dict, locale }: SideNavProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const reduceMotion = useReducedMotion();
  const otherLocale = locale === 'ru' ? 'en' : 'ru';
  const otherHref = otherLocale === 'ru' ? '/' : '/en/';

  return (
    <>
      {/* Desktop: persistent side rail */}
      <motion.nav
        aria-label="Основная навигация"
        initial={reduceMotion ? false : { opacity: 0, x: -16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="glass-panel fixed left-4 top-1/2 z-50 hidden -translate-y-1/2 flex-col items-center gap-5 rounded-full px-2 py-5 md:flex"
      >
        <ul className="flex flex-col items-center gap-5">
          {sections.map((section) => (
            <li key={section.key}>
              <a
                href={section.href}
                data-cursor="link"
                className="block whitespace-nowrap px-2 text-xs font-medium uppercase tracking-[0.14em] text-fg-muted transition-colors hover:text-fg"
                style={{ writingMode: 'vertical-rl' }}
              >
                {dict.nav[section.key]}
              </a>
            </li>
          ))}
        </ul>
        <div className="h-px w-6 bg-border" />
        <a
          href={otherHref}
          data-cursor="link"
          aria-label={dict.languageSwitch.label}
          className="text-xs font-semibold uppercase tracking-wide text-fg-muted transition-colors hover:text-fg"
        >
          {otherLocale}
        </a>
      </motion.nav>

      {/* Mobile: toggle button + full-screen overlay */}
      <button
        type="button"
        data-cursor="link"
        aria-label={mobileOpen ? 'Закрыть меню' : 'Открыть меню'}
        onClick={() => setMobileOpen((v) => !v)}
        className="glass-panel fixed right-4 top-4 z-50 flex h-11 w-11 items-center justify-center rounded-full md:hidden"
      >
        {mobileOpen ? <X size={20} /> : <List size={20} />}
      </button>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-bg/95 fixed inset-0 z-40 flex flex-col items-start justify-center gap-8 px-8 backdrop-blur-xl md:hidden"
          >
            {sections.map((section) => (
              <a
                key={section.key}
                href={section.href}
                data-cursor="link"
                onClick={() => setMobileOpen(false)}
                className="font-display text-4xl font-semibold"
              >
                {dict.nav[section.key]}
              </a>
            ))}
            <a href={otherHref} data-cursor="link" className="mt-4 text-sm uppercase tracking-widest text-fg-muted">
              {dict.languageSwitch.label}: {otherLocale}
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
