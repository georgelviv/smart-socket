(function() {
  'use strict';

  angular
    .module('utils.compareTo')
    .directive('compareTo', compareTo);

  function compareTo() {
    var directive = {
      require: 'ngModel',
      restrict: 'A',
      scope: {
        otherModelValue: '=compareTo'
      },
      link: link
    };

    return directive;

    function link(scope, element, attr, ngModel) {
      ngModel.$validators.compareTo = compareToValidator;

      scope.$watch('otherModelValue', function () {
        ngModel.$validate();
      });

      function compareToValidator (modelValue) {
        return modelValue === scope.otherModelValue;
      }
    }
  }

})();
