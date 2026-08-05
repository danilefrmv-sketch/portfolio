import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { ChatCircleDots, X, TelegramLogo, EnvelopeSimple, DribbbleLogo, Phone } from '@phosphor-icons/react';
import type { Dictionary } from '../i18n/ru';

const CONTACTS = [
  { key: 'telegram', href: 'https://t.me/efremovdanil', icon: TelegramLogo, value: '@efremovdanil' },
  { key: 'email', href: 'mailto:efremov.job@ya.ru', icon: EnvelopeSimple, value: 'efremov.job@ya.ru' },
  { key: 'dribbble', href: 'https://dribbble.com/danilefremov', icon: DribbbleLogo, value: 'danilefremov' },
  { key: 'phone', href: 'tel:+79994660530', icon: Phone, value: '+7 (999) 466-05-30' }
] as const;

interface ContactMenuButtonProps {
  dict: Dictionary;
  dropdownPosition?: 'above' | 'below';
  align?: 'left' | 'right';
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export default function ContactMenuButton({
  dict,
  dropdownPosition = 'above',
  align = 'right',
  open: openProp,
  onOpenChange
}: ContactMenuButtonProps) {
  const [openState, setOpenState] = useState(false);
  const reduceMotion = useReducedMotion();

  const open = openProp ?? openState;
  const setOpen = (value: boolean) => {
    setOpenState(value);
    onOpenChange?.(value);
  };

  return (
    <div className="relative inline-block">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: dropdownPosition === 'above' ? 12 : -12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: dropdownPosition === 'above' ? 12 : -12, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className={`absolute z-50 flex w-64 flex-col gap-1 rounded-[20px] border border-border bg-bg-elevated/95 p-2 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.7)] backdrop-blur-xl ${
              dropdownPosition === 'above' ? 'bottom-full mb-3' : 'top-full mt-3'
            } ${align === 'right' ? 'right-0' : 'left-0'}`}
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
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-label={dict.contact.cta}
        whileTap={reduceMotion ? undefined : { scale: 0.94 }}
        className="flex h-14 items-center gap-2 rounded-full bg-accent px-6 font-medium text-bg shadow-[0_8px_30px_-8px_var(--color-accent)]"
      >
        {open ? <X size={20} weight="bold" /> : <ChatCircleDots size={20} weight="bold" />}
        {dict.contact.cta}
      </motion.button>
    </div>
  );
}
