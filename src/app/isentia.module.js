(function() {
  	'use strict';
	require('angular');

	// components
	// ---> controllers
	require('./components/photo/photo.controller');
	
	// ---> factories
	require('./components/factory/photo.factory');

	// ---> directives
	require('./components/directive/gridview.directive');
	require('./components/directive/html.binding.directive');
	require('./components/directive/data.scroll.directive');
	require('./components/directive/auto.trigger.directive');

	var isentia = angular.module('isentia', [ require('angular-ui-router'), require('angular-sanitize'),
		'photo.controller', 
		'photo.factory', 
		'gridview.directive', 
		'html.binding.directive',
		'data.scroll.directive',
		'auto.trigger.directive'
		 ]);
	// configurations
	isentia.config(routerConfig);

	function routerConfig($stateProvider, $urlRouterProvider){
	    $stateProvider
	      	.state('photos', {
	        	url: '/photos',
	        	templateUrl: './html/components/photo/photo.html',
	        	controller: 'PhotoController'
	    });
	    $urlRouterProvider.otherwise('/');
	}

	angular.bootstrap(document, ['isentia']);
})();
