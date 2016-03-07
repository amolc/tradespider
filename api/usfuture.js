var usfuture_1 = require('mongoose').model('usfuture_1');
var usfuture_5 = require('mongoose').model('usfuture_5');
var usfuture_15 = require('mongoose').model('usfuture_15');
var usfuture_60 = require('mongoose').model('usfuture_60');

var commonFunctions = require('./functions');

exports.get_usfuture_data = function (req, res) {
  if(req.body.page){
    var tableName;
    if(req.body.page == "period60"){
      tableName = usfuture_1;
    }else if(req.body.page == "period300"){
      tableName = usfuture_5;
    }else if(req.body.page == "period900"){
      tableName = usfuture_15;
    }else if(req.body.page == "period3600"){
      tableName = usfuture_60;
    }
    tableName.find({ is_started: true }).sort('-created_on').limit(1).exec(function (err, response) {
      if (err) {
        // If an error occurs send the error message
        return res.status(400).send({
          message: commonFunctions.getErrorMessage(err)
        });
      } else {
        if(response.length === 0){
          res.sendStatus(400);
        }else {
          tableName.find({ _id: { $gte: response[0]._id } }).sort('-created_on').limit(500).exec(function(err, rows) {
            if (err) {
              // If an error occurs send the error message
              return res.status(400).send({
                message: commonFunctions.getErrorMessage(err)
              });
            } else {
              // Send a JSON representation of the listing
              res.json(rows);
            }
          });
        }
      }
    });
  }else {
    res.sendStatus(404);
    res.jsonp({'error': 'Invalid Request'});
  }
};
