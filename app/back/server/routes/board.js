'use strict';

let express = require('express');
let serverModule = require('../index');
let dbModule = require('../../db');
let boardModule = require('../../board');
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
  router.get('/:boardid/status', onGetStatus);
  router.post('/', onPost);
  router.put('/:boardid', onPut);
  router.delete('/:boardid', onDelete);

  app.use('/board', router);

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

  function onGetStatus(req, res) {
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
      boardModule.getStatus(board, onGet);
    }

    function onGet(err, data) {
      if (err) {
        res.status(200).json({
          status: false,
          message: 'Error to get status board',
          err: err
        });
        return;
      }
      res.status(200).json({
        status: true
      });
    }
  }

  function onPut(req, res) {
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
      var body = req.body;
      if (body.name) {
        board.name = body.name;
      }
      if (body.secret) {
        board.secret = body.secret;
      }
      if (body.ip) {
        board.ip = body.ip;
      }
      board.save(onSave);

      function onSave(err) {
        if (err) {
          res.status(200).json({
            status: false,
            message: 'Error to update board',
            err: err
          });
          return;
        }
        res.status(200).json({
          status: true,
          message: 'Board has been updated.',
          board: {
            id: board._id,
            name: board.name,
            secret: board.secret,
            ip: board.ip
          }
        });
      }
    }
  }

  function onDelete(req, res) {
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
      board.remove(onRemove);
    }

    function onRemove(err) {
      if (err) {
        res.status(200).json({
          status: false,
          message: 'Error to find board',
          err: err
        });
        return;
      }
      res.status(200).json({
        status: true,
        message: 'Board has been removed.'
      });
    }
  }

  function onGet(req, res) {
    Board.find({userId: req.user._id}, onFind);

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
        boards: sendBoards
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
