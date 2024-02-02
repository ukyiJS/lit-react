import { URL, fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import dtsPlugin from 'vite-plugin-dts';

export default defineConfig({
  resolve: {
    alias: {
      src: fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    lib: {
      name: 'lit-element',
      entry: 'src/index.ts',
      formats: ['es'],
      fileName: 'index',
    },
  },
  plugins: [dtsPlugin()],
});
