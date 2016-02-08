var usfuture_1 = require('mongoose').model('usfuture_1');
var usfuture_5 = require('mongoose').model('usfuture_5');
var usfuture_15 = require('mongoose').model('usfuture_15');

var commonFunctions = require('./functions');

exports.get_usfuture_data = function (req, res) {
  if(req.body.page){
    if(req.body.page == "period60"){
      // Use the model 'find' method to get a list of listings
      usfuture_1.find().sort('-created_on').limit(500).exec(function(err, usfuture60 ) {
        if (err) {
          // If an error occurs send the error message
          return res.status(400).send({
            message: commonFunctions.getErrorMessage(err)
          });
        } else {
          // Send a JSON representation of the listing
          res.json(usfuture60);
        }
      });
    }else if(req.body.page == "period300"){
      // Use the model 'find' method to get a list of listings
      usfuture_5.find().sort('-created_on').limit(500).exec(function(err, usfuture300 ) {
        if (err) {
          // If an error occurs send the error message
          return res.status(400).send({
            message: commonFunctions.getErrorMessage(err)
          });
        } else {
          // Send a JSON representation of the listing
          res.json(usfuture300);
        }
      });
    }else if(req.body.page == "period900"){
      // Use the model 'find' method to get a list of listings
      usfuture_15.find().sort('-created_on').limit(500).exec(function(err, usfuture900 ) {
        if (err) {
          // If an error occurs send the error message
          return res.status(400).send({
            message: commonFunctions.getErrorMessage(err)
          });
        } else {
          // Send a JSON representation of the listing
          res.json(usfuture900);
        }
      });
    }
  }else {
    res.send(404);
    res.jsonp({'error': 'Invalid Request'});
  }
};
