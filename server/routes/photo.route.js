var LOGGER = require('log4js').getLogger('isentia'),
		APIs = require('../constants/api.constant'),
		PhotoServive = require('../services/photo.service');

function _responseSuccess ( data, res ) {
	res.send({
		success: true,
	    wrapper : {
	    	data : data
	    }
	});
}

function _responseFailure ( msg, res ) {
	res.send({
		success: false,
	    wrapper : {
	    	message: msg
	    }
	});
}

module.exports = function(app) {
	// api ---------------------------------------------------------------------
	app.get(APIs.GET_PHOTOS, function( request, response ) {
		PhotoServive.getPhotos( request.params.page, function( err, res, photos ) {
			if (err && res.statusCode != 200) {
				LOGGER.error('Could not retrieve data from request ' + APIs.GET_PHOTOS + ' caused by ' + err);
				_responseFailure('Get photos fail, please try again', response);
			}
			_responseSuccess(photos, response);
		});
	});

	app.get(APIs.GET_PHOTOS_BY_TAGS, function( request, response ) {
		PhotoServive.getPhotosByTags( request.params.page, request.params.tags, function( err, res, photos) {
			if (err && res.statusCode != 200) {
				LOGGER.error('Could not retrieve data from request ' + APIs.GET_PHOTOS_BY_TAGS + ' caused by ' + err);
				_responseFailure('Get photos fail, please try again', response);
			}
			_responseSuccess(photos, response);
		});
	});
};