(function() {
  'use strict';

  angular
    .module('app.authService')
    .factory('authService', authService);

  function authService($http, $q, $rootScope, AUTH_API, AUTH_EVENTS) {
      var service = {
        login: login,
        logout: logout,
        register: register,
        isLoggedIn: isLoggedIn,
        getUserStatus: getUserStatus,
        getUser: getUser
      };

      var user = null;

      return service;

      function register(userObj) {
        var userData = {
          username: userObj.username,
          password: userObj.password,
          email: userObj.email
        };

        var deferred = $q.defer();

        $http.post(AUTH_API.register, userData).success(onSuccess).error(onError);

        return deferred.promise;

        function onSuccess(data, status) {
          if (status === 200 && data && data.status) {
            user = data.user;
            deferred.resolve(data.user);
            $rootScope.$emit(AUTH_EVENTS.login);
          } else {
            deferred.reject(data);
          }
        }
        function onError(error) {
          deferred.reject(error);
        }
      }

      function logout() {
        var deffered = $q.defer();

        $http.get(AUTH_API.logout).success(onSuccess).error(onError);

        return deffered.promise;

        function onSuccess(data) {
          user = false;
          deffered.resolve(data);
          $rootScope.$emit(AUTH_EVENTS.logout);
        }
        function onError(error) {
          user = false;
          deffered.reject(error);
          $rootScope.$emit(AUTH_EVENTS.logout);
        }
      }

      function login(username, password) {
        var credentials = {
          username: username,
          password: password
        };
        var deffered = $q.defer();

        $http.post(AUTH_API.login, credentials).success(onSuccess).error(onError);

        return deffered.promise;

        function onSuccess(data, status) {
          if (status === 200 && data && data.status) {
            user = data.user;
            deffered.resolve(data.user);
            $rootScope.$emit(AUTH_EVENTS.login);
          } else {
            user = false;
            deffered.reject(data);
          }
        }

        function onError(error) {
          user = false;
          deffered.reject(error);
        }
      }

      function isLoggedIn() {
        return !!user;
      }

      function getUser() {
        return angular.copy(user);
      }

      function getUserStatus() {
        var deffered = $q.defer();
        $http.get(AUTH_API.status).success(onSuccess).error(onError);

        return deffered.promise;

        function onSuccess(data) {
          if (data.status) {
            user = data.user;
            $rootScope.$emit(AUTH_EVENTS.login);
            deffered.resolve(data);
          } else {
            user = false;
            deffered.reject(data);
          }
        }

        function onError(error) {
          user = false;
          deffered.reject(error);
        }
      }

  }

})();
