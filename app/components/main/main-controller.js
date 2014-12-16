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
      for (var key in files) delete files[key];
    }

    function loadFile(id, file) {
      $log.debug('Loading ',id,file);

      return $http.get('data/'+id+'/'+file).success(function(data) {
        if (file.indexOf('.json') > -1) {
          files[file] = { data: data };
        } else {
          files[file] = { text: data };
          if (file.indexOf('.tsv') > -1) {  // TODO: tsv, cvs, json, txt, html
            var parse = Papa.parse(data, {header: true, delimiter: '\t', skipEmptyLines: true});
            angular.extend(files[file], parse);
          }
        }
      });
    }

    function reparse() {  // TODO: combine with loadFile
      angular.forEach(files, function(file, filename) {
        if (filename.indexOf('.tsv') > -1) {
          var parse = Papa.parse(file.text, {header: true, delimiter: '\t', skipEmptyLines: true});
          angular.extend(file, parse);
        }
      });
    }

    function load(id) {

      clear();

      return loadFile(id, 'index.json')
        .then(function(res) {
          res.data.files = res.data.files || ['index.html'];
          return loadFiles(id, res.data.files);
        });
    }

    function loadFiles(id, files) {

      var p = files.map(function(file) {
        return loadFile(id, file);
      });

      return $q.all(p);

    }

    return {
      files: files,
      load: load,
      reparse: reparse
    };

  })
  .controller('MainCtrl', function ($scope, $log, $timeout, $templateCache, $window, DataService) {

    var main = this;

    angular.extend(main, DataService.files['index.json'].data);

    main.files = $scope.files = $window.files = DataService.files;

    main.viewPath = '';

    angular.forEach(main.files, function(file, filename) { /// TEMP
      if (filename.indexOf('.tsv') > -1) {
        main.dataKey = filename;
      } else {
        main.viewKey = filename;
        main.view = file.text;
      }
    });

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

      //var view = DataService.files[main.viewKey].text;

      main.view = '';

      $timeout(function() {
        main.view = DataService.files[main.viewKey].text;
      });


      //var r = String(nextUid());
      //var path = '/$dynamichtml/view'+r+'.html';
      //$templateCache.put(path, view);  // maybe  not the best way
      //main.viewPath = path;

      main.showResult = true;

    };

    main.refresh();

})

.directive('hasSvg', function() {  // Improve this, move to downloader?

    return {
      scope: {
        hasSvg: '='
      },
      link: function (scope, element, attr) {


        var watch = function() {
          return element.html();
        };

        scope.$watch(watch, function() {

          var svg = element.find('svg');

          scope.hasSvg = (svg.length > 0) ? svg.parent()[0].id : false;

        });
      }
    }

})

.directive('ngBindHtmlTemplate', function($parse, $compile) {
  return {
    compile: function compile(tElement, tAttrs) {
      var getter = $parse(tAttrs.ngBindHtmlTemplate);
      var watch = $parse(tAttrs.ngBindHtmlTemplate, function getStringValue(value) {
        return (value || '').toString();
      });
      return function (scope, element) {
        scope.$watch(watch, function() {

          element.html(getter(scope));
          $compile(element.contents())(scope);

        });
      };
    }
  };
})

.directive('editableCode', ['editableDirectiveFactory',
  function(editableDirectiveFactory) {
    return editableDirectiveFactory({
      directiveName: 'editableCode',
      inputTpl: '<textarea ui-codemirror="{ lineNumbers : true }"></textarea>',
      autosubmit: function() {
        var self = this;
        self.inputEl.bind('change', function() {
          self.scope.$apply(function() {
            self.scope.$form.$submit();
          });
        });
      }
    });
}]);
