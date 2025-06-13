// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import svgr from 'vite-plugin-svgr';
import vercel from '@astrojs/vercel'; // 👈 aquí está el cambio

export default defineConfig({
  integrations: [react()],
  output: 'server', // Esto es correcto
  adapter: vercel(), // 👈 usa el adaptador de Vercel
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

