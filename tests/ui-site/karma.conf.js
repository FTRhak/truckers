// Karma configuration
// Generated on Mon Jan 18 2016 15:08:57 GMT+0200 (FLE Standard Time)

module.exports = function (config) {
    var host = 'http://localhost:3000';
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',


        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['ng-scenario', 'jasmine'],


        // list of files / patterns to load in the browser
        files: [
            { pattern: '../../node_modules/rxjs/bundles/*.js', included: true, watched: false, nocache: false },
            { pattern: '../../node_modules/systemjs/dist/*.js', included: true, watched: false, nocache: false },

            { pattern: '../../client/js/**/*.js', included: false, watched: false, nocache: false },
            { pattern: '../../client/templates/**/*.html', included: false, watched: false, nocache: false },

            'authentication/login.js'
        ],


        // list of files to exclude
        exclude: [
        ],


        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
        },


        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress'],

        urlRoot: '/__karma/',

        hostname: 'localhost',
        proxyValidateSSL: false,
        proxies: {
            '/registration/': 'http://localhost:3000/#/registration/',
            '/restore/': 'http://localhost:3000/#/restore/',
            '/login/': 'http://localhost:3000/#/login/',
            '/':  'http://localhost:3000/#/'
        },

        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,

        browserNoActivityTimeout: 1000000,



        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,


        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['Chrome_without_security'],

        customLaunchers: {
            Chrome_without_security: {
                base: 'Chrome',
                //flags: ['--disable-web-security']
            }
        },

        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: true,

        // Concurrency level
        // how many browser should be started simultaneous
        concurrency: Infinity,

        // list of karma plugins
        plugins: [
            //'karma-junit-reporter',
            'karma-chrome-launcher',
            //'karma-firefox-launcher',
            'karma-ng-scenario',
            'karma-jasmine'
            //'karma-phantomjs-launcher'

        ]
    })
}
