'use strict';

let express = require('express');
let serverModule = require('../index');
let dbModule = require('../../db');
let isInited = false;

module.exports.init = init;

function init() {
  if (isInited) {
    console.log('Board route module is already inited!');
    return;
  }
  isInited = true;

  let app = serverModule.app;

  var Board = dbModule.models.user;
  var router = express.Router();

  router.get('/', onGet);

  app.use('/board', router);

  function onGet(req, res) {
    res.send(1);
  }

}
