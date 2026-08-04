import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { List, X, TelegramLogo, DribbbleLogo } from '@phosphor-icons/react';
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
      {/* Desktop: persistent left sidebar */}
      <motion.aside
        aria-label="Основная навигация"
        initial={reduceMotion ? false : { opacity: 0, x: -16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-y-0 left-0 z-50 hidden w-[260px] flex-col justify-between border-r border-border bg-bg-elevated/80 px-8 py-10 backdrop-blur-xl md:flex"
      >
        <div>
          <a href="/" data-cursor="link" className="text-base font-semibold">
            Данил Ефремов
          </a>
          <p className="mt-1 text-sm text-fg-muted">Product UX/UI дизайнер</p>
        </div>

        <nav>
          <ul className="flex flex-col gap-4">
            {sections.map((section) => (
              <li key={section.key}>
                <a
                  href={section.href}
                  data-cursor="link"
                  className="text-sm font-medium text-fg-muted transition-colors hover:text-fg"
                >
                  {dict.nav[section.key]}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <a href="https://t.me/efremovdanil" target="_blank" rel="noreferrer" data-cursor="link" aria-label="Telegram" className="text-fg-muted transition-colors hover:text-fg">
              <TelegramLogo size={18} />
            </a>
            <a href="https://dribbble.com/danilefremov" target="_blank" rel="noreferrer" data-cursor="link" aria-label="Dribbble" className="text-fg-muted transition-colors hover:text-fg">
              <DribbbleLogo size={18} />
            </a>
          </div>
          <a
            href={otherHref}
            data-cursor="link"
            aria-label={dict.languageSwitch.label}
            className="w-fit rounded-full border border-border px-3 py-1 text-xs font-semibold uppercase tracking-wide text-fg-muted transition-colors hover:text-fg"
          >
            {locale.toUpperCase()} / {otherLocale.toUpperCase()}
          </a>
        </div>
      </motion.aside>

      {/* Mobile: toggle button + full-screen overlay */}
      <button
        type="button"
        data-cursor="link"
        data-menu-toggle
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
