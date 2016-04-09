'use strict';

let userModel = require('./models/user');
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
  dbModule.models.user = userModel.model;

  var mongoDBLink = nconf.get('mongodb').replace('<dbcredentilas>', nconf.get('DB_CREDENTIALS'));
  mongoose.connect(mongoDBLink, onDataBaseConnect);

  function onDataBaseConnect(err) {
    if (err) {
      var errMsg = err.message || '';
      console.log('Database not connected: ', errMsg);
      return;
    }
    console.log('Database connected');
  }
}
