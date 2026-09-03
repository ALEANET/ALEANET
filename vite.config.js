import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Important pour GitHub Pages, y compris si le dépôt n'est pas à la racine du domaine.
  base: "/",
});
