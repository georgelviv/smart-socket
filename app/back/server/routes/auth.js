'use strict';

let serverModule = require('../index');
let dbModule = require('../../db');
let isInited = false;

module.exports.init = init;

function init() {
  if (isInited) {
    console.log('Auth route module is already inited!');
    return;
  }
  isInited = true;

  let app = serverModule.app;

  app.post('/login', onLogin);
  app.post('/register', onRegister);

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

  function onRegister(req, res) {
    console.log(req.body);
    res.send(dbModule.status);
  }
}
