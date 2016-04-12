(function() {
  'use strict';

  angular
    .module('app.sidebar')
    .directive('sidebar', sidebarDirective);

  function sidebarDirective($rootScope, SIDEBAR_NAVIGATION, AUTH_EVENTS, authService) {
    var directive = {
      link: link,
      controllerAs: 'vm',
      templateUrl: 'directives/sidebar/sidebar.tpl',
      restrict: 'E',
      scope: {
      }
    };

    return directive;

    function link(scope) {
      scope.navigation = SIDEBAR_NAVIGATION;
      scope.current = null;
      scope.user = authService.getUser();

      $rootScope.$on(AUTH_EVENTS.login, onLogin);
      $rootScope.$on(AUTH_EVENTS.logout, onLogout);
      $rootScope.$on('$routeChangeSuccess', onRouteChangeSuccess);

      function onRouteChangeSuccess(event, current, prev) {
        scope.current = current.$$route.name;
      }

      function onLogin() {
        scope.user = authService.getUser();
      }

      function onLogout() {
        scope.user = null;
      }

    }
  }

})();
