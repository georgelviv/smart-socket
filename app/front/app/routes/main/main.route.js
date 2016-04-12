(function() {
  'use strict';

  angular
    .module('app.main')
    .config(mainRouter);

  function mainRouter($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'routes/main/main.tpl',
        controller: 'MainCtrl as vm',
        title: 'Main',
        name: 'main',
        access: {
          restricted: false
        }
      }).otherwise({
        redirectTo: '/'
      });
  }

})();
