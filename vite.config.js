// vite.config.js
import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";
import fs from "fs";
import path from "path";

const host =
    process.env.APP_ENV === "production"
        ? "0.0.0.0" // Cambia esto a "wandori.us" si es necesario
        : process.env.APP_HOST || "localhost";
const useHttps = process.env.APP_ENV === "production";

let serverConfig = {
    host,
    port: 5173,
    hmr: {
        host, // Esto también podría ser "wandori.us" en producción.
        clientPort: 5173, // Considera usar 443 en producción si usas HTTPS
    },
    cors: {
        origin: "https://wandori.us", //  <--  ¡AÑADE ESTO!  Solo tu dominio.
        // methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'], // Opcional: métodos permitidos
        // allowedHeaders: ['Content-Type', 'Authorization'], // Opcional: cabeceras permitidas
        // credentials: true,  // Opcional: si necesitas enviar cookies/credenciales
    },
};

if (useHttps) {
    serverConfig.https = {
        key: fs.readFileSync(`/etc/letsencrypt/live/${host}/privkey.pem`),
        cert: fs.readFileSync(`/etc/letsencrypt/live/${host}/fullchain.pem`),
    };
}

export default defineConfig({
    server: serverConfig,
    plugins: [
        laravel({
            input: "resources/js/app.jsx",
            refresh: true, // Simplificado a 'true' para mayor brevedad.
        }),
        react(),
    ],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "resources/js"), // <-- Usa path.resolve
        },
    },
});
