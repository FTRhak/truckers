var gulp = require('gulp');
var clean = require('gulp-clean');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var rename = require("gulp-rename");

var PROJECT_SRC = 'src/';
var PROJECT_BUILD = 'client/';

//-----------CLEAN-----------------
gulp.task('build-clean', function () {
	return gulp.src(PROJECT_BUILD, {read: false})
		.pipe(clean());
});
//-----------CSS-------------------
gulp.task('css-dev', function() {
  gulp.src(PROJECT_SRC + 'sass/style.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(PROJECT_BUILD + 'css/'));
});
//-----------JS--------------------
gulp.task('js-dev', function() {
  return gulp.src([
      PROJECT_SRC + 'js/modules/*.js',
      PROJECT_SRC + 'js/app.js'])
    .pipe(concat('app.js'))
    .pipe(gulp.dest(PROJECT_BUILD + 'js/'));
});
//-----------TEMPLATES-------------
gulp.task('template-dev', function() {
  return gulp.src([
      PROJECT_SRC + 'templates/*/*.html'])
    //.pipe(concat('app.js'))
    .pipe(gulp.dest(PROJECT_BUILD + 'templates/'));
});
//-----------INDEX-----------------
gulp.task('index-dev', function() {
  return gulp.src([
      PROJECT_SRC + 'view/index.html'])
    .pipe(rename('index.ejs'))
    .pipe(gulp.dest(PROJECT_BUILD));
});


//===============================
gulp.task('dev-web', ['css-dev', 'js-dev', 'template-dev', 'index-dev']);