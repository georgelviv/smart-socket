'use strict';

const mqtt = require('mqtt');
const uuid = require('uuid');

let mqttModule = {
  maxage: 10 * 60 * 1000,
  reqTimeout: 10 * 1000,
  serverTopic: 'smartsocket',
  publish: publish,
  connections: []
};

module.exports = mqttModule;

function publish(board, obj, cb) {
  var mqttClient = findConnect(board.broker);
  if (!mqttClient) {
    mqttClient = new MqttClient(board.broker, onConnect);
  } else {
    mqttClient.publishMsg(board.nameValue, obj, cb);
  }

  function onConnect() {
    mqttClient.publishMsg(board.nameValue, obj, cb);
  }
}

function MqttClient(broker, onConnectCb) {
  var indexInConnections = mqttModule.connections.length;
  this.broker = broker;
  this.publishMsg = publishMsg;
  this.client = mqtt.connect(broker);

  var client = this.client;
  var cbList = [];

  mqttModule.connections.push(this);
  client.on('connect', onConnect);
  client.on('message', onMessage);

  var removeConnectDbncFn = debounce(removeConnect, mqttModule.maxage);
  removeConnectDbncFn();

  function publishMsg(topic, msgObj, cb) {
    msgObj.uuid = uuid.v1();
    client.publish(mqttModule.serverTopic + '/' + topic, JSON.stringify(msgObj));
    cbList.push({
      uuid: msgObj.uuid,
      cb: cb
    });
    removeConnectDbncFn();
    setTimeout(function () {
      timeout(msgObj.uuid);
    }, mqttModule.reqTimeout);
  }

  function timeout(uuid) {
    var index;
    for (let i = 0; i < cbList.length; i++) {
      if (uuid === cbList[i].uuid) {
        index = i;
        break;
      }
    }
    if (!index) {
      return;
    }
    var cb = cbList[index].cb;
    cbList.splice(index, 1);
    if (cb) {
      cb('timeout');
    }
  }

  function onConnect() {
    client.subscribe(mqttModule.serverTopic);
    if (onConnectCb) {
      onConnectCb();
    }
  }

  function onMessage(topic, message) {
    var messageObj = JSON.parse(message.toString());
    var indexCbObj = -1;
    cbList.forEach(function (item, index) {
      if (messageObj.uuid === item.uuid) {
        indexCbObj = index;
      }
    });
    var cbObj = cbList[indexCbObj];
    delete messageObj.uuid;
    if (cbObj && cbObj.cb) {
      cbList.splice(indexCbObj, 1);
      cbObj.cb(null, messageObj);
    }
  }

  function removeConnect() {
    client.end();
    mqttModule.connections.splice(indexInConnections, 1);
  }
}

function findConnect(broker) {
  return mqttModule.connections.filter(function (item) {
    return item.broker === broker;
  })[0];
}

function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) {
        func.apply(context, args);
      }
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) {
      func.apply(context, args);
    }
	};
}
