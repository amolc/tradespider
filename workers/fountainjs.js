var mongojs = require('mongojs');
var db = mongojs('tradespider');
var jobsCollection = db.collection("jobs");
var time = Math.round(+new Date()/1000);
var gcm = require('node-gcm');
var apn = require('apn');


var fountainjs = {

  welcome: function(msg) {
    console.log("welcome");
    return 'hi Fountaintech here';
  },
  iosPushEvent : function(name,token,payload){

    jobsCollection.insert({
      "time" : time,
      "type": "iosPush",
      "name": name ,
      "token": token,
      "payload": payload,
      "status" : "created"
    });

  },
  androidPushEvent : function(name,token,payload){
    jobsCollection.insert({
      "time" : time,
      "type": "androidPush",
      "name": name ,
      "token": token,
      "payload": payload,
      "status" : "created"
    });

  },
  doandroidPushEvent : function(){
        console.log("doAndroidPush");
        jobsCollection.find({"type":"iosPush","status":"open"}, function (err, jobs) {
            for(var i=0;i<jobs.length;i++){
            fountainjs.pushAndroidNotification(jobs[i].token,jobs[i].payload);
            fountainjs.updateJob(jobs[i]._id);
            }
         })

  },
  doiosPushEvent   : function(){
        console.log("doIosPush");
        jobsCollection.find({"type":"iosPush","status":"open"}, function (err, jobs) {
            for(var i=0;i<jobs.length;i++){
              fountainjs.pushIosNotification(jobs[i].token,jobs[i].payload);
              fountainjs.updateJob(jobs[i]._id);
            }
         })
  },
  updateJob   : function(jobsid){
    jobsCollection.findAndModify({
        query: { _id: jobsid },
        update: { $set: { status: 'close' } }
    }, function (err, doc, lastErrorObject) {
        // doc.tag === 'maintainer'
        if(err) console.log(err);
    })
  },
  pushAndroidNotification   : function(token,payload){
    var androidMessage = new gcm.Message();
    androidMessage.addData('message',payload);
    androidMessage.addData('msgcnt','3'); // Shows up in the notification in the status bar
    androidMessage.addData('soundname','beep.wav');
    androidMessage.timeToLive = 3000;

    var sender = new gcm.Sender('AIzaSyAJ9kNU7h4VSK2oiqrD5EatNVvzBD6zsxw');
    sender.sendNoRetry(androidMessage, token, function(err, result) {
      console.log( result );
      console.log( err );
    });

  },
  pushIosNotification   : function(token,payload){

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
    }
    var apnsConnection = new apn.Connection(options);
    apnsConnection.pushNotification(notification, device);
    var callback = function(errorNum, notification){
          console.log('Error is: %s', errorNum);
          console.log("Note =" );
          console.log( notification );
      };



  },
  userDummy: function() {


    var UserAlerts = db.collection("userAlerts");

    UserAlerts.insert({
      "userId": "1",
      "name" :   "Amol Chawathe",
      "email" : "amol@fountaintechies.com",
      "token" : "f03582704dc29d75caebd15e4d78449fd64db2e4e8727a059d50b9ffbe955f43",
      "type"  : "ios",
      "market": "hse",
      "period": "five",
      "status": "alive"

    });
    UserAlerts.insert({
      "userId": "1",
      "name" :   "Amol",
      "email" : "shilpi@fountaintechies.com",
      "token" : "f03582704dc29d75caebd15e4d78449fd64db2e4e8727a059d50b9ffbe955f43",
      "type"  : "ios",
      "market": "hse",
      "period": "fifteen",
      "status": "alive"
    });
    UserAlerts.insert({
      "userId": "1",
      "name" :   "Amol",
      "email" : "shilpi@fountaintechies.com",
      "token" : "f03582704dc29d75caebd15e4d78449fd64db2e4e8727a059d50b9ffbe955f43",
      "type"  : "android",
      "market": "hse",
      "period": "hour",
      "status": "alive"
    });
    UserAlerts.insert({
      "userId": "1",
      "name" :   "Amol",
      "email" : "shilpi@fountaintechies.com",
      "token" : "f03582704dc29d75caebd15e4d78449fd64db2e4e8727a059d50b9ffbe955f43",
      "type"  : "android",
      "market": "hse",
      "period": "daily",
      "status": "alive"
    });
    UserAlerts.insert({
      "userId": "1",
      "name" :   "Amol",
      "email" : "shilpi@fountaintechies.com",
      "token" : "f03582704dc29d75caebd15e4d78449fd64db2e4e8727a059d50b9ffbe955f43",
      "type"  : "android",
      "market": "hse",
      "period": "monthly",
      "status": "alive"
    });


  }
};

module.exports = fountainjs;
