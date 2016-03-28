var cron = require('cron');
var spiderData = require('./spiderData');
var signalData = require('./signalData');
var fountainjs = require('./fountainjs');


// var dow = cron.job('0 * * * * *', function() {
//   var link = "http://www.investing.com/indices/us-30";
//   var market = "us";
//   spiderData.spider(link, market);
// });


var hse = cron.job('0 * * * * *', function() {
  var link = "http://www.investing.com/indices/hang-sen-40";
  var market = "hse";
  spiderData.spider(link, market);
});



hse.start();
// Step1Trigger.start();
// Step2Usersignal.start();
// Step3Notify.start();
