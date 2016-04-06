var env = process.env.NODE_ENV;
var cfg = require('../config/config.' + env);

var io = require("../socket/socket");

var request = require('request');
var cheerio = require('cheerio');
var moment = require('moment');

var commonFunctions = require('../api/functions');

var dax_15 = require('mongoose').model('dax_15');
var dow_15 = require('mongoose').model('dow_15');
var seng_15 = require('mongoose').model('seng_15');
var usfuture_15 = require('mongoose').model('usfuture_15');

var fifteen_minute = {

  dax: function() {
    var time = new Date();

    request(cfg.fifteen_minute_dax, function(error, response, html) {
      if (!error && response.statusCode == 200) {
        var $ = cheerio.load(html);
        var fifteenMinuteData = {};

        // Summary Info
        fifteenMinuteData.summary = $(cfg.summary_div).children('.summary').children('span').text().toLowerCase();

        // Moving Averages Info
        if ($(cfg.summary_div).children('.summaryTableLine').children('span').eq(1).children('span').length === 1) {
          fifteenMinuteData.moving_averages = $(cfg.summary_div).children('.summaryTableLine').children('span').eq(1).children('span').text().toLowerCase();
        } else if ($(cfg.summary_div).children('.summaryTableLine').children('span').eq(1).children('b').length === 1) {
          fifteenMinuteData.moving_averages = $(cfg.summary_div).children('.summaryTableLine').children('span').eq(1).children('b').text().toLowerCase();
        }

        // Technical Indicators Info
        if ($(cfg.summary_div).children('.summaryTableLine').next().children('span').eq(1).children('span').length === 1) {
          fifteenMinuteData.technical_indicators = $(cfg.summary_div).children('.summaryTableLine').next().children('span').eq(1).children('span').text().toLowerCase();
        } else if ($(cfg.summary_div).children('.summaryTableLine').next().children('span').eq(1).children('b').length === 1) {
          fifteenMinuteData.technical_indicators = $(cfg.summary_div).children('.summaryTableLine').next().children('span').eq(1).children('b').text().toLowerCase();
        }

        fifteenMinuteData.value = parseFloat($('div #quotes_summary_current_data').children().children('.inlineblock').children('div').children('span').eq(0).text().replace(',', ''));

        // Use the model 'find' method to get a list of listings
        dax_15.find().sort('-created_on').limit(1).exec(function(err, dax900) {
          if (err) {
            console.log(err);
          } else if (dax900.length === 0) {
            fifteenMinuteData.is_started = true;
            fifteenMinuteData.signal_strength = 'change';
            fifteenMinuteData.last_change_type = 'neutral';

            var daxData = new dax_15(fifteenMinuteData);

            fifteenMinuteData.created_on = time;
            io.emit('fifteen minute dax-report', fifteenMinuteData);

            // Try saving the new dax document
            daxData.save(function(err) {
              if (err) {
                console.log(err);
              } else {
                console.log('FIFTEEN MINUTE DAX DB 63');
              }
            });
          } else if (dax900.length === 1) {
            var ms = moment.utc(moment(time).diff(moment(dax900[0].created_on))).format("HH");
            if(ms <= 1 && ms >= 0){
              fifteenMinuteData.is_started = false;
            }else if(ms > 1){
              fifteenMinuteData.is_started = true;
            }
            var data = {
              new: fifteenMinuteData,
              old: dax900[0]
            };

            commonFunctions.calculateChange(data, function(result) {
              fifteenMinuteData.change_flag = result.change_flag;
              fifteenMinuteData.change_type = result.change_type;
              fifteenMinuteData.change_value = result.change_value;
              fifteenMinuteData.signal_strength = result.signal_strength;
              fifteenMinuteData.last_change_type = result.last_change_type;

              var daxData = new dax_15(fifteenMinuteData);

              fifteenMinuteData.created_on = time;
              io.emit('fifteen minute dax-report', fifteenMinuteData);

              // Try saving the new dax document
              daxData.save(function(err) {
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

    request(cfg.fifteen_minute_dow, function(error, response, html) {
      if (!error && response.statusCode == 200) {
        var $ = cheerio.load(html);
        var fifteenMinuteData = {};

        // Summary Info
        fifteenMinuteData.summary = $(cfg.summary_div).children('.summary').children('span').text().toLowerCase();

        // Moving Averages Info
        if ($(cfg.summary_div).children('.summaryTableLine').children('span').eq(1).children('span').length === 1) {
          fifteenMinuteData.moving_averages = $(cfg.summary_div).children('.summaryTableLine').children('span').eq(1).children('span').text().toLowerCase();
        } else if ($(cfg.summary_div).children('.summaryTableLine').children('span').eq(1).children('b').length === 1) {
          fifteenMinuteData.moving_averages = $(cfg.summary_div).children('.summaryTableLine').children('span').eq(1).children('b').text().toLowerCase();
        }

        // Technical Indicators Info
        if ($(cfg.summary_div).children('.summaryTableLine').next().children('span').eq(1).children('span').length === 1) {
          fifteenMinuteData.technical_indicators = $(cfg.summary_div).children('.summaryTableLine').next().children('span').eq(1).children('span').text().toLowerCase();
        } else if ($(cfg.summary_div).children('.summaryTableLine').next().children('span').eq(1).children('b').length === 1) {
          fifteenMinuteData.technical_indicators = $(cfg.summary_div).children('.summaryTableLine').next().children('span').eq(1).children('b').text().toLowerCase();
        }

        fifteenMinuteData.value = parseFloat($('div #quotes_summary_current_data').children().children('.inlineblock').children('div').children('span').eq(0).text().replace(',', ''));

        // Use the model 'find' method to get a list of listings
        dow_15.find().sort('-created_on').limit(1).exec(function(err, dow900) {
          if (err) {
            console.log(err);
          } else if (dow900.length === 0) {
            fifteenMinuteData.is_started = true;
            fifteenMinuteData.signal_strength = 'change';
            fifteenMinuteData.last_change_type = 'neutral';

            var dowData = new dow_15(fifteenMinuteData);

            fifteenMinuteData.created_on = time;
            io.emit('fifteen minute dow-report', fifteenMinuteData);

            // Try saving the new dow document
            dowData.save(function(err) {
              if (err) {
                console.log(err);
              } else {
                console.log('FIFTEEN MINUTE DOW DB 145');
              }
            });
          } else if (dow900.length === 1) {
            var ms = moment.utc(moment(time).diff(moment(dow900[0].created_on))).format("HH");
            if(ms <= 1 && ms >= 0){
              fifteenMinuteData.is_started = false;
            }else if(ms > 1){
              fifteenMinuteData.is_started = true;
            }
            var data = {
              new: fifteenMinuteData,
              old: dow900[0]
            };

            commonFunctions.calculateChange(data, function(result) {
              fifteenMinuteData.change_flag = result.change_flag;
              fifteenMinuteData.change_type = result.change_type;
              fifteenMinuteData.change_value = result.change_value;
              fifteenMinuteData.signal_strength = result.signal_strength;
              fifteenMinuteData.last_change_type = result.last_change_type;

              var dowData = new dow_15(fifteenMinuteData);

              fifteenMinuteData.created_on = time;
              io.emit('fifteen minute dow-report', fifteenMinuteData);

              // Try saving the new dow document
              dowData.save(function(err) {
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

    request(cfg.fifteen_minute_usfuture, function(error, response, html) {
      if (!error && response.statusCode == 200) {
        var $ = cheerio.load(html);
        var fifteenMinuteData = {};

        // Summary Info
        fifteenMinuteData.summary = $(cfg.summary_div).children('.summary').children('span').text().toLowerCase();

        // Moving Averages Info
        if ($(cfg.summary_div).children('.summaryTableLine').children('span').eq(1).children('span').length === 1) {
          fifteenMinuteData.moving_averages = $(cfg.summary_div).children('.summaryTableLine').children('span').eq(1).children('span').text().toLowerCase();
        } else if ($(cfg.summary_div).children('.summaryTableLine').children('span').eq(1).children('b').length === 1) {
          fifteenMinuteData.moving_averages = $(cfg.summary_div).children('.summaryTableLine').children('span').eq(1).children('b').text().toLowerCase();
        }

        // Technical Indicators Info
        if ($(cfg.summary_div).children('.summaryTableLine').next().children('span').eq(1).children('span').length === 1) {
          fifteenMinuteData.technical_indicators = $(cfg.summary_div).children('.summaryTableLine').next().children('span').eq(1).children('span').text().toLowerCase();
        } else if ($(cfg.summary_div).children('.summaryTableLine').next().children('span').eq(1).children('b').length === 1) {
          fifteenMinuteData.technical_indicators = $(cfg.summary_div).children('.summaryTableLine').next().children('span').eq(1).children('b').text().toLowerCase();
        }

        fifteenMinuteData.value = parseFloat($('div #quotes_summary_current_data').children().children('.inlineblock').children('div').children('span').eq(0).text().replace(',', ''));

        // Use the model 'find' method to get a list of listings
        usfuture_15.find().sort('-created_on').limit(1).exec(function(err, usfuture900) {
          if (err) {
            console.log(err);
          } else if (usfuture900.length === 0) {
            fifteenMinuteData.is_started = true;
            fifteenMinuteData.signal_strength = 'change';
            fifteenMinuteData.last_change_type = 'neutral';

            var usfutureData = new usfuture_15(fifteenMinuteData);

            fifteenMinuteData.created_on = time;
            io.emit('fifteen minute usfuture-report', fifteenMinuteData);

            // Try saving the new usfuture document
            usfutureData.save(function(err) {
              if (err) {
                console.log(err);
              } else {
                console.log('FIFTEEN MINUTE US-FUTURE DB 227');
              }
            });
          } else if (usfuture900.length === 1) {
            var ms = moment.utc(moment(time).diff(moment(usfuture900[0].created_on))).format("HH");
            if(ms <= 1 && ms >= 0){
              fifteenMinuteData.is_started = false;
            }else if(ms > 1){
              fifteenMinuteData.is_started = true;
            }
            var data = {
              new: fifteenMinuteData,
              old: usfuture900[0]
            };

            commonFunctions.calculateChange(data, function(result) {
              fifteenMinuteData.change_flag = result.change_flag;
              fifteenMinuteData.change_type = result.change_type;
              fifteenMinuteData.change_value = result.change_value;
              fifteenMinuteData.signal_strength = result.signal_strength;
              fifteenMinuteData.last_change_type = result.last_change_type;

              var usfutureData = new usfuture_15(fifteenMinuteData);

              fifteenMinuteData.created_on = time;
              io.emit('fifteen minute usfuture-report', fifteenMinuteData);

              // Try saving the new usfuture document
              usfutureData.save(function(err) {
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

    request(cfg.fifteen_minute_seng, function(error, response, html) {
      if (!error && response.statusCode == 200) {
        var $ = cheerio.load(html);
        var fifteenMinuteData = {};

        // Summary Info
        fifteenMinuteData.summary = $(cfg.summary_div).children('.summary').children('span').text().toLowerCase();

        // Moving Averages Info
        if ($(cfg.summary_div).children('.summaryTableLine').children('span').eq(1).children('span').length === 1) {
          fifteenMinuteData.moving_averages = $(cfg.summary_div).children('.summaryTableLine').children('span').eq(1).children('span').text().toLowerCase();
        } else if ($(cfg.summary_div).children('.summaryTableLine').children('span').eq(1).children('b').length === 1) {
          fifteenMinuteData.moving_averages = $(cfg.summary_div).children('.summaryTableLine').children('span').eq(1).children('b').text().toLowerCase();
        }

        // Technical Indicators Info
        if ($(cfg.summary_div).children('.summaryTableLine').next().children('span').eq(1).children('span').length === 1) {
          fifteenMinuteData.technical_indicators = $(cfg.summary_div).children('.summaryTableLine').next().children('span').eq(1).children('span').text().toLowerCase();
        } else if ($(cfg.summary_div).children('.summaryTableLine').next().children('span').eq(1).children('b').length === 1) {
          fifteenMinuteData.technical_indicators = $(cfg.summary_div).children('.summaryTableLine').next().children('span').eq(1).children('b').text().toLowerCase();
        }

        fifteenMinuteData.value = parseFloat($('div #quotes_summary_current_data').children().children('.inlineblock').children('div').children('span').eq(0).text().replace(',', ''));

        // Use the model 'find' method to get a list of listings
        seng_15.find().sort('-created_on').limit(1).exec(function(err, seng900) {
          if (err) {
            console.log(err);
          } else if (seng900.length === 0) {
            fifteenMinuteData.is_started = true;
            fifteenMinuteData.signal_strength = 'change';
            fifteenMinuteData.last_change_type = 'neutral';

            var sengData = new seng_15(fifteenMinuteData);

            fifteenMinuteData.created_on = time;
            io.emit('fifteen minute seng-report', fifteenMinuteData);

            // Try saving the new seng document
            sengData.save(function(err) {
              if (err) {
                console.log(err);
              } else {
                console.log('FIFTEEN MINUTE SENG DB 309');
              }
            });
          } else if (seng900.length === 1) {
            var ms = moment.utc(moment(time).diff(moment(seng900[0].created_on))).format("HH");
            if(ms <= 1 && ms >= 0){
              fifteenMinuteData.is_started = false;
            }else if(ms > 1){
              fifteenMinuteData.is_started = true;
            }
            var data = {
              new: fifteenMinuteData,
              old: seng900[0]
            };

            commonFunctions.calculateChange(data, function(result) {
              fifteenMinuteData.change_flag = result.change_flag;
              fifteenMinuteData.change_type = result.change_type;
              fifteenMinuteData.change_value = result.change_value;
              fifteenMinuteData.signal_strength = result.signal_strength;
              fifteenMinuteData.last_change_type = result.last_change_type;

              var sengData = new seng_15(fifteenMinuteData);

              fifteenMinuteData.created_on = time;
              io.emit('fifteen minute seng-report', fifteenMinuteData);

              // Try saving the new seng document
              sengData.save(function(err) {
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

module.exports = fifteen_minute;
