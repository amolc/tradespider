var mongojs = require('mongojs');
var db = mongojs('tradespider');

var fountainjs = {

  calculateChange: function(data, callback) {
    // var change_flag, change_by, change_type;
    console.log("CalculateChange");

  },
  welcome: function(msg) {
    console.log("welcome");
    return 'hi Fountaintech here';
  },

  userDummy: function() {


    var UserAlerts = db.collection("userAlerts");

    UserAlerts.insert({
      "userId": "1",
      "name" :   "Amol Chawathe",
      "email" : "amol@fountaintechies.com",
      "token" : "7737737363fdfhddgfdfdggdgdhdhdhd",
      "type"  : "ios",
      "market": "dax",
      "period": "five",
      "status": "alive"
    });
    UserAlerts.insert({
      "userId": "2",
      "name" :   "Shilpi",
      "email" : "shilpi@fountaintechies.com",
      "token" : "7737737363fdfhddgfdfdggdgdhdhdhd",
      "type"  : "android",
      "market": "dax",
      "period": "hour",
      "status": "alive"
    });
    UserAlerts.insert({
      "userId": "2",
      "name" :   "Shilpi",
      "email" : "shilpi@fountaintechies.com",
      "token" : "7737737363fdfhddgfdfdggdgdhdhdhd",
      "type"  : "android",
      "market": "us",
      "period": "five",
      "status": "alive"
    });
    UserAlerts.insert({
      "userId": "1",
      "name" :   "Amol Chawathe",
      "email" : "amol@fountaintechies.com",
      "token" : "7737737363fdfhddgfdfdggdgdhdhdhd",
      "type"  : "ios",
      "market": "us",
      "period": "five",
      "status": "alive"
    });
    UserAlerts.insert({
      "userId": "3",
      "name" :   "Nitin",
      "email" : "nitin@fountaintechies.com",
      "token" : "7737737363fdfhddgfdfdggdgdhdhdhd",
      "type"  : "android",
      "market": "dax",
      "period": "daily",
      "status": "alive"
    });
  }



};

module.exports = fountainjs;
