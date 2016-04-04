(function() {
  'use strict';

  angular
    .module('app.gpio-list')
    .directive('gpioList', gpioListDirective);

  function gpioListDirective() {
    var directive = {
      controller: gpioListCtrl,
      controllerAs: 'vm',
      templateUrl: 'directives/gpio-list/gpio-list.tpl',
      restrict: 'E',
      scope: {
      }
    };

    return directive;

    function gpioListCtrl($q, $scope, $timeout, GPIO_ARRAY, socketApi, spinnerApi) {
      var vm = this;
      vm.gpioArray = [];
      vm.changeStatus = changeStatus;

      init();
      socketApi.on('app.gpio', onGPIOMsg);


      function changeStatus(gpio) {
        setGPIOStatus(gpio, gpio.status);
      }

      function init() {
        $timeout(spinnerApi.show);
        angular.copy(GPIO_ARRAY, vm.gpioArray);
        vm.gpioArray.forEach(function (item) {
          item.isInit = false;
          getGPIOStatus(item);
        });
      }

      function onGPIOMsg(gpio) {
        $scope.$apply(function () {
          var current = (vm.gpioArray.filter(function (item) {
            return item.id === gpio.id;
          })[0]);
          if (current.status !== gpio.status) {
            current.status = gpio.status;
          }
          checkInit(current);
        });
      }

      function checkInit(current) {
        current.isInit = true;
        var notInited = (vm.gpioArray.filter(function (item) {
          return item.isInit === false;
        })[0]);
        if (!notInited) {
          spinnerApi.hide();
        }
      }

      function getGPIOStatus(gpio) {
        socketApi.emit('app.gpio', {
          id: gpio.id,
          method: 'get'
        });
      }

      function setGPIOStatus(gpio, status) {
        socketApi.emit('app.gpio', {
          id: gpio.id,
          method: 'set',
          value: status
        });
      }

    }
  }

})();
