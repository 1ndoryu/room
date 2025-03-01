import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";
import fs from 'fs';
import path from "path";

const host = 'wandori.us'; // Usamos directamente el dominio

let serverConfig = {
  host,
  port: 5173,
  hmr: false, // Desactivamos HMR en producción
};


  serverConfig.https = {
    key: fs.readFileSync(`/etc/letsencrypt/live/wandori.us/privkey.pem`),
    cert: fs.readFileSync(`/etc/letsencrypt/live/wandori.us/fullchain.pem`),
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
    build: { // <--- Agregamos esto
      outDir: 'public/build',
      manifest: true,
    }
});