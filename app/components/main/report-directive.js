'use strict';

angular.module('myApp')
.directive('reportInclude', function($window, $compile, $timeout, $log, DataServiceFactory) {
	return {
		restrict: 'AE',
		scope: {
			'dataPackage': '=data',
			//'refresh': '=',
			'isPrintView': '=printView'
		},
		template: '<div id="report-body" class="report-container" ng-class="{ dirty: dataPackage.isDirty }" ng-cloak />',
		link: function(scope, element, attr) {

			var reportContainer = element.find('div');


			$log.debug('Report data', scope.dataPackage);

			/* var d3 = $window.d3;  // todo: fix, stupid hack

			var d3Tsv = d3.tsv;
			d3.tsv = function(filename, callback) { // hack to load package files
				data.resources.forEach(function(file) {
					if (file.name === filename) {
						return callback(null, file.data);
					}
				})
				return d3Tsv.apply(this, arguments);
			};
			angular.extend(d3.tsv, d3Tsv);

			var d3Select = d3.select;
			d3.select = function() {  // hack to select report-body instead of body
				if (arguments[0] === 'body') {
					arguments[0] = '#report-body';
				}
				return d3Select.apply(this, arguments);
			}; */

			var height, width;
			function cacheElementSize() {
				width = element.width();
				height = element.height();
				//console.log('cache', height, width);
			}

			function onWindowResize() {
				//console.log('onWindowResize');
				if (width !== element.width() || height !== element.height()) {
					onRefresh();
				}
			}

			function onRefresh() {

				$log.debug('Generating report');

				if (scope.isDirty) {
					$log.debug('Reparsing data package');
				}

				var content = {
					head: '',
					body: '',
					endBody: '',
					js: []
				};

				angular.forEach(scope.dataPackage.resources, function(file) {  // TODO: improve this, place in correct place, in correct order, handle other types, move to data service
					if (scope.dataPackage.isDirty && file.isDirty) {
						DataServiceFactory.prototype.reparse(file);
					}
					if (file.name === 'index.html' || file.name === 'index.htm') {
						content.body += file.content;
					} else if (file.name === 'README.md') {
						content.body += '<marked>'+file.content+'</marked>';  // convert here?
					} else if (file.type === 'text/css') {
						content.head += '<style>'+file.content+'</style>';
					} else if (file.type === 'application/javascript') {
						//content.endBody += '<script>'+file.content+'</script>';
						content.js.push(file.content + '//@ sourceURL=' + file.path);
					}
				});

				$window.$dataPackage = scope.dataPackage;

				//scope.$evalAsync(function() {  // Do this last
					//var container = document.querySelector('#report-body')
					if (false) {  // trying shadow dom

						angular.element.prototype.shadow = function() {
							var t = angular.element(this);
							var g = (t[0]).createShadowRoot();
							return g;
						}

						//var shadow = reportContainer[0].createShadowRoot();
						//var container = angular.element(shadow);

						//container.html([content.head,content.body,content.endBody].join(''));

						//$compile(container)(scope);
					} else {
						reportContainer.html([content.head,content.body,content.endBody].join(''));
						$compile(reportContainer.contents())(scope);
					}

					content.js.forEach($window.eval);


				//});

				//$window.d3 = d3;  // restore

				$log.debug('Generating report - done');
				scope.dataPackage.isDirty = false;
				cacheElementSize();

			}

			onRefresh();

			//scope.$watch('refresh', onRefresh);

			scope.$on(attr.refreshOn, function() {
				$timeout(function() {
					onRefresh();
				},1000);
			});

			$window.addEventListener('resize', onWindowResize);

		}
	};
})
.directive('ngShadow', function(){
	return{
		restrict: 'A',
		transclude: true,
		template: '<div id="shadowtranscludeparent"><div id="shadowtransclude" ng-transclude></div></div>',
		link: function(scope, elem, attr){
			var a = document.querySelector('#shadowtranscludeparent').createShadowRoot();
			var q = document.querySelector('#shadowtransclude');
			a.appendChild(q);
		}
	}
});
