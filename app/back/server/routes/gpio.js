'use strict';

let express = require('express');
let serverModule = require('../index');
let dbModule = require('../../db');
let boardModule = require('../../board');
let isInited = false;

module.exports.init = init;

function init() {
  if (isInited) {
    console.log('GPIO route module is already inited!');
    return;
  }
  isInited = true;

  let app = serverModule.app;

  var Board = dbModule.models.board;
  var router = express.Router();

  router.use(checkIsAuthorized);
  router.get('/:boardid/get/:gpioid', onGet);
  router.get('/:boardid/get/:gpioid/set/:value', onSet);
  app.use('/gpio', router);

  function checkIsAuthorized(req, res, next) {
    if (!req.isAuthenticated()) {
      res.status(200).json({
        status: false,
        message: 'Not authorized'
      });
      return;
    }
    next();
  }

  function onSet(req, res) {
    Board.findById(req.params.boardid, onFind);
    function onFind(err, board) {
      if (err) {
        res.status(200).json({
          status: false,
          message: 'Error to find board',
          err: err
        });
        return;
      }

      boardModule.set(board, req.params.gpioid, req.params.value, onSet);

      function onSet(err, data) {
        if (err) {
          res.status(200).json({
            status: false,
            message: 'Error to get status of gpio',
            err: err
          });
          return;
        }
        res.status(200).json({
          status: true,
          value: data
        });
      }
    }
  }


  function onGet(req, res) {
    Board.findById(req.params.boardid, onFind);
    function onFind(err, board) {
      if (err) {
        res.status(200).json({
          status: false,
          message: 'Error to find board',
          err: err
        });
        return;
      }

      boardModule.get(board, req.params.gpioid, onGet);

      function onGet(err, data) {
        if (err) {
          res.status(200).json({
            status: false,
            message: 'Error to get status of gpio',
            err: err
          });
          return;
        }
        res.status(200).json({
          status: true,
          value: data
        });
      }
    }
  }


}
