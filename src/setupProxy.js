const { createProxyMiddleware } = require('http-proxy-middleware');

// eslint-disable-next-line no-undef
module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:42006', //local dev
      changeOrigin: true,
      pathRewrite: { '^/api/': '/' }, //remove /api (used here for dev)
    })
  );
};
