#!/usr/bin/env node
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const guestTip = require('./guest-tip/index.js');

const args = process.argv.slice(2);
const useWebpack = args.indexOf('-w') !== -1;

const app = express();
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
guestTip(app);

const { PORT = 8080 } = process.env;
const start = () => {
  app.listen(PORT, () => {
    console.log(`App started on port ${PORT}!`);
  });
};

if (!useWebpack) {
  app.use(express.static(path.join(__dirname, 'dist')));
  start();
} else {
  const applyWebpack = () => {
    // Disabling global require so it won't require that dependency in prod
    /* eslint-disable global-require */
    const webpack = require('webpack');
    const webpackMiddleware = require('webpack-dev-middleware');
    const webpackHotMiddleware = require('webpack-hot-middleware');
    const getWebpackConfig = require('./bin/get-webpack-config.js');
    /* eslint-enable global-require */

    const webpackConfig = getWebpackConfig({ isWebpackDevServer: true });
    const webpackCompiler = webpack(webpackConfig);
    const webpackDevMiddlewareInstance = webpackMiddleware(webpackCompiler,
      {
        publicPath: '',
        noInfo: false,
        quiet: false
      }
    );

    app.use(webpackDevMiddlewareInstance);
    app.use(webpackHotMiddleware(webpackCompiler));
    // start as soon as middleware ready.
    webpackDevMiddlewareInstance.waitUntilValid(start);
  };
  applyWebpack();
}
