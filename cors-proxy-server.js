// Serveur proxy CORS autonome
// Pour exécuter : node cors-proxy-server.js

const express = require('express');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const PORT = 8888;

// Configurer CORS pour permettre toutes les origines
app.use(cors({
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
  credentials: false,
  maxAge: 86400
}));

// Middleware pour traiter toutes les requêtes OPTIONS immédiatement
app.options('*', (req, res) => {
  res.status(204).end();
});

// Middleware de débogage
app.use((req, res, next) => {
  console.log(`[PROXY] ${req.method} ${req.url}`);
  next();
});

// Configurer le proxy pour l'API locale
const apiProxy = createProxyMiddleware({
  target: 'http://localhost:3000',
  changeOrigin: true,
  onProxyReq: (proxyReq, req, res) => {
    console.log(`Requête proxifiée vers: ${proxyReq.path}`);
  },
  onProxyRes: (proxyRes, req, res) => {
    // Forcer les en-têtes CORS pour remplacer ceux de l'API cible
    proxyRes.headers['Access-Control-Allow-Origin'] = '*';
    proxyRes.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, PATCH, OPTIONS, HEAD';
    proxyRes.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization, X-Requested-With, X-CSRF-TOKEN, Accept, Origin, X-Auth-Token, Cache-Control';
    proxyRes.headers['Access-Control-Max-Age'] = '86400';
    console.log(`Réponse reçue avec statut: ${proxyRes.statusCode}`);
  }
});

// Appliquer le proxy à toutes les routes
app.use('/', apiProxy);

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Serveur proxy CORS démarré sur http://localhost:${PORT}`);
  console.log(`Toutes les requêtes seront transférées à http://localhost:3000 avec CORS activé`);
  console.log(`Pour accéder à l'API, utilisez http://localhost:${PORT}/api/...`);
}); 