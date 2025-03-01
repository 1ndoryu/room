export default ({ env }: { env: any }) => ({
    host: env("HOST", "0.0.0.0"),
    port: env.int("PORT", 1337),
    app: {
        keys: env.array("APP_KEYS"),
    },
    admin: {
        path: env("ADMIN_PATH", "/admin"),
        auth: {
            secret: env("ADMIN_JWT_SECRET"),
        },
        // URL pública completa del panel de administración
        url: "https://wandori.us/admin",
        autoOpen: false,
    },
    webhooks: {
        populateRelations: env.bool("WEBHOOKS_POPULATE_RELATIONS", false),
    },
});
