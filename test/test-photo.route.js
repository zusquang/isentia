var chai = require('chai'),
    chaiHttp = require('chai-http'),
    expect = chai.expect,
    should = chai.should(),
    PhotoRoute = require('../server/routes/photo.route'),
    PhotoService = require('../server/services/photo.service'),
    APIs = require('../server/constants/api.constant'),
    HOSTs = require('../server/constants/host.constant');

chai.use(chaiHttp);

describe('/GET an API not existed', function () {
  it('returns status code 200', function ( done ) {
    chai.request(HOSTs.ENV).get(APIs.GET_API_NOT_EXISTED).end(function (err, res) {
      expect(res).to.have.status(200);
      done();
    })
  });

  it('returns text/html content-type', function ( done ) {
    chai.request(HOSTs.ENV).get(APIs.GET_API_NOT_EXISTED).set('Accept', 'text/html; charset=UTF-8').end(function (err, res) {
      expect(res.header['content-type']).to.equal('text/html; charset=UTF-8');
      done();
    })
  });
});

describe('/GET getPhotos success', function () {
  it('returns status code 200', function ( done ) {
    chai.request(HOSTs.ENV).get(APIs.GET_PHOTOS).end(function (err, res) {
      expect(err).to.be.null;
      expect(res).to.have.status(200);
      done();
    })
  });

 it('returns a photos list', function ( done ) {
    PhotoService.getPhotos(1, function( err, res, photos ) {
      photos.should.not.be.empty;
      done();
    });
  });
});

describe('/GET getPhotosByTags success', function () {
  it('returns status code 200', function ( done ) {
    chai.request(HOSTs.ENV).get(APIs.GET_PHOTOS_BY_TAGS).end(function (err, res) {
      expect(res).to.have.status(200);
      done();
    })
  });

  it('returns a photos list', function ( done ) {
    PhotoService.getPhotosByTags(1, 'trip,model', function( err, res, photos ) {
      photos.should.not.be.empty;
      done();
    });
  });
});


