'use strict';

angular.module('myApp')
.directive('reportInclude', function($window, $compile, $timeout, $log, $routeParams) {
	return {
		restrict: 'AE',
		link: function(scope, element, attr) {
			var reportContainer;

			var data = scope.$eval(attr.data) || {};
			var files = scope.$eval(attr.files) || {};

			var reportScope = scope.$new();
			$window.files = reportScope.files = files;  // rename these?
			$window.data = reportScope.data = data;

			var d3 = $window.d3;

			var d3Tsv = d3.tsv;
			d3.tsv = function(filename, callback) { // TODO: move
				var file = files[$routeParams.id + '/' + filename];
				if (file && file.data) {
					return callback(null, file.data);
				}
				return d3Tsv.apply(this, arguments);
			};
			angular.extend(d3.tsv, d3Tsv);

			var d3Select = d3.select;
			d3.select = function() {
				if (arguments[0] === 'body') {
					arguments[0] = '#report-body';
				}
				return d3Select.apply(this, arguments);
			};

			function handleFiles() {

				$log.debug('Generating report');

				element.html('');

				reportContainer = angular.element('<div id="report-body" class="report-content">');

				var content = '';

				angular.forEach(files, function(file) {  // TODO: improve this, place in correct place, in correct order, handle other types
					if (file.filename === 'index.html' || file.filename === 'index.htm') {
						content += file.content;
					} else if (file.filename === 'README.md') {
						content += '<marked>'+file.content+'</marked>';
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

				$window.d3 = d3;

				$log.debug('Generating report - done');

			}

			//$timeout(handleFiles);
			scope.$watch(attr.refresh, handleFiles);

		}
	};
});
