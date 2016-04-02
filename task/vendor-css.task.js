var gulp = require('gulp');
var concat = require('gulp-concat');

var path = require('../config').path;
var filesArr = [

];

module.exports = vendorCssTask;

function vendorCssTask() {
	return gulp.src(filesArr)
		.pipe(concat('vendor.css'))
		.pipe(gulp.dest(path.build));
}
