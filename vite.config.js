import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import Sitemap from 'vite-plugin-sitemap'; // 1. Importez le plugin

export default defineConfig({
  plugins: [
    react(),
    Sitemap({ 
      hostname: 'https://github.io', // 2. Configurez votre URL finale
      readable: true // Optionnel : rend le fichier XML plus lisible à l'œil humain
    })
  ],
  base: "/",
});
