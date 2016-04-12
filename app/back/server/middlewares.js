'use strict';

let express = require('express');
let bodyParser = require('body-parser');
let helmet = require('helmet');
let passport = require('passport');
let compression = require('compression');
let cookieParser = require('cookie-parser');
let expressSession = require('express-session');
let nconf = require('nconf');

let isInited = false;
let middlewaresModule = {
  init: init
};

module.exports = middlewaresModule;

function init() {
  if (isInited) {
    console.log('Server middlewares module is already inited!');
    return;
  }
  isInited = true;

  let app = require('../server').app;

  app.use(helmet());
  app.use(compression());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(cookieParser());
  app.use(expressSession({
      secret: Math.random().toString(36).replace(/[^a-z]+/g, ''),
      resave: false,
      saveUninitialized: false
  }));
  app.use(passport.initialize());
  app.use(passport.session());
}
