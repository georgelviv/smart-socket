(function() {
  'use strict';

  angular
    .module('app')
    .run(AppRun);

  function AppRun($rootScope, $route, $location, authService) {
    $rootScope.$on('$routeChangeSuccess', onRouteChangeSuccess);
    $rootScope.$on('$routeChangeStart', onRouteChangeStart);

    function onRouteChangeSuccess(event, current, previous) {
      $rootScope.pageTitle = current.title;
    }

    function onRouteChangeStart(event, next, current) {
      if (authService.getUser() === null) {
        authService.getUserStatus().then(check, check);
      } else {
        check();
      }
      $rootScope.isLoggedIn = authService.isLoggedIn();

      function check() {
        if (next.access && next.access.restricted && authService.isLoggedIn() === false) {
          $location.path('/login');
          $route.reload();
        }
        if (next.access && next.access.isLogin && authService.isLoggedIn() === true) {
          $location.path('/dashboard');
          $route.reload();
        }
      }
    }
  }
})();
