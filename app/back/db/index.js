'use strict';

let userModel = require('./models/user');
let boardModel = require('./models/board');
let mongoose = require('mongoose');
let nconf = require('nconf');

let isInited = false;
let dbModule = {
  init: init,
  models: {}
};

module.exports = dbModule;

function init() {
  if (isInited) {
    console.log('Db module is already inited!');
    return;
  }
  isInited = true;

  userModel.init();
  boardModel.init();
  dbModule.models.user = userModel.model;
  dbModule.models.board = boardModel.model;

  var mongoDBLink = nconf.get('mongodb').replace('<dbcredentilas>', nconf.get('DB_CREDENTIALS'));
  mongoose.connect(mongoDBLink, onDataBaseConnect);

  function onDataBaseConnect(err) {
    if (err) {
      var errMsg = err.message || '';
      dbModule.status = 'Database not connected: ' + errMsg;
      console.log('Database not connected: ', errMsg);

      return;
    }
    dbModule.status = 'Database connected';
    console.log('Database connected');
  }
}
