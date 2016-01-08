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
var neuron = require('neuron');
var manager = new neuron.JobManager();

var dbConnection = mysql.createPool({
  database : 'tradespider',
  user : 'ftdev',
  password : '10gXWOqeaf',
  host :'apps.fountaintechies.com',
});
var dax_1 = CRUD(dbConnection, 'dax_1');
var dax_5 = CRUD(dbConnection, 'dax_5');

app.use(bodyParser.json({limit: '50mb'}));
app.use('/', express.static(__dirname + '/web'));
// app.get('/dax_data', function (req, res) {
//   console.log('data received');
// });

var one_minute = {
   url : 'http://www.investing.com/indices/us-30-technical?period=60',
   headers:  {
       'User-Agent' : 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.153 Safari/537.36'
   }
};

var five_minute = {
    url : 'http://www.investing.com/indices/us-30-technical?period=300',
    headers:  {
        'User-Agent' : 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.153 Safari/537.36'
    }
};

// One Minute Cron
var oneMinuteCron = cron.job('0 * * * * *', function(){
  var time = new Date().getTime();

  request(one_minute, function (error, response, html) {
    if (!error && response.statusCode == 200) {
      console.log('----------- ONE MINUTE SUMMARY ----------');
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
      io.emit('one minute report', oneMinuteData);
      manager.enqueue('add-one-minute-dax', oneMinuteData);
    }
  });

  request(five_minute, function (error, response, html) {
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
      io.emit('five minute report', fiveMinuteData);
      manager.enqueue('add-five-minute-dax', fiveMinuteData);
    }
  });

});

manager.addJob('add-one-minute-dax', {
  work: function (data) {
    dax_1.create({
      'summary': data.summary.toLowerCase(),
      'moving_averages': data.moving_averages.toLowerCase(),
      'technical_indicators': data.technical_indicators.toLowerCase(),
      'created_on': data.created_on
    }, function (err, rows) {
      if(rows.affectedRows == 1){
        console.log('Row added to DB');
      }else {
        console.log(err);
      }
    });
  }
});

manager.addJob('add-five-minute-dax', {
  work: function (data) {
    dax_5.create({
      'summary': data.summary.toLowerCase(),
      'moving_averages': data.moving_averages.toLowerCase(),
      'technical_indicators': data.technical_indicators.toLowerCase(),
      'created_on': data.created_on
    }, function (err, rows) {
      if(rows.affectedRows == 1){
        console.log('Row added to DB');
      }else {
        console.log(err);
      }
    });
  }
});

oneMinuteCron.start();

http.listen(5555);
console.log("listening to port 5555");
io.attach(http);
