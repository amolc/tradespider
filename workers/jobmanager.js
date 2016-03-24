var cron = require('cron');
var spiderData = require('./spiderData');
var signalData = require('./signalData');


var dow = cron.job('0 * * * * *', function() {
  var link = "http://www.investing.com/indices/us-30";
  var market = "us";
  spiderData.spider(link, market);
});


var hse = cron.job('0 * * * * *', function() {
  var link = "http://www.investing.com/indices/hang-sen-40";
  var market = "hse";
  spiderData.spider(link, market);
});

var hseSignal = cron.job('0 * * * * *', function() {
  var time = "five";
  var market = "hse";
  signalData.triggerSignal(time, market);
});


var dax = cron.job('0 * * * * *', function() {
  var link = "http://www.investing.com/indices/germany-30";
  var market = "dax";
  spiderData.spider(link, market);
});

var daxSignal = cron.job('0 * * * * *', function() {
  var time = "five";
  var market = "dax";
  signalData.triggerSignal(time, market);
});

//dow.start();
//hse.start();
//hseSignal.start();

//dow.start();
dax.start();
daxSignal.start();
