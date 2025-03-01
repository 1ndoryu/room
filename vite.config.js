import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";
import fs from "fs";
import path from "path";

// Para producción usamos el dominio real
const host =
    process.env.APP_ENV === "production"
        ? "wandori.us"
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
        key: fs.readFileSync(`/etc/letsencrypt/live/wandori.us/privkey.pem`),
        cert: fs.readFileSync(`/etc/letsencrypt/live/wandori.us/fullchain.pem`),
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
