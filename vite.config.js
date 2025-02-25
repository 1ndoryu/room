// vite.config.js
import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";

export default defineConfig({
    server: {
        host: "localhost",
        port: 5178, // Fuerza el puerto correcto
    },
    plugins: [
        laravel({
            input: "resources/js/app.jsx",
            refresh: true,
        }),
        react(),
    ],
});
