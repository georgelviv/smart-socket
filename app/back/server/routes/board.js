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

  var Board = dbModule.models.board;
  var router = express.Router();

  router.use(checkIsAuthorized);
  router.get('/', onGet);
  router.post('/', onPost);

  app.use('/board', router);

  function checkIsAuthorized(req, res, next) {
    if (!req.isAuthenticated()) {
      res.status(200).json({
        status: false
      });
      return;
    }
    next();
  }

  function onGet(req, res) {
    Board.find({}, onFind);

    function onFind(err, boards) {
      if (err) {
        res.status(200).json({
          status: false,
          message: 'Error to get boards',
          err: err
        });
        return;
      }
      var sendBoards = boards.map(function (item) {
        return {
          id: item._id,
          name: item.name,
          secret: item.secret,
          ip: item.ip
        };
      });
      res.status(200).json({
        status: true,
        boards: boards
      });
    }
  }

  function onPost(req, res) {
    if (!checkBody(req.body)) {
      res.status(200).json({
        status: false,
        message: 'Pass correct body params'
      });
      return;
    }

    var boardObj = {
      name: req.body.name,
      secret: req.body.secret,
      ip: req.body.ip,
      userId: req.user._id
    };

    var board = new Board(boardObj);
    board.save(onSave);

    function onSave(err) {
      if (err) {
        res.status(200).json({
          status: false,
          message: 'Error to save board',
          err: err
        });
        return;
      }
      res.status(200).json({
        status: true,
        board: {
          id: board._id,
          name: board.name,
          secret: board.secret,
          ip: board.ip
        }
      });
    }
  }

  function checkBody(body) {
    var ipRegex = /^(([1-9]?\d|1\d\d|2[0-5][0-5]|2[0-4]\d)\.){3}([1-9]?\d|1\d\d|2[0-5][0-5]|2[0-4]\d)$/;
    if (!body.name || !body.secret || !body.ip) {
      return false;
    }
    if (!ipRegex.test(body.ip)) {
      return false;
    }
    return true;
  }

}
