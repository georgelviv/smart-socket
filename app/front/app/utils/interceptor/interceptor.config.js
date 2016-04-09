(function() {
  'use strict';

  angular
    .module('utils.interceptor')
    .config(interceptorConfig);

  function interceptorConfig($httpProvider) {
      $httpProvider.interceptors.push('interceptor');
    }
})();
