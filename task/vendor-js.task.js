var gulp = require('gulp');
var concat = require('gulp-concat');

var path = require('../config').path;
var filesArr = [
];

module.exports = vendorJsTask;

function vendorJsTask() {
	return gulp.src(filesArr)
		.pipe(concat('vendor.js'))
		.on('error', function (err) {
			console.log('Error in concat vendor');
			console.log(err && err.message || err);
		})
		.pipe(gulp.dest(path.build));
}
