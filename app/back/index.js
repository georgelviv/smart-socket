'use strict';

let config = require('./config');
let server = require('./server');

config.init();
server.init();

process.on('SIGINT', () => {
  console.log('Bye bye');
  process.exit();
});
