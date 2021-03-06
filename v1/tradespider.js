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
var sixty_minute = require('./spider/sixty_minute');

var dax = require('./api/dax');
var dow = require('./api/dow');
var usfuture = require('./api/usfuture');
var seng = require('./api/seng');
var user = require('./api/userApi');
var market = require('./api/marketApi');

app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, authorization");
  next();
});

app.use(bodyParser.json({limit: '50mb'}));
app.use('/', express.static(__dirname + '/web'));
app.use('/template', express.static(__dirname + '/startbootstrap'));

app.post('/dax/get_dax_data', dax.get_dax_data);
app.post('/dow/get_dow_data', dow.get_dow_data);
app.post('/usfuture/get_usfuture_data', usfuture.get_usfuture_data);
app.post('/usfuture/subscribe', usfuture.subscribe);
app.post('/seng/get_seng_data', seng.get_seng_data);
app.post('/user/addDevice', user.addDevice);
app.post('/user/register', user.register);
app.post('/user/login', user.login);
app.post('/user/facebookLogin', user.facebookLogin);
app.post('/user/googleLogin', user.googleLogin);
app.post('/market/getMarket', market.getMarket);
app.post('/market/subscribe', market.subscribe);


// ***************************************** Dax Cron Jobs *****************************************
var oneMinuteDaxCron = cron.job('0 * * * * *', function () {
  one_minute.dax();
});

var fiveMinuteDaxCron = cron.job('0 */5 * * * *', function () {
  five_minute.dax();
});

var fifteenMinuteDaxCron = cron.job('0 */15 * * * *', function () {
  fifteen_minute.dax();
});

var sixtyMinuteDaxCron = cron.job('0 0 * * * *', function () {
  sixty_minute.dax();
});

// var daxCronStart = cron.job('00 00 08 * * 1-5', function () {
// var daxCronStart = cron.job('00 55 11 * * 1-5', function () {
//   oneMinuteDaxCron.start();
//   fiveMinuteDaxCron.start();
//   fifteenMinuteDaxCron.start();
// });
//
// var daxCronStop = cron.job('00 30 16 * * 1-5', function () {
//   oneMinuteDaxCron.stop();
//   fiveMinuteDaxCron.stop();
//   fifteenMinuteDaxCron.stop();
//   // sixtyMinuteDaxCron.stop();
// });
// daxCronStart.start();
// daxCronStop.start();

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

var sixtyMinuteSengCron = cron.job('0 0 * * * *', function () {
  sixty_minute.seng();
});

// // var sengCronStart = cron.job('00 15 01 * * 1-5', function () {
// var sengCronStart = cron.job('00 55 11 * * 1-5', function () {
//   oneMinuteSengCron.start();
//   fiveMinuteSengCron.start();
//   fifteenMinuteSengCron.start();
// });
//
// var sengCronStop = cron.job('00 15 04 * * 1-5', function () {
//   oneMinuteSengCron.stop();
//   fiveMinuteSengCron.stop();
//   fifteenMinuteSengCron.stop();
//   // sixtyMinuteSengCron.stop();
// });
// sengCronStart.start();
// sengCronStop.start();

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

var sixtyMinuteDowCron = cron.job('0 0 * * * *', function () {
  sixty_minute.dow();
});

// // var dowCronStart = cron.job('00 30 14 * * 1-5', function () {
// var dowCronStart = cron.job('00 55 11 * * 1-5', function () {
//   oneMinuteDowCron.start();
//   fiveMinuteDowCron.start();
//   fifteenMinuteDowCron.start();
// });
//
// var dowCronStop = cron.job('00 30 21 * * 1-5', function () {
//   oneMinuteDowCron.stop();
//   fiveMinuteDowCron.stop();
//   fifteenMinuteDowCron.stop();
//   // sixtyMinuteDowCron.stop();
// });
// dowCronStart.start();
// dowCronStop.start();

// // ***************************************** US-FUTURES Cron Jobs *****************************************
var oneMinuteUsfutureCron = cron.job('0 * * * * *', function () {
  one_minute.usfuture();
});

var fiveMinuteUsfutureCron = cron.job('0 */5 * * * *', function () {
  five_minute.usfuture();
});

var fifteenMinuteUsfutureCron = cron.job('0 */15 * * * *', function () {
  fifteen_minute.usfuture();
});

var sixtyMinuteUsfutureCron = cron.job('0 0 * * * *', function () {
  sixty_minute.usfuture();
});

// var usfutureCronStart = cron.job('00 00 23 * * 1-5', function () {
// var usfutureCronStart = cron.job('00 55 11 * * 1-5', function () {
//   oneMinuteUsfutureCron.start();
//   fiveMinuteUsfutureCron.start();
//   fifteenMinuteUsfutureCron.start();
// });
//
// var usfutureCronStop = cron.job('00 00 16 * * 1-5', function () {
//   oneMinuteUsfutureCron.stop();
//   fiveMinuteUsfutureCron.stop();
//   fifteenMinuteUsfutureCron.stop();
//   // sixtyMinuteUsfutureCron.stop();
// });
// usfutureCronStart.start();
// usfutureCronStop.start();

// // ***************************************** Test Cron Jobs *****************************************
//
oneMinuteUsfutureCron.start();
fiveMinuteUsfutureCron.start();
fifteenMinuteUsfutureCron.start();
sixtyMinuteUsfutureCron.start();

oneMinuteDaxCron.start();
fiveMinuteDaxCron.start();
fifteenMinuteDaxCron.start();
sixtyMinuteDaxCron.start();

oneMinuteSengCron.start();
fiveMinuteSengCron.start();
fifteenMinuteSengCron.start();
sixtyMinuteSengCron.start();

oneMinuteDowCron.start();
fiveMinuteDowCron.start();
fifteenMinuteDowCron.start();
sixtyMinuteDowCron.start();

http.listen(cfg.port);
console.log("listening to port "+ cfg.port);
io.attach(http);
