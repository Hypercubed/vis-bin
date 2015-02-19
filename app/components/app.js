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
    'ngMaterial',
    'debounce',
    //'ui.bootstrap',
    'ui.codemirror',
    'ui.grid',
    'ui.grid.autoResize',
    'xeditable',
    'hc.downloader',
    'hc.marked'
  ])
  .config(function($logProvider, myConfig){
    $logProvider.debugEnabled(myConfig.debug);
  })
  .config(function($mdThemingProvider) {
    $mdThemingProvider.theme('default')
      .primaryColor('blue')
      .accentColor('orange')
      .backgroundColor('blue-grey');
  })
  /* .config(function ($routeProvider) {

    var resolve = {
      dataService: ['$route', 'DataServiceFactory', function($route, DataServiceFactory) {
        var id = $route.current.params.id || 'index';
        var conn = $route.current.params.conn || 'data';

        var DS = new DataServiceFactory(conn, id);
        return DS.load(conn, id);
      }]
    };

    $routeProvider
      .when('/view/:id/', {
        templateUrl: 'components/main/preview.html',
        controller: 'MainCtrl as main',
        resolve: MainCtrl.resolve
      })
      .when('/edit/:id/', {
        templateUrl: 'components/main/main.html',
        controller: 'MainCtrl as main',
        resolve: resolve
      })
      .when('/:conn/:id/', {
        templateUrl: 'components/main/main.html',
        controller: 'MainCtrl as main',
        resolve: resolve
      })
      .when('/:id/', {
        templateUrl: 'components/main/preview.html',
        controller: 'MainCtrl as main',
        resolve: resolve
      })
      .otherwise({
        redirectTo: '/view/index'
      });

  }) */
  //.config(function($tooltipProvider) {
  //  $tooltipProvider.options({ popupDelay: 0, animation: false })
  //})
  .run(function(editableOptions) {
    editableOptions.theme = 'bs3';
  });
