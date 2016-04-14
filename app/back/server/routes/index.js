'use strict';

let serverModule = require('../index');
let authRouteModule = require('./auth');
let boardRouteModule = require('./board');
let gpioRouteModule = require('./gpio');
let isInited = false;

module.exports.init = init;

function init() {
  if (isInited) {
    console.log('Server route module is already inited!');
    return;
  }
  isInited = true;

  let app = serverModule.app;

  authRouteModule.init();
  boardRouteModule.init();
  gpioRouteModule.init();

  app.get('*', (req, res) => {
    res.redirect('/');
  });

}
