(function() {
  'use strict';

  angular
    .module('app.authService')
    .factory('authService', authService);

  function authService($http, api, Session) {
      var service = {
        login: login,
        isAuthenticated: isAuthenticated,
        isAuthorized: isAuthorized
      };

      return service;

      function login(credentials) {
        return $http.post(api.login, credentials).then(function (res) {
          var data = res.data;
          Session.create(data.id, data.user.id, data.user.role);
          return res.data.user;
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
