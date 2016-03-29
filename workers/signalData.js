var mongojs = require('mongojs');
var fountainjs = require('./fountainjs');

var db = mongojs('tradespider');
var async = require('async');


var signalData = {

  triggerSignal: function(time, market, err, callback) {
    console.log("triggerSignal-Function");
    var collection = db.collection(market);
    console.log(time);
    // find everything, but sort by name

    collection.find({}, {

    }).limit(2).sort({
      "_id": -1
    }, function(err, data) {
      //console.log(data);
      // docs is now a sorted array
      // var one = docs[0].time;
      // var two = docs[1].time;
      // console.log(one);
      // console.log(two);

      //callback(docs);

      signalData.calculate(data, market);

    });
  },
  calculate: function(data, market) {

    var fiveSignal = "";
    var fifteenSignal = "";
    var hourSignal = "";
    var dailySignal = "";
    var monthlySignal = "";
    var timeperiod = data[0]._id;
    var collection = db.collection(market);
    var SignalCollection = db.collection("signal");

    //  Five Signal
    if (data[0].five !== data[1].five) {
      fiveSignal = data[0].five;
      console.log(data[0].five);
    } else {
      fiveSignal = data[0].five;
      SignalCollection.insert({
        "market": market,
        "period": "five",
        "signal": fiveSignal,
        "status": "Open"
      });
      console.log("No Change Five");
    }

    //  Fifteen Signal
    if (data[0].fifteen !== data[1].fifteen) {
      fifteenSignal = data[0].fifteen;
      console.log(data[0].fifteen);
    } else {
      fifteenSignal = data[0].fifteen;

      SignalCollection.insert({
        "market": market,
        "period": "fifteen",
        "signal": fiveSignal,
        "status": "Open"
      });
      console.log("No Change Fifteen");
    }

    //  hour Signal
    if (data[0].hour !== data[1].hour) {
      hourSignal = data[0].hour;
      console.log(data[0].hour);
    } else {
      SignalCollection.insert({
        "market": market,
        "period": "hour",
        "signal": fiveSignal,
        "status": "Open"
      });
      console.log("No Change hour");
    }

    //  daily Signal
    if (data[0].daily !== data[1].daily) {
      dailySignal = data[0].daily;
      console.log(data[0].daily);
    } else {
      SignalCollection.insert({
        "market": market,
        "period": "daily",
        "signal": fiveSignal,
        "status": "Open"
      });
      console.log("No Change daily");
    }
    // monthly Signal
    if (data[0].monthly !== data[1].monthly) {
      monthlySignal = data[0].monthly;
      console.log(data[0].monthly);
    } else {
      SignalCollection.insert({
        "market": market,
        "period": "monthly",
        "signal": fiveSignal,
        "status": "Open"
      });
      console.log("No Change monthly");
    }

    var metadata = {
      "fiveSignal": fiveSignal,
      "fifteenSignal": fiveSignal,
      "hourSignal": hourSignal,
      "dailySignal": dailySignal,
      "monthlySignal": monthlySignal
    };

    collection.findAndModify({
      query: {
        _id: timeperiod
      },
      update: {
        $set: metadata
      },
      new: true
    }, function(err, doc, lastErrorObject) {
      // doc.tag === 'maintainer'
      console.log(err);
    });
  },

  userSignal: function() {
    console.log("userSignal-function");
    var Signal = db.collection("signal");
    Signal.find({
    "status":"Open"
    }).sort({
      "_id": -1
    }, function(err, signaldoc) {
      //console.log(doc);
      console.log("sig.length"+signaldoc.length);
    var signalrecords=[] ;
      for (i = 0; i < signaldoc.length; i++) {
         signalrecords.push(signaldoc);
      }
      var a = 0 ;
      async.each(signalrecords, function (signalrecord, callback) {
            console.log(a);
            createAlertEvent(signalrecord[a]);
            updateSignal(signalrecord[a]);
            a++ ;
      }, function(err){
        if(err) console.log(err);
      });
    });
    function updateSignal(signal) {
      console.log("UpdateSignal");
        Signal.findAndModify({
            query: { _id: signal._id },
            update: { $set: { status: 'close' } }
        }, function (err, doc, lastErrorObject) {
            // doc.tag === 'maintainer'
            if(err) console.log(err);
        })
      }

    function createAlertEvent(signal) {
        console.log("createAlertEvent");
        var signalId = signal._id ;
        console.log(signalId);
        var Alerts = db.collection("userAlerts");
        console.log(signal.market);
        console.log(signal.period);
        var payload = signal.market+" "+signal.period+"  "+signal.signal ;
      Alerts.find({
          "market": signal.market,
          "period": signal.period
        }).sort({
          "_id": -1
        }, function(err, useralert) {
          var users = [];
          for (var j = 0; j < useralert.length ; j++) {
            users.push(useralert);
          }
          var d = 0 ;
          async.each(users, function(user,callback){
                console.log("d"+d);
                createevent(user[d],payload);
                d++
          }, function(err){
            if(err) console.log(err);
          });


        });
      }

      function createevent(user,payload){
          console.log(user);
          if(user.type="ios"){
              fountainjs.iosPushEvent(user.name,user.token,payload);
          }else{
              fountainjs.androidPushEvent(user.name,user.token,payload);
          }
      }

  },



};

module.exports = signalData;
