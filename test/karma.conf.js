// Karma configuration
// http://karma-runner.github.io/0.12/config/configuration-file.html
// Generated on 2014-12-05 using
// generator-karma 0.8.3

module.exports = function(config) {
  'use strict';

  config.set({
    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // base path, that will be used to resolve files and exclude
    basePath: '../',

    // testing framework to use (jasmine/mocha/qunit/...)
    frameworks: ['jasmine'],

    // list of files / patterns to load in the browser
    files: [
      // bower:js
      'bower_components/jquery/dist/jquery.js',
      'bower_components/es5-shim/es5-shim.js',
      'bower_components/angular/angular.js',
      'bower_components/json3/lib/json3.js',
      'bower_components/bootstrap/dist/js/bootstrap.js',
      'bower_components/angular-animate/angular-animate.js',
      'bower_components/angular-aria/angular-aria.js',
      'bower_components/angular-cookies/angular-cookies.js',
      'bower_components/angular-messages/angular-messages.js',
      'bower_components/angular-resource/angular-resource.js',
      'bower_components/angular-route/angular-route.js',
      'bower_components/angular-sanitize/angular-sanitize.js',
      'bower_components/angular-touch/angular-touch.js',
      'bower_components/codemirror/lib/codemirror.js',
      'bower_components/codemirror/addon/display/placeholder.js',
      'bower_components/codemirror/mode/xml/xml.js',
      'bower_components/codemirror/mode/javascript/javascript.js',
      'bower_components/codemirror/mode/htmlmixed/htmlmixed.js',
      'bower_components/codemirror/mode/css/css.js',
      'bower_components/angular-ui-codemirror/ui-codemirror.js',
      'bower_components/d3/d3.js',
      'bower_components/angular-xeditable/dist/js/xeditable.js',
      'bower_components/papaparse/papaparse.js',
      'bower_components/FileSaver/FileSaver.js',
      'bower_components/angular-downloadsvg-directive/angular-downloadsvg-directive.js',
      'bower_components/d3-tip/index.js',
      'bower_components/_F/_F.js',
      'bower_components/bootstrap-material-design/dist/js/material.js',
      'bower_components/bootstrap-material-design/dist/js/ripples.js',
      'bower_components/angular-ui-grid/ui-grid.js',
      'bower_components/marked/lib/marked.js',
      'bower_components/angular-marked/angular-marked.js',
      'bower_components/hammerjs/hammer.js',
      'bower_components/angular-material/angular-material.js',
      'bower_components/ng-debounce/angular-debounce.js',
      'bower_components/angular-mocks/angular-mocks.js',
      // endbower
      'app/components/**/*.js',
      '.tmp/components/**/*.js'
      //'test/mock/**/*.js',
      //'test/spec/**/*.js'
    ],

    // list of files / patterns to exclude
    exclude: [],

    // web server port
    port: 8080,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: [
      'PhantomJS'
    ],

    // Which plugins to enable
    plugins: [
      'karma-phantomjs-launcher',
      'karma-jasmine'
    ],

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false,

    colors: true,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,
    //logLevel: config.LOG_DEBUG,

    // Uncomment the following lines if you are using grunt's server to run the tests
    // proxies: {
    //   '/': 'http://localhost:9000/'
    // },
    // URL root prevent conflicts with the site root
    // urlRoot: '_karma_'
  });
};
