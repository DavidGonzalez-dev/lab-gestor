// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel/serverless'; 
import svgr from 'vite-plugin-svgr';

// https://astro.build/config
export default defineConfig({
  adapter: vercel({}),
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

