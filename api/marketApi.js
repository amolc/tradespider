var mongojs = require('mongojs');

var db = mongojs('tradespider');
var signal = db.collection("signal");
var alerts = db.collection("userAlerts");
var jobCollection = db.collection("jobs");
var usfuture = db.collection("usFuture");

var commonFunctions = require('./functions');

exports.getMarket = function (req, res) {
	if(parseInt(req.body.marketlistId) == 1 ){
		var tableName = usfuture;
	}else{
		var tableName = usfuture; 
	}

    tableName.find().sort('-_id').limit(30).toArray(function(err, response) {
      if (err) {
        // If an error occurs send the error message
        return res.status(400).send({
          message: commonFunctions.getErrorMessage(err)
        });
      } else {
        if(response.length === 0){
          res.sendStatus(400);
        }else {
          res.json(response);
        }
      }
    });
};

exports.subscribe = function (req, res) {
  console.log(req.body.userId);
  alerts.find({ 'userId' : req.body.userId, 'period' : req.body.period }).sort({ "_id": -1 }, function(err, response) {
    console.log(err);
    if(err){
      var resData = { 
        status : 0,
        message : 'Not subscribe.' 
      }
        res.jsonp(resData);
    }else{
      if(response.length > 0 ){
        alerts.findAndModify({ query: { 'userId' : req.body.userId , 'period' : req.body.period }, update: { $set: { "status": req.body.status}}, new: true}, function(err, doc) {
            if (err){
              var resData = { 
                status : 0,
                message : 'Not subscribe.' 
              }
              res.jsonp(resData);
            }else{
              var resData = { 
                status : 1,
                message : 'Subscribe done.' 
              }
              res.jsonp(resData);
            } 
          });
      }else{
        alerts.insert(req.body, function(err, result){
          console.log(err);
          console.log(result);
          if(err){
            var resData = { 
              status : 0,
              message : 'Not subscribe.' 
            }
            res.jsonp(resData);
          }else{
            var resData = { 
              status : 1,
              message : 'Subscribe done.' 
            }
            res.jsonp(resData);
          }
        })        
      }
    }
  })
}