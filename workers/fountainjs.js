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
      "market": "dax",
      "period": "five",
      "status": "alive"
    });
    UserAlerts.insert({
      "userId": "2",
      "market": "dax",
      "period": "hour",
      "status": "alive"
    });
    UserAlerts.insert({
      "userId": "2",
      "market": "us",
      "period": "five",
      "status": "alive"
    });
    UserAlerts.insert({
      "userId": "1",
      "market": "us",
      "period": "five",
      "status": "alive"
    });
    UserAlerts.insert({
      "userId": "3",
      "market": "dax",
      "period": "daily",
      "status": "alive"
    });
  }



};

module.exports = fountainjs;
