(function() {
  'use strict';    
  var jQuery = require('jquery'),
      angular = require('angular');

  angular.module('data.scroll.directive', []).directive('ngScroll', [ '$rootScope', '$window', '$timeout', dataScroll ]);
  function dataScroll( $rootScope, $window, $timeout ) {

    var _link = function ( scope, ele, attrs ) {
      var gWindow = jQuery(window),
          gDocument = jQuery(document);

      var _handler = function() {
        if(gWindow.scrollTop() + gWindow.height() == gDocument.height()) { 
          if ($rootScope.$$phase) {
            return scope.$eval(attrs.ngScroll);
          } else {
            return scope.$apply(attrs.ngScroll);
          }
        }
      };

      gWindow.on('scroll', _handler);
      scope.$on('$destroy', function() {
        return gWindow.off('scroll');
      });  
    }

    return {
      link : _link
    };
  }

})();
