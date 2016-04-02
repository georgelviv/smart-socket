var gulp = require('gulp');
var concat = require('gulp-concat');

var path = require('../config').path;
var filesArr = [
	'./node_modules/jquery/dist/jquery.js',
	'./node_modules/angular/angular.js',
	'./node_modules/angular-route/angular-route.js',
	'./node_modules/angular-animate/angular-animate.js',
	'./node_modules/angular-aria/angular-aria.js',
	'./node_modules/angular-messages/angular-messages.js',
	'./node_modules/angular-material/angular-material.js'
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
