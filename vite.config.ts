import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/proxy": {
        target: "https://ultratimes.io/api/index.php/v1/content/articles",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/proxy/, ''),
        configure: (proxy) => {
          proxy.on('proxyReq', (proxyReq) => {
            const token = process.env.VITE_ULTRA_TIMES_API_KEY || import.meta.env.VITE_ULTRA_TIMES_API_KEY;
            if (token) {
              proxyReq.setHeader('Authorization', `Bearer ${token}`);
            }
          });
        },
      },
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'lightweight-charts', 'lucide-react'],
        },
      },
    },
  },
  envPrefix: 'VITE_',
});