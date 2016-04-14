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
  request(getReqObj(board, reqUrl), onResponse.bind(this, cb));
}

function getStatus(board, cb) {
  var reqUrl = 'http://' +board.ip + ':3000/status';
  request(getReqObj(board, reqUrl), onResponse.bind(this, cb));
}

function set(board, gpioId, value, cb) {
  if (gpioId === undefined || value === undefined) {
    console.log('To set gpio, pass gpioID and value');
    return;
  }
  var reqUrl = 'http://' + board.ip + ':3000/gpio/' + gpioId + '?method=set&value=' + value;

  request(getReqObj(board, reqUrl), onResponse.bind(this, cb));
}

function getReqObj(board, url) {
  return {
    url: url,
    timeout: 10000,
    headers: {
      'secret': board.secret
    }
  }
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
