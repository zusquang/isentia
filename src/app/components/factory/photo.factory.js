(function() {
  'use strict';
  var angular = require( 'angular' );

  angular.module( 'photo.factory', [] ).factory('PhotoFactory', [ '$http', '$q', '$log', photoFactory ]);

  function photoFactory( $http, $q, $log ) {
    var _getPhotos = function ( page ) {
      var def = $q.defer(); 
      $http({
        url: 'https://isentia.herokuapp.com/api/photos/' + page,
        headers : { "Access-Control-Allow-Origin": "*" }
      }).then(function( result ){
        def.resolve( result.data.wrapper.data );
      }, function( error ){
        $log.error( 'Error: ', error);
        def.reject( error );
      });
      return def.promise;
    }

    var _getPhotosByTags = function ( page, tagsSearched ) {
      var def = $q.defer(); 
      $http({
        url: 'https://isentia.herokuapp.com/api/photos/' + page + '/tags/' + tagsSearched,
        headers : { "Access-Control-Allow-Origin": "*" }
      }).then(function( result ){
        def.resolve( result.data.wrapper.data );
      }, function( error ){
        $log.error( 'Error: ', error);
        def.reject( error );
      });
      return def.promise;
    }

    return {
      getPhotos : _getPhotos,
      getPhotosByTags : _getPhotosByTags
    }
  }
})();
