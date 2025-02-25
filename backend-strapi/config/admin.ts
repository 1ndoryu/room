module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET'),
  },
  apiToken: {
    salt: env('API_TOKEN_SALT'),
  },
  url: '/admin',
  autoOpen: false,
  watchIgnoreFiles: [
    '**/node_modules/**',
    '**/dist/**',
  ],
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  serveAdminPanel: true, // Asegúrate de que esto esté en true
});