// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

// TODO: подтвердить финальный GitHub-логин/имя репозитория перед деплоем (Этап 11)
const REPO_NAME = 'portfolio';

// https://astro.build/config
export default defineConfig({
  site: `https://placeholder-username.github.io`,
  base: `/${REPO_NAME}`,
  trailingSlash: 'always',

  i18n: {
    defaultLocale: 'ru',
    locales: ['ru', 'en'],
    routing: {
      prefixDefaultLocale: false,
      fallbackType: 'rewrite'
    },
    fallback: {
      en: 'ru'
    }
  },

  integrations: [react()],

  vite: {
    plugins: [tailwindcss()]
  }
});