'use strict';

angular.module('myApp')
	.constant('myConfig', {
		title: '<%= title %>',
		debug: '<%= debug %>'
	})
	.run(function($rootScope, myConfig) {
		$rootScope.myConfig = myConfig;
	});
