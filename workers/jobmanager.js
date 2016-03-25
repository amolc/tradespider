var cron = require('cron');
var spiderData = require('./spiderData');
var signalData = require('./signalData');
var fountainjs = require('./fountainjs');


// var dow = cron.job('0 * * * * *', function() {
//   var link = "http://www.investing.com/indices/us-30";
//   var market = "us";
//   spiderData.spider(link, market);
// });
//
//
// var hse = cron.job('0 * * * * *', function() {
//   var link = "http://www.investing.com/indices/hang-sen-40";
//   var market = "hse";
//   spiderData.spider(link, market);
// });
//
// var hseSignal = cron.job('0 * * * * *', function() {
//   var time = "five";
//   var market = "hse";
//   signalData.triggerSignal(time, market);
// });
//
//
// var dax = cron.job('0 * * * * *', function() {
//   var link = "http://www.investing.com/indices/germany-30";
//   var market = "dax";
//   spiderData.spider(link, market);
// });
//
// var daxSignal = cron.job('0 * * * * *', function() {
//   var time = "five";
//   var market = "dax";
//   signalData.triggerSignal(time, market);
// });

//var msg = fountainjs.welcome();
//console.log(msg);

//dow.start();
//hse.start();
//hseSignal.start();

//dow.start();
//dax.start();
//daxSignal.start();

var time = "fifteen";
var market = "dax";
//signalData.triggerSignal(time, market);
signalData.userSignal();
//signalData.userDummy();
