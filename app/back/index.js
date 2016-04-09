'use strict';

let config = require('./config');
let db = require('./db');
let server = require('./server');

config.init();
db.init();
server.init();

process.on('SIGINT', () => {
  console.log('Bye bye');
  process.exit();
});
