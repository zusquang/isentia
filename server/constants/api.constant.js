require('../libs/lib.define');

var HOSTs = require('./host.constant');

define( 'GET_API_NOT_EXISTED', HOSTs.API_ENDPOINT + '/photos1/:page', this );
define( 'GET_PHOTOS', HOSTs.API_ENDPOINT + '/photos/:page', this );
define( 'GET_PHOTOS_BY_TAGS', HOSTs.API_ENDPOINT + '/photos/:page/tags/:tags', this ); 