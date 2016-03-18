var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');

var should = chai.should();



chai.use(chaiHttp);

describe('Blobs', function() {
  it('should list ALL blobs on /api/photos GET', function(done) {
      chai.request(server).get('/photos')
      .end(function(err, res){
        done();
      });
  });
});