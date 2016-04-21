'use strict';
const mqttModule = require('../mqtt');

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
  mqttModule.publish({
    method: 'get',
    gpioId: gpioId
  });
  mqttModule.subscribe(onResponse.bind(this, cb));
}

function getStatus(board, cb) {
  var reqUrl = 'http://' +board.ip + '/status';
  request(getReqObj(board, reqUrl), onResponse.bind(this, cb));
}

function set(board, gpioId, value, cb) {
  if (gpioId === undefined || value === undefined) {
    console.log('To set gpio, pass gpioID and value');
    return;
  }
  var reqUrl = 'http://' + board.ip + '/gpio/' + gpioId + '?method=set&value=' + value;

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
    if (body === 'wrong secret') {
      cb(body);
    } else {
      cb(null, body);
    }
  }
}
