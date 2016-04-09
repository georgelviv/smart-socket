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
      console.log(1);
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
