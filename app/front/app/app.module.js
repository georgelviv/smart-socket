(function() {
  'use strict';

  angular
    .module('app', [
      'ngMaterial',
      'utils.spinner',
      'utils.logger',
      'app.templates',
      'app.config',
      'app.header-toolbar',
      'app.main',
      'app.login'
    ]);

})();
