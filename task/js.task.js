var gulp = require('gulp');
var gutil = require('gulp-util');
var nconf = require('nconf');
var concat = require('gulp-concat');
var jshint = require('gulp-jshint');
var ngAnnotate = require('gulp-ng-annotate');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var livereload = require('gulp-livereload');

var path = require('../config').path;

var srcFiles = [
  path.front + '/app/**/*.module.js',
  path.front + '/app/**/*.js',
  '!' + path.front + '/app/**/*.spec.js'
];
var buildFile = [
  path.build + '/vendor.js',
  path.build + '/template.js',
  path.build + '/config.js',
  path.build + '/app.js'
];

module.exports = jsTask;
module.exports.prod = jsTaskProd;
module.exports.srcFiles = srcFiles;

function jsTask () {
  return gulp.src(srcFiles)
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'))
    .on('error', onError)
    .on('error', onError)
    .pipe(sourcemaps.init())
    .pipe(ngAnnotate({
      single_quotes: true
    }))
    .pipe(concat('app.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(path.build))
    .pipe(livereload());

    function onError(error) {
      if (error) {
        if (nconf.get('NODE_ENV') === 'travis') {
          process.exit(1);
          return;
        } else {
          gutil.beep();
        }
      }
    }
}

function jsTaskProd () {
  return gulp.src(buildFile)
    .pipe(uglify())
    .pipe(concat('script.js'))
    .pipe(gulp.dest(path.prod));
}
