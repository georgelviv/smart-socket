'use strict';

let espModule = require('../esp');

let gpioSocketModule = {
  init: init
};

module.exports = gpioSocketModule;

function init(socket) {
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
