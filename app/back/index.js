var config = require('./config');
var server = require('./server');

config.init();
server.init();

process.on('SIGINT', onExit);

function onExit () {
  console.log('Bye bye');
  process.exit();
}
