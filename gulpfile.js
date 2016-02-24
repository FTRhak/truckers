var gulp = require('gulp');
var clean = require('gulp-clean');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var rename = require("gulp-rename");
var replace = require("gulp-replace");

var PROJECT_SRC = 'src/';
var PROJECT_BUILD = 'client/';

//-----------CLEAN-----------------
gulp.task('build-clean', function () {
	return gulp.src(PROJECT_BUILD, {read: false})
		.pipe(clean());
});
//-----------CSS-------------------
gulp.task('css-dist-dev', function() {
    gulp.src(['node_modules/bootstrap/dist/css/bootstrap.css',
        'node_modules/bootstrap/dist/css/bootstrap-theme.css'])
        //.pipe(concat('base.min.css'))
        .pipe(gulp.dest(PROJECT_BUILD + 'css/'));
});
gulp.task('css-dist-prod', function() {
    gulp.src(['node_modules/bootstrap/dist/css/bootstrap.min.css',
        'node_modules/bootstrap/dist/css/bootstrap-theme.min.css'])
        //.pipe(concat('base.min.css'))
        .pipe(gulp.dest(PROJECT_BUILD + 'css/'));
});
gulp.task('sass-dev', function() {
  gulp.src(PROJECT_SRC + 'sass/style.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(PROJECT_BUILD + 'css/'));
});
gulp.task('sass-prod', function() {
  gulp.src(PROJECT_SRC + 'sass/style.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(PROJECT_BUILD + 'css/'));
});
gulp.task('css-dev', ['css-dist-dev', 'sass-dev']);
gulp.task('css-prod', ['css-dist', 'sass-prod']);
//-----------JS--------------------
gulp.task('js-libs-dev', function() {
  return gulp.src([
      PROJECT_SRC + 'js/modules/*.js',
      PROJECT_SRC + 'js/app.js'])
    .pipe(gulp.dest(PROJECT_BUILD + 'js/'));
});
gulp.task('js-libs-prod', function() {
  return gulp.src([
      PROJECT_SRC + 'js/modules/*.js',
      PROJECT_SRC + 'js/app.js'])
    .pipe(concat('tools.js'))
    .pipe(gulp.dest(PROJECT_BUILD + 'js/'));
});
gulp.task('js-app-dev', function() {
  return gulp.src([
      PROJECT_SRC + 'js/modules/*.js',
      PROJECT_SRC + 'js/app.js'])
    .pipe(concat('app.js'))
    .pipe(gulp.dest(PROJECT_BUILD + 'js/'));
});
gulp.task('js-app-prod', function() {
  return gulp.src([
      PROJECT_SRC + 'js/modules/*.js',
      PROJECT_SRC + 'js/app.js'])
    .pipe(concat('app.js'))
    .pipe(gulp.dest(PROJECT_BUILD + 'js/'));
});

gulp.task('js-dev', ['js-app-dev']);
gulp.task('js-prod', ['js-app-prod']);
//-----------TEMPLATES-------------
gulp.task('template-dev', function() {
  return gulp.src([
      PROJECT_SRC + 'templates/*/*.html'])
    //.pipe(concat('app.js'))
    .pipe(gulp.dest(PROJECT_BUILD + 'templates/'));
});
//-----------INDEX-----------------
var styleDev = ['bootstrap.css', 'bootstrap-theme.css', 'style.css'];
var styleProd = ['base.min.css', 'style.css'];

var libsScriptDev = [
    'libs/angular.js',
];
var libsScriptProd = ['tools.js'];

var scriptDev = ['app.js'];
var scriptProd = ['script.js'];

function launchStylesAsString(list, title){
    var res = "";
    list.forEach(function(el){
        res = res + '<link rel="stylesheet" type="text/css" href="css/' + el + '?v='+ title +'" media="all" />' + "\n";
    });
    return res;
}

function launchScriptsAsString(list, title){
    var res = "";
    list.forEach(function(el){
        res = res + "\n" + '<script type="text/javascript" src="js/' + el + '?v='+ title +'"></script>';
    });
    return res;
}
function supportedLanguagesDev(callback) {
    var res = '<script type="text/javascript" >';
    res  += 'var supportedLanguages = [';

    fs.readdir(DIST_MOBILE_SOURCE + 'lang/', function (err, files) {
        files.forEach(function(file, index){
            var ln = file.substr(0, file.length - 5);
            res += (index === 0 ? '' : ',') + "'" + ln + "'";
        });
        res += '];</script>';
        callback(res);
    });
}
function supportedLanguagesProd(callback) {
    var files = ['en'];
    var res = '<script type="text/javascript" >';
    res  += 'var supportedLanguages = [';
    files.forEach(function(file, index){
        res += (index === 0 ? '' : ',') + "'"+file+"'";
    });
    res += '];</script>';
    callback(res);
}

gulp.task('index-dev', function() {
  var version = 0.1;
  var listLanguages = ['en'];
  supportedLanguagesProd(function(listLanguages){
      return gulp.src([
      PROJECT_SRC + 'view/index.html'])
        .pipe(replace(/(<!--STYLES-->)/g, launchStylesAsString(styleDev, version)))
        .pipe(replace(/(<!--JSLIBS-->)/g, launchScriptsAsString(libsScriptDev, version)))
        .pipe(replace(/(<!--JSAPP-->)/g, launchScriptsAsString(scriptDev, version)))
        .pipe(replace(/(<!--LN-->)/g, listLanguages))
        .pipe(rename('index.ejs'))
        .pipe(gulp.dest(PROJECT_BUILD));
  });
});


//===============================
gulp.task('dev-web', ['css-dev', 'js-dev', 'template-dev', 'index-dev']);