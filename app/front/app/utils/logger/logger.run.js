(function() {
  'use strict';

  angular
    .module('utils.logger')
    .run(loggerRun);

  function loggerRun($mdToast) {
    // $mdToast.show(
    //   $mdToast.simple()
    //     .textContent('Simple Toast!')
    //     .position('top right')
    //     .hideDelay(30000)
    // );
  }
})();
