import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api-ultra-times": {
        target: "https://ultratimes.io/api/index.php/v1/content/articles",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api-ultra-times/, ''),
        configure: (proxy) => {
          proxy.on('proxyReq', (proxyReq) => {
            const token = process.env.VITE_ULTRA_TIMES_API_KEY || import.meta.env.VITE_ULTRA_TIMES_API_KEY;
            if (token) {
              proxyReq.setHeader('Authorization', `Bearer ${token}`);
            }
          });
        },
      },
      "/api-price": {
        target: "https://api.coingecko.com/api/v3/simple/price",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api-price/, ''),
        configure: (proxy) => {
          proxy.on('proxyReq', (proxyReq) => {
            const token = process.env.VITE_COINGECKO_API_KEY || import.meta.env.VITE_COINGECKO_API_KEY;
            if (token) {
              proxyReq.setHeader('x-cg-demo-api-key', token);
            }
          });
        },
      },
      "/api-coins": {
        target: "https://api.coingecko.com/api/v3/coins/ultra",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api-coins/, ''),
        configure: (proxy) => {
          proxy.on('proxyReq', (proxyReq) => {
            const token = process.env.VITE_COINGECKO_API_KEY || import.meta.env.VITE_COINGECKO_API_KEY;
            if (token) {
              proxyReq.setHeader('x-cg-demo-api-key', token);
            }
          });
        },
      },
      "/api-historical": {
        target: "https://api.coingecko.com/api/v3/coins/ultra/market_chart",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api-historical/, ''),
        configure: (proxy) => {
          proxy.on('proxyReq', (proxyReq) => {
            const token = process.env.VITE_COINGECKO_API_KEY || import.meta.env.VITE_COINGECKO_API_KEY;
            if (token) {
              proxyReq.setHeader('x-cg-demo-api-key', token);
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