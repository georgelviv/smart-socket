(function() {
  'use strict';

  angular
    .module('app.dashboard')
    .config(dashboardRouter);

  function dashboardRouter($routeProvider) {
    $routeProvider.
      when('/dashboard', {
        templateUrl: 'routes/dashboard/dashboard.tpl',
        controller: 'DashboardCtrl as vm',
        title: 'Dashboard',
        name: 'dashboard',
        access: {
          restricted: true
        }
      });
  }

})();
