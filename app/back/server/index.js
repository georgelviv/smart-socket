var express = require('express');
var nconf = require('nconf');

var isInited = false;
var serverModule = {
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

  var app = serverModule.app;
  var server = serverModule.server;

  app.use(express.static(nconf.get('frontPath') + '/'));

  routes = require('./routes').init();
  server = app.listen(nconf.get('PORT'), onListen);

  function onListen() {
    console.log('Listen on port:' + server.address().port);
  }
}
