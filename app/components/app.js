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
    'xeditable',
    'hc.downloader'
  ])
  .config(function ($routeProvider) {

    $routeProvider
      .when('/:id/', {
        templateUrl: 'components/main/main.html',
        controller: 'MainCtrl as main',
        resolve: {
          index: function($route, DataService) { return DataService.load($route.current.params.id); }
        }
      })
      .when('/about', {
        templateUrl: 'components/about/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/index'
      });

  })
  .run(function(editableOptions) {
    editableOptions.theme = 'bs3';
  });
