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
      'app.header-toolbar',
      'app.main',
      'app.login',
      'app.dashboard'
    ]);

})();
