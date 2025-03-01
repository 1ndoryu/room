import React from 'react';
import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import MainLayout from './Layouts/MainLayout'; // Asegúrate de que la ruta sea correcta
import '../css/app.css'; // Importa tu CSS *después* de los layouts, si es necesario
// import './bootstrap'; //  <--  Probablemente NO necesitas esto

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: async (name) => {
        const page = await resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob('./Pages/**/*.jsx')
        );

        // layout por defecto para TODAS las páginas:
        page.default.layout ??= (page) => <MainLayout>{page}</MainLayout>;

        return page;
    },
    setup({ el, App, props }) {
        const root = createRoot(el);
        console.log("app.jsx: setup: Iniciando la aplicación"); // Log
        root.render(<App {...props} />);
    },
    progress: {
        color: '#4B5563',
    },
});