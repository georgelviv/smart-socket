(function() {
  'use strict';

  angular
    .module('app.authService')
    .constant('api', {
      login: '/login',
      logout: '/logout',
      register: '/register'
    })
    .constant('USER_ROLES', {
      all: '*',
      admin: 'admin',
      user: 'user',
      guest: 'guest'
    })
    .constant('AUTH_EVENTS', {
      login: 'auth-login',
      logout: 'auth-logout'
    });

})();
