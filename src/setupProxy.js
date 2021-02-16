const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/common',
    createProxyMiddleware({
      target: 'https://covid-test-appointments-api.herokuapp.com/',
      changeOrigin: true,
    })
  );
};
