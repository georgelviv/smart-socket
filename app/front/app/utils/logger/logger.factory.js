(function() {
  'use strict';

  angular
    .module('utils.logger')
    .factory('loggerApi', loggerApi);

  function loggerApi($injector) {
      var service = {
        show: show,
        error: error
      };

      var $mdToast = $injector.get('$mdToast');
      var timeout = 1000;
      var timer = {};

      return service;

      function show(text) {
        if (!checkTime(text)) {
          return;
        }
        var toast = $mdToast.simple()
          .textContent(text)
          .action('UNDO')
          .highlightAction(true)
          .hideDelay(5000)
          .position('top right');
        $mdToast.show(toast);
      }

      function checkTime(text) {
        if (timer[text]) {
          if ((new Date().getTime() - timer[text]) > timeout) {
            delete timer[text];
            return true;
          } else {
            return false;
          }
        } else {
          timer[text] = new Date().getTime();
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
