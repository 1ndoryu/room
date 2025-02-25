import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig(({ command }) => ({ // <- Usa una función
    plugins: [
        laravel({
            input: ['resources/js/app.jsx'],
            refresh: true,
        }),
        react(),
    ],
    build: {
        outDir: 'public/build',
        manifest: true,
    },
    server: command === 'serve' ? { // <- Configuración condicional
        host: '0.0.0.0',
        port: 5175, // Elige un puerto que no esté en uso
        hmr: {
          host: 'wandori.us'
        }
    } : undefined, // <- Importante: undefined en producción
}));