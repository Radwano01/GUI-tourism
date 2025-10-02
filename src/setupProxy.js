const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  // Proxy API requests to avoid CORS issues in development
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://rachelle-magnetohydrodynamic-impetuously.ngrok-free.dev',
      changeOrigin: true,
      secure: true,
      headers: {
        'ngrok-skip-browser-warning': 'true',
      },
      onProxyReq: (proxyReq, req, res) => {
        // Add ngrok-skip-browser-warning header
        proxyReq.setHeader('ngrok-skip-browser-warning', 'true');
      },
      logLevel: 'debug',
    })
  );
};
