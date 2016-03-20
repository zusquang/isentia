var chai = require('chai'),
    should = chai.should(),
    PhotoService = require('../server/services/photo.service');

describe('getPhotos from flickr', function () {
  it('photos should not be empty', function ( done ) {
    PhotoService.getPhotos(1, function( err, res, photos ) {
      if (err && res.statusCode != 200) {
        done(err);
      }
      
      photos.should.not.be.empty;
      done();
    });
  });
});

describe('getPhotosByTags from flickr', function () {
  it('photos should not be empty', function ( done ) {
    PhotoService.getPhotosByTags(1, 'trip,model', function( err, res, photos ) {
      if (err && res.statusCode != 200) {
        done(err);
      }
      
      photos.should.not.be.empty;
      done();
    });
  });
});