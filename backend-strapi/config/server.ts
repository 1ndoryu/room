export default ({ env }) => ({
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
        url: "https://wandori.us/admin",
        autoOpen: false,
    },
    webhooks: {
        populateRelations: env.bool("WEBHOOKS_POPULATE_RELATIONS", false),
    },
    logger: {  // <---  AÑADE ESTO
      level: 'debug', // O 'silly' para aún más detalles
      //  Opcional:  format:  (si quieres un formato específico)
    }
});