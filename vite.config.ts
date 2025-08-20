import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';


export default defineConfig({

  plugins: [react()],
  root: '.',                 // use repo root
  publicDir: 'public',
  build: {
    outDir: 'dist',          // renderer output
    emptyOutDir: true
  },


  server: {
    port: 5173,
    strictPort: true
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@lib': path.resolve(__dirname, 'src/lib'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
    },
    // avoids duplicate React if you later import from a sibling package
    dedupe: ['react', 'react-dom'],
  }
});
