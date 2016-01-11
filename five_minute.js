var env = process.env.NODE_ENV;
var cfg = require('./config/config.'+env);
var db = cfg.connection;
var io = require("./socket");

var request = require('request');
var cheerio = require('cheerio');

var CRUD = require('mysql-crud');

//DAX Table
var dax_5 = CRUD(db, 'dax_5');
//DOW Table
var dow_5 = CRUD(db, 'dow_5');
//SENG Table
var seng_5 = CRUD(db, 'seng_5');

var five_minute = {

  dax: function() {
    var time = new Date().getTime();

    request(cfg.five_minute_dax, function (error, response, html) {
      if (!error && response.statusCode == 200) {
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
          console.log('FIVE MINUTE DAX 52:',err);
          if(rows.affectedRows == 1){
            console.log('FIVE MINUTE DAX DB 54');
          }else {
            console.log(err);
          }
        });
      }
    });

  },

  dow: function () {
    var time = new Date().getTime();

    request(cfg.five_minute_dow, function (error, response, html) {
      if (!error && response.statusCode == 200) {
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
          console.log('FIVE MINUTE DOW 97:',err);
          if(rows.affectedRows == 1){
            console.log('FIVE MINUTE DOW DB 99');
          }else {
            console.log(err);
          }
        });
      }
    });

  },

  seng: function() {
    var time = new Date().getTime();

    request(cfg.five_minute_seng, function (error, response, html) {
      if (!error && response.statusCode == 200) {
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
        io.emit('five minute seng report', fiveMinuteData);
        seng_5.create({
          'summary': fiveMinuteData.summary.toLowerCase(),
          'moving_averages': fiveMinuteData.moving_averages.toLowerCase(),
          'technical_indicators': fiveMinuteData.technical_indicators.toLowerCase(),
          'created_on': fiveMinuteData.created_on
        }, function (err, rows) {
          console.log('FIVE MINUTE SENG 142:',err);
          if(rows.affectedRows == 1){
            console.log('FIVE MINUTE SENG DB 144');
          }else {
            console.log(err);
          }
        });
      }
    });

  },

};

module.exports = five_minute;
