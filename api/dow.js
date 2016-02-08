var dow_1 = require('mongoose').model('dow_1');
var dow_5 = require('mongoose').model('dow_5');
var dow_15 = require('mongoose').model('dow_15');

var commonFunctions = require('./functions');

exports.get_dow_data = function (req, res) {
  if(req.body.page){
    if(req.body.page === "period60"){
      // Use the model 'find' method to get a list of listings
      dow_1.find().sort('-created_on').limit(500).exec(function(err, dow60 ) {
        if (err) {
          // If an error occurs send the error message
          return res.status(400).send({
            message: commonFunctions.getErrorMessage(err)
          });
        } else {
          // Send a JSON representation of the listing
          res.json(dow60);
        }
      });
    }else if(req.body.page === "period300"){
      // Use the model 'find' method to get a list of listings
      dow_5.find().sort('-created_on').limit(500).exec(function(err, dow300 ) {
        if (err) {
          // If an error occurs send the error message
          return res.status(400).send({
            message: commonFunctions.getErrorMessage(err)
          });
        } else {
          // Send a JSON representation of the listing
          res.json(dow300);
        }
      });
    }else if(req.body.page === "period900"){
      // Use the model 'find' method to get a list of listings
      dow_15.find().sort('-created_on').limit(500).exec(function(err, dow900 ) {
        if (err) {
          // If an error occurs send the error message
          return res.status(400).send({
            message: commonFunctions.getErrorMessage(err)
          });
        } else {
          // Send a JSON representation of the listing
          res.json(dow900);
        }
      });
    }
  }else {
    res.send(404);
    res.jsonp({'error': 'Invalid Request'});
  }
};
