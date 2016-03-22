(function() {
  'use strict';    
  var jQuery = require('jquery'),
      angular = require('angular'),
      _ = require('underscore');

  angular.module('auto.trigger.directive', []).directive('autoTrigger', [ '$rootScope', '$timeout', autoTriggerDirective ]);
  function autoTriggerDirective( $rootScope, $timeout ) {

    var _link = function ( scope, ele, attrs ) {
      var debounceSearch = null;
      var timer = $timeout(function(){
        debounceSearch = _.debounce(scope[attrs.autoTrigger], 800);
      });

      jQuery(ele).keyup(function() {
        debounceSearch();
      });

      scope.$on('$destroy', function() {
        $timeout.cancel(timmer);
      }); 
    }

    return {
      link : _link
    };
  }

})();
