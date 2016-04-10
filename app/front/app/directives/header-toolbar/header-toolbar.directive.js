(function() {
  'use strict';

  angular
    .module('app.header-toolbar')
    .directive('headerToolbar', headerToolbarDirective);

  function headerToolbarDirective($rootScope, $mdDialog, authService, AUTH_EVENTS) {
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
      scope.isLogged = false;
      scope.showConfirm = showConfirm;
      $rootScope.$on(AUTH_EVENTS.login, onLogin);
      $rootScope.$on(AUTH_EVENTS.logout, onLogout);

      function onLogin() {
        scope.isLogged = true;
      }

      function onLogout() {
        scope.isLogged = false;
      }

      function showConfirm(ev) {
        var confirm = $mdDialog.confirm()
              .title('Would you like to logout')
              .textContent('All of the banks have agreed to forgive you your debts.')
              .ariaLabel('Lucky day')
              .targetEvent(ev)
              .ok('Please do it!')
              .cancel('Sounds like a scam');
        $mdDialog.show(confirm).then(function() {
          scope.status = 'You decided to get rid of your debt.';
        }, function() {
          scope.status = 'You decided to keep your debt.';
        });
    }

    }
  }

})();
