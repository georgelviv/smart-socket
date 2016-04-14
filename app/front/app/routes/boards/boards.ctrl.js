(function() {
  'use strict';

  angular
    .module('app.boards')
    .controller('BoardsCtrl', boardsCtrl);

  function boardsCtrl($rootScope, $mdDialog, $location, board, authService,
                      AUTH_EVENTS, loggerApi, BOARD_EVENTS) {
    var vm = this;

    vm.boards = null;
    vm.newBoard = {};
    vm.showNewBoard = showNewBoard;
    vm.confirmDelete = confirmDelete;
    vm.addBoard = addBoard;
    vm.editBoard = editBoard;
    vm.submitEditBoard = submitEditBoard;
    vm.getStatus = getStatus;

    init();

    $rootScope.$on(AUTH_EVENTS.login, init);
    $rootScope.$on(BOARD_EVENTS.fetched, onBoardFetched);

    function init() {
      if (authService.isLoggedIn()) {
        if (board.getBoards()) {
          vm.boards = board.getBoards();
        } else {
          board.get().then(null, errorGenHandler('get boards.'));
        }
      }
    }

    function getStatus(boardInstance) {
      board.checkStatus(boardInstance.id).then(onSuccess, errorGenHandler('check board status.'));

      function onSuccess(data) {
        if (data) {
          if (data.status !== undefined) {
            boardInstance.connected = data.status;
          } else {
            boardInstance.connected = false;
          }
          if (data.err === 'wrong secret') {
            loggerApi.error('Wrong secret key.');
          }
        }
      }
    }

    function submitEditBoard(boardInstance, form) {
      var original = angular.copy(boardInstance);
      delete original.edit;
      delete original.connected;
      if (!angular.equals(original, boardInstance.edit)) {
        board.edit(boardInstance.id, boardInstance.edit).then(onSuccess, errorGenHandler('edit board.'));
      } else {
        boardInstance.isEdit = false;
      }

      function onSuccess() {
        resetForm(form, boardInstance);
        boardInstance.isEdit = false;
        loggerApi.show('Board has been edited.');
      }
    }

    function editBoard(board, setEdit) {
      if (setEdit) {
        board.isEdit = true;
        if (!board.edit) {
          board.edit = angular.copy(board);
        }
      } else {
        board.isEdit = false;
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
        board.remove(currentBoard.id).then(onSuccess, errorGenHandler('delete board.'));
      }

      function onSuccess() {
        loggerApi.show('Board has been removed');
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
      board.add(vm.newBoard).then(onSuccess, errorGenHandler('add board.'));

      function onSuccess() {
        resetForm(form);
        loggerApi.show('Board has been successfully added.');
      }
    }

    function resetForm(form, board) {
      form.$setPristine();
      form.$setUntouched();
      if (board) {
        delete board.edit;
      } else {
        vm.newBoard = {};
        vm.newBoardForm = false;
      }
    }

    function errorGenHandler(action) {
      return function onError(error) {
        if (error && error.message === 'Not authorized') {
          $location.path('/login');
          loggerApi.error('You should be authorized.');
          return;
        }
        loggerApi.error('Error to ' + action);
      };
    }

  }

})();
