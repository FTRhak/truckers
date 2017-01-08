﻿var gulp = require('gulp');
var clean = require('gulp-clean');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var rename = require("gulp-rename");
var replace = require("gulp-replace");
var compass = require('gulp-compass');
var minifyCSS = require('gulp-minify-css');

var PROJECT_SRC = 'src/';
var PROJECT_BUILD = 'client/';

var JS_LIBS = '';
//-----------CLEAN-----------------
gulp.task('build-clean', function () {
    return gulp.src(PROJECT_BUILD, { read: false })
        .pipe(clean());
});
//-----------CSS-------------------
gulp.task('css-dist', function () {
    gulp.src(['node_modules/bootstrap/dist/css/bootstrap.min.css',
        'node_modules/bootstrap/dist/css/bootstrap-theme.min.css'])
        .pipe(concat('base.min.css'))
        .pipe(gulp.dest(PROJECT_BUILD + 'css/'));
});
gulp.task('sass-dev', function () {
    gulp.src(PROJECT_SRC + 'sass/style.scss')
        //.pipe(sass().on('error', sass.logError))
        .pipe(compass({
            css: PROJECT_BUILD + 'css',
            sass: PROJECT_SRC + 'sass',
            image: PROJECT_SRC + 'images',
        }))
        .pipe(gulp.dest(PROJECT_BUILD + 'css/'));
});
gulp.task('sass-prod', function () {
    gulp.src(PROJECT_SRC + 'sass/style.scss')
        //.pipe(sass().on('error', sass.logError))
        .pipe(compass({
            css: PROJECT_BUILD + 'css',
            sass: PROJECT_SRC + 'sass',
            image: PROJECT_SRC + 'images',
        }))
        .pipe(minifyCSS())
        .pipe(gulp.dest(PROJECT_BUILD + 'css/'));
});
gulp.task('css-dev', ['css-dist', 'sass-dev']);
gulp.task('css-prod', ['css-dist', 'sass-prod']);
//-----------TEMPLATES-------------
gulp.task('templates', function () {
    return gulp.src([
        PROJECT_SRC + 'templates/*/*.html'])
        .pipe(gulp.dest(PROJECT_BUILD + 'templates/'));
});
//-----------ICONS-----------------
gulp.task('icons', function () {
    return gulp.src([
        PROJECT_SRC + 'icons/*',
        PROJECT_SRC + 'icons/*/*'])
        .pipe(gulp.dest(PROJECT_BUILD + 'icons/'));
});
//-----------ICONS-----------------
gulp.task('fonts', function () {
    return gulp.src([
        PROJECT_SRC + 'fonts/*'])
        .pipe(gulp.dest(PROJECT_BUILD + 'fonts/'));
});
//-----------JS--------------------
//TODO reorganize js files
var jsLibsSources = [
    'node_modules/es6-shim/es6-shim.min.js',
    'node_modules/angular2/bundles/angular2-polyfills.js',
    'node_modules/rxjs/bundles/Rx.umd.js',
    'node_modules/angular2/bundles/angular2-all.umd.js',
    'node_modules/angular2/bundles/angular2.dev.js',
    'node_modules/angular2/bundles/router.dev.js',
    //'node_modules/angular2-translator/bundles/angular2-translator.js',
    //'node_modules/systemjs/dist/system-polyfills.js',
    'node_modules/systemjs/dist/system.js',
    'node_modules/systemjs/dist/system.js.map',
    'node_modules/systemjs/dist/system.src.js',

    //'node_modules/@angular/material/material.umd.js',
    //'node_modules/@angular/material/material.umd.js.map',
];
var jsLibs = [
    'systemjs/dist/system.js',
    'es6-shim/es6-shim.min.js',
    'angular2/bundles/angular2-polyfills.js',
    'rxjs/bundles/Rx.umd.js',
    'angular2/bundles/angular2-all.umd.js',
    'angular2/bundles/angular2.dev.js',
    'angular2/bundles/router.dev.js',
    //'angular2-translator.js',
    //'material.umd.js'
    //'@angular/bundles/material.umd.js'
    
];
var jsSourves = [
    'js/settings.js',

    'js/tools/logger.js',
    'js/tools.js',

    'js/ui_contollers/MdInputContainerUI.js',

    'js/components/navigation/NavigationMenuComponent.js',
    'js/components/navigation/NavigationSideMenuComponent.js',
    'js/components/navigation/SettingsComponent.js',
    'js/components/HeaderComponent.js',
    'js/components/FooterComponent.js',
    'js/components/profile/UserSkillsComponent.js',
    'js/components/profile/UserApproversComponent.js',
    'js/components/profile/MenuCommunicationsComponent.js',
    

    'js/pipes/AgePipe.js',
    'js/pipes/DatePipe.js',
    'js/pipes/FileSizePipe.js',

    'js/service/AuthenticationService.js',
    'js/service/UserService.js',
    

    'js/modules/SiteModule.js',
    'js/modules/ChangeLanguageModule.js',
    'js/modules/authentication/LoginModule.js',
    'js/modules/authentication/LogoutModule.js',
    'js/modules/authentication/RegistrationModule.js',
    'js/modules/authentication/RegistrationCompletedModule.js',
    'js/modules/authentication/RegistrationConfirmationModule.js',
    'js/modules/authentication/RestoreModule.js',

    'js/modules/profile/UserChangePasswordModule.js',
    'js/modules/profile/UserChangeContactDataModule.js',
    'js/modules/profile/UserEditModule.js',
    'js/modules/profile/UserSettingsModule.js',
    'js/modules/profile/UserProfileModule.js',
    
    

    //'js/components/'
    //'js/app.module.js',
    'js/app.js'
];
var jsApp = ['js/app.js'];


gulp.task('js-libs-dev', function () {
    //return gulp.src(jsLibsSources)
    //    .pipe(gulp.dest(PROJECT_BUILD + 'js/libs/'));
});

gulp.task('js-libs-prod', function () {
    //return gulp.src(jsLibsSources)
    //    .pipe(gulp.dest(PROJECT_BUILD + 'js/libs/'));
});

gulp.task('js-app-dev', function () {
    return gulp.src([PROJECT_SRC + 'js/*/*/*.js',, PROJECT_SRC + 'js/*/*.js', PROJECT_SRC + 'js/*.js'])
        .pipe(gulp.dest(PROJECT_BUILD + 'js/'));
});
gulp.task('js-app-prod', function () {
    return gulp.src(jsSourves.map((el) => { return PROJECT_SRC + el; }))
        .pipe(concat('app.js'))
        .pipe(gulp.dest(PROJECT_BUILD + 'js/'));
});

gulp.task('js-dev', ['js-libs-dev', 'js-app-dev']);
gulp.task('js-prod', ['js-libs-prod', 'js-app-prod']);
//-----------INDEX-----------------
var styleProd = ['base.min.css', 'style.css'];

/*var libsScriptDev = [
    //'libs/system.js',
    //'libs/system-polyfills.js',

    'libs/es6-shim.min.js',
    'libs/angular2-polyfills.js',
    'libs/Rx.umd.js',
    //'libs/angular2.dev.js',
    'libs/angular2-all.umd.js',
    //'libs/router.dev.js'
    //'libs/angular2-localization.js'
];*/
var libsScriptProd = ['tools.js'];

var scriptDev = ['models.js', 'app.js'];
var scriptProd = ['script.js'];

function launchStylesAsString(list, title) {
    var res = "";
    list.forEach(function (el) {
        res = res + '<link rel="stylesheet" type="text/css" href="/css/' + el + '?v=' + title + '" media="all" />' + "\n";
    });
    return res;
}

function launchScriptsAsString(list, title) {
    var res = "";
    list.forEach(function (el) {
        res = res + "\n" + '<script type="application/javascript" src="/' + el + '?v=' + title + '"></script>';
    });
    return res;
}

function supportedLanguages() {
    var files = ['en'];
    var res = '<script type="text/javascript" >';
    res += 'var supportedLanguages = [';
    files.forEach(function (file, index) {
        res += (index === 0 ? '' : ',') + "'" + file + "'";
    });
    res += '];</script>';
    return res;
}

gulp.task('index-dev', function () {
    var version = Math.random();
    gulp.src([PROJECT_SRC + 'view/*/*.html'])
        .pipe(replace(/(<!--STYLES-->)/g, launchStylesAsString(styleProd, version)))
        .pipe(replace(/(<!--JSLIBS-->)/g, launchScriptsAsString(jsLibs.map(function(el){return JS_LIBS + el}), 0.1)))
        .pipe(replace(/(<!--JSAPP-->)/g, launchScriptsAsString(jsSourves, version)))
        .pipe(replace(/(<!--LN-->)/g, supportedLanguages()))
        .pipe(rename(function (path) {
            path.dirname = "/view/";
            //path.basename += "";
            path.extname = ".ejs"
        }))
        .pipe(gulp.dest(PROJECT_BUILD));
});


//===============================
gulp.task('dev-web', ['css-dev', 'templates', 'icons', 'fonts', 'js-dev', 'index-dev']);
gulp.task('prod-web', ['css-prod', 'templates', 'icons', 'fonts', 'js-prod', 'index-dev']);