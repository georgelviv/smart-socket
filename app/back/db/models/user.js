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
    username: {
      type: String,
      required: true
    },
    password: String,
    email: String,
    role: {
      type: String,
      required: true,
      default: 'user'
    }
  });

  User.plugin(passportLocalMongoose);

  userModelModule.model = mongoose.model('User', User);
}
