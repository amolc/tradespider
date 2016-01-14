var express = require('express');
var app = express();

var env = process.env.NODE_ENV || 'dev';
var cfg = require('./config/config.'+env);
var db = cfg.connection;

var one_minute = require('./one_minute');
var five_minute = require('./five_minute');
var fifteen_minute = require('./fifteen_minute');

var http = require("http").createServer(app);
var io = require("./socket");

var bodyParser = require('body-parser');
var cron = require('cron');

app.use(bodyParser.json({limit: '50mb'}));
app.use('/', express.static(__dirname + '/web'));

// One Minute Cron
var oneMinuteCron = cron.job('0 * * * * *', function(){
  // one_minute.dax();
  // one_minute.dow();
  one_minute.usfuture();
  // one_minute.seng();
});

// Five Minute Cron
var fiveMinuteCron = cron.job('0 */5 * * * *', function(){
  five_minute.dax();
  five_minute.dow();
  five_minute.usfuture();
  five_minute.seng();
});

// Fifteen Minute Cron
var fifteenMinuteCron = cron.job('0 */15 * * * *', function(){
  fifteen_minute.dax();
  fifteen_minute.dow();
  fifteen_minute.usfuture();
  fifteen_minute.seng();
});

//One Minute Cron Start
oneMinuteCron.start();
//Five Minute Cron Start
// fiveMinuteCron.start();
//Fifteen Minute Cron Start
// fifteenMinuteCron.start();

http.listen(cfg.port);
console.log("listening to port "+ cfg.port);
io.attach(http);
