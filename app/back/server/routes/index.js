var serverModule = require('../index');
var isInited = false;

module.exports.init = init;

function init() {
  if (isInited) {
    console.log('Server route module is already inited!');
    return;
  }
  isInited = true;

  var app = serverModule.app;

  app.get('*', handleNotFound);
}

function handleNotFound(req, res) {
  res.redirect('/');
}
