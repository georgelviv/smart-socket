var gulp = require('gulp');
var concat = require('gulp-concat');

var path = require('../config').path;
var filesArr = [
	'./node_modules/normalize.css/normalize.css'
];

module.exports = vendorCssTask;

function vendorCssTask() {
	return gulp.src(filesArr)
		.pipe(concat('vendor.css'))
		.pipe(gulp.dest(path.build));
}
