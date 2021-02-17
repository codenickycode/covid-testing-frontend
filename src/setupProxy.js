const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/common',
    createProxyMiddleware({
      target: 'https://covid-test-appointments.herokuapp.com/common',
      changeOrigin: true,
    })
  );
};
