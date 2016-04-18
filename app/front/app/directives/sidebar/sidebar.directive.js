(function() {
  'use strict';

  angular
    .module('app.sidebar')
    .controller('SidebarCtrl', SidebarCtrl)
    .directive('sidebar', sidebarDirective);

  function sidebarDirective() {
    var directive = {
      controller: SidebarCtrl,
      controllerAs: 'sidebar',
      templateUrl: 'directives/sidebar/sidebar.tpl',
      restrict: 'E',
      scope: {
      }
    };

    return directive;
  }

  function SidebarCtrl($rootScope, SIDEBAR_NAVIGATION, AUTH_EVENTS, authService) {
    var sidebar = this;
    sidebar.navigation = SIDEBAR_NAVIGATION;
    sidebar.current = null;
    sidebar.user = authService.getUser();

    $rootScope.$on(AUTH_EVENTS.login, onLogin);
    $rootScope.$on(AUTH_EVENTS.logout, onLogout);
    $rootScope.$on('$routeChangeSuccess', onRouteChangeSuccess);

    function onRouteChangeSuccess(event, current, prev) {
      sidebar.current = current.$$route.name;
    }

    function onLogin() {
      sidebar.user = authService.getUser();
    }

    function onLogout() {
      sidebar.user = null;
    }

  }

})();
