var env = process.env.NODE_ENV;
var cfg = require('../config/config.' + env);
var io = require("../socket/socket");

var request = require('request');
var cheerio = require('cheerio');
var moment = require('moment');

var commonFunctions = require('../api/functions');

var dax_5 = require('mongoose').model('dax_5');
var dow_5 = require('mongoose').model('dow_5');
var seng_5 = require('mongoose').model('seng_5');
var usfuture_5 = require('mongoose').model('usfuture_5');

var five_minute = {

  dax: function() {
    var time = new Date();

    request(cfg.five_minute_dax, function(error, response, html) {
      if (!error && response.statusCode == 200) {
        var $ = cheerio.load(html);
        var fiveMinuteData = {};

        // Summary Info
        fiveMinuteData.summary = $(cfg.summary_div).children('.summary').children('span').text().toLowerCase();

        // Moving Averages Info
        if ($(cfg.summary_div).children('.summaryTableLine').children('span').eq(1).children('span').length === 1) {
          fiveMinuteData.moving_averages = $(cfg.summary_div).children('.summaryTableLine').children('span').eq(1).children('span').text().toLowerCase();
        } else if ($(cfg.summary_div).children('.summaryTableLine').children('span').eq(1).children('b').length === 1) {
          fiveMinuteData.moving_averages = $(cfg.summary_div).children('.summaryTableLine').children('span').eq(1).children('b').text().toLowerCase();
        }

        // Technical Indicators Info
        if ($(cfg.summary_div).children('.summaryTableLine').next().children('span').eq(1).children('span').length === 1) {
          fiveMinuteData.technical_indicators = $(cfg.summary_div).children('.summaryTableLine').next().children('span').eq(1).children('span').text().toLowerCase();
        } else if ($(cfg.summary_div).children('.summaryTableLine').next().children('span').eq(1).children('b').length === 1) {
          fiveMinuteData.technical_indicators = $(cfg.summary_div).children('.summaryTableLine').next().children('span').eq(1).children('b').text().toLowerCase();
        }

        fiveMinuteData.value = parseFloat($('div #quotes_summary_current_data').children().children('.inlineblock').children('div').children('span').eq(0).text().replace(',', ''));

        // Use the model 'find' method to get a list of listings
        dax_5.find().sort('-created_on').limit(1).exec(function(err, dax300) {
          if (err) {
            console.log(err);
          } else if (dax300.length === 0) {
            fiveMinuteData.is_started = true;
            fiveMinuteData.signal_strength = 'change';
            fiveMinuteData.last_change_type = 'neutral';

            var daxData = new dax_5(fiveMinuteData);

            fiveMinuteData.created_on = time;
            io.emit('five minute dax-report', fiveMinuteData);

            // Try saving the new dax document
            daxData.save(function(err) {
              if (err) {
                console.log(err);
              } else {
                console.log('FIVE MINUTE DAX DB 62');
              }
            });
          } else if (dax300.length === 1) {
            var ms = moment.utc(moment(time).diff(moment(dax300[0].created_on))).format("HH");
            if(ms <= 1 && ms >= 0){
              fiveMinuteData.is_started = false;
            }else if(ms > 1){
              fiveMinuteData.is_started = true;
            }
            var data = {
              new: fiveMinuteData,
              old: dax300[0]
            };

            commonFunctions.calculateChange(data, function(result) {
              fiveMinuteData.change_flag = result.change_flag;
              fiveMinuteData.change_type = result.change_type;
              fiveMinuteData.change_value = result.change_value;
              fiveMinuteData.signal_strength = result.signal_strength;
              fiveMinuteData.last_change_type = result.last_change_type;

              var daxData = new dax_5(fiveMinuteData);

              fiveMinuteData.created_on = time;
              io.emit('five minute dax-report', fiveMinuteData);

              // Try saving the new dax document
              daxData.save(function(err) {
                if (err) {
                  console.log(err);
                } else {
                  console.log('FIVE MINUTE DAX DB 88');
                }
              });
            });
          }
        });
      }
    });

  },

  dow: function() {
    var time = new Date();

    request(cfg.five_minute_dow, function(error, response, html) {
      if (!error && response.statusCode == 200) {
        var $ = cheerio.load(html);
        var fiveMinuteData = {};

        // Summary Info
        fiveMinuteData.summary = $(cfg.summary_div).children('.summary').children('span').text().toLowerCase();

        // Moving Averages Info
        if ($(cfg.summary_div).children('.summaryTableLine').children('span').eq(1).children('span').length === 1) {
          fiveMinuteData.moving_averages = $(cfg.summary_div).children('.summaryTableLine').children('span').eq(1).children('span').text().toLowerCase();
        } else if ($(cfg.summary_div).children('.summaryTableLine').children('span').eq(1).children('b').length === 1) {
          fiveMinuteData.moving_averages = $(cfg.summary_div).children('.summaryTableLine').children('span').eq(1).children('b').text().toLowerCase();
        }

        // Technical Indicators Info
        if ($(cfg.summary_div).children('.summaryTableLine').next().children('span').eq(1).children('span').length === 1) {
          fiveMinuteData.technical_indicators = $(cfg.summary_div).children('.summaryTableLine').next().children('span').eq(1).children('span').text().toLowerCase();
        } else if ($(cfg.summary_div).children('.summaryTableLine').next().children('span').eq(1).children('b').length === 1) {
          fiveMinuteData.technical_indicators = $(cfg.summary_div).children('.summaryTableLine').next().children('span').eq(1).children('b').text().toLowerCase();
        }

        fiveMinuteData.value = parseFloat($('div #quotes_summary_current_data').children().children('.inlineblock').children('div').children('span').eq(0).text().replace(',', ''));

        // Use the model 'find' method to get a list of listings
        dow_5.find().sort('-created_on').limit(1).exec(function(err, dow300) {
          if (err) {
            console.log(err);
          } else if (dow300.length === 0) {
            fiveMinuteData.is_started = true;
            fiveMinuteData.signal_strength = 'change';
            fiveMinuteData.last_change_type = 'neutral';

            var dowData = new dow_5(fiveMinuteData);

            fiveMinuteData.created_on = time;
            io.emit('five minute dow-report', fiveMinuteData);

            // Try saving the new dow document
            dowData.save(function(err) {
              if (err) {
                console.log(err);
              } else {
                console.log('FIVE MINUTE DOW DB 144');
              }
            });
          } else if (dow300.length === 1) {
            var ms = moment.utc(moment(time).diff(moment(dow300[0].created_on))).format("HH");
            if(ms <= 1 && ms >= 0){
              fiveMinuteData.is_started = false;
            }else if(ms > 1){
              fiveMinuteData.is_started = true;
            }
            var data = {
              new: fiveMinuteData,
              old: dow300[0]
            };

            commonFunctions.calculateChange(data, function(result) {
              fiveMinuteData.change_flag = result.change_flag;
              fiveMinuteData.change_type = result.change_type;
              fiveMinuteData.change_value = result.change_value;
              fiveMinuteData.signal_strength = result.signal_strength;
              fiveMinuteData.last_change_type = result.last_change_type;

              var dowData = new dow_5(fiveMinuteData);

              fiveMinuteData.created_on = time;
              io.emit('five minute dow-report', fiveMinuteData);

              // Try saving the new dow document
              dowData.save(function(err) {
                if (err) {
                  console.log(err);
                } else {
                  console.log('FIVE MINUTE DOW DB 170');
                }
              });

            });
          }
        });
      }
    });

  },

  usfuture: function() {
    var time = new Date();

    request(cfg.five_minute_usfuture, function(error, response, html) {
      if (!error && response.statusCode == 200) {
        var $ = cheerio.load(html);
        var fiveMinuteData = {};

        // Summary Info
        fiveMinuteData.summary = $(cfg.summary_div).children('.summary').children('span').text().toLowerCase();

        // Moving Averages Info
        if ($(cfg.summary_div).children('.summaryTableLine').children('span').eq(1).children('span').length === 1) {
          fiveMinuteData.moving_averages = $(cfg.summary_div).children('.summaryTableLine').children('span').eq(1).children('span').text().toLowerCase();
        } else if ($(cfg.summary_div).children('.summaryTableLine').children('span').eq(1).children('b').length === 1) {
          fiveMinuteData.moving_averages = $(cfg.summary_div).children('.summaryTableLine').children('span').eq(1).children('b').text().toLowerCase();
        }

        // Technical Indicators Info
        if ($(cfg.summary_div).children('.summaryTableLine').next().children('span').eq(1).children('span').length === 1) {
          fiveMinuteData.technical_indicators = $(cfg.summary_div).children('.summaryTableLine').next().children('span').eq(1).children('span').text().toLowerCase();
        } else if ($(cfg.summary_div).children('.summaryTableLine').next().children('span').eq(1).children('b').length === 1) {
          fiveMinuteData.technical_indicators = $(cfg.summary_div).children('.summaryTableLine').next().children('span').eq(1).children('b').text().toLowerCase();
        }

        fiveMinuteData.value = parseFloat($('div #quotes_summary_current_data').children().children('.inlineblock').children('div').children('span').eq(0).text().replace(',', ''));

        // Use the model 'find' method to get a list of listings
        usfuture_5.find().sort('-created_on').limit(1).exec(function(err, usfuture300) {
          if (err) {
            console.log(err);
          } else if (usfuture300.length === 0) {
            fiveMinuteData.is_started = true;
            fiveMinuteData.signal_strength = 'change';
            fiveMinuteData.last_change_type = 'neutral';

            var usfutureData = new usfuture_5(fiveMinuteData);

            fiveMinuteData.created_on = time;
            io.emit('five minute usfuture-report', fiveMinuteData);

            // Try saving the new usfuture document
            usfutureData.save(function(err) {
              if (err) {
                console.log(err);
              } else {
                console.log('FIVE MINUTE US-FUTURE DB 227');
              }
            });
          } else if (usfuture300.length === 1) {
            var ms = moment.utc(moment(time).diff(moment(usfuture300[0].created_on))).format("HH");
            if(ms <= 1 && ms >= 0){
              fiveMinuteData.is_started = false;
            }else if(ms > 1){
              fiveMinuteData.is_started = true;
            }
            var data = {
              new: fiveMinuteData,
              old: usfuture300[0]
            };

            commonFunctions.calculateChange(data, function(result) {
              fiveMinuteData.change_flag = result.change_flag;
              fiveMinuteData.change_type = result.change_type;
              fiveMinuteData.change_value = result.change_value;
              fiveMinuteData.signal_strength = result.signal_strength;
              fiveMinuteData.last_change_type = result.last_change_type;

              var usfutureData = new usfuture_5(fiveMinuteData);

              fiveMinuteData.created_on = time;
              io.emit('five minute usfuture-report', fiveMinuteData);

              // Try saving the new usfuture document
              usfutureData.save(function(err) {
                if (err) {
                  console.log(err);
                } else {
                  console.log('FIVE MINUTE US-FUTURE DB 253');
                }
              });

            });
          }
        });
      }
    });

  },

  seng: function() {
    var time = new Date();

    request(cfg.five_minute_seng, function(error, response, html) {
      if (!error && response.statusCode == 200) {
        var $ = cheerio.load(html);
        var fiveMinuteData = {};

        // Summary Info
        fiveMinuteData.summary = $(cfg.summary_div).children('.summary').children('span').text().toLowerCase();

        // Moving Averages Info
        if ($(cfg.summary_div).children('.summaryTableLine').children('span').eq(1).children('span').length === 1) {
          fiveMinuteData.moving_averages = $(cfg.summary_div).children('.summaryTableLine').children('span').eq(1).children('span').text().toLowerCase();
        } else if ($(cfg.summary_div).children('.summaryTableLine').children('span').eq(1).children('b').length === 1) {
          fiveMinuteData.moving_averages = $(cfg.summary_div).children('.summaryTableLine').children('span').eq(1).children('b').text().toLowerCase();
        }

        // Technical Indicators Info
        if ($(cfg.summary_div).children('.summaryTableLine').next().children('span').eq(1).children('span').length === 1) {
          fiveMinuteData.technical_indicators = $(cfg.summary_div).children('.summaryTableLine').next().children('span').eq(1).children('span').text().toLowerCase();
        } else if ($(cfg.summary_div).children('.summaryTableLine').next().children('span').eq(1).children('b').length === 1) {
          fiveMinuteData.technical_indicators = $(cfg.summary_div).children('.summaryTableLine').next().children('span').eq(1).children('b').text().toLowerCase();
        }

        fiveMinuteData.value = parseFloat($('div #quotes_summary_current_data').children().children('.inlineblock').children('div').children('span').eq(0).text().replace(',', ''));

        // Use the model 'find' method to get a list of listings
        seng_5.find().sort('-created_on').limit(1).exec(function(err, seng300) {
          if (err) {
            console.log(err);
          } else if (seng300.length === 0) {
            fiveMinuteData.is_started = true;
            fiveMinuteData.signal_strength = 'change';
            fiveMinuteData.last_change_type = 'neutral';

            var sengData = new seng_5(fiveMinuteData);

            fiveMinuteData.created_on = time;
            io.emit('five minute seng-report', fiveMinuteData);

            // Try saving the new seng document
            sengData.save(function(err) {
              if (err) {
                console.log(err);
              } else {
                console.log('FIVE MINUTE SENG DB 310');
              }
            });
          } else if (seng300.length === 1) {
            var ms = moment.utc(moment(time).diff(moment(seng300[0].created_on))).format("HH");
            if(ms <= 1 && ms >= 0){
              fiveMinuteData.is_started = false;
            }else if(ms > 1){
              fiveMinuteData.is_started = true;
            }
            var data = {
              new: fiveMinuteData,
              old: seng300[0]
            };

            commonFunctions.calculateChange(data, function(result) {
              fiveMinuteData.change_flag = result.change_flag;
              fiveMinuteData.change_type = result.change_type;
              fiveMinuteData.change_value = result.change_value;
              fiveMinuteData.signal_strength = result.signal_strength;
              fiveMinuteData.last_change_type = result.last_change_type;

              var sengData = new seng_5(fiveMinuteData);

              fiveMinuteData.created_on = time;
              io.emit('five minute seng-report', fiveMinuteData);

              // Try saving the new seng document
              sengData.save(function(err) {
                if (err) {
                  console.log(err);
                } else {
                  console.log('FIVE MINUTE SENG DB 336');
                }
              });

            });
          }
        });
      }
    });

  },

};

module.exports = five_minute;
