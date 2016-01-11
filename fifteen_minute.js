var env = process.env.NODE_ENV;
var cfg = require('./config/config.'+env);
var db = cfg.connection;

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

    request(config.fifteen_minute_dax, function (error, response, html) {
      if (!error && response.statusCode == 200) {
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
          console.log('FIFTEEN MINUTE DAX 52:',err);
          if(rows.affectedRows == 1){
            console.log('FIFTEEN MINUTE DAX DB 54');
          }else {
            console.log(err);
          }
        });
      }
    });

  },

  dow: function () {
    var time = new Date().getTime();

    request(config.fifteen_minute_dow, function (error, response, html) {
      if (!error && response.statusCode == 200) {
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
          console.log('FIFTEEN MINUTE DOW 97:',err);
          if(rows.affectedRows == 1){
            console.log('FIFTEEN MINUTE DOW DB 99');
          }else {
            console.log(err);
          }
        });
      }
    });

  },

  seng: function() {
    var time = new Date().getTime();

    request(config.fifteen_minute_seng, function (error, response, html) {
      if (!error && response.statusCode == 200) {
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
        io.emit('fifteen minute seng report', fifteenMinuteData);
        seng_15.create({
          'summary': fifteenMinuteData.summary.toLowerCase(),
          'moving_averages': fifteenMinuteData.moving_averages.toLowerCase(),
          'technical_indicators': fifteenMinuteData.technical_indicators.toLowerCase(),
          'created_on': fifteenMinuteData.created_on
        }, function (err, rows) {
          console.log('FIFTEEN MINUTE DAX 142:',err);
          if(rows.affectedRows == 1){
            console.log('FIFTEEN MINUTE DAX DB 144');
          }else {
            console.log(err);
          }
        });
      }
    });

  },

};

module.exports = fifteen_minute;
