(function() {
	'use strict';
	var jQuery = require('jquery'),
      angular = require('angular');

	angular.module('photo.controller', []).controller('PhotoController', [ '$scope', 'PaypalFactory', '$window', '$filter', PhotoController ]);
 	function PhotoController($scope, PaypalFactory, $window, $filter) {

    if ($filter('urlquery')('paymentId')) {
      $scope.showPayment = false;
    } else {
      $scope.showPayment = true;
    }

    $scope.openPaymentForm = function() {
      console.log('post loaded');      
    }

    $scope.createPayment = function( photo ) {
      PaypalFactory.createPayment().then(function( res ) {
        if ( res.payment.payment_method === 'paypal' ) {
          $window.location.href = res.payment.redirectUrl;
        }
      });
    }
    
  }
})();
