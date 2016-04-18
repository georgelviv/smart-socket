(function() {
  'use strict';

  angular
    .module('app.header-toolbar')
    .controller('HeaderToolbarCtrl', HeaderToolbarCtrl)
    .directive('headerToolbar', headerToolbarDirective);

  function headerToolbarDirective() {
    var directive = {
      controller: 'HeaderToolbarCtrl',
      controllerAs: 'headerToolbar',
      templateUrl: 'directives/header-toolbar/header-toolbar.tpl',
      restrict: 'E',
      scope: {}
    };

    return directive;
  }

  function HeaderToolbarCtrl($rootScope, $mdDialog, $location,
                             $route, authService, AUTH_EVENTS, sidebarApi) {
    var headerToolbar = this;
    headerToolbar.isLogged = authService.isLoggedIn();
    headerToolbar.showConfirm = showConfirm;
    headerToolbar.toggleSidebar = toggleSidebar;

    $rootScope.$on(AUTH_EVENTS.login, onLogin);
    $rootScope.$on(AUTH_EVENTS.logout, onLogout);

    function toggleSidebar() {
      sidebarApi.toggle();
    }

    function onLogin() {
      headerToolbar.isLogged = true;
    }

    function onLogout() {
      headerToolbar.isLogged = false;
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

})();
