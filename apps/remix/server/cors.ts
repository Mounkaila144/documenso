import type { Context, Next } from 'hono';

/**
 * Middleware qui configure les en-têtes CORS pour autoriser toutes les origines.
 */
export const corsMiddleware = async (c: Context, next: Next) => {
  // Définir Access-Control-Allow-Origin à '*' pour autoriser toutes les origines
  c.res.headers.set('Access-Control-Allow-Origin', '*');
  c.res.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS, HEAD');
  c.res.headers.set(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization, X-Requested-With, X-CSRF-TOKEN, Accept, Origin, X-Auth-Token, Cache-Control, X-Requested-With'
  );
  
  // Comme nous utilisons '*' pour Access-Control-Allow-Origin, on ne peut pas utiliser credentials
  // Si vous avez besoin de credentials, il faudra spécifier l'origine exacte au lieu de '*'
  // c.res.headers.set('Access-Control-Allow-Credentials', 'true');
  
  c.res.headers.set('Access-Control-Max-Age', '86400'); // 24 heures
  
  // Pour les requêtes OPTIONS, répondre immédiatement avec un statut 204 (No Content)
  if (c.req.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: c.res.headers
    });
  }
  
  // Pour les autres méthodes, continuer le traitement normal
  await next();
  
  return c.res;
}; 