var mongojs = require('mongojs');
var util = require('util');
var db = mongojs('tradespider');
var jobCollection = db.collection("jobs");
var users = db.collection("users");
var notification =db.collection("notification")

exports.getMarket = function (req, res) {
  var market = db.collection(req.body.market);
  market.find().toArray(function(err, doc){
    if(err){
      var resdata = {
        status : 0,
        message : err
      }
      res.jsonp(resdata);
    }else{
      res.jsonp(doc);
    }
  })
}