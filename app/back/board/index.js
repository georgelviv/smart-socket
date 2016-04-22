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
    broker: board.broker,
    nameValue: board.nameValue
  }, {
    method: 'get',
    gpioId: gpioId,
    secret: board.secret
  }, onResponse.bind(this, cb));
}

function getStatus(board, cb) {
  mqttModule.publish({
    broker: board.broker,
    nameValue: board.nameValue
  }, {
    method: 'status',
    secret: board.secret
  }, onResponse.bind(this, cb));
}

function set(board, gpioId, value, cb) {
  if (gpioId === undefined || value === undefined) {
    console.log('To set gpio, pass gpioID and value');
    return;
  }
  mqttModule.publish({
    broker: board.broker,
    nameValue: board.nameValue
  }, {
    method: 'set',
    gpioId: gpioId,
    value: value,
    secret: board.secret
  }, onResponse.bind(this, cb));
}

function onResponse(cb, error, body) {
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
