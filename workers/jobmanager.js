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

var Step1Trigger = cron.job('0 * * * * *', function() {
  var time = "five";
  var market = "hse";
  signalData.triggerSignal(time, market);
  signalData.triggerSignal(time, market);
  signalData.triggerSignal(time, market);
  signalData.triggerSignal(time, market);
});

var Step2Usersignal = cron.job('0 * * * * *', function() {
  signalData.userSignal();
});

var Step3Notify = cron.job('0 * * * * *', function() {
  //fountainjs.doandroidPushEvent();
  fountainjs.doiosPushEvent();
});

//hse.start();
// Step1Trigger.start();
// Step2Usersignal.start();
// Step3Notify.start();

var link = "http://www.investing.com/indices/hang-sen-40";
var market = "hse";
spiderData.spider(link, market);
