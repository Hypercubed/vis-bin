'use strict';

/**
 * @ngdoc function
 * @name myApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the myApp
 */
angular.module('myApp')
  .controller('MainCtrl', function ($scope, $log, $timeout, $templateCache, $window, view, data) {

    var main = this;

    // Fake load
    main.title = "Bars";
    main.description = "A simple SVG bar chart. Part of the tutorial series Let’s Make a Bar Chart.";
    main.viewPath = '';

    main.dataText = data.data;
    main.viewText = view.data;

    $scope.dataset = {
      data: data.data
    };


    main.uid = 0;
    function nextUid() {
      return ++main.uid;
    }

    main.refreshTabs =  function() {
      $timeout(function() {
        nextUid();
      });
    }

    main.refresh = function refresh() {
      $log.debug('main.refresh');

      var view = main.viewText;
      var data = main.dataText;

      var r = String(nextUid());
      var path = '/$dynamichtml/view'+r+'.html';
      $templateCache.put(path, view);  // maybe  not the best way
      main.viewPath = path;

      $scope.dataset = $window.dataset = Papa.parse(data, {header: true});

      main.showResult = true;

    }

    main.refresh();

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
