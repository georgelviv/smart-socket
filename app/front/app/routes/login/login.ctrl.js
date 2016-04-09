(function() {
  'use strict';

  angular
    .module('app.login')
    .controller('LoginCtrl', loginController);

  function loginController() {
    var vm = this;
    vm.onSignInSubmit = onSignInSubmit;
    vm.onSignUpSubmit = onSignUpSubmit;
    vm.forms = {
      signIn: {},
      signUp: {}
    };

    function onSignUpSubmit() {
      console.log(2);
    }

    function onSignInSubmit() {
      console.log(1);
    }
  }

})();
