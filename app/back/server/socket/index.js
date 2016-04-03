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
    socket.on('app.gpio', function (gpio) {
        if (gpio.method === 'get') {
          espModule.get(gpio.id, onResult);
        }
        if (gpio.method === 'set') {
          espModule.set(gpio.id, gpio.value, onResult);
        }

        function onResult(data) {
          socket.emit('app.gpio', {
            id: gpio.id,
            status: !!(Number(data))
          });
        }
    });
  }
}
