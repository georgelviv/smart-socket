(function() {
  'use strict';

  angular
    .module('utils.spinner')
    .directive('spinner', spinner);

  function spinner($rootScope) {
    var directive = {
      templateUrl: 'utils/spinner/spinner.tpl',
      restrict: 'E',
      scope: {},
      controllerAs: 'vm',
      link: link
    };

    return directive;

    function link(scope) {
      scope.isShowed = false;
      $rootScope.$on('utils.spinner:hide', onHide);
      $rootScope.$on('utils.spinner:show', onShow);

      function onHide() {
        scope.isShowed = false;
      }

      function onShow() {
        scope.isShowed = true;
      }
    }
  }

})();
