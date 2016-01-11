var env = process.env.NODE_ENV;
var cfg = require('./config/config.'+env);
var db = cfg.connection;
var io = require("./socket");

var request = require('request');
var cheerio = require('cheerio');

var CRUD = require('mysql-crud');

//DAX Table
var dax_1 = CRUD(db, 'dax_1');
//DOW Table
var dow_1 = CRUD(db, 'dow_1');
//SENG Table
var seng_1 = CRUD(db, 'seng_1');

var one_minute = {

  dax: function() {
    var time = new Date().getTime();

    request(cfg.one_minute_dax, function (error, response, html) {
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

        io.emit('one minute dax-report', oneMinuteData);

        dax_1.create({
          'summary': oneMinuteData.summary.toLowerCase(),
          'moving_averages': oneMinuteData.moving_averages.toLowerCase(),
          'technical_indicators': oneMinuteData.technical_indicators.toLowerCase(),
          'created_on': oneMinuteData.created_on
        }, function (err, rows) {
          console.log('ONE MINUTE DAX 55:',err);
          if(rows.affectedRows == 1){
            console.log('ONE MINUTE DAX DB 57');
          }else {
            console.log(err);
          }
        });
      }
    });

  },

  dow: function () {
    var time = new Date().getTime();

    request(cfg.one_minute_dow, function (error, response, html) {
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

        io.emit('one minute dow-report', oneMinuteData);

        dow_1.create({
          'summary': oneMinuteData.summary.toLowerCase(),
          'moving_averages': oneMinuteData.moving_averages.toLowerCase(),
          'technical_indicators': oneMinuteData.technical_indicators.toLowerCase(),
          'created_on': oneMinuteData.created_on
        }, function (err, rows) {
          console.log('ONE MINUTE DOW 102:',err);
          if(rows.affectedRows == 1){
            console.log('ONE MINUTE DOW DB 104');
          }else {
            console.log(err);
          }
        });
      }
    });

  },

  seng: function() {
    var time = new Date().getTime();

    request(cfg.one_minute_seng, function (error, response, html) {
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

        io.emit('one minute seng-report', oneMinuteData);

        seng_1.create({
          'summary': oneMinuteData.summary.toLowerCase(),
          'moving_averages': oneMinuteData.moving_averages.toLowerCase(),
          'technical_indicators': oneMinuteData.technical_indicators.toLowerCase(),
          'created_on': oneMinuteData.created_on
        }, function (err, rows) {
          console.log('ONE MINUTE SENG 149:',err);
          if(rows.affectedRows == 1){
            console.log('ONE MINUTE SENG DB 151');
          }else {
            console.log(err);
          }
        });
      }
    });
  },

};

module.exports = one_minute;
