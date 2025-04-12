import { defineConfig } from 'vite';

export default defineConfig({
  optimizeDeps: {
    include: ['tw-to-css'],
  },
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
}); 