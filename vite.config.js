// vite.config.js
import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";
import path from "path";
import fs from "fs"; // Asegúrate de tener fs

const host =
    process.env.APP_ENV === "production"
        ? "wandori.us"
        : process.env.APP_HOST || "localhost"; // Correcto: host diferente en prod y dev
const useHttps = process.env.APP_ENV === "production"; // Esto está bien

let serverConfig = {
    host,
    port: 5173,
    hmr: {
        host,
        clientPort: process.env.APP_ENV === "production" ? 443 : 5173, // Correcto: 443 en prod, 5173 en dev
    },
    cors: {
        origin:
            process.env.APP_ENV === "production" ? "https://wandori.us" : "*", // Más flexible en desarrollo
        // methods, allowedHeaders, credentials (opcional)
    },
};

// SOLO añade server.https en DESARROLLO:
if (process.env.APP_ENV !== "production") {
    // Asume una estructura de directorios estándar para los certificados en desarrollo
    // AJUSTA ESTO si tu configuración local es diferente
    const certDir = process.env.CERT_DIR || "/etc/ssl/certs"; //Ej: /etc/ssl/certs, o usa un .env
    const keyDir = process.env.KEY_DIR || "/etc/ssl/private";

    serverConfig.https = {
        key: fs.readFileSync(
            process.env.HTTPS_KEY_PATH
                ? process.env.HTTPS_KEY_PATH
                : `${keyDir}/localhost-key.pem`
        ), //Usa .env o una ruta
        cert: fs.readFileSync(
            process.env.HTTPS_CERT_PATH
                ? process.env.HTTPS_CERT_PATH
                : `${certDir}/localhost.pem`
        ),
    };
}

export default defineConfig({
    server: serverConfig,
    plugins: [
        laravel({
            input: "resources/js/app.jsx",
            refresh: true,
        }),
        react(),
    ],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "resources/js"),
        },
    },
});
