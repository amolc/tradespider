var express = require('express');
var app = express();

var env = process.env.NODE_ENV || 'dev';
var cfg = require('./config/config.'+env);
var db = cfg.connection;

var http = require("http").createServer(app);
var io = require("./socket/socket");

var bodyParser = require('body-parser');
var cron = require('cron');

var one_minute = require('./spider/one_minute');
var five_minute = require('./spider/five_minute');
var fifteen_minute = require('./spider/fifteen_minute');

var dax = require('./api/dax');
var dow = require('./api/dow');
var usfuture = require('./api/usfuture');
var seng = require('./api/seng');

app.use(bodyParser.json({limit: '50mb'}));
app.use('/', express.static(__dirname + '/web'));
app.use('/template', express.static(__dirname + '/startbootstrap'));

app.post('/dax/get_dax_data', dax.get_dax_data);
app.post('/dow/get_dow_data', dow.get_dow_data);
app.post('/usfuture/get_usfuture_data', usfuture.get_usfuture_data);
app.post('/seng/get_seng_data', seng.get_seng_data);

// // ***************************************** Dax Cron Jobs *****************************************
var oneMinuteDaxCron = cron.job('0 * * * * *', function () {
  one_minute.dax();
});

var fiveMinuteDaxCron = cron.job('0 */5 * * * *', function () {
  five_minute.dax();
});

var fifteenMinuteDaxCron = cron.job('0 */15 * * * *', function () {
  fifteen_minute.dax();
});
//
var daxCronStart = cron.job('00 00 07 * * 1-5', function () {
  console.log('************** Dax Cron Started **************');
  oneMinuteDaxCron.start();
  fiveMinuteDaxCron.start();
  fifteenMinuteDaxCron.start();
});

var daxCronStop = cron.job('00 30 16 * * 1-5', function () {
  oneMinuteDaxCron.stop();
  fiveMinuteDaxCron.stop();
  fifteenMinuteDaxCron.stop();
  console.log('************** Dax Cron Stopped **************');
});

daxCronStart.start();
daxCronStop.start();
//
// // ***************************************** Seng Cron Jobs *****************************************
var oneMinuteSengCron = cron.job('0 * * * * *', function () {
  one_minute.seng();
});

var fiveMinuteSengCron = cron.job('0 */5 * * * *', function () {
  five_minute.seng();
});

var fifteenMinuteSengCron = cron.job('0 */15 * * * *', function () {
  fifteen_minute.seng();
});
//
var sengCronStart = cron.job('00 15 01 * * 1-5', function () {
  console.log('************** Seng Cron Started **************');
  oneMinuteSengCron.start();
  fiveMinuteSengCron.start();
  fifteenMinuteSengCron.start();
});

var sengCronStop = cron.job('00 15 04 * * 1-5', function () {
  oneMinuteSengCron.stop();
  fiveMinuteSengCron.stop();
  fifteenMinuteSengCron.stop();
  console.log('************** Seng Cron Stopped **************');
});

sengCronStart.start();
sengCronStop.start();
//
// // ***************************************** DOW Cron Jobs *****************************************
var oneMinuteDowCron = cron.job('0 * * * * *', function () {
  one_minute.dow();
});

var fiveMinuteDowCron = cron.job('0 */5 * * * *', function () {
  five_minute.dow();
});

var fifteenMinuteDowCron = cron.job('0 */15 * * * *', function () {
  fifteen_minute.dow();
});
//
var dowCronStart = cron.job('00 30 14 * * 1-5', function () {
  console.log('************** Dow Cron Started **************');
  oneMinuteDowCron.start();
  fiveMinuteDowCron.start();
  fifteenMinuteDowCron.start();
});

var dowCronStop = cron.job('00 30 21 * * 1-5', function () {
  oneMinuteDowCron.stop();
  fiveMinuteDowCron.stop();
  fifteenMinuteDowCron.stop();
  console.log('************** Dow Cron Stopped **************');
});

dowCronStart.start();
dowCronStop.start();
//
// // ***************************************** US-FUTURES Cron Jobs *****************************************
var oneMinuteUsfutureCron = cron.job('0 * * * * *', function () {
  console.log('************** Test Cron Started **************');
  one_minute.usfuture();
});

var fiveMinuteUsfutureCron = cron.job('0 */5 * * * *', function () {
  five_minute.usfuture();
});

var fifteenMinuteUsfutureCron = cron.job('0 */15 * * * *', function () {
  fifteen_minute.usfuture();
});
//
var usfutureCronStart = cron.job('00 00 23 * * 1-5', function () {
  console.log('************** Usfuture Cron Started **************');
  oneMinuteUsfutureCron.start();
  fiveMinuteUsfutureCron.start();
  fifteenMinuteUsfutureCron.start();
});

var usfutureCronStop = cron.job('00 00 16 * * 1-5', function () {
  oneMinuteUsfutureCron.stop();
  fiveMinuteUsfutureCron.stop();
  fifteenMinuteUsfutureCron.stop();
  console.log('************** Usfuture Cron Stopped **************');
});

usfutureCronStart.start();
usfutureCronStop.start();

// ***************************************** Test Cron Jobs *****************************************

// oneMinuteUsfutureCron.start();
// fiveMinuteUsfutureCron.start();
// fifteenMinuteUsfutureCron.start();
//
// oneMinuteDaxCron.start();
// fiveMinuteDaxCron.start();
// fifteenMinuteDaxCron.start();
//
// oneMinuteSengCron.start();
// fiveMinuteSengCron.start();
// fifteenMinuteSengCron.start();
//
// oneMinuteDowCron.start();
// fiveMinuteDowCron.start();
// fifteenMinuteDowCron.start();

http.listen(cfg.port);
console.log("listening to port "+ cfg.port);
io.attach(http);
