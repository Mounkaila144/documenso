import cors from 'cors';

/**
 * Middleware Express.js pour configurer CORS et autoriser toutes les origines.
 * Ceci est une alternative au middleware Hono pour les applications Express.
 */
export const expressCorsMiddleware = cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS', 'HEAD'],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'X-Requested-With',
    'X-CSRF-TOKEN',
    'Accept',
    'Origin',
    'X-Auth-Token',
    'Cache-Control'
  ],
  exposedHeaders: ['Content-Range', 'X-Content-Range'],
  maxAge: 86400,
  optionsSuccessStatus: 204,
  credentials: false
}); 