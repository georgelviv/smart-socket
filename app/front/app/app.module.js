(function() {
  'use strict';

  angular
    .module('app', [
      'ngMaterial',
      'ngMessages',
      'utils.spinner',
      'utils.interceptor',
      'app.templates',
      'app.config',
      'app.authService',
      'app.header-toolbar',
      'app.main',
      'app.login',
      'app.sidebar',
      'app.dashboard',
      'app.boards'
    ]);

})();
