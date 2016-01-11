var env = process.env.NODE_ENV;
var cfg = require('./config/config.'+env);
var db = cfg.connection;
var io = require("./socket");

var request = require('request');
var cheerio = require('cheerio');

var CRUD = require('mysql-crud');

//DAX Table
var dax_15 = CRUD(db, 'dax_15');
//DOW Table
var dow_15 = CRUD(db, 'dow_15');
//SENG Table
var seng_15 = CRUD(db, 'seng_15');

var fifteen_minute = {

  dax: function() {
    var time = new Date().getTime();

    request(cfg.fifteen_minute_dax, function (error, response, html) {
      if (!error && response.statusCode == 200) {
        var $ = cheerio.load(html);
        var fifteenMinuteData = {};

        fifteenMinuteData.created_on = time;
        // Summary Info
        fifteenMinuteData.summary = $(cfg.summary_div).children('.summary').children('span').text();

        // Moving Averages Info
        if($(cfg.summary_div).children('.summaryTableLine').children('span').eq(1).children('span').length === 1){
          fifteenMinuteData.moving_averages = $(cfg.summary_div).children('.summaryTableLine').children('span').eq(1).children('span').text();
        }else if($(cfg.summary_div).children('.summaryTableLine').children('span').eq(1).children('b').length === 1){
          fifteenMinuteData.moving_averages = $(cfg.summary_div).children('.summaryTableLine').children('span').eq(1).children('b').text();
        }

        // Technical Indicators Info
        if($(cfg.summary_div).children('.summaryTableLine').next().children('span').eq(1).children('span').length === 1){
          fifteenMinuteData.technical_indicators = $(cfg.summary_div).children('.summaryTableLine').next().children('span').eq(1).children('span').text();
        }else if($(cfg.summary_div).children('.summaryTableLine').next().children('span').eq(1).children('b').length === 1){
          fifteenMinuteData.technical_indicators = $(cfg.summary_div).children('.summaryTableLine').next().children('span').eq(1).children('b').text();
        }

        fifteenMinuteData.value = $('div #quotes_summary_current_data').children().children('.inlineblock').children('div').children('span').eq(0).text();

        io.emit('fifteen minute dax-report', fifteenMinuteData);

        dax_15.create({
          'summary': fifteenMinuteData.summary.toLowerCase(),
          'moving_averages': fifteenMinuteData.moving_averages.toLowerCase(),
          'technical_indicators': fifteenMinuteData.technical_indicators.toLowerCase(),
          'value': fiveMinuteData.value,
          'created_on': fifteenMinuteData.created_on
        }, function (err, rows) {
          console.log('FIFTEEN MINUTE DAX 55:',err);
          if(rows.affectedRows == 1){
            console.log('FIFTEEN MINUTE DAX DB 57');
          }else {
            console.log(err);
          }
        });
      }
    });

  },

  dow: function () {
    var time = new Date().getTime();

    request(cfg.fifteen_minute_dow, function (error, response, html) {
      if (!error && response.statusCode == 200) {
        var $ = cheerio.load(html);
        var fifteenMinuteData = {};

        fifteenMinuteData.created_on = time;
        // Summary Info
        fifteenMinuteData.summary = $(cfg.summary_div).children('.summary').children('span').text();

        // Moving Averages Info
        if($(cfg.summary_div).children('.summaryTableLine').children('span').eq(1).children('span').length === 1){
          fifteenMinuteData.moving_averages = $(cfg.summary_div).children('.summaryTableLine').children('span').eq(1).children('span').text();
        }else if($(cfg.summary_div).children('.summaryTableLine').children('span').eq(1).children('b').length === 1){
          fifteenMinuteData.moving_averages = $(cfg.summary_div).children('.summaryTableLine').children('span').eq(1).children('b').text();
        }

        // Technical Indicators Info
        if($(cfg.summary_div).children('.summaryTableLine').next().children('span').eq(1).children('span').length === 1){
          fifteenMinuteData.technical_indicators = $(cfg.summary_div).children('.summaryTableLine').next().children('span').eq(1).children('span').text();
        }else if($(cfg.summary_div).children('.summaryTableLine').next().children('span').eq(1).children('b').length === 1){
          fifteenMinuteData.technical_indicators = $(cfg.summary_div).children('.summaryTableLine').next().children('span').eq(1).children('b').text();
        }

        fifteenMinuteData.value = $('div #quotes_summary_current_data').children().children('.inlineblock').children('div').children('span').eq(0).text();

        io.emit('fifteen minute dow-report', fifteenMinuteData);

        dow_15.create({
          'summary': fifteenMinuteData.summary.toLowerCase(),
          'moving_averages': fifteenMinuteData.moving_averages.toLowerCase(),
          'technical_indicators': fifteenMinuteData.technical_indicators.toLowerCase(),
          'value': fiveMinuteData.value,
          'created_on': fifteenMinuteData.created_on
        }, function (err, rows) {
          console.log('FIFTEEN MINUTE DOW 102:',err);
          if(rows.affectedRows == 1){
            console.log('FIFTEEN MINUTE DOW DB 104');
          }else {
            console.log(err);
          }
        });
      }
    });

  },

  seng: function() {
    var time = new Date().getTime();

    request(cfg.fifteen_minute_seng, function (error, response, html) {
      if (!error && response.statusCode == 200) {
        var $ = cheerio.load(html);
        var fifteenMinuteData = {};

        fifteenMinuteData.created_on = time;
        // Summary Info
        fifteenMinuteData.summary = $(cfg.summary_div).children('.summary').children('span').text();

        // Moving Averages Info
        if($(cfg.summary_div).children('.summaryTableLine').children('span').eq(1).children('span').length === 1){
          fifteenMinuteData.moving_averages = $(cfg.summary_div).children('.summaryTableLine').children('span').eq(1).children('span').text();
        }else if($(cfg.summary_div).children('.summaryTableLine').children('span').eq(1).children('b').length === 1){
          fifteenMinuteData.moving_averages = $(cfg.summary_div).children('.summaryTableLine').children('span').eq(1).children('b').text();
        }

        // Technical Indicators Info
        if($(cfg.summary_div).children('.summaryTableLine').next().children('span').eq(1).children('span').length === 1){
          fifteenMinuteData.technical_indicators = $(cfg.summary_div).children('.summaryTableLine').next().children('span').eq(1).children('span').text();
        }else if($(cfg.summary_div).children('.summaryTableLine').next().children('span').eq(1).children('b').length === 1){
          fifteenMinuteData.technical_indicators = $(cfg.summary_div).children('.summaryTableLine').next().children('span').eq(1).children('b').text();
        }

        fifteenMinuteData.value = $('div #quotes_summary_current_data').children().children('.inlineblock').children('div').children('span').eq(0).text();

        io.emit('fifteen minute seng-report', fifteenMinuteData);

        seng_15.create({
          'summary': fifteenMinuteData.summary.toLowerCase(),
          'moving_averages': fifteenMinuteData.moving_averages.toLowerCase(),
          'technical_indicators': fifteenMinuteData.technical_indicators.toLowerCase(),
          'value': fiveMinuteData.value,
          'created_on': fifteenMinuteData.created_on
        }, function (err, rows) {
          console.log('FIFTEEN MINUTE DAX 149:',err);
          if(rows.affectedRows == 1){
            console.log('FIFTEEN MINUTE DAX DB 151');
          }else {
            console.log(err);
          }
        });
      }
    });

  },

};

module.exports = fifteen_minute;
