(function() {
  'use strict';

  angular
    .module('app.header-toolbar')
    .directive('headerToolbar', headerToolbarDirective);

  function headerToolbarDirective($rootScope, $mdDialog, $location,
                                  $route, authService, AUTH_EVENTS, sidebarApi) {
    var directive = {
      link: link,
      controllerAs: 'vm',
      templateUrl: 'directives/header-toolbar/header-toolbar.tpl',
      restrict: 'E',
      scope: {
      }
    };

    return directive;

    function link(scope) {
      scope.isLogged = authService.isLoggedIn();
      scope.showConfirm = showConfirm;
      scope.toggleSidebar = toggleSidebar;

      $rootScope.$on(AUTH_EVENTS.login, onLogin);
      $rootScope.$on(AUTH_EVENTS.logout, onLogout);

      function toggleSidebar() {
        sidebarApi.toggle();
      }

      function onLogin() {
        scope.isLogged = true;
      }

      function onLogout() {
        scope.isLogged = false;
      }

      function showConfirm(ev) {
        var confirm = $mdDialog.confirm()
              .title('Would you like to logout?')
              .targetEvent(ev)
              .ok('Logout')
              .cancel('Cancel');
        $mdDialog.show(confirm).then(onConfirm);

        function onConfirm() {
          authService.logout().then(onCb, onCb);

          function onCb() {
            $location.path('/');
            $route.reload();
          }
        }
    }

    }
  }

})();
