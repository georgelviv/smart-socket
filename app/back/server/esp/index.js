'use strict';
let request = require('request');
let config = require('../../../../config');

let espModule = {
  set: set,
  get: get
};

module.exports = espModule;

function get(gpioId, cb) {
  if (cb) {
    cb(true);
  }
}

function set(gpioId, value, cb) {
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
