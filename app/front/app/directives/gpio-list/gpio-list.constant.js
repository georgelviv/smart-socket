(function() {
  'use strict';

  angular
    .module('app.gpio-list')
    .constant('GPIO_ARRAY', [
      {
        name: 'GPIO2',
        digitPin: 'D4',
        id: 2
      }
    ]);

})();
