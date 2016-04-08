(function() {
  'use strict';

  angular
    .module('app.login')
    .controller('LoginCtrl', loginController);

  function loginController() {
    var vm = this;
    vm.onSignInSubmit = onSignInSubmit;

    function onSignInSubmit() {
      console.log(1);
    }
  }

})();
