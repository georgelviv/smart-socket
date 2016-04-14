(function() {
  'use strict';

  angular
    .module('app.gpio')
    .controller('GpioCtrl', gpioCtrl);

  function gpioCtrl($rootScope, $location, gpioService, GPIO_ARRAY, board, loggerApi, BOARD_EVENTS) {
    var vm = this;
    vm.boards = null;
    vm.gpioArray = [];
    vm.updateStatus = updateStatus;
    vm.changeStatus = changeStatus;
    init();


    $rootScope.$on(BOARD_EVENTS.fetched, onBoardFetched);

    function init() {
      if (board.getBoards()) {
        vm.boards = board.getBoards();
      } else {
        board.get().then(null, errorGenHandler('get boards.'));
      }
    }

    function setGPIOStatus(gpio, status) {
      gpioService.set(vm.currentBoard, gpio.id, status).then(onSuccess, errorGenHandler('set gpio status'));

      function onSuccess(data) {
        var status = (data.value === 'true') ? true : false;
        if (status !== gpio.status) {
          gpio.status = status;
        }
      }
    }

    function changeStatus(gpio) {
      setGPIOStatus(gpio, gpio.status);
    }

    function updateStatus() {
      if (!vm.gpioArray.length) {
        angular.copy(GPIO_ARRAY, vm.gpioArray);
      }
      vm.gpioArray.forEach(function (item) {
        getGPIOStatus(item);
      });
    }

    function getGPIOStatus(item) {
      gpioService.get(vm.currentBoard, item.id).then(onSuccess, errorGenHandler('get gpio status'));

      function onSuccess(value) {
        item.status = value;
      }
    }


    function onBoardFetched() {
      vm.boards = board.getBoards();
    }

    function errorGenHandler(action) {
      return function onError(error) {
        if (error && error.message === 'Not authorized') {
          $location.path('/login');
          loggerApi.error('You should be authorized.');
          return;
        }
        if (error.message === 'Error to find board') {
          loggerApi.error('Error to find board');
        } else if (error.err === 'wrong secret') {
          loggerApi.error('Wrong secret.');
        } else {
          loggerApi.error('Error to ' + action);
        }
        loggerApi.error('Error to ' + action);
      };
    }
  }

})();
