(function() {
  'use strict';

  angular
    .module('app.gpio-service')
    .constant('GPIO_API', '/gpio')
    .constant('GPIO_ARRAY', [
      {
        name: 'GPIO4',
        digitPin: 'D2',
        id: 4
      }
    ]);

})();
