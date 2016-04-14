(function() {
  'use strict';

  angular
    .module('app.gpio')
    .config(gpioRouter);

  function gpioRouter($routeProvider) {
    $routeProvider.
      when('/gpio', {
        templateUrl: 'routes/gpio/gpio.tpl',
        controller: 'GpioCtrl as vm',
        title: 'GPIO',
        name: 'gpio',
        access: {
          restricted: true
        }
      });
  }

})();
