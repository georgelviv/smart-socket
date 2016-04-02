var gulp = require('gulp');
var gutil = require('gulp-util');

module.exports = defaultTask;

function defaultTask () {
  gutil.log('Default task not set');
  gutil.log('To develop, run:');
  gutil.log(gutil.colors.cyan('$ gulp develop'));
  gutil.log('To build prod, run:');
  gutil.log(gutil.colors.cyan('$ gulp prod'));
  gutil.log('To build develop, run:');
  gutil.log(gutil.colors.cyan('$ gulp build'));
  gutil.log('To clean, run:');
  gutil.log(gutil.colors.cyan('$ gulp clean'));
}
