(function() {
  'use strict';

  angular
    .module('app.authService')
    .constant('AUTH_API', {
      login: '/user/login',
      logout: '/user/logout',
      register: '/user/register',
      status: '/user/status'
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
