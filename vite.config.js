import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import fs from 'fs';

export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 5173,
    https: {
      key: fs.readFileSync('/etc/letsencrypt/live/wandori.us/privkey.pem;'),
      cert: fs.readFileSync('/etc/letsencrypt/live/wandori.us/fullchain.pem'),
    },
  },
  plugins: [
    laravel({
      input: 'resources/js/app.jsx',
      refresh: [
        'resources/routes/**',
        'routes/**',
        'resources/views/**',
        '!**/backend-strapi/**',
      ],
    }),
    react(),
  ],
});
