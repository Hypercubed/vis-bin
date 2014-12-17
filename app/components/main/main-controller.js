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
        file.text = data;
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
        var parse = Papa.parse(file.text, {header: true, delimiter: '\t', skipEmptyLines: true});
        angular.extend(file, parse);
      } else if (ext === 'json') {
        file.data = angular.fromJson(file.text);
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
  .controller('MainCtrl', function ($scope, $log, $timeout, $templateCache, $window, $routeParams, DataService) {

    var main = this;

    angular.extend(main, DataService.files[$routeParams.id+'/index.json'].data);

    main.files = $scope.files = $window.files = DataService.files;

    main.viewPath = '';

    angular.forEach(main.files, function(file) { /// TEMP
      if (file.name.indexOf('.html') > -1 && !main.viewKey) {
        main.viewKey = file.name;
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

      console.log(main.viewKey);

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
      link: function (scope, element) {


        var watch = function() {
          return element.html();
        };

        scope.$watch(watch, function() {

          var svg = element.find('svg');

          scope.hasSvg = (svg.length > 0) ? svg.parent()[0].id : false;

        });
      }
    };

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
