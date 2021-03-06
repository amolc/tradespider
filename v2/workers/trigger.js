var mongojs = require('mongojs');

var db = mongojs('tradespider');
var signal = db.collection("signal");
var alerts = db.collection("userAlerts");
var jobCollection = db.collection("jobs");
var async = require('async');

var signalData = {

  calculateSignal: function(market, err, callback) {
    var collection = db.collection(market);

    var metaData = {};
    metaData.fiveSignal = ''; metaData.fifteenSignal = ''; metaData.hourSignal = ''; metaData.dailySignal = ''; metaData.monthlySignal = '';

    collection.find().limit(2).sort({"_id": -1}, function(err, data) {
      if(err) return callback(err);

      if(data.length > 1){
        var signalData = [];

        if(data[0].five != data[1].five){
          metaData.fiveSignal = data[0].five;
          signalData.push({
            "market": market,
            "period": "five",
            "signal": metaData.fiveSignal,
            "status": "open",
            "time": new Date()
          });
        }
        if(data[0].fifteen != data[1].fifteen){
          metaData.fifteenSignal = data[0].fifteen;
          signalData.push({
            "market": market,
            "period": "fifteen",
            "signal": metaData.fifteenSignal,
            "status": "open",
            "time": new Date()
          });
        }
        if(data[0].hour != data[1].hour){
          metaData.hourSignal = data[0].hour;
          signalData.push({
            "market": market,
            "period": "hour",
            "signal": metaData.hourSignal,
            "status": "open",
            "time": new Date()
          });
        }
        if(data[0].daily != data[1].daily){
          metaData.dailySignal = data[0].daily;
          signalData.push({
            "market": market,
            "period": "daily",
            "signal": metaData.dailySignal,
            "status": "open",
            "time": new Date()
          });
        }
        if(data[0].monthly != data[1].monthly){
          metaData.monthlySignal = data[0].monthly;
          signalData.push({
            "market": market,
            "period": "monthly",
            "signal": metaData.monthlySignal,
            "status": "open",
            "time": new Date()
          });
        }
      }else {
        return 'not-enough-data';
      }

      if(metaData.fiveSignal === '' && metaData.fifteenSignal === '' && metaData.hourSignal === '' && metaData.dailySignal === '' && metaData.monthlySignal === ''){
        return 'not-enough-data';
      }else {
        collection.findAndModify({ query: { _id: data[0]._id }, update: { $set: metaData }, new: true}, function(err, doc, lastErrorObject) {
          if(err) return err;
          async.each(signalData, function (signals, callback) {
            signal.insert(signals);
            callback();
          }, function (err) {
            if(err) return callback(err);
            return 'done';
          });
        });
      }

    });
  },

  compareUserSignal: function(){
    signal.find({ "status":"open" }).sort({ "_id": -1 }, function(err, signalRecords) {
      console.log('signalRecords_98', signalRecords);
      if(err) return callback(err);
      async.each(signalRecords, function (signalRecord, callback) {
        signalData.createAlertEvent(signalRecord, function (err, result) {
          signal.findAndModify({ query: { _id: signalRecord._id }, update: { $set: { "status": "close"}}, new: true}, function(err, doc) {
            if (err){
              console.log(err);
              callback();
            }else{
              callback();
            } 
          });
        });
      }, function (err) {
        if(err) {return callback(err);}else{
          console.log('comapare-done');
        }
        
      });
    });
  },

  createAlertEvent: function (signalRecord, callback) {
    var signalId = signalRecord._id;
    var payload = signalRecord.market + " " + signalRecord.period + "  " + signalRecord.signal;
    var jobs = [];
    alerts.find({ "market": signalRecord.market, "period": signalRecord.period }).sort({ "_id": -1 }, function(err, users) {
      if(err) return callback(err);
      async.each(users, function(user, callback){
        if(user.type == "ios"){
          jobs.push({
            "time" : new Date(),
            "type": "iosPush",
            "name": user.name ,
            "token": user.token,
            "payload": payload,
            "status" : "created"
          });
          callback();
        }else{
          jobs.push({
            "time" : new Date(),
            "type": "androidPush",
            "name": user.name ,
            "token": user.token,
            "payload": payload,
            "status" : "created"
          });
          callback();
        }
      }, function(err){
        if(err) return callback(err);
        async.each(jobs, function (job, callback) {
          console.log('job', job);
          jobCollection.insert(job);
          callback();
        }, function (err) {
          if(err) return callback(err);
          callback(err, 'done');
        });
      });
    });
  }

};

module.exports = signalData;
