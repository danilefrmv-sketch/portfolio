import { ru } from './ru';
import { en } from './en';

export type Locale = 'ru' | 'en';

const dictionaries = { ru, en };

export function getDictionary(locale: Locale) {
  return dictionaries[locale] ?? ru;
}
