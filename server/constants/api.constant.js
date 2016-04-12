require('../libs/lib.define');

var HOSTs = require('./host.constant');

define( 'GET_PHOTOS', HOSTs.API_ENDPOINT + '/photos/:page', this );
define( 'GET_PHOTOS_BY_TAGS', HOSTs.API_ENDPOINT + '/photos/:page/tags/:tags', this ); 

define( 'PAYMENT_CREATE', HOSTs.API_ENDPOINT + '/payment/create', this ); 
define( 'PAYMENT_EXECUTE', HOSTs.API_ENDPOINT + '/payment/execute', this ); 

