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

  app.post('/login', onLogin);

  app.get('*', (req, res) => {
    res.redirect('/');
  });

  function onLogin(req, res) {
    console.log(req.body);
    res.send({
      id: 1,
      user: {
        id: 1,
        role: 'admin'
      }
    });
  }
}
