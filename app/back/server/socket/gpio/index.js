'use strict';

let espModule = require('../../esp');

let isInited = false;
let gpioSocketModule = {
  init: init
};

module.exports = gpioSocketModule;

function init(socket) {
  if (isInited) {
    console.log('gpioSocket Module module is already inited!');
    return;
  }
  isInited = true;

  socket.on('app.gpio', function (gpio) {
      if (gpio.method === 'get') {
        espModule.get(gpio.id, onResult);
      }
      if (gpio.method === 'set') {
        espModule.set(gpio.id, gpio.value, onResult);
      }

      function onResult(error, data) {
        socket.emit('app.gpio', {
          id: gpio.id,
          error: (error) ? error : null,
          status: !!(Number(data))
        });
      }
  });
}
