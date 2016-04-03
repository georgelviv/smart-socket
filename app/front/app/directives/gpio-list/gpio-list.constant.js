(function() {
  'use strict';

  angular
    .module('app.gpio-list')
    .constant('GPIO_ARRAY', [
      {
        name: 'GPIO0',
        digitPin: 'D3',
        id: 0
      },
      {
        name: 'GPIO1',
        digitPin: 'D10',
        id: 1
      },
      {
        name: 'GPIO2',
        digitPin: 'D4',
        id: 2
      },
      {
        name: 'GPIO3',
        digitPin: 'D9',
        id: 3
      },
      {
        name: 'GPIO4',
        digitPin: 'D2',
        id: 4
      },
      {
        name: 'GPIO5',
        digitPin: 'D1',
        id: 5
      },
      {
        name: 'GPIO9',
        digitPin: 'SD2',
        id: 9
      },
      {
        name: 'GPIO10',
        digitPin: 'SD3',
        id: 10
      },
      {
        name: 'GPIO12',
        digitPin: 'D6',
        id: 12
      },
      {
        name: 'GPIO13',
        digitPin: 'D7',
        id: 13
      },
      {
        name: 'GPIO14',
        digitPin: 'D5',
        id: 14
      },
      {
        name: 'GPIO15',
        digitPin: 'D8',
        id: 15
      },
      {
        name: 'GPIO16',
        digitPin: 'D0',
        id: 16
      }
    ]);

})();
