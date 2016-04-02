var gulp = require('gulp');
var livereload = require('gulp-livereload');
var gulpInject = require('gulp-inject');
var path = require('../config').path;

var srcFile = path.front + '/index.html';

var srcFiles = [
  path.build + '/vendor.css',
  path.build + '/main.css',
  path.build + '/vendor.js',
  path.build + '/templates.js',
  path.build + '/config.js',
  path.build + '/app.js'
];

var srcFilesProd = [
  path.prod + '/main.css',
  path.prod + '/script.js'
];

module.exports = injectTask;
module.exports.prod = injectTaskProd;
module.exports.srcFiles = srcFile;

function injectTask () {
  return gulp.src(srcFile)
    .pipe(gulpInject(gulp.src(srcFiles, {read: false}), {
      ignorePath: path.build,
      addRootSlash: false
    }))
    .pipe(gulp.dest(path.build))
    .pipe(livereload());
}

function injectTaskProd () {
  return gulp.src(srcFile)
    .pipe(gulpInject(gulp.src(srcFilesProd, {read: false}), {
      ignorePath: path.prod,
      addRootSlash: false
    }))
    .pipe(gulp.dest(path.prod));
}
