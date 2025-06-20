import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
  server: {
    host: '0.0.0.0',   // Escuta todas as interfaces
    port: 5173,        // Porta padrão do Vite
    origin: 'http://192.168.1.9:5173', // IP real usado para construir URLs
  },
  plugins: [
    laravel({
      input: 'resources/js/app.jsx',
      ssr: 'resources/js/ssr.jsx',
      refresh: true,
    }),
    react(),
  ],
});
