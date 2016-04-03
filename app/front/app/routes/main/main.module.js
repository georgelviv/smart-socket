(function() {
  'use strict';

  angular
    .module('app.main', [
      'ngRoute',
      'utils.socket',
      'app.gpio-list'
    ]);

})();
