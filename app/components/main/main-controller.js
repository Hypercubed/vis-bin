/* global Papa:true */
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
  .service('DataService', function($http, $q, $log) {  // clean this

    var files = {};

    function clear() {
      for (var key in files) {delete files[key];}
    }

    var types = {
      'text/html':                  ['html','htm'],
      'text/tab-separated-values':  ['tsv'],
      'application/json':           ['json'],
      'text/css':                   ['css'],
      'text/csv':                   ['csv'],
      'application/javascript':     ['js']
    };

    function getType(ext) {

      for (var type in types) {
        if (types[type].indexOf(ext) > -1) {
          return type;
        }
      }

      return 'unknown';

    }

    function loadFile(file) {

      file.url = file.url || file.filename;

      var _path = file.url.split('/');
      _path.shift();
      var _ext = _path[_path.length -1].split('.').pop();

      file = angular.extend({
        name: _path.join('/'),
        //id: _path[0],
        path: _path[0],
        filename: _path[1],
        ext: _ext,
        type: getType(_ext),
      }, file);

      if (file.type.indexOf('image') === 0) {
        file.show = false;
      }

      $log.debug('Loading ',file.url);

      if (!file.content) {

        var transform = function(data) {
          file.content = data;
          process(file);
          return file;
        };

        return $http.get(file.url, {transformResponse: transform})
        .success(function(_file) {
          files[_file.name] = _file;
          //console.log(_file);
        });

      } else {
        files[file.name] = file;
        //console.log(file);
        return file;
      }

    }

    function process(file) {
      if (file.ext === 'tsv') {  // TODO: more file types
        var parse = Papa.parse(file.content, {header: true, delimiter: '\t', skipEmptyLines: true});
        angular.extend(file, parse);
      } else if (file.ext === 'json') {
        file.data = angular.fromJson(file.content);
      }
    }

    function reparse() {
      angular.forEach(files, process);
    }

    function load(id) {

      clear();

      return loadFile({url: 'data/'+id+'/index.json', show: false})
        .then(function(res) {
          var files = res.data.data.files || ['data/'+id+'/index.html'];
          var q = [];

          if (angular.isObject(files) && !angular.isArray(files)) {

            angular.forEach(files, function(file) {
              file.url = file.url || file.filename;


              if (file.url.indexOf('/') < 0) {
                file.url = 'data/'+id+'/'+file.url;
              }

              q.push(loadFile(file));

            });

          } else {
            q = files.map(function(file) {

              if (!angular.isObject(file)) {
                file = { url: file, show: true };
              }

              if (file.url.indexOf('/') < 0) {
                file.url = 'data/'+id+'/'+file.url;
              }

              return loadFile(file);
            });
          }

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

.directive('reportInclude', function($window, $compile, $timeout, $log, $routeParams) {
  return {
    restrict: 'AE',
    link: function(scope, element, attr) {
      var reportContainer;

      var files = scope.$eval(attr.files) || {};

      var reportScope = scope.$new();
      $window.files = reportScope.files = files;

      var d3_tsv = d3.tsv;

      d3.tsv = function(filename, callback) { // TODO: move
        var file = files[$routeParams.id + '/' + filename];
        if (file && file.data) {
          return callback(null, file.data);
        }
        return d3_tsv(filename, callback);
      }


      function handleFiles() {

        $log.debug('Generating report');

        element.html('');

        reportContainer = angular.element('<div class="report-content">');

        var content = '';

        angular.forEach(files, function(file) {  // TODO: improve this, place in correct place, in correct order, handle other types
          if (file.filename === 'index.html' || file.filename === 'index.htm') {
            content += file.content;
          } else if (file.type === 'text/css') {
            content += '<style>'+file.content+'</style>';
          } else if (file.type === 'application/javascript') {
            content += '<script>'+file.content+'</script>';
          }
        });

        //reportScope.$evalAsync(function() {  // Do this last
          element.append(reportContainer);
          reportContainer.html(content);
          $compile(reportContainer.contents())(reportScope);
        //});

        $log.debug('Generating report - done');

      }

      //$timeout(handleFiles);
      scope.$watch(attr.refresh, handleFiles);

    }
  };
});
