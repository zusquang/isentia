(function() {
  'use strict';    
  var angular = require('angular'),
      jQuery = require('jquery');

  var StringUtils = require('../util/string.util');

  angular.module('gridview.directive', []).directive('gridview', [ 'PhotoFactory', gridviewDirective ]);

 	function gridviewDirective(PhotoFactory) {
    var _restrict = 'A',
        _scope = { photos: '@' },
        _template = './html/components/directive.template/gridview.html';

 		var _link = function( scope, ele, attrs ) {
 			var container = '#isentia-sv',
          optionSwitch = jQuery( '.isentia-sv-options' ).children( 'a' );

      function _init() {
        optionSwitch.each( function( idx, el ) {
          jQuery( el ).on( 'click', function( ev ) {
            ev.preventDefault();
            _switch( ev );
          } );
        } );

        // Page loaded
        PhotoFactory.getPhotos().then(function( photos ) {
          scope.photos = StringUtils.fromJson( photos ).items;
        });

        // Tags searched
        jQuery( '.isentia-sv-search' ).on( 'click', function( ev ) {
          PhotoFactory.getPhotosByTags(scope.tagsSearched).then(function( photos ) {
            scope.photos = StringUtils.fromJson( photos ).items;
          });
        });
      }

      function _switch( opt ) {
        optionSwitch.each(function( idx, el ) { 
          _removeClass(container, jQuery( el ).attr( 'data-view' ));
          _removeClass(el, 'isentia-sv-selected')
        });

        _addClass(container, jQuery( opt.currentTarget ).attr( 'data-view' ));
        _addClass(opt.currentTarget, 'isentia-sv-selected');
      }

      function _addClass( el, c ) {
        var jQueryel = jQuery( el );
        if (!jQueryel.hasClass( c )) {
          jQueryel.addClass( c );
        }
      };

      function _removeClass( el, c ) {
        var jQueryel = jQuery( el );
        if (jQueryel.hasClass( c )) {
          jQueryel.removeClass( c );
        }
      };

      _init();

 		}

 		return {
        restrict: _restrict,
        scope : _scope,
        transclude : true,
        templateUrl : _template,
        link: _link
    };
	}
})();
