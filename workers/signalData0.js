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
    var Signal = db.collection("signal");


    Signal.find({
      "status": "open"
    }).sort({
      "_id": -1
    }, function(err, sig) {
      //console.log(doc);
    var signalrecords=[] ;
      for (i = 0; i < sig.length; i++) {
         signalrecords.push(sig);
      }
      async.each(signalrecords, function (signalrecord, callback) {
            createAlertEvent(signalrecord);
      }, function(err){
        if(err) console.log(err);
      });
    });

    function createAlertEvent(doc) {
      var Alerts = db.collection("userAlerts");
      console.log(doc.market);
      console.log(doc.period);

    Alerts.find({
        "market": doc.market,
        "period": doc.period
      }).sort({
        "_id": -1
      }, function(err, useralert) {
        //console.log(doc);
        //console.log(a);
        //console.log(doc.signal);
        //console.log(useralert);

        var payload = doc.market+" "+doc.period+"  "+doc.signal ;

        var counts = [];
        var userlength = useralert.length ;
        console.log(userlength);
        for (var j = 0; j < userlength; j++) {
          counts.push(useralert);
        }

        async.each(counts, function(count,callback){
          var y= 0 ;
          var userName = count[y];
          console.log(y);
          console.log(userName);

            y++;
        }, function(err){
          if(err) console.log(err);
          console.log("done");
        });

      });




    }

  },



};

module.exports = signalData;
