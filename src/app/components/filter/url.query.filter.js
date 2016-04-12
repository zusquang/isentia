(function() {
  'use strict';    
  var angular = require('angular');

  angular.module('url.query.filter', []).filter( 'urlquery', [ '$window' , function( $window ) {
    return function (sParam) {
      var sPageURL = $window.location.hash.split('?')[1];
      if ( typeof sPageURL === 'undefined' ) {
        return false;
      } 
      var sURLVariables = sPageURL.split('&');
      for ( var i = 0; i < sURLVariables.length; i++ ) {
        var sParameterName = sURLVariables[i].split('=');
        if ( sParameterName[0] == sParam ) {
          return sParameterName[1];
        }
      }
    }
  }]);
})();
