'use strict';

const serverModule = require('../index');
const authRouteModule = require('./auth');
const boardRouteModule = require('./board');
const gpioRouteModule = require('./gpio');
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
