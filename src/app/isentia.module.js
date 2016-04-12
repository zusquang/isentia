(function() {
  	'use strict';
	require('angular');

	// components
	// ---> controllers
	require('./components/photo/photo.controller');
	require('./components/payment/execute.controller');
	require('./components/payment/cancel.controller');
	
	// ---> factories
	require('./components/factory/photo.factory');
	require('./components/factory/paypal.factory');

	// ---> directives
	require('./components/directive/gridview.directive');
	require('./components/directive/html.binding.directive');
	require('./components/directive/data.scroll.directive');
	require('./components/directive/auto.trigger.directive');

	// ---> filters
	require('./components/filter/url.query.filter');

	var isentia = angular.module('isentia', [ require('angular-ui-router'), require('angular-sanitize'),
		'photo.controller', 
		'payment.execute.controller', 
		'payment.cancel.controller', 
		'photo.factory', 
		'paypal.factory',
		'gridview.directive', 
		'html.binding.directive',
		'data.scroll.directive',
		'auto.trigger.directive',
		'url.query.filter' ]);
	// configurations
	isentia.config(routerConfig);

	function routerConfig($stateProvider, $urlRouterProvider){
	    $stateProvider.state('photos', {
	        	url: '/photos',
	        	templateUrl: './html/components/photo/photo.html',
	        	controller: 'PhotoController'
	    }).state('payment-execute', {
	        	url: '/payment/execute',
	        	templateUrl: './html/components/payment/execute.html',
	        	controller: 'PaymentExecuteController'
	    }).state('payment-cancel', {
	        	url: '/payment/cancel',
	        	templateUrl: './html/components/payment/cancel.html',
	        	controller: 'PaymentCancelController'
	    });
	    $urlRouterProvider.otherwise('/');
	}

	angular.bootstrap(document, ['isentia']);
})();
