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

  let app = serverModule.app;
  let server = serverModule.server;

  app.use(express.static(nconf.get('frontPath') + '/'));

  let routes = require('./routes').init();
  server = app.listen(nconf.get('PORT'), () => {
    console.log('Listen on port:' + server.address().port);
  });
}
