'use strict';

const express = require('express');
const nconf = require('nconf');
const middlewares = require('./middlewares');

let isInited = false;
let serverModule = {
  init: init
};

module.exports = serverModule;

function init() {
  if (isInited) {
    console.log('Server module is already inited!');
    return;
  }
  isInited = true;

  serverModule.app = express();
  serverModule.server = require('http').Server(serverModule.app);

  let app = serverModule.app;
  middlewares.init();

  app.use(express.static(nconf.get('frontPath') + '/'));

  let routes = require('./routes').init();
  serverModule.server = app.listen(nconf.get('PORT'), onListen);

  function onListen() {
    console.log('Listen on port:' + serverModule.server.address().port);
  }
}
