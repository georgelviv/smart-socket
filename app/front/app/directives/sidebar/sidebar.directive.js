(function() {
  'use strict';

  angular
    .module('app.sidebar')
    .directive('sidebar', sidebarDirective);

  function sidebarDirective($rootScope, AUTH_EVENTS, authService) {
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
      scope.user = authService.getUser();

      $rootScope.$on(AUTH_EVENTS.login, onLogin);
      $rootScope.$on(AUTH_EVENTS.logout, onLogout);


      function onLogin() {
        scope.user = authService.getUser();
      }

      function onLogout() {
        scope.user = null;
      }

    }
  }

})();
