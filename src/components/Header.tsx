import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { List, X, TelegramLogo, DribbbleLogo, DownloadSimple } from '@phosphor-icons/react';
import type { Dictionary } from '../i18n/ru';

interface HeaderProps {
  dict: Dictionary;
  locale: 'ru' | 'en';
}

const sections: Array<{ key: 'projects' | 'about'; href: string }> = [
  { key: 'projects', href: '/#projects' },
  { key: 'about', href: '/about/' }
];

const CV_HREF = '/cv/danil-efremov-cv.pdf';

export default function Header({ dict, locale }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const reduceMotion = useReducedMotion();
  const otherLocale = locale === 'ru' ? 'en' : 'ru';
  const otherHref = otherLocale === 'ru' ? '/' : '/en/';

  return (
    <>
      <motion.header
        initial={reduceMotion ? false : { opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-x-0 top-0 z-50 h-16 border-b border-border bg-bg-elevated/80 backdrop-blur-xl md:h-20"
      >
        <div className="container-site flex h-full items-center justify-between gap-6">
          <a href="/" data-cursor="link" className="shrink-0 leading-tight">
            <span className="block text-sm font-semibold md:text-base">Данил Ефремов</span>
            <span className="block text-xs text-fg-muted">Product UX/UI дизайнер</span>
          </a>

          <nav className="hidden md:block">
            <ul className="flex items-center gap-7">
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
              <li>
                <a
                  href={CV_HREF}
                  download
                  data-cursor="link"
                  className="flex items-center gap-1.5 text-sm font-medium text-fg-muted transition-colors hover:text-fg"
                >
                  <DownloadSimple size={15} />
                  {dict.nav.cv}
                </a>
              </li>
            </ul>
          </nav>

          <div className="hidden shrink-0 items-center gap-4 md:flex">
            <a href="https://t.me/efremovdanil" target="_blank" rel="noreferrer" data-cursor="link" aria-label="Telegram" className="text-fg-muted transition-colors hover:text-fg">
              <TelegramLogo size={18} />
            </a>
            <a href="https://dribbble.com/danilefremov" target="_blank" rel="noreferrer" data-cursor="link" aria-label="Dribbble" className="text-fg-muted transition-colors hover:text-fg">
              <DribbbleLogo size={18} />
            </a>
            <a
              href={otherHref}
              data-cursor="link"
              aria-label={dict.languageSwitch.label}
              className="flex items-center gap-1 rounded-full border border-border px-3 py-1 text-xs font-semibold uppercase tracking-wide"
            >
              <span className="text-accent">{locale.toUpperCase()}</span>
              <span className="text-fg-muted/50">/</span>
              <span className="text-fg-muted transition-colors hover:text-fg">{otherLocale.toUpperCase()}</span>
            </a>
          </div>

          <button
            type="button"
            data-cursor="link"
            data-menu-toggle
            aria-label={mobileOpen ? 'Закрыть меню' : 'Открыть меню'}
            onClick={() => setMobileOpen((v) => !v)}
            className="glass-panel flex h-11 w-11 shrink-0 items-center justify-center rounded-full md:hidden"
          >
            {mobileOpen ? <X size={20} /> : <List size={20} />}
          </button>
        </div>
      </motion.header>

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
            <a href={CV_HREF} download data-cursor="link" className="font-display text-4xl font-semibold">
              {dict.nav.cv}
            </a>
            <a href={otherHref} data-cursor="link" className="mt-4 text-sm uppercase tracking-widest text-fg-muted">
              {dict.languageSwitch.label}: <span className="text-accent">{locale}</span> / {otherLocale}
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
