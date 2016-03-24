'use strict';

let nconf = require('nconf');
let isInited = false;

module.exports.init = init;

function init() {
  if (isInited) {
    console.log('Config module is already inited!');
    return;
  }
  isInited = true;

  nconf.argv()
    .env()
    .file({
      file: __dirname + '/../../../config.json'
    });
  console.log('PORT: ' + nconf.get('PORT'));

  nconf.defaults({
    'NODE_ENV': 'development'
  });

  if (nconf.get('NODE_ENV') === 'development') {
    nconf.set('frontPath', nconf.get('path').build);
  } else {
    nconf.set('frontPath', nconf.get('path').dist);
  }

  console.log('Mode: ' + nconf.get('NODE_ENV'));
}
