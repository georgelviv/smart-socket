(function() {
  'use strict';

  angular
    .module('app.boards')
    .controller('BoardsCtrl', boardsCtrl);

  function boardsCtrl($rootScope, $mdDialog, board, authService,
                      AUTH_EVENTS, loggerApi, BOARD_EVENTS) {
    var vm = this;

    vm.boards = null;
    vm.newBoard = {};
    vm.showNewBoard = showNewBoard;
    vm.confirmDelete = confirmDelete;
    vm.addBoard = addBoard;

    init();

    $rootScope.$on(AUTH_EVENTS.login, init);
    $rootScope.$on(BOARD_EVENTS.fetched, onBoardFetched);

    function init() {
      if (authService.isLoggedIn()) {
        if (board.getBoards()) {
          vm.boards = board.getBoards();
        } else {
          board.get().then(null, onError);
        }

      }

      function onError(error) {
        loggerApi.error('Error to get boards.');
      }
    }

    function confirmDelete(ev, currentBoard) {
      var confirm = $mdDialog.confirm()
            .title('Delete current board?')
            .ariaLabel('Delete board')
            .targetEvent(ev)
            .ok('Delete')
            .cancel('Cancel');
      $mdDialog.show(confirm).then(onConfirm);

      function onConfirm() {
        board.remove(currentBoard.id).then(onSuccess, onError);
      }

      function onSuccess() {
        loggerApi.show('Board has been removed');
      }
      function onError() {
        loggerApi.error('Error to delete board.');
      }
    }

    function scrollTop() {
      $('.main__content-wrapper').parent().animate({
          scrollTop: $('.boards__top-card').offset().top
      }, 500);
    }

    function onBoardFetched() {
      vm.boards = board.getBoards();
    }

    function showNewBoard(show) {
      if (show) {
        vm.newBoardForm = true;
        scrollTop();
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
