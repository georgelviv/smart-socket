(function() {
  'use strict';

  angular
    .module('utils.spinner')
    .controller('SpinnerCtrl', SpinnerCtrl)
    .directive('spinner', spinner);

  function spinner() {
    var directive = {
      templateUrl: 'utils/spinner/spinner.tpl',
      restrict: 'E',
      scope: {},
      controller: 'SpinnerCtrl',
      controllerAs: 'spinner'
    };

    return directive;
  }

  function SpinnerCtrl($rootScope) {
    var spinner = this;
    spinner.isShowed = false;
    $rootScope.$on('utils.spinner:hide', onHide);
    $rootScope.$on('utils.spinner:show', onShow);

    function onHide() {
      spinner.isShowed = false;
    }

    function onShow() {
      spinner.isShowed = true;
    }
  }

})();
