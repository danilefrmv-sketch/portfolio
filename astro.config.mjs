// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

const REPO_NAME = 'portfolio';
const isGhPagesBuild = process.env.GH_PAGES === 'true';

// https://astro.build/config
export default defineConfig({
  site: `https://danilefrmv-sketch.github.io`,
  base: isGhPagesBuild ? `/${REPO_NAME}` : '/',
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

  devToolbar: { enabled: false },

  integrations: [react()],

  vite: {
    plugins: [tailwindcss()]
  }
});