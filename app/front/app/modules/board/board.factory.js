(function() {
  'use strict';

  angular
    .module('app.board')
    .factory('board', board);

  function board($q, $rootScope, $http, BOARD_API) {
    var service = {
      get: get
    };

    var boards = null;

    return service;

    function get() {
      var deferred = $q.defer();

      $http.get(BOARD_API).success(onSuccess).error(onError);

      function onSuccess(data) {
        console.log(1, data);
        deferred.resolve(data);
      }

      function onError(error) {
        console.log(2, error);
        deferred.reject(error);
      }

      return deferred.promise;
    }

  }

})();
