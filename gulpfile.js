var path = require('path');
var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var connect = require('gulp-connect');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
//var history = require('connect-history-api-fallback');
//var concat = require('gulp-concat');
//var uglify = require('gulp-uglify');
//var transform = require('vinyl-transform');
//var angularFilesort = require('gulp-angular-filesort');
// var inject = require('gulp-inject');
// var glob = require('glob');
// var es = require('event-stream');
// var rename = require('gulp-rename'); 

gulp.task('connect', function () {
    connect.server({
        root: 'public/',
        port: 4000
    })
})

gulp.task('scripts', function() {
	 return browserify('src/app/isentia.module.js')
        .bundle()
        .pipe(source('isentia.js'))
        .pipe(gulp.dest('./public/js/'));
})

gulp.task('scss', function() {
    return sass('scss/style.scss')
        .pipe(gulp.dest('./public/css'));
})

gulp.task('html', function() {
    return gulp.src('src/app/components/**/*.html')
    	.pipe(gulp.dest('./public/html/components'));
})

gulp.task('watch', function() {
    gulp.watch(['src/app/isentia.module.js', 'src/app/components/**/*.js'], ['scripts'])
    gulp.watch('src/app/components/**/*.html', ['html'])
    gulp.watch('scss/style.scss', ['scss'])
})

gulp.task('default', ['connect', 'watch'])

