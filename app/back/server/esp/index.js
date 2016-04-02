'use strict';
let request = require('request');
let config = require('../../../../config');

let espModule = {
  blink: blink
};

module.exports = espModule;

function blink(cb) {
  request(config.espUrl + '/blink', onResponse);

  function onResponse(error, response, body) {
    if (error) {
      console.log('Error on esp request', error);
      return;
    }
    if (cb) {
      cb();
    }
  }
}
