(function() {
  'use strict';

  angular
    .module('app.gpio-service')
    .factory('gpioService', gpioService);

  function gpioService($q, $http, GPIO_API) {
    var service = {
      get: get,
      set: set
    };


    return service;

    function get(boardId, gpioNum) {
      var deferred = $q.defer();

      $http.get(GPIO_API + '/' + boardId + '/get/' + gpioNum).success(onSuccess).error(onError);

      return deferred.promise;

      function onSuccess(data) {
        if (data.status) {
          deferred.resolve(data);
        } else {
          deferred.reject(data);
        }
      }

      function onError(error) {
        deferred.reject(error);
      }
    }

    function set(boardId, gpioNum, value) {
      var deferred = $q.defer();
      var reqUrl = GPIO_API + '/' + boardId + '/get/' + gpioNum + '/set/' + value;
      $http.get(reqUrl).success(onSuccess).error(onError);

      return deferred.promise;

      function onSuccess(data) {
        if (data.status) {
          deferred.resolve(data);
        } else {
          deferred.reject(data);
        }
      }

      function onError(error) {
        deferred.reject(error);
      }
    }

  }

})();
