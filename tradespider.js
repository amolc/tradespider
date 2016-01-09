var express = require('express');
var app = express();
var http = require("http").createServer(app);
var io = require("./socket");
var bodyParser = require('body-parser');
var mysql = require('mysql');
var request = require('request');
var cheerio = require('cheerio');
var cron = require('cron');
var CRUD = require('mysql-crud');
// var neuron = require('neuron');
// var manager = new neuron.JobManager();

var dbConnection = mysql.createPool({
  database : 'tradespider',
  user : 'ftdev',
  password : '10gXWOqeaf',
  host :'apps.fountaintechies.com',
});

//DAX Table
var dax_1 = CRUD(dbConnection, 'dax_1');
var dax_5 = CRUD(dbConnection, 'dax_5');
var dax_15 = CRUD(dbConnection, 'dax_15');
//DOW Table
var dow_1 = CRUD(dbConnection, 'dow_1');
var dow_5 = CRUD(dbConnection, 'dow_5');
var dow_15 = CRUD(dbConnection, 'dow_15');

app.use(bodyParser.json({limit: '50mb'}));
app.use('/', express.static(__dirname + '/web'));


var one_minute_dow = {
   url : 'http://www.investing.com/indices/us-30-technical?period=60',
   headers:  {
       'User-Agent' : 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.153 Safari/537.36'
   }
};

var one_minute_dax = {
   url : 'http://www.investing.com/indices/germany-30-technical?period=60',
   headers:  {
       'User-Agent' : 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.153 Safari/537.36'
   }
};

var five_minute_dow = {
    url : 'http://www.investing.com/indices/us-30-technical?period=300',
    headers:  {
        'User-Agent' : 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.153 Safari/537.36'
    }
};

var five_minute_dax = {
    url : 'http://www.investing.com/indices/germany-30-technical?period=300',
    headers:  {
        'User-Agent' : 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.153 Safari/537.36'
    }
};

var fifteen_minute_dow = {
    url : 'http://www.investing.com/indices/us-30-technical?period=1500',
    headers:  {
        'User-Agent' : 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.153 Safari/537.36'
    }
};

var fifteen_minute_dax = {
    url : 'http://www.investing.com/indices/germany-30-technical?period=1500',
    headers:  {
        'User-Agent' : 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.153 Safari/537.36'
    }
};

// One Minute Cron
var oneMinuteCron = cron.job('0 * * * * *', function(){
  var time = new Date().getTime();

  request(one_minute_dax, function (error, response, html) {
    if (!error && response.statusCode == 200) {
      var $ = cheerio.load(html);
      var oneMinuteData = {};
      $('div #techStudiesInnerWrap').each(function(i, element){
        oneMinuteData.created_on = time;
        // Summary Info
        oneMinuteData.summary = $(this).children('.summary').children('span').text();

        // Moving Averages Info
        if($(this).children('.summaryTableLine').children('span').eq(1).children('span').length === 1){
          oneMinuteData.moving_averages = $(this).children('.summaryTableLine').children('span').eq(1).children('span').text();
        }else if($(this).children('.summaryTableLine').children('span').eq(1).children('b').length === 1){
          oneMinuteData.moving_averages = $(this).children('.summaryTableLine').children('span').eq(1).children('b').text();
        }

        // Technical Indicators Info
        if($(this).children('.summaryTableLine').next().children('span').eq(1).children('span').length === 1){
          oneMinuteData.technical_indicators = $(this).children('.summaryTableLine').next().children('span').eq(1).children('span').text();
        }else if($(this).children('.summaryTableLine').next().children('span').eq(1).children('b').length === 1){
          oneMinuteData.technical_indicators = $(this).children('.summaryTableLine').next().children('span').eq(1).children('b').text();
        }
      });
      io.emit('one minute dax report', oneMinuteData);
      dax_1.create({
        'summary': oneMinuteData.summary.toLowerCase(),
        'moving_averages': oneMinuteData.moving_averages.toLowerCase(),
        'technical_indicators': oneMinuteData.technical_indicators.toLowerCase(),
        'created_on': oneMinuteData.created_on
      }, function (err, rows) {
        console.log('110',err);
        if(rows.affectedRows == 1){
          console.log('112 Row added to DB');
        }else {
          console.log(err);
        }
      });
    }
  });

  request(one_minute_dow, function (error, response, html) {
    if (!error && response.statusCode == 200) {
      var $ = cheerio.load(html);
      var oneMinuteData = {};
      $('div #techStudiesInnerWrap').each(function(i, element){
        oneMinuteData.created_on = time;
        // Summary Info
        oneMinuteData.summary = $(this).children('.summary').children('span').text();

        // Moving Averages Info
        if($(this).children('.summaryTableLine').children('span').eq(1).children('span').length === 1){
          oneMinuteData.moving_averages = $(this).children('.summaryTableLine').children('span').eq(1).children('span').text();
        }else if($(this).children('.summaryTableLine').children('span').eq(1).children('b').length === 1){
          oneMinuteData.moving_averages = $(this).children('.summaryTableLine').children('span').eq(1).children('b').text();
        }

        // Technical Indicators Info
        if($(this).children('.summaryTableLine').next().children('span').eq(1).children('span').length === 1){
          oneMinuteData.technical_indicators = $(this).children('.summaryTableLine').next().children('span').eq(1).children('span').text();
        }else if($(this).children('.summaryTableLine').next().children('span').eq(1).children('b').length === 1){
          oneMinuteData.technical_indicators = $(this).children('.summaryTableLine').next().children('span').eq(1).children('b').text();
        }
      });
      io.emit('one minute dow report', oneMinuteData);
      dow_1.create({
        'summary': oneMinuteData.summary.toLowerCase(),
        'moving_averages': oneMinuteData.moving_averages.toLowerCase(),
        'technical_indicators': oneMinuteData.technical_indicators.toLowerCase(),
        'created_on': oneMinuteData.created_on
      }, function (err, rows) {
        console.log('150',err);
        if(rows.affectedRows == 1){
          console.log('152 Row added to DB');
        }else {
          console.log(err);
        }
      });
    }
  });

});

// Five Minute Cron
var fiveMinuteCron = cron.job('0 */5 * * * *', function(){
  var time = new Date().getTime();

  request(five_minute_dax, function (error, response, html) {
    if (!error && response.statusCode == 200) {
      console.log('----------- FIVE MINUTE SUMMARY ----------');
      var $ = cheerio.load(html);
      var fiveMinuteData = {};
      $('div #techStudiesInnerWrap').each(function(i, element){
        fiveMinuteData.created_on = time;
        // Summary Info
        fiveMinuteData.summary = $(this).children('.summary').children('span').text();

        // Moving Averages Info
        if($(this).children('.summaryTableLine').children('span').eq(1).children('span').length === 1){
          fiveMinuteData.moving_averages = $(this).children('.summaryTableLine').children('span').eq(1).children('span').text();
        }else if($(this).children('.summaryTableLine').children('span').eq(1).children('b').length === 1){
          fiveMinuteData.moving_averages = $(this).children('.summaryTableLine').children('span').eq(1).children('b').text();
        }

        // Technical Indicators Info
        if($(this).children('.summaryTableLine').next().children('span').eq(1).children('span').length === 1){
          fiveMinuteData.technical_indicators = $(this).children('.summaryTableLine').next().children('span').eq(1).children('span').text();
        }else if($(this).children('.summaryTableLine').next().children('span').eq(1).children('b').length === 1){
          fiveMinuteData.technical_indicators = $(this).children('.summaryTableLine').next().children('span').eq(1).children('b').text();
        }
      });
      io.emit('five minute dax report', fiveMinuteData);
      dax_5.create({
        'summary': fiveMinuteData.summary.toLowerCase(),
        'moving_averages': fiveMinuteData.moving_averages.toLowerCase(),
        'technical_indicators': fiveMinuteData.technical_indicators.toLowerCase(),
        'created_on': fiveMinuteData.created_on
      }, function (err, rows) {
        console.log('197',err);
        if(rows.affectedRows == 1){
          console.log('199 Row added to DB');
        }else {
          console.log(err);
        }
      });
    }
  });

  request(five_minute_dow, function (error, response, html) {
    if (!error && response.statusCode == 200) {
      console.log('----------- FIVE MINUTE SUMMARY ----------');
      var $ = cheerio.load(html);
      var fiveMinuteData = {};
      $('div #techStudiesInnerWrap').each(function(i, element){
        fiveMinuteData.created_on = time;
        // Summary Info
        fiveMinuteData.summary = $(this).children('.summary').children('span').text();

        // Moving Averages Info
        if($(this).children('.summaryTableLine').children('span').eq(1).children('span').length === 1){
          fiveMinuteData.moving_averages = $(this).children('.summaryTableLine').children('span').eq(1).children('span').text();
        }else if($(this).children('.summaryTableLine').children('span').eq(1).children('b').length === 1){
          fiveMinuteData.moving_averages = $(this).children('.summaryTableLine').children('span').eq(1).children('b').text();
        }

        // Technical Indicators Info
        if($(this).children('.summaryTableLine').next().children('span').eq(1).children('span').length === 1){
          fiveMinuteData.technical_indicators = $(this).children('.summaryTableLine').next().children('span').eq(1).children('span').text();
        }else if($(this).children('.summaryTableLine').next().children('span').eq(1).children('b').length === 1){
          fiveMinuteData.technical_indicators = $(this).children('.summaryTableLine').next().children('span').eq(1).children('b').text();
        }
      });
      io.emit('five minute dow report', fiveMinuteData);
      dow_5.create({
        'summary': fiveMinuteData.summary.toLowerCase(),
        'moving_averages': fiveMinuteData.moving_averages.toLowerCase(),
        'technical_indicators': fiveMinuteData.technical_indicators.toLowerCase(),
        'created_on': fiveMinuteData.created_on
      }, function (err, rows) {
        console.log('238',err);
        if(rows.affectedRows == 1){
          console.log('240 Row added to DB');
        }else {
          console.log(err);
        }
      });
    }
  });

});

// Fifteen Minute Cron
var fifteenMinuteCron = cron.job('0 */15 * * * *', function(){
  var time = new Date().getTime();

  request(fifteen_minute_dax, function (error, response, html) {
    if (!error && response.statusCode == 200) {
      console.log('----------- FIVE MINUTE SUMMARY ----------');
      var $ = cheerio.load(html);
      var fifteenMinuteData = {};
      $('div #techStudiesInnerWrap').each(function(i, element){
        fifteenMinuteData.created_on = time;
        // Summary Info
        fifteenMinuteData.summary = $(this).children('.summary').children('span').text();

        // Moving Averages Info
        if($(this).children('.summaryTableLine').children('span').eq(1).children('span').length === 1){
          fifteenMinuteData.moving_averages = $(this).children('.summaryTableLine').children('span').eq(1).children('span').text();
        }else if($(this).children('.summaryTableLine').children('span').eq(1).children('b').length === 1){
          fifteenMinuteData.moving_averages = $(this).children('.summaryTableLine').children('span').eq(1).children('b').text();
        }

        // Technical Indicators Info
        if($(this).children('.summaryTableLine').next().children('span').eq(1).children('span').length === 1){
          fifteenMinuteData.technical_indicators = $(this).children('.summaryTableLine').next().children('span').eq(1).children('span').text();
        }else if($(this).children('.summaryTableLine').next().children('span').eq(1).children('b').length === 1){
          fifteenMinuteData.technical_indicators = $(this).children('.summaryTableLine').next().children('span').eq(1).children('b').text();
        }
      });
      io.emit('fifteen minute dax report', fifteenMinuteData);
      dax_15.create({
        'summary': fifteenMinuteData.summary.toLowerCase(),
        'moving_averages': fifteenMinuteData.moving_averages.toLowerCase(),
        'technical_indicators': fifteenMinuteData.technical_indicators.toLowerCase(),
        'created_on': fifteenMinuteData.created_on
      }, function (err, rows) {
        console.log('197',err);
        if(rows.affectedRows == 1){
          console.log('199 Row added to DB');
        }else {
          console.log(err);
        }
      });
    }
  });

  request(fifteen_minute_dow, function (error, response, html) {
    if (!error && response.statusCode == 200) {
      console.log('----------- FIVE MINUTE SUMMARY ----------');
      var $ = cheerio.load(html);
      var fifteenMinuteData = {};
      $('div #techStudiesInnerWrap').each(function(i, element){
        fifteenMinuteData.created_on = time;
        // Summary Info
        fifteenMinuteData.summary = $(this).children('.summary').children('span').text();

        // Moving Averages Info
        if($(this).children('.summaryTableLine').children('span').eq(1).children('span').length === 1){
          fifteenMinuteData.moving_averages = $(this).children('.summaryTableLine').children('span').eq(1).children('span').text();
        }else if($(this).children('.summaryTableLine').children('span').eq(1).children('b').length === 1){
          fifteenMinuteData.moving_averages = $(this).children('.summaryTableLine').children('span').eq(1).children('b').text();
        }

        // Technical Indicators Info
        if($(this).children('.summaryTableLine').next().children('span').eq(1).children('span').length === 1){
          fifteenMinuteData.technical_indicators = $(this).children('.summaryTableLine').next().children('span').eq(1).children('span').text();
        }else if($(this).children('.summaryTableLine').next().children('span').eq(1).children('b').length === 1){
          fifteenMinuteData.technical_indicators = $(this).children('.summaryTableLine').next().children('span').eq(1).children('b').text();
        }
      });
      io.emit('fifteen minute dow report', fifteenMinuteData);
      dow_15.create({
        'summary': fifteenMinuteData.summary.toLowerCase(),
        'moving_averages': fifteenMinuteData.moving_averages.toLowerCase(),
        'technical_indicators': fifteenMinuteData.technical_indicators.toLowerCase(),
        'created_on': fifteenMinuteData.created_on
      }, function (err, rows) {
        console.log('238',err);
        if(rows.affectedRows == 1){
          console.log('240 Row added to DB');
        }else {
          console.log(err);
        }
      });
    }
  });

});

//One Minute Cron Start
oneMinuteCron.start();
//Five Minute Cron Start
fiveMinuteCron.start();
//Fifteen Minute Cron Start
fifteenMinuteCron.start();

http.listen(5555);
console.log("listening to port 5555");
io.attach(http);
