import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";
import fs from 'fs';
import path from "path";

const host = 'wandori.us';

let serverConfig = {
    host,
    port: 5173, // Considera usar un puerto diferente si tienes conflictos
    hmr: {  // Configuración correcta para HMR, si es necesario
        host, // Asegura que HMR sepa a dónde conectarse
    },
     https: {
       key: fs.readFileSync(`/etc/letsencrypt/live/${host}/privkey.pem`),
       cert: fs.readFileSync(`/etc/letsencrypt/live/${host}/fullchain.pem`),
     }
};

export default defineConfig({
    server: serverConfig,
    plugins: [
        laravel({
            input: 'resources/js/app.jsx', // Solo un archivo de entrada
            refresh: true,
        }),
        react(),
    ],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "resources/js"),
        },
    },
    // build: {  // <---  Ya está configurado correctamente por laravel-vite-plugin, no es necesario
    //     outDir: 'public/build',
    //     manifest: true,
    // }
});