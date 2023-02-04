import * as path from 'path';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  optimizeDeps: {},
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
