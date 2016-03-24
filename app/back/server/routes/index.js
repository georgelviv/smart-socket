'use strict';

let serverModule = require('../index');
let isInited = false;

module.exports.init = init;

function init() {
  if (isInited) {
    console.log('Server route module is already inited!');
    return;
  }
  isInited = true;

  let app = serverModule.app;

  app.get('*', (req, res) => {
    res.redirect('/');
  });
}
