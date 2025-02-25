export default ({ env }) => ({
    host: env("HOST", "0.0.0.0"),
    port: env.int("PORT", 1337),
    url: env("URL", ""), // Usa la variable URL del .env
    admin: {
        path: env("ADMIN_PATH", "/admin"), // Usa ADMIN_PATH del .env
    },
    app: {
        keys: env.array("APP_KEYS"),
    },
    webhooks: {
        populateRelations: env.bool("WEBHOOKS_POPULATE_RELATIONS", false),
    },
});
