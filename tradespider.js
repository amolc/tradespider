var express = require('express');
var app = express();
var http = require("http").createServer(app);
// var io = require("./socket/socket");
var bodyParser = require('body-parser');
var mysql = require('mysql');
var request = require('request');
var cheerio = require('cheerio');
var cron = require('cron');
var CRUD = require('mysql-crud');

// var neuron = require('neuron');

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
   url : 'http://www.investing.com/indices/germany-30-technical?period=60',
   headers:  {
       'User-Agent' : 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.153 Safari/537.36'
   }
};

var five_minute = {
    url : 'http://www.investing.com/indices/germany-30-technical?period=300',
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
      console.log(oneMinuteData);
      dax_1.create({
        'summary': oneMinuteData.summary,
        'moving_averages': oneMinuteData.moving_averages,
        'technical_indicators': oneMinuteData.technical_indicators,
        'created_on': time
      }, function (err, rows) {
        if(rows.affectedRows == 1){
          console.log('Row added to DB');
        }else {
          console.log(err);
        }
      });
    }
  });

  request(five_minute, function (error, response, html) {
    if (!error && response.statusCode == 200) {
      console.log('----------- FIVE MINUTE SUMMARY ----------');
      var $ = cheerio.load(html);
      var fiveMinuteData = {};
      $('div #techStudiesInnerWrap').each(function(i, element){

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
      console.log(fiveMinuteData);
      dax_5.create({
        'summary': fiveMinuteData.summary,
        'moving_averages': fiveMinuteData.moving_averages,
        'technical_indicators': fiveMinuteData.technical_indicators,
        'created_on': time
      }, function (err, rows) {
        if(rows.affectedRows == 1){
          console.log('Row added to DB');
        }else {
          console.log(err);
        }
      });
    }
  });

});

oneMinuteCron.start();

http.listen(5555);
console.log("listening to port 5555");
