import { URL, fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      src: fileURLToPath(new URL('./src', import.meta.url)),
      '@lit-react-example/lit': fileURLToPath(new URL('../../packages/lit/dist', import.meta.url)),
    },
  },
});
