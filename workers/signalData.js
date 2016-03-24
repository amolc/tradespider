var mongojs = require('mongojs');
var db = mongojs('tradespider');

var signalData = {

  triggerSignal: function(time, market, err, callback) {
    var collection = db.collection(market);

    // find everything, but sort by name
    collection.find({}, {
      "_id": 1,
      "five": 1
    }).limit(2).sort({
      "_id": -1
    }, function(err, docs) {
      //  console.log(docs);
      // docs is now a sorted array
      var one = docs[0];
      var two = docs[1];
      console.log(one);
      console.log(two);

    });
  }
};

module.exports = signalData;
