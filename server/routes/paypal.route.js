var LOGGER = require('log4js').getLogger('isentia'),
    APIs = require('../constants/api.constant'),
    PaypalServive = require('../services/paypal.service');

function _responseSuccess ( data, res ) {
  res.send({
    success: true,
      wrapper : data
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
  app.post(APIs.PAYMENT_CREATE, function( request, response ) {
    PaypalServive.create( function( err, res ) {
      if (err && res.statusCode != 200) {
        LOGGER.error('Could not retrieve data from request ' + APIs.PAYMENT_CREATE + ' caused by ' + err);
        _responseFailure('Cant create payment, please try again', response);
      }
      _responseSuccess(res, response);
    });
  });

  app.post(APIs.PAYMENT_EXECUTE, function( request, response ) {
    PaypalServive.execute( request.body.paymentId, request.body.payerId, function( err, res ) {
      if (err && res.statusCode != 200) {
        LOGGER.error('Could not execute data from request ' + APIs.PAYMENT_EXECUTE + ' caused by ' + err);
        _responseFailure('Cant execute payment, please try again', response);
      }
      _responseSuccess(res, response);
    });
  });
};