(function() {
  'use strict';

  angular
    .module('app.sidebar')
    .factory('sidebarApi', sidebarApi);

  function sidebarApi($mdSidenav) {
      var service = {
        toggle: toggle,
        close: close,
        open: open
      };

      return service;

      function toggle() {
        $mdSidenav('sidebar').toggle();
      }

      function open() {
        $mdSidenav('sidebar').open();
      }

      function close() {
        $mdSidenav('sidebar').close();
      }
  }

})();
