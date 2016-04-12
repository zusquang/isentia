(function() {
  'use strict';    
  var angular = require('angular');

  angular.module('html.binding.directive', []).directive('ngHtml', [ '$compile', htmlBinding ]);
  function htmlBinding( $compile ) {

    var _link = function ( scope, ele, attrs ) {
      if ( attrs.ngHtml ) {
            ele.html( scope.$eval( attrs.ngHtml ) );
            $compile( ele.contents() )( scope );
        }
        scope.$watch( attrs.ngHtml, function( newValue, oldValue ) {
          if (newValue && newValue !== oldValue) {
              ele.html( newValue );
              $compile( ele.contents() )( scope );
          }
        } );
    }

    return {
      link : _link
    };
  }
})();
