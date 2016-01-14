var env = process.env.NODE_ENV;
var cfg = require('./config/config.'+env);
var db = cfg.connection;
var io = require("./socket/socket");

var request = require('request');
var cheerio = require('cheerio');

var CRUD = require('mysql-crud');

//DAX Table
var dax_1 = CRUD(db, 'dax_1');
//DOW Table
var dow_1 = CRUD(db, 'dow_1');
//DOW Table
var usfuture_1 = CRUD(db, 'usfuture_1');
//SENG Table
var seng_1 = CRUD(db, 'seng_1');

var one_minute = {

  dax: function() {
    var time = new Date().getTime();

    request(cfg.one_minute_dax, function (error, response, html) {
      if (!error && response.statusCode == 200) {
        var $ = cheerio.load(html);
        var oneMinuteData = {};

        oneMinuteData.created_on = time;
        // Summary Info
        oneMinuteData.summary = $(cfg.summary_div).children('.summary').children('span').text();

        // Moving Averages Info
        if($(cfg.summary_div).children('.summaryTableLine').children('span').eq(1).children('span').length === 1){
          oneMinuteData.moving_averages = $(cfg.summary_div).children('.summaryTableLine').children('span').eq(1).children('span').text();
        }else if($(cfg.summary_div).children('.summaryTableLine').children('span').eq(1).children('b').length === 1){
          oneMinuteData.moving_averages = $(cfg.summary_div).children('.summaryTableLine').children('span').eq(1).children('b').text();
        }

        // Technical Indicators Info
        if($(cfg.summary_div).children('.summaryTableLine').next().children('span').eq(1).children('span').length === 1){
          oneMinuteData.technical_indicators = $(cfg.summary_div).children('.summaryTableLine').next().children('span').eq(1).children('span').text();
        }else if($(cfg.summary_div).children('.summaryTableLine').next().children('span').eq(1).children('b').length === 1){
          oneMinuteData.technical_indicators = $(cfg.summary_div).children('.summaryTableLine').next().children('span').eq(1).children('b').text();
        }

        oneMinuteData.value = $('div #quotes_summary_current_data').children().children('.inlineblock').children('div').children('span').eq(0).text();

        io.emit('one minute dax-report', oneMinuteData);

        dax_1.create({
          'summary': oneMinuteData.summary.toLowerCase(),
          'moving_averages': oneMinuteData.moving_averages.toLowerCase(),
          'technical_indicators': oneMinuteData.technical_indicators.toLowerCase(),
          'value': oneMinuteData.value,
          'created_on': oneMinuteData.created_on
        }, function (err, rows) {
          if(rows.affectedRows == 1){
            console.log('ONE MINUTE DAX DB 60');
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

        oneMinuteData.created_on = time;
        // Summary Info
        oneMinuteData.summary = $(cfg.summary_div).children('.summary').children('span').text();

        // Moving Averages Info
        if($(cfg.summary_div).children('.summaryTableLine').children('span').eq(1).children('span').length === 1){
          oneMinuteData.moving_averages = $(cfg.summary_div).children('.summaryTableLine').children('span').eq(1).children('span').text();
        }else if($(cfg.summary_div).children('.summaryTableLine').children('span').eq(1).children('b').length === 1){
          oneMinuteData.moving_averages = $(cfg.summary_div).children('.summaryTableLine').children('span').eq(1).children('b').text();
        }

        // Technical Indicators Info
        if($(cfg.summary_div).children('.summaryTableLine').next().children('span').eq(1).children('span').length === 1){
          oneMinuteData.technical_indicators = $(cfg.summary_div).children('.summaryTableLine').next().children('span').eq(1).children('span').text();
        }else if($(cfg.summary_div).children('.summaryTableLine').next().children('span').eq(1).children('b').length === 1){
          oneMinuteData.technical_indicators = $(cfg.summary_div).children('.summaryTableLine').next().children('span').eq(1).children('b').text();
        }

        oneMinuteData.value = $('div #quotes_summary_current_data').children().children('.inlineblock').children('div').children('span').eq(0).text();

        io.emit('one minute dow-report', oneMinuteData);

        dow_1.create({
          'summary': oneMinuteData.summary.toLowerCase(),
          'moving_averages': oneMinuteData.moving_averages.toLowerCase(),
          'technical_indicators': oneMinuteData.technical_indicators.toLowerCase(),
          'value': oneMinuteData.value,
          'created_on': oneMinuteData.created_on
        }, function (err, rows) {
          if(rows.affectedRows == 1){
            console.log('ONE MINUTE DOW DB 108');
          }else {
            console.log(err);
          }
        });
      }
    });

  },

  usfuture: function () {
    var time = new Date().getTime();

    request(cfg.one_minute_usfuture, function (error, response, html) {
      if (!error && response.statusCode == 200) {
        var $ = cheerio.load(html);
        var oneMinuteData = {};

        oneMinuteData.created_on = time;
        // Summary Info
        oneMinuteData.summary = $(cfg.summary_div).children('.summary').children('span').text();

        // Moving Averages Info
        if($(cfg.summary_div).children('.summaryTableLine').children('span').eq(1).children('span').length === 1){
          oneMinuteData.moving_averages = $(cfg.summary_div).children('.summaryTableLine').children('span').eq(1).children('span').text();
        }else if($(cfg.summary_div).children('.summaryTableLine').children('span').eq(1).children('b').length === 1){
          oneMinuteData.moving_averages = $(cfg.summary_div).children('.summaryTableLine').children('span').eq(1).children('b').text();
        }

        // Technical Indicators Info
        if($(cfg.summary_div).children('.summaryTableLine').next().children('span').eq(1).children('span').length === 1){
          oneMinuteData.technical_indicators = $(cfg.summary_div).children('.summaryTableLine').next().children('span').eq(1).children('span').text();
        }else if($(cfg.summary_div).children('.summaryTableLine').next().children('span').eq(1).children('b').length === 1){
          oneMinuteData.technical_indicators = $(cfg.summary_div).children('.summaryTableLine').next().children('span').eq(1).children('b').text();
        }

        oneMinuteData.value = $('div #quotes_summary_current_data').children().children('.inlineblock').children('div').children('span').eq(0).text();

        io.emit('one minute usfuture-report', oneMinuteData);

        // usfuture_1.create({
        //   'summary': oneMinuteData.summary.toLowerCase(),
        //   'moving_averages': oneMinuteData.moving_averages.toLowerCase(),
        //   'technical_indicators': oneMinuteData.technical_indicators.toLowerCase(),
        //   'value': oneMinuteData.value,
        //   'created_on': oneMinuteData.created_on
        // }, function (err, rows) {
        //   if(rows.affectedRows == 1){
        //     console.log('ONE MINUTE US-FUTURE DB 156');
        //   }else {
        //     console.log(err);
        //   }
        // });
      }
    });

  },

  seng: function() {
    var time = new Date().getTime();

    request(cfg.one_minute_seng, function (error, response, html) {
      if (!error && response.statusCode == 200) {
        var $ = cheerio.load(html);
        var oneMinuteData = {};

        oneMinuteData.created_on = time;
        // Summary Info
        oneMinuteData.summary = $(cfg.summary_div).children('.summary').children('span').text();

        // Moving Averages Info
        if($(cfg.summary_div).children('.summaryTableLine').children('span').eq(1).children('span').length === 1){
          oneMinuteData.moving_averages = $(cfg.summary_div).children('.summaryTableLine').children('span').eq(1).children('span').text();
        }else if($(cfg.summary_div).children('.summaryTableLine').children('span').eq(1).children('b').length === 1){
          oneMinuteData.moving_averages = $(cfg.summary_div).children('.summaryTableLine').children('span').eq(1).children('b').text();
        }

        // Technical Indicators Info
        if($(cfg.summary_div).children('.summaryTableLine').next().children('span').eq(1).children('span').length === 1){
          oneMinuteData.technical_indicators = $(cfg.summary_div).children('.summaryTableLine').next().children('span').eq(1).children('span').text();
        }else if($(cfg.summary_div).children('.summaryTableLine').next().children('span').eq(1).children('b').length === 1){
          oneMinuteData.technical_indicators = $(cfg.summary_div).children('.summaryTableLine').next().children('span').eq(1).children('b').text();
        }

        oneMinuteData.value = $('div #quotes_summary_current_data').children().children('.inlineblock').children('div').children('span').eq(0).text();

        io.emit('one minute seng-report', oneMinuteData);

        seng_1.create({
          'summary': oneMinuteData.summary.toLowerCase(),
          'moving_averages': oneMinuteData.moving_averages.toLowerCase(),
          'technical_indicators': oneMinuteData.technical_indicators.toLowerCase(),
          'value': oneMinuteData.value,
          'created_on': oneMinuteData.created_on
        }, function (err, rows) {
          if(rows.affectedRows == 1){
            console.log('ONE MINUTE SENG DB 204');
          }else {
            console.log(err);
          }
        });
      }
    });
  },

};

module.exports = one_minute;
