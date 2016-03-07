var dow_1 = require('mongoose').model('dow_1');
var dow_5 = require('mongoose').model('dow_5');
var dow_15 = require('mongoose').model('dow_15');
var dow_60 = require('mongoose').model('dow_60');

var commonFunctions = require('./functions');

exports.get_dow_data = function (req, res) {
  if(req.body.page){
    var tableName;
    if(req.body.page == "period60"){
      tableName = dow_1;
    }else if(req.body.page == "period300"){
      tableName = dow_5;
    }else if(req.body.page == "period900"){
      tableName = dow_15;
    }else if(req.body.page == "period3600"){
      tableName = dow_60;
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
    res.send(404);
    res.jsonp({'error': 'Invalid Request'});
  }
};
