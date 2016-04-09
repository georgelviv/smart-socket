(function() {
  'use strict';

  angular
    .module('app.login')
    .controller('LoginCtrl', loginController);

  function loginController($rootScope, authService, AUTH_EVENTS) {
    var vm = this;
    vm.onSignInSubmit = onSignInSubmit;
    vm.onSignUpSubmit = onSignUpSubmit;
    vm.forms = {
      signIn: {},
      signUp: {}
    };

    function onSignUpSubmit() {
      authService.register(vm.forms.signIn).then(onRegisterSuccess, onRegisterError);

      function onRegisterSuccess() {
        console.log('q');
      }
      function onRegisterError() {
        console.log('q');
      }
    }

    function onSignInSubmit() {
      authService.login(vm.forms.signIn).then(onLoginSucces, onLoginFail);

      function onLoginSucces() {
        $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
      }

      function onLoginFail() {
        $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
      }
    }
  }

})();
