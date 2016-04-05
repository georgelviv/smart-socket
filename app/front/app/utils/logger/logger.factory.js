(function() {
  'use strict';

  angular
    .module('utils.logger')
    .factory('loggerApi', loggerApi);

  function loggerApi($mdToast) {
      var service = {
        show: show
      };

      return service;

      function show(text) {
        $mdToast.show(
          $mdToast.simple()
            .textContent(text)
            .position('top right')
            .hideDelay(5000)
        );
      }
  }

})();
