'use strict';

let mongoose = require('mongoose');
let passportLocalMongoose = require('passport-local-mongoose');

let isInited = false;
let userModelModule = {
  init: init
};

module.exports = userModelModule;

function init() {
  if (isInited) {
    console.log('User model module is already inited!');
    return;
  }
  isInited = true;

  let Schema = mongoose.Schema;

  let User = new Schema({
    username: String,
    password: String,
    email: String,
    role: String
  });

  User.plugin(passportLocalMongoose);

  userModelModule.model = mongoose.model('User', User);
}
