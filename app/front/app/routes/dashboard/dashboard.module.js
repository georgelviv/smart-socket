(function() {
  'use strict';

  angular
    .module('app.dashboard', [
      'ngRoute',
      'utils.socket',
      'utils.logger',
      'app.gpio-list',
      'app.authService'
    ]);

})();
