(function() {
  'use strict';
  var angular = require( 'angular' );

  angular.module( 'paypal.factory', [] ).factory('PaypalFactory', [ '$http', '$q', '$log', PaypalFactory ]);
  function PaypalFactory( $http, $q, $log ) {

    var _createPayment = function () {
      var def = $q.defer(); 
      $http({
        url: 'https://isentia.herokuapp.com/api/payment/create',
        method: 'POST',
        headers: { "Access-Control-Allow-Origin": "*" }
      }).then(function( result ){
        def.resolve( result.data.wrapper );
      }, function( error ){
        $log.error( 'Error: ', error);
        def.reject( error );
      });
      return def.promise;
    }

    var _executePayment = function (paymentId, payerId) {
      var def = $q.defer(); 
      $http({
        url: 'https://isentia.herokuapp.com/api/payment/execute',
        method: 'POST',
        headers: { "Access-Control-Allow-Origin": "*" },
        data: {
          'paymentId': paymentId,
          'payerId': payerId
        }
      }).then(function( result ){
        def.resolve( result.data.wrapper );
      }, function( error ){
        $log.error( 'Error: ', error);
        def.reject( error );
      });
      return def.promise;
    }

    return {
      createPayment : _createPayment,
      executePayment : _executePayment
    }
    
  }
})();
