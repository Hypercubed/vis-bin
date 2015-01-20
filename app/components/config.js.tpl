'use strict';

angular.module('myApp')
	.constant('myConfig', {
		title: '<%= title %>'
	})
	.run(function($rootScope, myConfig) {
		$rootScope.myConfig = myConfig;
	});
