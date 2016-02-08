var dax_1 = require('mongoose').model('dax_1');
var dax_5 = require('mongoose').model('dax_5');
var dax_15 = require('mongoose').model('dax_15');

var commonFunctions = require('./functions');

exports.get_dax_data = function (req, res) {
  if(req.body.page){
    if(req.body.page === "period60"){
      // Use the model 'find' method to get a list of one minute dax data
      dax_1.find().sort('-created_on').limit(500).exec(function(err, dax60 ) {
        if (err) {
          // If an error occurs send the error message
          return res.status(400).send({
            message: commonFunctions.getErrorMessage(err)
          });
        } else {
          // Send a JSON representation of the listing
          res.json(dax60);
        }
      });
    }else if(req.body.page === "period300"){
      // Use the model 'find' method to get a list of one minute dax data
      dax_5.find().sort('-created_on').limit(500).exec(function(err, dax300 ) {
        if (err) {
          // If an error occurs send the error message
          return res.status(400).send({
            message: commonFunctions.getErrorMessage(err)
          });
        } else {
          // Send a JSON representation of the listing
          res.json(dax300);
        }
      });
    }else if(req.body.page == "period900"){
      // Use the model 'find' method to get a list of one minute dax data
      dax_15.find().sort('-created_on').limit(500).exec(function(err, dax900 ) {
        if (err) {
          // If an error occurs send the error message
          return res.status(400).send({
            message: commonFunctions.getErrorMessage(err)
          });
        } else {
          // Send a JSON representation of the listing
          res.json(dax900);
        }
      });
    }
  }else {
    res.send(404);
    res.jsonp({'error': 'Invalid Request'});
  }
};
