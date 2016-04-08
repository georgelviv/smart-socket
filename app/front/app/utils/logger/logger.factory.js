(function() {
  'use strict';

  angular
    .module('utils.logger')
    .factory('loggerApi', loggerApi);

  function loggerApi($mdToast) {
      var service = {
        show: show,
        error: error
      };
      var timeout = 1000;
      var timer = {};

      return service;

      function show(text) {
        checkTime(text);
        var toast = $mdToast.simple()
          .textContent(text)
          .action('UNDO')
          .highlightAction(true)
          .hideDelay(5000)
          .position('top right');
        $mdToast.show(toast);
      }

      function checkTime(text) {
        if (timer.text) {
          if ((new Date().getTime() - timer.text) > timeout) {
            console.log(1);
          } else {
            console.log(2);
          }
        } else {
          timer.text = new Date().getTime();
          return true;
        }
      }

      function error(text) {
        var msg = '';
        if (angular.isObject(text)) {
          if (text.errno === 'ETIMEDOUT' && text.address) {
            msg = 'Error to connect: ' + text.address;
          } else {
            msg = 'Error: ' + text.errno;
          }
        } else {
          msg = text;
        }
        show(msg, 'error');
      }

  }

})();
