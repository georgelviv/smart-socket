'use strict';

const config = require('./config');
const db = require('./db');
const server = require('./server');

config.init();
db.init();
server.init();

process.on('SIGINT', () => {
  console.log('Bye bye');
  process.exit();
});
