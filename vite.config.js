import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    server: {
        host: '0.0.0.0', // O host: true.  Escucha en todas las interfaces.
        port: 5178,     // Tu puerto preferido (asegúrate de que esté abierto).
    },
    plugins: [
        laravel({
            input: 'resources/js/app.jsx',
            refresh: [  // Configuración específica de HMR.
                'resources/routes/**',
                'routes/**',
                'resources/views/**',
                '!**/backend-strapi/**', // Excluye el directorio de Strapi.
            ],
        }),
        react(),
    ],
});