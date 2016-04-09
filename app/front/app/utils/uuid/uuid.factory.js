(function() {
  'use strict';

  angular
    .module('utils.uuid')
    .factory('uuid', uuidApi);

  function uuidApi() {
      var service = {
        get: get
      };

      return service;

      function get() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, replaceFun);

        function replaceFun(c) {
          var r;
          if (crypto && crypto.randomBytes) {
            r = crypto.randomBytes(1)[0] % 16 | 0;
          } else {
            r = Math.random() * 16 | 0;
          }
          var v = c === 'x' ? r : (r & 0x3 | 0x8);
          return v.toString(16);
        }
      }
    }
})();
