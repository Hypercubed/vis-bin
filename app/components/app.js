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
    'hc.downloader',
    'hc.marked'
  ])
  .config(function ($routeProvider) {

    var resolve = {
      dataService: function($route, DataServiceFactory) {
        var id = $route.current.params.id || 'index';
        var conn = $route.current.params.conn || 'data';

        var DS = new DataServiceFactory(conn, id);
        return DS.load(conn, id);
      }
    };

    $routeProvider
      .when('/preview/:id/', {
        templateUrl: 'components/main/preview.html',
        controller: 'MainCtrl as main',
        resolve: resolve
      })
      .when('/:conn/:id/', {
        templateUrl: 'components/main/main.html',
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
