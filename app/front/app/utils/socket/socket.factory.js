(function() {
  'use strict';

  angular
    .module('utils.socket')
    .factory('socketApi', socketApi);

  function socketApi() {
      var service = {
        emit: emit,
        on: on
      };

      var socket = io.connect('/');

      return service;

      function emit(event, data) {
        if (!event) {
          console.warn('SocketAPI: to emit, pass event name');
          return;
        }
        var dataToEmit = data || null;
        socket.emit(event, dataToEmit);
      }

      function on(event, cb) {
        if (!event || !cb) {
          console.warn('SocketAPI: to listen, pass event name and cb');
          return;
        }
        if (!angular.isFunction(cb)) {
          console.warn('SocketAPI: to listen, cb should be function');
          return;
        }
        socket.on(event, cb);
      }
  }

})();
