/* global Papa:true */

'use strict';

/**
 * @ngdoc function
 * @name myApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the myApp
 */
angular.module('myApp')
  .service('DataService', function($http, $q, $log) {  // clean this

    var files = {};

    function clear() {
      for (var key in files) {delete files[key];}
    }

    function loadFile(file) {

      if (!angular.isObject(file)) {
        file = { name: file, show: true };
      }

      angular.extend(file, {
        path: file.name.split('/')[0]
      });

      $log.debug('Loading ',file.name, file);

      var transform = function(data) {
        file.content = data;
        process(file);
        return file;
      };

      return $http.get('data/'+file.name, {transformResponse: transform})
        .success(function(_file) {
          files[_file.name] = _file;
        });
    }

    function process(file) {
      var ext = file.name.split('.').pop();
      if (['tsv'].indexOf(ext) > -1) {
        var parse = Papa.parse(file.content, {header: true, delimiter: '\t', skipEmptyLines: true});
        angular.extend(file, parse);
      } else if (ext === 'json') {
        file.data = angular.fromJson(file.content);
      }
    }

    function reparse() {
      angular.forEach(files, process);
    }

    function load(id) {

      clear();

      return loadFile({name: id+'/index.json', show: false})
        .then(function(res) {
          var files = res.data.data.files || [id+'/index.html'];

          var q = files.map(function(file) {

            if (!angular.isObject(file)) {
              file = { name: file, show: true };
            }

            if (file.name.indexOf('/') < 0) {
              file.name = id+'/'+file.name;
            }

            return loadFile(file);
          });

          return $q.all(q);
        });
    }

    return {
      files: files,
      load: load,
      reparse: reparse
    };

  })
  .controller('MainCtrl', function ($scope, $log, $timeout, $routeParams, DataService) {

    var main = this;

    angular.extend(main, DataService.files[$routeParams.id+'/index.json'].data);
    main.files = DataService.files;

    main.uid = 0;
    function nextUid() {
      return ++main.uid;
    }

    main.refreshTabs =  function() {
      $timeout(function() {
        nextUid();
      });
    };

    main.refresh = function refresh() {
      $log.debug('main.refresh');

      DataService.reparse();

      main.ruid = main.uid;
      main.showResult = true;
      main.isDirty = false;

    };

    main.makeDirty = function() {
      main.isDirty = true;
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

.directive('reportInclude', function($window, $compile, $timeout, $log) {
  return {
    restrict: 'AE',
    link: function(scope, element, attr) {
      var reportContainer;

      var files = scope.$eval(attr.files) || {};

      var reportScope = scope.$new();
      $window.files = reportScope.files = files;

      function handleFiles() {

        $log.debug('Generating report');

        element.html('');

        reportContainer = angular.element('<div class="report-content">');

        angular.forEach(files, function(file) { // TODO: handle, CSS, JS files
          if (file.name.indexOf('index.html') > 0) {

            //reportScope.$evalAsync(function() {  // Do this last
              element.append(reportContainer);
              reportContainer.html(file.content);
              $compile(reportContainer.contents())(reportScope);
            //});

          }
        });

        $log.debug('Generating report - done');

      }

      //$timeout(handleFiles);
      scope.$watch(attr.refresh, handleFiles);

    }
  };
});
