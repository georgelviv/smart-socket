var gulp = require('gulp');
var ngConstant = require('gulp-ng-constant');

var path = require('../config').path;

module.exports = configTask;

function configTask () {
  return gulp.src('./config.json')
    .pipe(ngConstant({
      name: 'app.config'
    }))
    .pipe(gulp.dest(path.build));
}
