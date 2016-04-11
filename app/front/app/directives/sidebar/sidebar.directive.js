(function() {
  'use strict';

  angular
    .module('app.sidebar')
    .directive('sidebar', sidebarDirective);

  function sidebarDirective() {
    var directive = {
      link: link,
      controllerAs: 'vm',
      templateUrl: 'directives/sidebar/sidebar.tpl',
      restrict: 'E',
      scope: {
      }
    };

    return directive;

    function link(scope) {

    }
  }

})();
