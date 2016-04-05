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

      return service;

      function show(text, type) {
        var toast = $mdToast.simple()
          .textContent(text)
          .action('UNDO')
          .highlightAction(true)
          .hideDelay(5000)
          .position('top right');
        $mdToast.show(toast);
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
