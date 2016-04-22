'use strict';

let mongoose = require('mongoose');

let isInited = false;
let userModelModule = {
  init: init
};

module.exports = userModelModule;

function init() {
  if (isInited) {
    console.log('Board model module is already inited!');
    return;
  }
  isInited = true;

  let Schema = mongoose.Schema;

  let Board = new Schema({
    name: String,
    broker: String,
    secret: String,
    nameValue: String,
    userId: String
  });

  userModelModule.model = mongoose.model('Board', Board);
}
