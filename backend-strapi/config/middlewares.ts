// config/middlewares.ts
import logger from '../helpers/logger';

export default [
  'strapi::errors',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'connect-src': ["'self'", 'https:'],
          'img-src': ["'self'", 'data:', 'blob:', 'https:'],
          'media-src': ["'self'", 'data:', 'blob:', 'https:'],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  'strapi::cors',
  'strapi::poweredBy',
  'strapi::logger',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
  {
    name: 'strapi::responseTime',
    config: {
      logger: (ctx) => {
        logger.http(
          `Peticion: ${ctx.request.method} ${ctx.request.url}  - Tiempo de respuesta: ${ctx.response.responseTime}ms - status ${ctx.response.status} `
        );
      },
    },
  },
];