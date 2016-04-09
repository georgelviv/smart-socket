(function() {
  'use strict';

  angular
    .module('app.login', [
      'ngRoute',
      'utils.compareTo',
      'utils.logger',
      'app.authService'
    ]);

})();
