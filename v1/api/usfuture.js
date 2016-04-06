var mongojs = require('mongojs');
var usfuture_1 = require('mongoose').model('usfuture_1');
var usfuture_5 = require('mongoose').model('usfuture_5');
var usfuture_15 = require('mongoose').model('usfuture_15');
var usfuture_60 = require('mongoose').model('usfuture_60');

var db = mongojs('tradespider');
var signal = db.collection("signal");
var alerts = db.collection("userAlerts");
var jobCollection = db.collection("jobs");
var usfuture = db.collection("usFuture");

var commonFunctions = require('./functions');

exports.get_usfuture_data = function (req, res) {
  // if(req.body.page){
  //   var tableName;
  //   if(req.body.page == "period60"){
  //     tableName = usfuture_1;
  //   }else if(req.body.page == "period300"){
  //     tableName = usfuture_5;
  //   }else if(req.body.page == "period900"){
  //     tableName = usfuture_15;
  //   }else if(req.body.page == "period3600"){
  //     tableName = usfuture_60;
  //   }
    // tableName.find({ is_started: true }).sort('-created_on').limit(1).exec(function (err, response) {
     usfuture.find().toArray(function(err, response) {
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
  // }else {
  //   res.sendStatus(404);
  //   res.jsonp({'error': 'Invalid Request'});
  // }
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