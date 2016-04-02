'use strict';

let socketio = require('socket.io');
let serverModule = require('../index');
let espModule = require('../esp');

let isInited = false;
let socketModule = {
  init: init
};

module.exports = socketModule;

function init() {
  if (isInited) {
    console.log('Socket Module module is already inited!');
    return;
  }
  isInited = true;

  let server = serverModule.server;
  socketModule.io = socketio.listen(serverModule.server);
  socketModule.io.on('connection', onConnection);

  function onConnection(socket) {
    socket.on('app.btn', function (data) {
      espModule.blink(onBlink);
      function onBlink() {
        socket.emit('app.btnCb');
      }
    });
  }
}
