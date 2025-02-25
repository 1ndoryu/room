export default ({ env }) => ({
  host: env("HOST", "0.0.0.0"),
  port: env.int("PORT", 1337),
  url: env("URL", "https://wandori.us/strapi"),
  admin: {
      path: env("ADMIN_PATH", "/admin"),
      build: {
          publicPath: "/strapi/admin/"
      }
  },
  app: {
      keys: env.array("APP_KEYS"),
  },
  webhooks: {
      populateRelations: env.bool("WEBHOOKS_POPULATE_RELATIONS", false),
  },
});
