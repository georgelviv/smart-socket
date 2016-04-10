(function() {
  'use strict';

  angular
    .module('app.login')
    .controller('LoginCtrl', loginController);

  function loginController($rootScope, $location, $route, loggerApi, authService, AUTH_EVENTS) {
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
        $location.path('/dashboard');
        $route.reload();
        loggerApi.show('Welcome aboard, ' + data.user.username + ' !');
      }

      function onRegisterError(error) {
        if (error.name === 'UserExistsError') {
          loggerApi.error(error.message);
          return;
        }
        loggerApi.error('Error on register');
      }
    }

    function onSignInSubmit() {
      var form = vm.forms.signIn;
      authService.login(form.username, form.password).then(onLoginSucces, onLoginFail);

      function onLoginSucces(data) {
        $location.path('/dashboard');
        $route.reload();
        loggerApi.show('Nice to meet you, ' + data.username + ' !');
      }

      function onLoginFail(error) {
        if (error.data === 'Unauthorized' || error === 'Unauthorized') {
          loggerApi.error('Wrong username or password');
          return;
        }
        loggerApi.error('Error on login');
      }
    }
  }

})();
