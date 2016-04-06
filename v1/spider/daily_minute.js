var env = process.env.NODE_ENV;
var cfg = require('../config/config.' + env);

var io = require("../socket/socket");

var request = require('request');
var cheerio = require('cheerio');
var moment = require('moment');

var commonFunctions = require('../api/functions');

var dax_1440 = require('mongoose').model('dax_1440');
var dow_1440 = require('mongoose').model('dow_1440');
var seng_1440 = require('mongoose').model('seng_1440');
var usfuture_1440 = require('mongoose').model('usfuture_1440');

var daily = {

  dax: function() {
    var time = new Date();

    request(cfg.daily_dax, function(error, response, html) {
      if (!error && response.statusCode == 200) {
        var $ = cheerio.load(html);
        var dailyData = {};

        // Summary Info
        dailyData.summary = $(cfg.summary_div).children('.summary').children('span').text().toLowerCase();

        // Moving Averages Info
        if ($(cfg.summary_div).children('.summaryTableLine').children('span').eq(1).children('span').length === 1) {
          dailyData.moving_averages = $(cfg.summary_div).children('.summaryTableLine').children('span').eq(1).children('span').text().toLowerCase();
        } else if ($(cfg.summary_div).children('.summaryTableLine').children('span').eq(1).children('b').length === 1) {
          dailyData.moving_averages = $(cfg.summary_div).children('.summaryTableLine').children('span').eq(1).children('b').text().toLowerCase();
        }

        // Technical Indicators Info
        if ($(cfg.summary_div).children('.summaryTableLine').next().children('span').eq(1).children('span').length === 1) {
          dailyData.technical_indicators = $(cfg.summary_div).children('.summaryTableLine').next().children('span').eq(1).children('span').text().toLowerCase();
        } else if ($(cfg.summary_div).children('.summaryTableLine').next().children('span').eq(1).children('b').length === 1) {
          dailyData.technical_indicators = $(cfg.summary_div).children('.summaryTableLine').next().children('span').eq(1).children('b').text().toLowerCase();
        }

        dailyData.value = parseFloat($('div #quotes_summary_current_data').children().children('.inlineblock').children('div').children('span').eq(0).text().replace(',', ''));

        // Use the model 'find' method to get a list of listings
        dax_1440.find().sort('-created_on').limit(1).exec(function(err, dax1440) {
          if (err) {
            console.log(err);
          } else if (dax1440.length === 0) {
            dailyData.is_started = true;
            dailyData.signal_strength = 'change';
            dailyData.last_change_type = 'neutral';

            var dailydaxData = new dax_1440(dailyData);

            dailyData.created_on = time;
            io.emit('daily dax-report', dailyData);

            // Try saving the new dax document
            dailydaxData.save(function(err) {
              if (err) {
                console.log(err);
              } else {
                console.log('DAILY DAX DB 63');
              }
            });
          } else if (dax1440.length === 1) {
            var ms = moment.utc(moment(time).diff(moment(dax1440[0].created_on))).format("HH");
            if(ms <= 1 && ms >= 0){
              dailyData.is_started = false;
            }else if(ms > 1){
              dailyData.is_started = true;
            }
            var data = {
              new: dailyData,
              old: dax1440[0]
            };

            commonFunctions.calculateChange(data, function(result) {
              dailyData.change_flag = result.change_flag;
              dailyData.change_type = result.change_type;
              dailyData.change_value = result.change_value;
              dailyData.signal_strength = result.signal_strength;
              dailyData.last_change_type = result.last_change_type;

              var dailydaxData = new dax_1440(dailyData);

              dailyData.created_on = time;
              io.emit('daily dax-report', dailyData);

              // Try saving the new dax document
              dailydaxData.save(function(err) {
                if (err) {
                  console.log(err);
                } else {
                  console.log('FIFTEEN MINUTE DAX DB 89');
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

    request(cfg.daily_dow, function(error, response, html) {
      if (!error && response.statusCode == 200) {
        var $ = cheerio.load(html);
        var dailyData = {};

        // Summary Info
        dailyData.summary = $(cfg.summary_div).children('.summary').children('span').text().toLowerCase();

        // Moving Averages Info
        if ($(cfg.summary_div).children('.summaryTableLine').children('span').eq(1).children('span').length === 1) {
          dailyData.moving_averages = $(cfg.summary_div).children('.summaryTableLine').children('span').eq(1).children('span').text().toLowerCase();
        } else if ($(cfg.summary_div).children('.summaryTableLine').children('span').eq(1).children('b').length === 1) {
          dailyData.moving_averages = $(cfg.summary_div).children('.summaryTableLine').children('span').eq(1).children('b').text().toLowerCase();
        }

        // Technical Indicators Info
        if ($(cfg.summary_div).children('.summaryTableLine').next().children('span').eq(1).children('span').length === 1) {
          dailyData.technical_indicators = $(cfg.summary_div).children('.summaryTableLine').next().children('span').eq(1).children('span').text().toLowerCase();
        } else if ($(cfg.summary_div).children('.summaryTableLine').next().children('span').eq(1).children('b').length === 1) {
          dailyData.technical_indicators = $(cfg.summary_div).children('.summaryTableLine').next().children('span').eq(1).children('b').text().toLowerCase();
        }

        dailyData.value = parseFloat($('div #quotes_summary_current_data').children().children('.inlineblock').children('div').children('span').eq(0).text().replace(',', ''));

        // Use the model 'find' method to get a list of listings
        dow_1440.find().sort('-created_on').limit(1).exec(function(err, dow1440) {
          if (err) {
            console.log(err);
          } else if (dow1440.length === 0) {
            dailyData.is_started = true;
            dailyData.signal_strength = 'change';
            dailyData.last_change_type = 'neutral';

            var dailydowData = new dow_1440(dailyData);

            dailyData.created_on = time;
            io.emit('daily dow-report', dailyData);

            // Try saving the new dow document
            dailydowData.save(function(err) {
              if (err) {
                console.log(err);
              } else {
                console.log('FIFTEEN MINUTE DOW DB 145');
              }
            });
          } else if (dow1440.length === 1) {
            var ms = moment.utc(moment(time).diff(moment(dow1440[0].created_on))).format("HH");
            if(ms <= 1 && ms >= 0){
              dailyData.is_started = false;
            }else if(ms > 1){
              dailyData.is_started = true;
            }
            var data = {
              new: dailyData,
              old: dow1440[0]
            };

            commonFunctions.calculateChange(data, function(result) {
              dailyData.change_flag = result.change_flag;
              dailyData.change_type = result.change_type;
              dailyData.change_value = result.change_value;
              dailyData.signal_strength = result.signal_strength;
              dailyData.last_change_type = result.last_change_type;

              var dailydowData = new dow_1440(dailyData);

              dailyData.created_on = time;
              io.emit('daily dow-report', dailyData);

              // Try saving the new dow document
              dailydowData.save(function(err) {
                if (err) {
                  console.log(err);
                } else {
                  console.log('FIFTEEN MINUTE DOW DB 171');
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

    request(cfg.daily_usfuture, function(error, response, html) {
      if (!error && response.statusCode == 200) {
        var $ = cheerio.load(html);
        var dailyData = {};

        // Summary Info
        dailyData.summary = $(cfg.summary_div).children('.summary').children('span').text().toLowerCase();

        // Moving Averages Info
        if ($(cfg.summary_div).children('.summaryTableLine').children('span').eq(1).children('span').length === 1) {
          dailyData.moving_averages = $(cfg.summary_div).children('.summaryTableLine').children('span').eq(1).children('span').text().toLowerCase();
        } else if ($(cfg.summary_div).children('.summaryTableLine').children('span').eq(1).children('b').length === 1) {
          dailyData.moving_averages = $(cfg.summary_div).children('.summaryTableLine').children('span').eq(1).children('b').text().toLowerCase();
        }

        // Technical Indicators Info
        if ($(cfg.summary_div).children('.summaryTableLine').next().children('span').eq(1).children('span').length === 1) {
          dailyData.technical_indicators = $(cfg.summary_div).children('.summaryTableLine').next().children('span').eq(1).children('span').text().toLowerCase();
        } else if ($(cfg.summary_div).children('.summaryTableLine').next().children('span').eq(1).children('b').length === 1) {
          dailyData.technical_indicators = $(cfg.summary_div).children('.summaryTableLine').next().children('span').eq(1).children('b').text().toLowerCase();
        }

        dailyData.value = parseFloat($('div #quotes_summary_current_data').children().children('.inlineblock').children('div').children('span').eq(0).text().replace(',', ''));

        // Use the model 'find' method to get a list of listings
        usfuture_1440.find().sort('-created_on').limit(1).exec(function(err, usfuture1440) {
          if (err) {
            console.log(err);
          } else if (usfuture1440.length === 0) {
            dailyData.is_started = true;
            dailyData.signal_strength = 'change';
            dailyData.last_change_type = 'neutral';

            var dailyusfutureData = new usfuture_1440(dailyData);

            dailyData.created_on = time;
            io.emit('daily usfuture-report', dailyData);

            // Try saving the new usfuture document
            dailyusfutureData.save(function(err) {
              if (err) {
                console.log(err);
              } else {
                console.log('FIFTEEN MINUTE US-FUTURE DB 227');
              }
            });
          } else if (usfuture1440.length === 1) {
            var ms = moment.utc(moment(time).diff(moment(usfuture1440[0].created_on))).format("HH");
            if(ms <= 1 && ms >= 0){
              dailyData.is_started = false;
            }else if(ms > 1){
              dailyData.is_started = true;
            }
            var data = {
              new: dailyData,
              old: usfuture1440[0]
            };

            commonFunctions.calculateChange(data, function(result) {
              dailyData.change_flag = result.change_flag;
              dailyData.change_type = result.change_type;
              dailyData.change_value = result.change_value;
              dailyData.signal_strength = result.signal_strength;
              dailyData.last_change_type = result.last_change_type;

              var dailyusfutureData = new usfuture_1440(dailyData);

              dailyData.created_on = time;
              io.emit('daily usfuture-report', dailyData);

              // Try saving the new usfuture document
              dailyusfutureData.save(function(err) {
                if (err) {
                  console.log(err);
                } else {
                  console.log('FIFTEEN MINUTE US-FUTURE DB 253');
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

    request(cfg.daily_seng, function(error, response, html) {
      if (!error && response.statusCode == 200) {
        var $ = cheerio.load(html);
        var dailyData = {};

        // Summary Info
        dailyData.summary = $(cfg.summary_div).children('.summary').children('span').text().toLowerCase();

        // Moving Averages Info
        if ($(cfg.summary_div).children('.summaryTableLine').children('span').eq(1).children('span').length === 1) {
          dailyData.moving_averages = $(cfg.summary_div).children('.summaryTableLine').children('span').eq(1).children('span').text().toLowerCase();
        } else if ($(cfg.summary_div).children('.summaryTableLine').children('span').eq(1).children('b').length === 1) {
          dailyData.moving_averages = $(cfg.summary_div).children('.summaryTableLine').children('span').eq(1).children('b').text().toLowerCase();
        }

        // Technical Indicators Info
        if ($(cfg.summary_div).children('.summaryTableLine').next().children('span').eq(1).children('span').length === 1) {
          dailyData.technical_indicators = $(cfg.summary_div).children('.summaryTableLine').next().children('span').eq(1).children('span').text().toLowerCase();
        } else if ($(cfg.summary_div).children('.summaryTableLine').next().children('span').eq(1).children('b').length === 1) {
          dailyData.technical_indicators = $(cfg.summary_div).children('.summaryTableLine').next().children('span').eq(1).children('b').text().toLowerCase();
        }

        dailyData.value = parseFloat($('div #quotes_summary_current_data').children().children('.inlineblock').children('div').children('span').eq(0).text().replace(',', ''));

        // Use the model 'find' method to get a list of listings
        seng_1440.find().sort('-created_on').limit(1).exec(function(err, seng1440) {
          if (err) {
            console.log(err);
          } else if (seng1440.length === 0) {
            dailyData.is_started = true;
            dailyData.signal_strength = 'change';
            dailyData.last_change_type = 'neutral';

            var dailysengData = new seng_1440(dailyData);

            dailyData.created_on = time;
            io.emit('daily seng-report', dailyData);

            // Try saving the new seng document
            dailysengData.save(function(err) {
              if (err) {
                console.log(err);
              } else {
                console.log('FIFTEEN MINUTE SENG DB 309');
              }
            });
          } else if (seng1440.length === 1) {
            var ms = moment.utc(moment(time).diff(moment(seng1440[0].created_on))).format("HH");
            if(ms <= 1 && ms >= 0){
              dailyData.is_started = false;
            }else if(ms > 1){
              dailyData.is_started = true;
            }
            var data = {
              new: dailyData,
              old: seng1440[0]
            };

            commonFunctions.calculateChange(data, function(result) {
              dailyData.change_flag = result.change_flag;
              dailyData.change_type = result.change_type;
              dailyData.change_value = result.change_value;
              dailyData.signal_strength = result.signal_strength;
              dailyData.last_change_type = result.last_change_type;

              var dailysengData = new seng_1440(dailyData);

              dailyData.created_on = time;
              io.emit('daily seng-report', dailyData);

              // Try saving the new seng document
              dailysengData.save(function(err) {
                if (err) {
                  console.log(err);
                } else {
                  console.log('FIFTEEN MINUTE SENG DB 335');
                }
              });
            });
          }
        });
      }
    });

  },

};

module.exports = daily;
