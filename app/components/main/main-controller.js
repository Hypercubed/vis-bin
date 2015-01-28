/* global $:true */

(function() {
  'use strict';

  /**
  * @ngdoc function
  * @name myApp.controller:MainCtrl
  * @description
  * # MainCtrl
  * Controller of the myApp
  */
  function MainCtrl($scope, $location, $log, $timeout, dataPackage) {

    var main = this;

    main.isPrintView = false;

    main.dataPackage = dataPackage;  // rename datapackage

    var hash = $location.hash();
    if (hash) {
      angular.forEach(main.dataPackage.resources, function(file) {
        //console.log('make active', file);
        file.active = hash === file.name;
        $location.replace().hash('');
      });
    }

    main.refreshTabs =  function(file) {  // hack to redraw codemirror
      if (!file.drawn) {
        $timeout(function() {
          file.drawn = true;
        });
      }
    };

    main.fileChanged = function(file) {
      dataPackage.isDirty = true;                // any data changed
      if (file) { file.isDirty = true; }  // this data changed
    };

    main.refresh = function() {// todo: move to report directive?
      $log.debug('main.refresh');

      main.showResult = true;  // switch to results tab
      $scope.$broadcast('report:refresh');
    };

    main.togglePreview = function() {// todo: move to report directive?
      main.isPrintView = !main.isPrintView;
      main.refresh();
    };

    /* main.resize = function() {// todo: move to report directive?
      console.log('a');
      if (main.showResult || main.isPrintView) {
        console.log('b');
        main.refresh();
      }
    }; */

    main.codemirrorLoaded = function(cm) {

      $timeout(function() {
        cm.refresh();
      }, 100);

    };

    main.refresh();

    main.newFile = function(file) {
      var resource;

      if (arguments.length < 1) {
        resource = {
          name: 'new.txt',
          type: 'plain/text',
          content: ''
        };
      } else {
        resource = {
          name: file.name,
          type: file.type,
          content: file.content || ''
        };
      }

      resource.active = true;

      main.dataPackage.resources.push(resource);
      main.fileChanged(resource);
      //main.refresh();
    };

  }

  MainCtrl.resolve = {
    dataPackage: ['$route', 'DataServiceFactory', function($route, DataServiceFactory) {
      var id = $route.current.params.id || 'index';
      var conn = $route.current.params.conn || 'data';

      return new DataServiceFactory(conn, id).load();

    }]
  };

  MainCtrl.config = function($routeProvider) {  // todo: simplify this
    $routeProvider
      .when('/view/:id/', {  // same as /:id/
        templateUrl: 'components/main/preview.html',
        controller: 'MainCtrl as main',
        resolve: MainCtrl.resolve,
        reloadOnSearch: false
      })
      .when('/edit/:id/', {
        templateUrl: 'components/main/main.html',
        controller: 'MainCtrl as main',
        resolve: MainCtrl.resolve,
        reloadOnSearch: false
      })
      .when('/:conn/:id/', {
        templateUrl: 'components/main/main.html',
        controller: 'MainCtrl as main',
        resolve: MainCtrl.resolve,
        reloadOnSearch: false
      })
      .when('/:id/', { // view/:id
        templateUrl: 'components/main/preview.html',
        controller: 'MainCtrl as main',
        resolve: MainCtrl.resolve,
        reloadOnSearch: false
      })
      .when('/', {  // view/index
        templateUrl: 'components/main/preview.html',
        controller: 'MainCtrl as main',
        resolve: MainCtrl.resolve,
        reloadOnSearch: false
      })
      .otherwise({
        redirectTo: '/'
      });
  };

  angular.module('myApp')
    .controller('MainCtrl', MainCtrl)
    .config(['$routeProvider', MainCtrl.config])
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
    /* .directive('onSizeChanged', ['$window', function ($window) {  // combine with report directive?
      return {
        restrict: 'A',
        scope: false,
        link: function (scope, $element, attr) {
          var element = $element[0];

          var onSizeChanged = scope.$eval(attr.onSizeChanged);

          cacheElementSize(scope, element);
          $window.addEventListener('resize', onWindowResize);

          function cacheElementSize(scope, element) {
            scope.cachedElementWidth = element.offsetWidth;
            scope.cachedElementHeight = element.offsetHeight;
          }

          function onWindowResize() {
            console.log('window resized');
            var isSizeChanged = scope.cachedElementWidth != element.offsetWidth || scope.cachedElementHeight != element.offsetHeight;
            if (isSizeChanged) {
              onSizeChanged();
            }
          };
        }
      }
    }]) */
    .controller('FileCtrl', function() {  // TODO: make directive
      //var vm = this;
    })
    .directive('fileDropzone', function($window) {
      return {
        restrict: 'A',
        scope: {
          file: '=',
          fileName: '=',
          dropped: '='
        },
        link: function(scope, element, attrs) {
          var validMimeTypes = attrs.fileDropzone;

          function processDragOverOrEnter(event) {
            //console.log('processDragOverOrEnter');
            if (event !== null) {
              event.preventDefault();
            }
            element.addClass('hover');
            (event.dataTransfer || event.originalEvent.dataTransfer).effectAllowed = 'copy';
            return false;
          }

          function processDragLeave(event) {
            //console.log('processDragExit');
            if (event !== null) {
              event.preventDefault();
            }
            element.removeClass('hover');
            return false;
          }

          function checkSize(size) {
            var _ref;
            if (((_ref = attrs.maxFileSize) === (void 0) || _ref === '') || (size / 1024) / 1024 < attrs.maxFileSize) {
              return true;
            } else {
              $window.alert('File must be smaller than ' + attrs.maxFileSize + ' MB');
              return false;
            }
          }

          function isTypeValid(type) {
            if ((validMimeTypes === (void 0) || validMimeTypes === '') || validMimeTypes.indexOf(type) > -1) {
              return true;
            } else {
              $window.alert("Invalid file type.  File must be one of following types " + validMimeTypes);
              return false;
            }
          }

          element.bind('dragover', processDragOverOrEnter);
          element.bind('dragenter', processDragOverOrEnter);
          element.bind('dragleave', processDragLeave);

          function processDropFile(file) {
            var reader = new FileReader();
            reader.onload = function(evt) {
              file.content = evt.target.result;
              if (checkSize(file.size) && isTypeValid(file.type)) {
                return scope.$apply(function() {
                  scope.dropped(file);
                });
              }
            };
            reader.readAsText(file);
          }

          return element.bind('drop', function(event) {
            if (event !== null) {
              event.preventDefault();
            }

            element.removeClass('hover');

            var files = (event.dataTransfer || event.originalEvent.dataTransfer).files;


            for (var i = 0; i < files.length; i++) {
              var file = files[i];
              processDropFile(file);
            }

            return false;
          });
        }
      };
    });

})();
