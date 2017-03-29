#!/usr/bin/env node
const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const ioServer = require('socket.io');
const db = require('./db.js');
const guestTip = require('./guest-tip/index.js');
const dashboard = require('./dashboard/index.js');
const authenticate = require('./authenticate/index.js');
const session = require('express-session');
const request = require('request');

const args = process.argv.slice(2);
const useWebpack = args.indexOf('-w') !== -1;
const app = express();
const { PORT = 8080 } = process.env;
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(session({ secret: 'my secret secret session you never guess. sure i will. no.', cookie: { maxAge: 60000 } }));
app.use((req, res, next) => {
  if (['/dashboard', '/overlay', '/tip'].indexOf(req.path) !== -1) {
    request.get({ url: `http://127.0.0.1:${PORT}`, headers: req.headers }, (error, response, body) => {
      res.send(body);
    });
  } else {
    next();
  }
});

const dbConnectionPromise = db.connect();

const start = () => {
  dbConnectionPromise.then(dbClient => {
    const io = ioServer.listen(app.listen(PORT, () => {
      console.log(`App started successfully on port ${PORT}!`);
    }));
    guestTip(app, dbClient, io);
    dashboard(app, dbClient, io);
    authenticate(app, dbClient, io);
  }, err => {
    console.error(err);
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
