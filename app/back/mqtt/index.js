'use strict';

const mqtt = require('mqtt');
const nconf = require('nconf');

let isInited = false;
let mqttModule = {
  topicName: 'smart-socket.app',
  init: init,
  subscribeOn: subscribeOn,
  publish: publish
};

module.exports = mqttModule;

function init() {
  if (isInited) {
    console.log('MQTT module is already inited!');
    return;
  }
  isInited = true;
  mqttModule.client = mqtt.connect(nconf.get('mqttBroker'));
  let client = mqttModule.client;

  client.on('connect', onConnect);
  client.on('message', onMessage);

  function onConnect() {
    client.subscribe(mqttModule.topicName);
  }

  function onMessage(topic, message) {
    message = message.toString();
    let obj = JSON.parse(message);
    mqttModule.sub[obj.topic].forEach(function (cb) {
      cb(obj);
    });
  }
}

function publish(obj) {
  if (mqttModule.client) {
    mqttModule.client.publish(mqttModule.topicName, JSON.stringify(obj));
  }
}

function subscribeOn(topic, cb) {
  mqttModule.sub = mqttModule.sub || {};
  mqttModule.sub[topic] = mqttModule.sub[topic] || [];
  mqttModule.sub[topic].push(cb);
}
