(function() {
  'use strict';

  angular
    .module('app.dashboard')
    .controller('DashboardCtrl', dashboardCtrl);

  function dashboardCtrl($rootScope, AUTH_EVENTS, authService) {
    var vm = this;

    vm.username = null;
    $rootScope.$on(AUTH_EVENTS.login, onLogin);
    $rootScope.$on(AUTH_EVENTS.logout, onLogout);

    function onLogin() {
      vm.username = authService.getUserStatus().username;

    }

    function onLogout() {
      vm.username = null;
    }
  }

})();
