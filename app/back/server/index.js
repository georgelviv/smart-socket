'use strict';

let express = require('express');
let nconf = require('nconf');

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

  serverModule.app.use(express.static(nconf.get('frontPath') + '/'));

  let routes = require('./routes').init();
  serverModule.server = serverModule.app.listen(nconf.get('PORT'), onListen);

  function onListen() {
    let socket = require('./socket').init();
    console.log('Listen on port:' + serverModule.server.address().port);
  }
}
