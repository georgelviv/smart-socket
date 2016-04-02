var gulp = require('gulp');
var stylus = require('gulp-stylus');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var cleanCSS = require('gulp-clean-css');
var livereload = require('gulp-livereload');
var path = require('../config').path;

var srcFiles = path.front + '/styl/main.styl';
var buildFile = [
  path.build + '/vendor.css',
  path.build + '/main.css'
];

module.exports = cssTask;
module.exports.prod = cssTaskProd;
module.exports.srcFiles = path.front + '/styl/**/*.styl';

function cssTask () {
  return gulp.src(srcFiles)
    .pipe(sourcemaps.init())
    .pipe(stylus())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(path.build))
    .pipe(livereload());
}

function cssTaskProd () {
  return gulp.src(buildFile)
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(concat('main.css'))
    .pipe(gulp.dest(path.prod));
}
