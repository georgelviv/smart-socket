'use strict';
let request = require('request');

let espModule = {
  set: set,
  get: get,
  getStatus: getStatus
};

module.exports = espModule;

function get(board, gpioId, cb) {
  if (gpioId === undefined) {
    console.log('To get gpio, pass gpioID');
    return;
  }
  var reqUrl = 'http://' + board.ip + ':3000/gpio/' + gpioId + '?method=get';
  request(reqUrl, onResponse.bind(this, cb));
}

function getStatus(board, cb) {
  console.log(board.ip);
  var reqUrl = 'http://' +board.ip + ':3000/status';
  request(reqUrl, onResponse.bind(this, cb));
}

function set(board, gpioId, value, cb) {
  if (gpioId === undefined || value === undefined) {
    console.log('To set gpio, pass gpioID and value');
    return;
  }
  var reqUrl = 'http://' + board.ip + ':3000/gpio/' + gpioId + '?method=set&value=' + value;
  request(reqUrl, onResponse.bind(this, cb));
}

function onResponse(cb, error, response, body) {
  if (error) {
    cb(error);
    return;
  }
  if (cb) {
    cb(null, body);
  }
}
