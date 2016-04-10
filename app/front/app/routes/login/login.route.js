(function() {
  'use strict';

  angular
    .module('app.login')
    .config(loginRouter);

  function loginRouter($routeProvider) {
    $routeProvider.
      when('/login', {
        templateUrl: 'routes/login/login.tpl',
        controller: 'LoginCtrl as vm',
        title: 'Sign Up/In',
        access: {
          restricted: false,
          isLogin: true
        }
      });
  }

})();
