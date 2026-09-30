import { defineConfig, fontProviders } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

import { SITE } from './src/config/site';

// https://astro.build/config
export default defineConfig({
  site: SITE.url,
  server: { host: '127.0.0.1' },
  integrations: [mdx(), sitemap()],

  /*
   * Fetch the next page while the reader is still deciding to go there, so the
   * click lands on a document that has already arrived. `hover` rather than
   * `viewport` keeps this to links someone is actually reaching for — on a long
   * page, prefetching everything in sight would undo the weight the theme is
   * careful about elsewhere. Astro skips this entirely on a slow connection or
   * when the reader has data saver on.
   */
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'hover',
  },
  image: {
    responsiveStyles: true,
    layout: 'constrained',
  },

  /*
   * Both families ship with the theme rather than being fetched at build time.
   * Bundling them keeps builds reproducible and offline-capable — a CDN blip
   * can no longer fail a deploy — at the cost of 276 KB in the repository.
   * See LICENSE.md for the terms each font is distributed under.
   */
  fonts: [
    {
      provider: fontProviders.local(),
      name: 'BigNoodleTitling',
      cssVariable: '--font-heading',
      fallbacks: ['Arial', 'sans-serif'],
      options: {
        variants: [
          { src: ['./src/assets/fonts/BigNoodleTitling.woff2'], weight: '400', style: 'normal' },
        ],
      },
    },
    {
      provider: fontProviders.local(),
      name: 'Open Sans',
      cssVariable: '--font-body',
      fallbacks: ['sans-serif'],
      options: {
        variants: [
          { src: ['./src/assets/fonts/OpenSans-300.woff2'], weight: '300', style: 'normal' },
          { src: ['./src/assets/fonts/OpenSans-regular.woff2'], weight: '400', style: 'normal' },
          { src: ['./src/assets/fonts/OpenSans-500.woff2'], weight: '500', style: 'normal' },
          { src: ['./src/assets/fonts/OpenSans-600.woff2'], weight: '600', style: 'normal' },
          { src: ['./src/assets/fonts/OpenSans-700.woff2'], weight: '700', style: 'normal' },
        ],
      },
    },
  ],

  vite: {
    plugins: [tailwindcss()],
  },
});
