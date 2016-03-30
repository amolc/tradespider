var mongojs = require('mongojs');
var gcm = require('node-gcm');
var apn = require('apn');
var async = require('async');

var db = mongojs('tradespider');
var jobCollection = db.collection("jobs");

var message = new gcm.Message();
var sender = new gcm.Sender('AIzaSyAJ9kNU7h4VSK2oiqrD5EatNVvzBD6zsxw');

var events = {

    androidPushEvent: function(){
      jobCollection.find({ "type":"androidPush", "status":"created" }, function (err, jobs) {
        if(err) console.log('async android push event', err);
        async.each(jobs, function (job, callback) {
          events.sendAndroidNotification(job.token, job.payload);
          events.updateJob(job._id);
          callback();
        }, function (err) {
          if(err) console.log('async android push event', err);
          console.log('Android notification sent');
        });
      });
    },

    sendAndroidNotification: function(token, payload){

      message.addData('message', payload);
      message.addData('msgcnt', '3'); // Shows up in the notification in the status bar
      message.addData('soundname', 'beep.wav');
      message.timeToLive = 3000;

      sender.sendNoRetry(androidMessage, token, function(err, result) {
        console.log( result );
        console.log( err );
      });

    },

    updateJob: function(jobId){
      jobCollection.findAndModify({ query: { _id: jobId }, update: { $set: { status: 'close' } }}, function (err, doc, lastErrorObject) {
        if(err) console.log(err);
        console.log('job closed');
      });
    },

    iosPushEvent: function(){
      jobCollection.find({ "type":"iosPush", "status":"open" }, function (err, jobs) {
        if(err) console.log('async ios push event', err);

        async.each(jobs, function (job, callback) {
          events.sendIosNotification(job.token, job.payload);
          events.updateJob(job._id);
          callback();
        }, function (err) {
          if(err) console.log('async ios push event', err);
          console.log('Ios notification sent');
        });
      });
    },

    sendIosNotification: function(token, payload){

      var notification = new apn.Notification(token);

      notification.expiry = Math.floor(Date.now() / 1000) + 3600;
      notification.badge = Number(1) || 0;
      notification.alert = payload;
      notification.payload = {'prop': 'special value'};
      notification.device = new apn.Device(token);

      var options = {
        gateway: 'gateway.sandbox.push.apple.com',
        cert: '../assets/TradeSP2Cert.pem',
        key:  '../assets/TradeSP2Key.pem',
        passphrase: 'ferrari1234',
        errorCallback: callback,
        port: 2195,
        enhanced: true,
        cacheLength: 100
      };

      var apnsConnection = new apn.Connection(options);

      apnsConnection.pushNotification(notification, device);

      var callback = function(errorNum, notification){
        console.log('Error is: %s', errorNum);
        console.log("Note =" );
        console.log( notification );
      };
    },
};

module.exports = events;
