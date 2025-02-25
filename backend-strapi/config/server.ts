export default ({ env }) => ({
  host: env("HOST", "0.0.0.0"),
  port: env.int("PORT", 1337),
  url: env("URL", "https://wandori.us/strapi"),
  admin: {
      auth: {
          secret: env('ADMIN_JWT_SECRET'),
      },
      url: '/admin', // Esto es relativo a la URL base
      autoOpen: false,
  },
  app: {
      keys: env.array("APP_KEYS"),
  },
  webhooks: {
      populateRelations: env.bool("WEBHOOKS_POPULATE_RELATIONS", false),
  },
});