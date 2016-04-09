(function() {
  'use strict';

  angular
    .module('app.login')
    .controller('LoginCtrl', loginController);

  function loginController($rootScope, loggerApi, authService, AUTH_EVENTS) {
    var vm = this;
    vm.onSignInSubmit = onSignInSubmit;
    vm.onSignUpSubmit = onSignUpSubmit;
    vm.forms = {
      signIn: {},
      signUp: {}
    };

    function onSignUpSubmit() {
      authService.register(vm.forms.signUp).then(onRegisterSuccess, onRegisterError);

      function onRegisterSuccess(data) {
        console.log(data);

        if (data.name === 'UserExistsError') {
          loggerApi.error(data.message);
          return;
        }
        if (data._id) {
          loggerApi.show('Welcome aboard, ' + data.username + ' !');
        }

      }
      function onRegisterError(error) {
        console.log(error);
        loggerApi.error('Error on register');
      }
    }

    function onSignInSubmit() {
      authService.login(vm.forms.signIn).then(onLoginSucces, onLoginFail);

      function onLoginSucces(data) {
        console.log(data);
        if (data._id) {
          loggerApi.show('Nice to meet you, ' + data.username + ' !');
        }
      }

      function onLoginFail(error) {
        console.log(error);
        if (error.data === 'Unauthorized') {
          loggerApi.error('Wrong username or password');
          return;
        }
        loggerApi.error('Error on login');
      }
    }
  }

})();
