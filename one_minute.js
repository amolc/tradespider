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

function calculateChange(data, callback) {
  // var change_flag, change_by, change_type;
  var change = {};

  if(data.old.summary !== data.new.summary){
      change.change_flag = true;

      if(data.old.summary == 'neutral'){

        if(data.new.summary == 'buy'){
          change.change_type = 'positive';
        }else if(data.new.summary == 'sell'){
          change.change_type = 'negative';
        }else if(data.new.summary == 'strong buy'){
          change.change_type = 'positive';
        }else if(data.new.summary == 'strong sell'){
          change.change_type = 'negative';
        }

      }else if(data.old.summary == 'sell'){

        if(data.new.summary == 'buy'){
          change.change_type = 'positive';
        }else if(data.new.summary == 'neutral'){
          change.change_type = 'positive';
        }else if(data.new.summary == 'strong buy'){
          change.change_type = 'positive';
        }else if(data.new.summary == 'strong sell'){
          change.change_type = 'negative';
        }

      }else if(data.old.summary == 'buy'){

        if(data.new.summary == 'neutral'){
          change.change_type = 'negative';
        }else if(data.new.summary == 'sell'){
          change.change_type = 'negative';
        }else if(data.new.summary == 'strong buy'){
          change.change_type = 'positive';
        }else if(data.new.summary == 'strong sell'){
          change.change_type = 'negative';
        }

      }else if(data.old.summary == 'strong sell'){

        if(data.new.summary == 'buy'){
          change.change_type = 'positive';
        }else if(data.new.summary == 'sell'){
          change.change_type = 'positive';
        }else if(data.new.summary == 'strong buy'){
          change.change_type = 'positive';
        }else if(data.new.summary == 'neutral'){
          change.change_type = 'positive';
        }

      }else if(data.old.summary == 'strong buy'){

        if(data.new.summary == 'buy'){
          change.change_type = 'negative';
        }else if(data.new.summary == 'sell'){
          change.change_type = 'negative';
        }else if(data.new.summary == 'neutral'){
          change.change_type = 'negative';
        }else if(data.new.summary == 'strong sell'){
          change.change_type = 'negative';
        }

      }
      change.change_value = data.new.value;
      change.signal_strength = 'change';
      change.last_change_type = change.change_type;

  }else {
    change.change_flag = false;
    change.change_type = 'neutral';
    change.change_value = data.old.change_value;
    change.last_change_type = data.old.last_change_type;

    if(data.old.last_change_type === 'positive'){
      if(data.new.value > change.change_value) change.signal_strength = 'correct';
      else if(data.new.value < change.change_value) change.signal_strength = 'wrong';
      else change.signal_strength = 'correct';
    }else if(data.old.last_change_type === 'negative'){
      if(data.new.value < change.change_value) change.signal_strength = 'correct';
      else if(data.new.value > change.change_value) change.signal_strength = 'wrong';
      else change.signal_strength = 'correct';
    }

  }

  callback(change);

}

var one_minute = {

  dax: function() {
    var time = new Date().getTime();

    request(cfg.one_minute_dax, function (error, response, html) {
      if (!error && response.statusCode == 200) {
        var $ = cheerio.load(html);
        var oneMinuteData = {};

        oneMinuteData.created_on = time;
        // Summary Info
        oneMinuteData.summary = $(cfg.summary_div).children('.summary').children('span').text().toLowerCase();

        // Moving Averages Info
        if($(cfg.summary_div).children('.summaryTableLine').children('span').eq(1).children('span').length === 1){
          oneMinuteData.moving_averages = $(cfg.summary_div).children('.summaryTableLine').children('span').eq(1).children('span').text().toLowerCase();
        }else if($(cfg.summary_div).children('.summaryTableLine').children('span').eq(1).children('b').length === 1){
          oneMinuteData.moving_averages = $(cfg.summary_div).children('.summaryTableLine').children('span').eq(1).children('b').text().toLowerCase();
        }

        // Technical Indicators Info
        if($(cfg.summary_div).children('.summaryTableLine').next().children('span').eq(1).children('span').length === 1){
          oneMinuteData.technical_indicators = $(cfg.summary_div).children('.summaryTableLine').next().children('span').eq(1).children('span').text().toLowerCase();
        }else if($(cfg.summary_div).children('.summaryTableLine').next().children('span').eq(1).children('b').length === 1){
          oneMinuteData.technical_indicators = $(cfg.summary_div).children('.summaryTableLine').next().children('span').eq(1).children('b').text().toLowerCase();
        }

        oneMinuteData.value = parseFloat($('div #quotes_summary_current_data').children().children('.inlineblock').children('div').children('span').eq(0).text().replace(',',''));

        var dax_query = "SELECT * FROM dax_1 ORDER BY id DESC LIMIT 1";
        db.query(dax_query, function (err, rows) {
          if(err){
            console.log(err);
          }else {
            if(rows.length === 0){

              io.emit('one minute dax-report', oneMinuteData);

              dax_1.create({
                'summary': oneMinuteData.summary,
                'moving_averages': oneMinuteData.moving_averages,
                'technical_indicators': oneMinuteData.technical_indicators,
                'value': oneMinuteData.value,
                'signal_strength': 'change',
                'last_change_type': 'neutral',
                'change_value': oneMinuteData.value,
                'created_on': oneMinuteData.created_on
              }, function (err, rows) {
                if(rows.affectedRows == 1){
                  console.log('ONE MINUTE US-FUTURE DB 156');
                }else {
                  console.log(err);
                }
              });

            }else {

              var data = {
                new: oneMinuteData,
                old: rows[0]
              };

              calculateChange(data, function (result) {
                oneMinuteData.change_flag = result.change_flag;
                oneMinuteData.change_type = result.change_type;
                oneMinuteData.change_value = result.change_value;
                oneMinuteData.signal_strength = result.signal_strength;
                oneMinuteData.last_change_type = result.last_change_type;

                io.emit('one minute dax-report', oneMinuteData);

                dax_1.create({
                  'summary': oneMinuteData.summary,
                  'moving_averages': oneMinuteData.moving_averages,
                  'technical_indicators': oneMinuteData.technical_indicators,
                  'value': oneMinuteData.value,
                  'change_value': oneMinuteData.change_value,
                  'change_flag': oneMinuteData.change_flag,
                  'change_type': oneMinuteData.change_type,
                  'signal_strength': oneMinuteData.signal_strength,
                  'last_change_type': oneMinuteData.last_change_type,
                  'created_on': oneMinuteData.created_on
                }, function (err, rows) {
                  if(rows.affectedRows == 1){
                    console.log('ONE MINUTE US-FUTURE DB 156');
                  }else {
                    console.log(err);
                  }
                });

              });
            }
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
        oneMinuteData.summary = $(cfg.summary_div).children('.summary').children('span').text().toLowerCase();

        // Moving Averages Info
        if($(cfg.summary_div).children('.summaryTableLine').children('span').eq(1).children('span').length === 1){
          oneMinuteData.moving_averages = $(cfg.summary_div).children('.summaryTableLine').children('span').eq(1).children('span').text().toLowerCase();
        }else if($(cfg.summary_div).children('.summaryTableLine').children('span').eq(1).children('b').length === 1){
          oneMinuteData.moving_averages = $(cfg.summary_div).children('.summaryTableLine').children('span').eq(1).children('b').text().toLowerCase();
        }

        // Technical Indicators Info
        if($(cfg.summary_div).children('.summaryTableLine').next().children('span').eq(1).children('span').length === 1){
          oneMinuteData.technical_indicators = $(cfg.summary_div).children('.summaryTableLine').next().children('span').eq(1).children('span').text().toLowerCase();
        }else if($(cfg.summary_div).children('.summaryTableLine').next().children('span').eq(1).children('b').length === 1){
          oneMinuteData.technical_indicators = $(cfg.summary_div).children('.summaryTableLine').next().children('span').eq(1).children('b').text().toLowerCase();
        }

        oneMinuteData.value = parseFloat($('div #quotes_summary_current_data').children().children('.inlineblock').children('div').children('span').eq(0).text().replace(',',''));

        var dow_query = "SELECT * FROM dow_1 ORDER BY id DESC LIMIT 1";
        db.query(dow_query, function (err, rows) {
          if(err){
            console.log(err);
          }else {
            if(rows.length === 0){

              io.emit('one minute dow-report', oneMinuteData);

              dow_1.create({
                'summary': oneMinuteData.summary,
                'moving_averages': oneMinuteData.moving_averages,
                'technical_indicators': oneMinuteData.technical_indicators,
                'value': oneMinuteData.value,
                'signal_strength': 'change',
                'last_change_type': 'neutral',
                'change_value': oneMinuteData.value,
                'created_on': oneMinuteData.created_on
              }, function (err, rows) {
                if(rows.affectedRows == 1){
                  console.log('ONE MINUTE US-FUTURE DB 156');
                }else {
                  console.log(err);
                }
              });

            }else {

              var data = {
                new: oneMinuteData,
                old: rows[0]
              };

              calculateChange(data, function (result) {
                oneMinuteData.change_flag = result.change_flag;
                oneMinuteData.change_type = result.change_type;
                oneMinuteData.change_value = result.change_value;
                oneMinuteData.signal_strength = result.signal_strength;
                oneMinuteData.last_change_type = result.last_change_type;

                io.emit('one minute dow-report', oneMinuteData);

                dow_1.create({
                  'summary': oneMinuteData.summary,
                  'moving_averages': oneMinuteData.moving_averages,
                  'technical_indicators': oneMinuteData.technical_indicators,
                  'value': oneMinuteData.value,
                  'change_value': oneMinuteData.change_value,
                  'change_flag': oneMinuteData.change_flag,
                  'change_type': oneMinuteData.change_type,
                  'signal_strength': oneMinuteData.signal_strength,
                  'last_change_type': oneMinuteData.last_change_type,
                  'created_on': oneMinuteData.created_on
                }, function (err, rows) {
                  if(rows.affectedRows == 1){
                    console.log('ONE MINUTE US-FUTURE DB 156');
                  }else {
                    console.log(err);
                  }
                });

              });
            }
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
        oneMinuteData.summary = $(cfg.summary_div).children('.summary').children('span').text().toLowerCase();

        // Moving Averages Info
        if($(cfg.summary_div).children('.summaryTableLine').children('span').eq(1).children('span').length === 1){
          oneMinuteData.moving_averages = $(cfg.summary_div).children('.summaryTableLine').children('span').eq(1).children('span').text().toLowerCase();
        }else if($(cfg.summary_div).children('.summaryTableLine').children('span').eq(1).children('b').length === 1){
          oneMinuteData.moving_averages = $(cfg.summary_div).children('.summaryTableLine').children('span').eq(1).children('b').text().toLowerCase();
        }

        // Technical Indicators Info
        if($(cfg.summary_div).children('.summaryTableLine').next().children('span').eq(1).children('span').length === 1){
          oneMinuteData.technical_indicators = $(cfg.summary_div).children('.summaryTableLine').next().children('span').eq(1).children('span').text().toLowerCase();
        }else if($(cfg.summary_div).children('.summaryTableLine').next().children('span').eq(1).children('b').length === 1){
          oneMinuteData.technical_indicators = $(cfg.summary_div).children('.summaryTableLine').next().children('span').eq(1).children('b').text().toLowerCase();
        }

        oneMinuteData.value = parseFloat($('div #quotes_summary_current_data').children().children('.inlineblock').children('div').children('span').eq(0).text().replace(',',''));

        var usfuture_query = "SELECT * FROM usfuture_1 ORDER BY id DESC LIMIT 1";
        db.query(usfuture_query, function (err, rows) {
          if(err){
            console.log(err);
          }else {
            if(rows.length === 0){

              io.emit('one minute usfuture-report', oneMinuteData);

              usfuture_1.create({
                'summary': oneMinuteData.summary,
                'moving_averages': oneMinuteData.moving_averages,
                'technical_indicators': oneMinuteData.technical_indicators,
                'value': oneMinuteData.value,
                'signal_strength': 'change',
                'last_change_type': 'neutral',
                'change_value': oneMinuteData.value,
                'created_on': oneMinuteData.created_on
              }, function (err, rows) {
                if(rows.affectedRows == 1){
                  console.log('ONE MINUTE US-FUTURE DB 156');
                }else {
                  console.log(err);
                }
              });

            }else {

              var data = {
                new: oneMinuteData,
                old: rows[0]
              };

              calculateChange(data, function (result) {
                oneMinuteData.change_flag = result.change_flag;
                oneMinuteData.change_type = result.change_type;
                oneMinuteData.change_value = result.change_value;
                oneMinuteData.signal_strength = result.signal_strength;
                oneMinuteData.last_change_type = result.last_change_type;

                io.emit('one minute usfuture-report', oneMinuteData);

                usfuture_1.create({
                  'summary': oneMinuteData.summary,
                  'moving_averages': oneMinuteData.moving_averages,
                  'technical_indicators': oneMinuteData.technical_indicators,
                  'value': oneMinuteData.value,
                  'change_value': oneMinuteData.change_value,
                  'change_flag': oneMinuteData.change_flag,
                  'change_type': oneMinuteData.change_type,
                  'signal_strength': oneMinuteData.signal_strength,
                  'last_change_type': oneMinuteData.last_change_type,
                  'created_on': oneMinuteData.created_on
                }, function (err, rows) {
                  if(rows.affectedRows == 1){
                    console.log('ONE MINUTE US-FUTURE DB 156');
                  }else {
                    console.log(err);
                  }
                });

              });
            }
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

        oneMinuteData.created_on = time;
        // Summary Info
        oneMinuteData.summary = $(cfg.summary_div).children('.summary').children('span').text().toLowerCase();

        // Moving Averages Info
        if($(cfg.summary_div).children('.summaryTableLine').children('span').eq(1).children('span').length === 1){
          oneMinuteData.moving_averages = $(cfg.summary_div).children('.summaryTableLine').children('span').eq(1).children('span').text().toLowerCase();
        }else if($(cfg.summary_div).children('.summaryTableLine').children('span').eq(1).children('b').length === 1){
          oneMinuteData.moving_averages = $(cfg.summary_div).children('.summaryTableLine').children('span').eq(1).children('b').text().toLowerCase();
        }

        // Technical Indicators Info
        if($(cfg.summary_div).children('.summaryTableLine').next().children('span').eq(1).children('span').length === 1){
          oneMinuteData.technical_indicators = $(cfg.summary_div).children('.summaryTableLine').next().children('span').eq(1).children('span').text().toLowerCase();
        }else if($(cfg.summary_div).children('.summaryTableLine').next().children('span').eq(1).children('b').length === 1){
          oneMinuteData.technical_indicators = $(cfg.summary_div).children('.summaryTableLine').next().children('span').eq(1).children('b').text().toLowerCase();
        }

        oneMinuteData.value = parseFloat($('div #quotes_summary_current_data').children().children('.inlineblock').children('div').children('span').eq(0).text().replace(',',''));

        io.emit('one minute seng-report', oneMinuteData);

        var seng_query = "SELECT * FROM seng_1 ORDER BY id DESC LIMIT 1";
        db.query(seng_query, function (err, rows) {
          if(err){
            console.log(err);
          }else {
            if(rows.length === 0){

              io.emit('one minute seng-report', oneMinuteData);

              seng_1.create({
                'summary': oneMinuteData.summary,
                'moving_averages': oneMinuteData.moving_averages,
                'technical_indicators': oneMinuteData.technical_indicators,
                'value': oneMinuteData.value,
                'signal_strength': 'change',
                'last_change_type': 'neutral',
                'change_value': oneMinuteData.value,
                'created_on': oneMinuteData.created_on
              }, function (err, rows) {
                if(rows.affectedRows == 1){
                  console.log('ONE MINUTE US-FUTURE DB 156');
                }else {
                  console.log(err);
                }
              });

            }else {

              var data = {
                new: oneMinuteData,
                old: rows[0]
              };

              calculateChange(data, function (result) {
                oneMinuteData.change_flag = result.change_flag;
                oneMinuteData.change_type = result.change_type;
                oneMinuteData.change_value = result.change_value;
                oneMinuteData.signal_strength = result.signal_strength;
                oneMinuteData.last_change_type = result.last_change_type;

                io.emit('one minute seng-report', oneMinuteData);

                seng_1.create({
                  'summary': oneMinuteData.summary,
                  'moving_averages': oneMinuteData.moving_averages,
                  'technical_indicators': oneMinuteData.technical_indicators,
                  'value': oneMinuteData.value,
                  'change_value': oneMinuteData.change_value,
                  'change_flag': oneMinuteData.change_flag,
                  'change_type': oneMinuteData.change_type,
                  'signal_strength': oneMinuteData.signal_strength,
                  'last_change_type': oneMinuteData.last_change_type,
                  'created_on': oneMinuteData.created_on
                }, function (err, rows) {
                  if(rows.affectedRows == 1){
                    console.log('ONE MINUTE US-FUTURE DB 156');
                  }else {
                    console.log(err);
                  }
                });

              });
            }
          }
        });
      }
    });
  },

};

module.exports = one_minute;
