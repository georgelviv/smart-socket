(function() {
  'use strict';

  angular
    .module('app.dashboard', [
      'ngRoute',
      'utils.socket',
      'app.gpio-list',
      'app.authService'
    ]);

})();
