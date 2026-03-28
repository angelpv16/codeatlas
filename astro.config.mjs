import { defineConfig, passthroughImageService } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';

export default defineConfig({
  site: 'https://angelpv16.github.io',
  base: '/codeatlas',
  trailingSlash: 'always',
  integrations: [
    tailwind(),
    react(),
    mdx(),
  ],
  image: {
    service: passthroughImageService(),
  },
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
      wrap: true,
    },
  },
});
