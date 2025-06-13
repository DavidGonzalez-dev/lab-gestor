// @ts-check
import { defineConfig } from 'astro/config';
import node from "@astrojs/node";
import react from '@astrojs/react';
import svgr from 'vite-plugin-svgr'; // Importa el plugin

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
  output: "server",
  adapter: node({
    mode: "standalone"
  }),
  vite: {
    plugins: [
      svgr({
        svgrOptions: {
          icon: true, // convierte SVG en componentes con soporte de íconos
        },
      }),
    ],
  },
});

