(function() {
  'use strict';

  angular
    .module('app.authService')
    .factory('authService', authService);

  function authService($http, api, Session) {
      var service = {
        login: login,
        register: register,
        isAuthenticated: isAuthenticated,
        isAuthorized: isAuthorized
      };

      return service;

      function register(userForm) {
        return $http.post(api.register, userForm).then(function (res) {
          return res.data;
        });
      }

      function login(credentials) {
        return $http.post(api.login, credentials).then(function (res) {
          var data = res.data;
          Session.create(data._id, data.role);
          return res.data;
        });
      }

      function isAuthenticated() {
        return !!Session.userId;
      }

      function isAuthorized(authorizedRoles) {
        if (!angular.isArray(authorizedRoles)) {
          authorizedRoles = [authorizedRoles];
        }
        return (isAuthenticated() && authorizedRoles.indexOf(Session.userRole) !== -1);
      }

  }

})();
