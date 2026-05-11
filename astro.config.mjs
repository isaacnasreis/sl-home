import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import markdoc from '@astrojs/markdoc';

export default defineConfig({
  site: 'https://santosolar.com.br',
  integrations: [react(), sitemap(), markdoc()],
});
