import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Required for GitHub Pages — matches your repo name
  base: '/',
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
