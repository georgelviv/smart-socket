(function() {
  'use strict';

  angular
    .module('app.main')
    .controller('MainCtrl', MainController);

  function MainController(socketApi) {
    var vm = this;
    vm.isLighted = false;
    vm.btnClick = btnClick;

    init();

    function btnClick() {
      socketApi.emit('app.btn');
    }

    function onBtnCb () {
      vm.isLighted = !vm.isLighted;
    }

    function init() {
      socketApi.on('app.btnCb', onBtnCb);
    }

  }

})();
