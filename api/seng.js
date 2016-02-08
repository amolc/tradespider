var seng_1 = require('mongoose').model('seng_1');
var seng_5 = require('mongoose').model('seng_5');
var seng_15 = require('mongoose').model('seng_15');

var commonFunctions = require('./functions');

exports.get_seng_data = function (req, res) {
  if(req.body.page){
    if(req.body.page == "period60"){
      // Use the model 'find' method to get a list of listings
      seng_1.find().sort('-created_on').exec(function(err, seng60 ) {
        if (err) {
          // If an error occurs send the error message
          return res.status(400).send({
            message: commonFunctions.getErrorMessage(err)
          });
        } else {
          // Send a JSON representation of the listing
          res.json(seng60);
        }
      });
    }else if(req.body.page == "period300"){
      // Use the model 'find' method to get a list of listings
      seng_5.find().sort('-created_on').exec(function(err, seng300 ) {
        if (err) {
          // If an error occurs send the error message
          return res.status(400).send({
            message: commonFunctions.getErrorMessage(err)
          });
        } else {
          // Send a JSON representation of the listing
          res.json(seng300);
        }
      });
    }else if(req.body.page == "period900"){
      // Use the model 'find' method to get a list of listings
      seng_15.find().sort('-created_on').exec(function(err, seng900 ) {
        if (err) {
          // If an error occurs send the error message
          return res.status(400).send({
            message: commonFunctions.getErrorMessage(err)
          });
        } else {
          // Send a JSON representation of the listing
          res.json(seng900);
        }
      });
    }
  }else {
    res.send(404);
    res.jsonp({'error': 'Invalid Request'});
  }
};
