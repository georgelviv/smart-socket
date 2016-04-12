(function() {
  'use strict';

  angular
    .module('app.sidebar')
    .constant('SIDEBAR_NAVIGATION', [
      {
        url: '/#/dashboard',
        icon: 'dashboard',
        title: 'Dashboard',
        name: 'dashboard'
      },
      {
        url: '/#/boards',
        icon: 'select_all',
        title: 'Boards',
        name: 'boards'
      }
    ]);

})();
