(function() {
  'use strict';
  var jQuery = require('jquery'),
      angular = require('angular');

  angular.module('payment.cancel.controller', []).controller('PaymentCancelController', [ '$scope', 'PaypalFactory', '$window', PaymentCancelController ]);
  function PaymentCancelController($scope, PaypalFactory, $window) {

    console.log("cancelled");

  }
})();
