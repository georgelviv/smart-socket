'use strict';

const config = require('./config');
const db = require('./db');
const server = require('./server');
const mqtt = require('./mqtt');

config.init();
db.init();
server.init();
mqttModule.init();

process.on('SIGINT', () => {
  console.log('Bye bye');
  process.exit();
});
