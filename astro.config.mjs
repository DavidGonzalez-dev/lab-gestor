// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel';
import node from '@astrojs/node';
import svgr from 'vite-plugin-svgr';

// https://astro.build/config
export default defineConfig({
  adapter: process.env.NODE_ENV === 'production' ? vercel() : node({
    mode: 'standalone'
  }),
  output: "server", 
  integrations: [react()],
  vite: {
    plugins: [
      svgr({
        svgrOptions: {
          icon: true,
        },
      }),
    ],
  },
});

