'use strict';
let request = require('request');
let config = require('../../../../config');

let espModule = {
  set: set,
  get: get
};

module.exports = espModule;

function get(gpioId, cb) {
  if (gpioId === undefined) {
    console.log('To get gpio, pass gpioID');
    return;
  }
  request(config.espUrl + '/gpio/' + gpioId + '?method=get', onResponse);

  function onResponse(error, response, body) {
    if (error) {
      console.log('Error on esp request', error);
      return;
    }
    if (cb) {
      cb(body);
    }
  }
}

function set(gpioId, value, cb) {
  if (gpioId === undefined || value === undefined) {
    console.log('To set gpio, pass gpioID and value');
    return;
  }
  request(config.espUrl + '/gpio/' + gpioId + '?method=set&value=' + value, onResponse);

  function onResponse(error, response, body) {
    if (error) {
      console.log('Error on esp request', error);
      return;
    }
    if (cb) {
      cb(body);
    }
  }
}
