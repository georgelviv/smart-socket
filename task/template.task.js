var gulp = require('gulp');
var templateCache = require('gulp-angular-templatecache');
var livereload = require('gulp-livereload');

var path = require('../config').path;

var srcFiles = path.front + '/app/**/*.tpl';

module.exports = templateTask;
module.exports.srcFiles = srcFiles;

function templateTask () {
  return gulp.src(srcFiles)
    .pipe(templateCache({
      standalone: true
    }))
    .pipe(gulp.dest(path.build))
    .pipe(livereload());
}
