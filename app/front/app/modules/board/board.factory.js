(function() {
  'use strict';

  angular
    .module('app.board')
    .factory('board', board);

  function board($q, $rootScope, $http, BOARD_API, BOARD_EVENTS) {
    var service = {
      get: get,
      add: add,
      getBoards: getBoards
    };

    var boards = null;

    return service;

    function getBoards() {
      return angular.copy(boards);
    }

    function get() {
      var deferred = $q.defer();

      $http.get(BOARD_API).success(onSuccess).error(onError);

      function onSuccess(data) {
        if (data.status) {
          boards = data.boards;
          deferred.resolve(data.boards);
          $rootScope.$emit(BOARD_EVENTS.fetched);
        } else {
          deferred.reject(data);
        }
      }

      function onError(error) {
        deferred.reject(error);
      }

      return deferred.promise;
    }

    function add(newBoard) {
      var deferred = $q.defer();
      var body = {
        name: newBoard.name,
        ip: newBoard.ip,
        secret: newBoard.secret
      };

      $http.post(BOARD_API, body).success(onSuccess).error(onError);

      function onSuccess(data) {
        if (data.status) {
          if (!boards) {
            boards = [];
          }
          boards.push(data.board);
          deferred.resolve(data.board);
          $rootScope.$emit(BOARD_EVENTS.fetched);
        } else {
          deferred.reject(data);
        }
      }

      function onError(error) {
        deferred.reject(error);
      }

      return deferred.promise;
    }

  }

})();
