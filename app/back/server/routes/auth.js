'use strict';

const passport = require('passport');
const express = require('express');
const LocalStrategy = require('passport-local').Strategy;
const serverModule = require('../index');
const dbModule = require('../../db');
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
  var router = express.Router();
  passport.use(new LocalStrategy(User.authenticate()));
  passport.serializeUser(User.serializeUser());
  passport.deserializeUser(User.deserializeUser());

  router.post('/login', passport.authenticate('local'), onLogin);
  router.get('/logout', onLogout);
  router.post('/register', onRegister);
  router.get('/status', onStatus);

  app.use('/user', router);

  function onStatus(req, res) {
    if (!req.isAuthenticated()) {
      res.status(200).json({
        status: false
      });
      return;
    } else {
      res.status(200).json({
        status: true,
        user: {
          username: req.user.username,
          email: req.user.email,
          id: req.user._id,
          role: req.user.role
        }
      });
    }
  }

  function onLogin(req, res) {
    res.status(200).json({
      status: 'Login successful',
      user: {
        username: req.user.username,
        email: req.user.email,
        id: req.user._id,
        role: req.user.role
      }
    });
  }

  function onLogout(req, res) {
    req.logout();
    res.status(200).json({
      status: 'Bye!'
    });
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
        res.status(200).json({
          status: 'Registered',
          user: {
            username: req.user.username,
            email: req.user.email,
            id: req.user._id,
            role: req.user.role
          }
        });
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
