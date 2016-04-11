(function() {
  'use strict';

  angular
    .module('app.gpio-list')
    .directive('gpioList', gpioListDirective);

  function gpioListDirective($q, $timeout, $injector, GPIO_ARRAY, socketApi, spinnerApi, loggerApi) {
    var directive = {
      link: link,
      controllerAs: 'vm',
      templateUrl: 'directives/gpio-list/gpio-list.tpl',
      restrict: 'E',
      scope: {
      }
    };

    return directive;

    function link(scope) {
      scope.gpioArray = [];
      scope.isGettingStatus = false;
      scope.changeStatus = changeStatus;
      scope.updateStatus = updateStatus;

      socketApi.on('app.gpio', onGPIOMsg);


      function changeStatus(gpio) {
        setGPIOStatus(gpio, gpio.status);
      }

      function updateStatus() {
        $timeout(spinnerApi.show);
        if (!scope.gpioArray.length) {
          angular.copy(GPIO_ARRAY, scope.gpioArray);
        }
        scope.isGettingStatus = true;
        scope.gpioArray.forEach(function (item) {
          item.isInit = false;
          getGPIOStatus(item);
        });
      }

      function onGPIOMsg(gpio) {
        scope.$apply(function () {
          var current = (scope.gpioArray.filter(function (item) {
            return item.id === gpio.id;
          })[0]);
          checkInit(current);
          if (gpio.error) {
            loggerApi.error(gpio.error);
          }
          if (current.status !== gpio.status) {
            current.status = gpio.status;
          }
        });
      }

      function checkInit(current) {
        current.isInit = true;
        var notInited = (scope.gpioArray.filter(function (item) {
          return item.isInit === false;
        })[0]);
        if (!notInited) {
          spinnerApi.hide();
          scope.isGettingStatus = false;
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
