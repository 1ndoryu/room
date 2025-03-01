// config/server.ts
export default ({ env }) => ({
    host: env("HOST", "0.0.0.0"),
    port: env.int("PORT", 1337),
    app: {
        keys: env.array("APP_KEYS"),
    },
    admin: {
        path: env("ADMIN_PATH", "/admin"), // <-- Ruta para el panel (¡IMPORTANTE!)

        auth: {
            secret: env("ADMIN_JWT_SECRET"),
        },
        url: env("ADMIN_PATH", "/admin"), // <-- URL del panel (¡DEBE SER IGUAL A path!)
        autoOpen: false, // Opcional, pero recomendado
    },
    webhooks: {
        populateRelations: env.bool("WEBHOOKS_POPULATE_RELATIONS", false),
    },
});
