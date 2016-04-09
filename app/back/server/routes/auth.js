'use strict';

let passport = require('passport');
let LocalStrategy = require('passport-local').Strategy;
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

  var User = dbModule.models.user;
  passport.use(new LocalStrategy(User.authenticate()));
  passport.serializeUser(User.serializeUser());
  passport.deserializeUser(User.deserializeUser());

  app.post('/login', passport.authenticate('local'), onLogin);
  app.post('/register', onRegister);

  function onLogin(req, res) {
    res.send(req.user);
  }

  function onRegister(req, res) {
    if (checkCorrectBody(req.body)) {
      res.send('Pass correct body params');
    }
    User.register(new User({
      username: req.body.username,
      email: req.body.email
    }), req.body.password, onRegisterCb);

    function onRegisterCb(error, user) {
      if (error) {
        res.send(error);
        return;
      }
      passport.authenticate('local')(req, res, function () {
        res.send(user);
      });
    }

  }

  function checkCorrectBody(body) {
    var username = typeof body.username !== 'string';
    var email = typeof body.email !== 'string';
    var password = typeof body.password !== 'string';
    return username && email && password;
  }
}
