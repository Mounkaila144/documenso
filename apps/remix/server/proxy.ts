import type { Context } from 'hono';
import { createProxyMiddleware } from 'http-proxy-middleware';

/**
 * Cette classe sert à configurer un proxy CORS pour les requêtes API.
 * Elle sera utilisée si les autres méthodes CORS échouent.
 * 
 * Pour l'utiliser, vous devrez incorporer ce proxy dans votre serveur Express principal.
 */
export class CorsProxy {
  static configureProxy(apiPath: string, targetUrl: string) {
    return createProxyMiddleware({
      target: targetUrl,
      changeOrigin: true,
      pathRewrite: {
        [`^${apiPath}`]: '',
      },
      onProxyRes: (proxyRes) => {
        // Ajouter les en-têtes CORS à toutes les réponses
        proxyRes.headers['Access-Control-Allow-Origin'] = '*';
        proxyRes.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, PATCH, OPTIONS, HEAD';
        proxyRes.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization, X-Requested-With, X-CSRF-TOKEN, Accept, Origin, X-Auth-Token, Cache-Control';
        proxyRes.headers['Access-Control-Max-Age'] = '86400';
      },
    });
  }
} 