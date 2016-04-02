var gulp = require('gulp');
var livereload = require('gulp-livereload');

var path = require('../config').path;

module.exports = watchTask;

function watchTask() {
	livereload.listen();
	gulp.watch(require('./inject.task').srcFiles, ['inject']);
  gulp.watch(require('./css.task').srcFiles, ['css']);
	gulp.watch(require('./js.task').srcFiles, ['js']);
	gulp.watch(require('./static.task').srcFiles, ['static']);
	gulp.watch(require('./template.task').srcFiles, ['template']);
}
