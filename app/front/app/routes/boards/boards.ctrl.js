(function() {
  'use strict';

  angular
    .module('app.boards')
    .controller('BoardsCtrl', boardsCtrl);

  function boardsCtrl($rootScope, board, authService, AUTH_EVENTS, loggerApi, BOARD_EVENTS) {
    var vm = this;

    vm.boards = null;
    vm.newBoard = {};
    vm.showNewBoard = showNewBoard;
    vm.addBoard = addBoard;

    init();

    $rootScope.$on(AUTH_EVENTS.login, init);
    $rootScope.$on(BOARD_EVENTS.fetched, onBoardFetched);

    function init() {
      if (authService.isLoggedIn()) {
        board.get().then(null, onError);
      }

      function onError(error) {
        loggerApi.error('Error to get boards.');
      }
    }

    function onBoardFetched() {
      vm.boards = board.getBoards();
    }

    function showNewBoard(show) {
      if (show) {
        vm.newBoardForm = true;
      } else {
        vm.newBoardForm = false;
      }
    }

    function addBoard(form) {
      board.add(vm.newBoard).then(onSuccess, onError);

      function onSuccess() {
        resetForm(form);
        loggerApi.show('Board has been successfully added.');
      }

      function onError() {
        loggerApi.error('Error to add board.');
      }
    }

    function resetForm(form) {
      form.$setPristine();
      form.$setUntouched();
      vm.newBoard = {};
      vm.newBoardForm = false;
    }
  }

})();
