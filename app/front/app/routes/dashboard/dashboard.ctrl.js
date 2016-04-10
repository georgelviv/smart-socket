(function() {
  'use strict';

  angular
    .module('app.dashboard')
    .controller('DashboardCtrl', dashboardCtrl);

  function dashboardCtrl($rootScope, AUTH_EVENTS, authService, loggerApi) {
    var vm = this;

    vm.username = null;
    $rootScope.$on(AUTH_EVENTS.login, onLogin);
    $rootScope.$on(AUTH_EVENTS.logout, onLogout);

    function init() {
      if (authService.isLoggedIn()) {
        vm.username = authService.getUser().username;
      }
    }

    function onLogin() {
      vm.username = authService.getUser().username;
    }

    function onLogout() {
      vm.username = null;
    }
  }

})();
