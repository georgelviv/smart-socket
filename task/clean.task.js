var gulp = require('gulp');
var del = require('del');
var path = require('../config').path;

var sourcePath = [
  path.build,
  path.prod,
];

module.exports = cleanTask;

function cleanTask (callback) {
    return del(sourcePath, cb);

    function cb(error) {
      if (error) {
        console.error('Error with cleanTask', error);
        return;
      }
      callback();
    }
}
