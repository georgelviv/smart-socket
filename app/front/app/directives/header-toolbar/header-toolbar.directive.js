(function() {
  'use strict';

  angular
    .module('app.header-toolbar')
    .directive('headerToolbar', headerToolbarDirective);

  function headerToolbarDirective() {
    var directive = {
      link: link,
      controllerAs: 'vm',
      templateUrl: 'directives/header-toolbar/header-toolbar.tpl',
      restrict: 'E',
      scope: {
      }
    };

    return directive;

    function link(scope) {

    }
  }

})();
