'use strict';

/**
 * @ngdoc overview
 * @name myApp
 * @description
 * # myApp
 *
 * Main module of the application.
 */
angular
  .module('myApp', [
    'ngAnimate',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.bootstrap',
    'ui.codemirror',
    'ui.grid', 'ui.grid.autoResize',
    'xeditable',
    'hc.downloader'
  ])
  .config(function ($routeProvider) {

    var resolve = {
      index: function($route, DataService) { return DataService.load($route.current.params.id); }
    };

    $routeProvider
      .when('/preview/:id/', {
        templateUrl: 'components/main/preview.html',
        controller: 'MainCtrl as main',
        resolve: resolve
      })
      .when('/:id/', {
        templateUrl: 'components/main/main.html',
        controller: 'MainCtrl as main',
        resolve: resolve
      })
      .otherwise({
        redirectTo: '/index'
      });

  })
  .run(function(editableOptions) {
    editableOptions.theme = 'bs3';
  });
