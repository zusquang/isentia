var request = require('request')
var paypal = require('paypal-rest-sdk')

var config_opts = {
    'mode': 'sandbox',
    'client_id': 'AVxE4aUXnZJcPlJuWyDeYOoun0PrRCmta-bN_fLHnBn9InJMfOf43UVuc7lOyPXWHoseMwQxDoSPSBUp',
    'client_secret': 'EChjPT0r0HtYbgqTBIwt81G5tdZFQEWoZ9fg8pajf-PjuzicD3Erhfv7DVrnx8volH-MFkE-CUXkolun'
};

PaypalService = function() {};

PaypalService.prototype.create = function(callback) {
  var createPayment = {
    "intent": "sale",
    "payer": {
      "payment_method": "paypal"
    },
    "redirect_urls": {
      "return_url": "https://isentia.herokuapp.com/#/payment/execute",
      "cancel_url": "https://isentia.herokuapp.com/#/payment/cancel"
    },
    "transactions": [{
      "item_list": {
        "items": [{
            "name": "item",
            "sku": "item",
            "price": "1.00",
            "currency": "USD",
            "quantity": 1
        }, {
            "name": "item",
            "sku": "item",
            "price": "1.00",
            "currency": "USD",
            "quantity": 1
        }]
      },
      "amount": {
          "currency": "USD",
          "total": "2.00"
      },
      "description": "This is the payment description."
    }]
  };

  paypal.payment.create(createPayment, config_opts, function (err, res) {
      if (err) {
          throw err;
      }

      if (res) {
        var newRes = {
          statusCode : res.httpStatusCode,
          payment : {}
        };

        if(res.payer.payment_method === 'paypal') {
          newRes.payment.payment_method = res.payer.payment_method;
          newRes.payment.id = res.id;
          for( var i = 0; i < res.links.length; i++ ) {
            var link = res.links[i];
            if ( link.method === 'REDIRECT' ) {
              newRes.payment.redirectUrl = link.href;
            }
          }
        }
        callback(err, newRes);
      }
  });
}

PaypalService.prototype.execute = function(paymentId, payerId, callback) {
  var executePayment = {
    "payer_id": payerId
  };

  paypal.payment.execute(paymentId, executePayment, config_opts, function (err, res) {
    if (err) {
        throw err;
    }

    if (res) {
      // build response here
      callback(err, { statusCode : res.httpStatusCode, payment : res });
    }
  });
}

module.exports = new PaypalService();