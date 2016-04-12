(function() {
  'use strict';

  angular
    .module('app.boards')
    .controller('BoardsCtrl', boardsCtrl);

  function boardsCtrl(board) {
    var vm = this;
    init();

    function init() {
      board.get().then(onSuccess, onError);

      function onSuccess(data) {

      }

      function onError(error) {

      }
    }
  }

})();
