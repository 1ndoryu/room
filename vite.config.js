// vite.config.js
import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";
import fs from "fs";
import path from "path"; // <-- AÑADE ESTA LÍNEA

const host =
    process.env.APP_ENV === "production"
        ? "0.0.0.0"
        : process.env.APP_HOST || "localhost";
const useHttps = process.env.APP_ENV === "production";

let serverConfig = {
    host,
    port: 5173,
    hmr: {
        host,
        clientPort: 5173,
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
