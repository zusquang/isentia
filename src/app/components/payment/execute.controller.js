(function() {
  'use strict';
  var angular = require('angular');

  angular.module('payment.execute.controller', []).controller('PaymentExecuteController', [ '$scope', 'PaypalFactory', '$location', '$filter', PaymentExecuteController ]);
  function PaymentExecuteController($scope, PaypalFactory, $location, $filter) {

    $scope.executePayment = function() {
      PaypalFactory.executePayment($filter('urlquery')('paymentId'), $filter('urlquery')('PayerID')).then(function( res ){
        if (res.statusCode === 200) {
          $location.path('/photos');
        }
      });
    }

  }
})();
