/**
 * System configuration for Angular samples
 * Adjust as necessary for your application needs.
 */
(function (global) {
  System.config({
    paths: {
      // paths serve as alias
      'npm:': 'node_modules/',
      'root:': 'js/'
    },
    baseURL: '/',
    // map tells the System loader where to look for things
    map: {
      // our app is within the app folder
      app: 'js',

      // angular bundles
      '@angular/core': '@angular/core/bundles/core.umd.min.js',
      '@angular/common': '@angular/common/bundles/common.umd.min.js',
      '@angular/compiler': '@angular/compiler/bundles/compiler.umd.min.js',
      '@angular/platform-browser': '@angular/platform-browser/bundles/platform-browser.umd.min.js',
      '@angular/platform-browser-dynamic': '@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.min.js',
      '@angular/http': '@angular/http/bundles/http.umd.min.js',
      '@angular/router': '@angular/router/bundles/router.umd.min.js',
      '@angular/forms': '@angular/forms/bundles/forms.umd.min.js',
      '@angular/material': '@angular/material/bundles/material.umd.js',

      // other libraries
      'rxjs':                      '/js-libs/rxjs',
      'angular-in-memory-web-api': 'npm:angular-in-memory-web-api/bundles/in-memory-web-api.umd.js',
      'angular2localization': '@angular/localization/angular2localization.umd.min.js',
    },

    bundles: {
      "js-libs/rxjs/bundles/Rx.min.js": [
          "rxjs/*",
          "rxjs/Subject",
          "rxjs/operator/*",
          "rxjs/observable/*",
          "rxjs/add/operator/*",
          "rxjs/add/observable/*",
          "rxjs/util/*"
      ]
    },

    // packages tells the System loader how to load when no filename and/or no extension
    packages: {
      app: {
        main: './app.js',
        defaultExtension: 'js'
      },
      rxjs: {
        defaultExtension: 'js'
      }
    }
  });
})(this);
