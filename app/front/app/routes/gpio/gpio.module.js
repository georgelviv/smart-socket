(function() {
  'use strict';

  angular
    .module('app.gpio', [
      'ngRoute',
      'app.gpio-service',
      'app.board'
    ]);

})();
