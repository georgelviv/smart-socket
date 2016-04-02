(function() {
  'use strict';

  angular
    .module('app')
    .run(AppRun);

  function AppRun($rootScope) {
    $rootScope.$on('$routeChangeSuccess', onRouteChangeSuccess);

    function onRouteChangeSuccess(event, current, previous) {
      $rootScope.pageTitle = current.title;
    }
  }
})();
