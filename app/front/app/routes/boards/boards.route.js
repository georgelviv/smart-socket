(function() {
  'use strict';

  angular
    .module('app.boards')
    .config(boardsRouter);

  function boardsRouter($routeProvider) {
    $routeProvider.
      when('/boards', {
        templateUrl: 'routes/boards/boards.tpl',
        controller: 'BoardsCtrl as vm',
        title: 'Boards',
        name: 'boards',
        access: {
          restricted: true
        }
      });
  }

})();
