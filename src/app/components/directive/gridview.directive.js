(function() {
  'use strict';    
  var jQuery = require('jquery'),
      angular = require('angular'),
      StringUtils = require('../util/string.util');

  angular.module('gridview.directive', []).directive('gridview', [ 'PhotoFactory', gridviewDirective ]);
  function gridviewDirective(PhotoFactory) {

    var _restrict = 'A',
        _scope = { photos: '@' },
        _template = './html/components/directive.template/gridview.html';

    var _link = function( scope, ele, attrs ) {
      var container = '#isentia-sv',
          optionSwitch = jQuery( '.isentia-sv-options' ).children( 'a' ),
          page = 1;

      scope.photos = [];
      scope.busy = false;

      _init();

      function _init() {
        // Switch view mode listener
        _switchOptionOnClick();

        // Page loaded
        _getPhotosByTarget(page);

        // Tags searched
        jQuery( '.isentia-sv-search' ).on( 'click', function( ev ) {
          _search();
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
    
      function _switchOptionOnClick() {
        optionSwitch.each( function( idx, el ) {
          jQuery( el ).on( 'click', function( ev ) {
            ev.preventDefault();
            _switch( ev );
          } );
        } );
      }

      function _buildPhotos(photos) {
        var loadedItems = StringUtils.fromJson( photos ).items;
        for ( var i = 0; i < loadedItems.length; i++ ) {
          scope.photos.push(loadedItems[i]);
        }
        scope.busy = false;
      }

      function _getPhotosByTarget(page) {
        scope.busy = true;

        if (!scope.tagsSearched) {
          PhotoFactory.getPhotos(page).then(function( photos ) {
            _buildPhotos(photos);
          });
        } else {
          _emptyPhotos();
          PhotoFactory.getPhotosByTags(page, StringUtils.replace(scope.tagsSearched, /[ ,]+/g, ',')).then(function( photos ) {
            _buildPhotos(photos);
          });
        }
      }

      function _emptyPhotos() {
        scope.photos = [];
      }

      function _search() {
        _emptyPhotos();
        _getPhotosByTarget(page);
      }

      scope.loadMore = function() {
        // Because feed only return 20 items then no need load more data when searching.
        if (!scope.tagsSearched) {
          _getPhotosByTarget(++page);
        }
      }

      scope.search = function() {
        _search();
      }

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
