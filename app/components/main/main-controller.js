/* global $:true */

'use strict';

/**
 * @ngdoc function
 * @name myApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the myApp
 */
angular.module('myApp')
  .controller('MainCtrl', function ($scope, $location, $log, $timeout, dataService) {

    var main = this;

    main.isPrintView = false;

    angular.extend(main, dataService.files[dataService.id].data);  // todo: use main.data instead?
    main.files = dataService.files;
    main.data = angular.extend({}, dataService.files[dataService.id].data);

    var hash = $location.hash();
    if (hash && main.files[hash]) {
      main.files[hash].active = true;
    }

    main.ruid = 0;

    main.refreshTabs =  function(file) {  // hack
      if (!file.drawn) {
        $timeout(function() {
          file.drawn = true;
        });
      }
    };

    main.reparse = function refresh() {
      $log.debug('main.reparse');

      dataService.reparse();
      main.isDirty = true;
    };

    main.refresh = function refresh() {
      $log.debug('main.refresh');

      dataService.reparse();

      ++main.ruid;
      main.showResult = true;
      main.isDirty = false;

    };

    main.togglePreview = function() {
      main.isPrintView = !main.isPrintView;
      $timeout(function() {
        main.refresh();
      });
    };

    main.codemirrorLoaded = function(cm) {

      $timeout(function() {
        cm.refresh();
      }, 100);

    };

    main.refresh();

    main.isDirty = false;

})

.directive('getSvgs', function() {  // Improve this, move to downloader?

  return {
    scope: {
      getSvgs: '='
    },
    link: function (scope, element, attr) {

      function getSVGs() {

        var svgs = element.find('svg'),
        ids = [];

        if (svgs.length > 0) {

          svgs.each(function(d) {

            var elm = $(this);

            var o = {};

            o.id = elm.attr('id') || 'svg-'+d;
            o.title = elm.attr('title') || o.id;

            elm.attr(o);

            ids.push(o);
          });

        }

        scope.getSvgs = ids;

      }

      var watch = attr.refresh || function() {
        return element.html();
      };

      scope.$watch(watch, getSVGs);

    }
  };

})

.controller('FileCtrl', function() {  // TODO: make directive
  //var vm = this;
});
