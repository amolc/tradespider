var env = process.env.NODE_ENV;
var cfg = require('../config/config.'+env);
var io = require("../socket/socket");

var request = require('request');
var cheerio = require('cheerio');
// var moment = require('moment');

var commonFunctions = require('../api/functions');

var dax_1 = require('mongoose').model('dax_1');
var dow_1 = require('mongoose').model('dow_1');
var seng_1 = require('mongoose').model('seng_1');
var usfuture_1 = require('mongoose').model('usfuture_1');

var one_minute = {

  dax: function() {
    var time = new Date();

    request(cfg.one_minute_dax, function(error, response, html) {
      if (!error && response.statusCode == 200) {
        var $ = cheerio.load(html);
        var oneMinuteData = {};

        // Summary Info
        oneMinuteData.summary = $(cfg.summary_div).children('.summary').children('span').text().toLowerCase();

        // Moving Averages Info
        if ($(cfg.summary_div).children('.summaryTableLine').children('span').eq(1).children('span').length === 1) {
          oneMinuteData.moving_averages = $(cfg.summary_div).children('.summaryTableLine').children('span').eq(1).children('span').text().toLowerCase();
        } else if ($(cfg.summary_div).children('.summaryTableLine').children('span').eq(1).children('b').length === 1) {
          oneMinuteData.moving_averages = $(cfg.summary_div).children('.summaryTableLine').children('span').eq(1).children('b').text().toLowerCase();
        }

        // Technical Indicators Info
        if ($(cfg.summary_div).children('.summaryTableLine').next().children('span').eq(1).children('span').length === 1) {
          oneMinuteData.technical_indicators = $(cfg.summary_div).children('.summaryTableLine').next().children('span').eq(1).children('span').text().toLowerCase();
        } else if ($(cfg.summary_div).children('.summaryTableLine').next().children('span').eq(1).children('b').length === 1) {
          oneMinuteData.technical_indicators = $(cfg.summary_div).children('.summaryTableLine').next().children('span').eq(1).children('b').text().toLowerCase();
        }

        oneMinuteData.value = parseFloat($('div #quotes_summary_current_data').children().children('.inlineblock').children('div').children('span').eq(0).text().replace(',', ''));

        // Use the model 'find' method to get a list of listings
        dax_1.find().sort('-created_on').limit(1).exec(function(err, dax60) {
          if (err) {
            console.log(err);
          } else if (dax60.length === 0) {
            oneMinuteData.signal_strength = 'change';
            oneMinuteData.last_change_type = 'neutral';

            var daxData = new dax_1(oneMinuteData);

            oneMinuteData.created_on = time;
            io.emit('one minute dax-report', oneMinuteData);

            // Try saving the new dax document
            daxData.save(function(err) {
              if (err) {
                console.log(err);
              } else {
                console.log('ONE MINUTE DAX DB 62');
              }
            });
          } else if (dax60.length === 1) {
            var data = {
              new: oneMinuteData,
              old: dax60[0]
            };

            commonFunctions.calculateChange(data, function(result) {
              oneMinuteData.change_flag = result.change_flag;
              oneMinuteData.change_type = result.change_type;
              oneMinuteData.change_value = result.change_value;
              oneMinuteData.signal_strength = result.signal_strength;
              oneMinuteData.last_change_type = result.last_change_type;

              var daxData = new dax_1(oneMinuteData);

              oneMinuteData.created_on = time;
              io.emit('one minute dax-report', oneMinuteData);

              // Try saving the new dax document
              daxData.save(function(err) {
                if (err) {
                  console.log(err);
                } else {
                  console.log('ONE MINUTE DAX DB 88');
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

    request(cfg.one_minute_dow, function(error, response, html) {
      if (!error && response.statusCode == 200) {
        var $ = cheerio.load(html);
        var oneMinuteData = {};

        // Summary Info
        oneMinuteData.summary = $(cfg.summary_div).children('.summary').children('span').text().toLowerCase();

        // Moving Averages Info
        if ($(cfg.summary_div).children('.summaryTableLine').children('span').eq(1).children('span').length === 1) {
          oneMinuteData.moving_averages = $(cfg.summary_div).children('.summaryTableLine').children('span').eq(1).children('span').text().toLowerCase();
        } else if ($(cfg.summary_div).children('.summaryTableLine').children('span').eq(1).children('b').length === 1) {
          oneMinuteData.moving_averages = $(cfg.summary_div).children('.summaryTableLine').children('span').eq(1).children('b').text().toLowerCase();
        }

        // Technical Indicators Info
        if ($(cfg.summary_div).children('.summaryTableLine').next().children('span').eq(1).children('span').length === 1) {
          oneMinuteData.technical_indicators = $(cfg.summary_div).children('.summaryTableLine').next().children('span').eq(1).children('span').text().toLowerCase();
        } else if ($(cfg.summary_div).children('.summaryTableLine').next().children('span').eq(1).children('b').length === 1) {
          oneMinuteData.technical_indicators = $(cfg.summary_div).children('.summaryTableLine').next().children('span').eq(1).children('b').text().toLowerCase();
        }

        oneMinuteData.value = parseFloat($('div #quotes_summary_current_data').children().children('.inlineblock').children('div').children('span').eq(0).text().replace(',', ''));

        // Use the model 'find' method to get a list of listings
        dow_1.find().sort('-created_on').limit(1).exec(function(err, dow60) {
          if (err) {
            console.log(err);
          } else if (dow60.length === 0) {
            oneMinuteData.signal_strength = 'change';
            oneMinuteData.last_change_type = 'neutral';

            var dowData = new dow_1(oneMinuteData);

            oneMinuteData.created_on = time;
            io.emit('one minute dow-report', oneMinuteData);

            // Try saving the new dow document
            dowData.save(function(err) {
              if (err) {
                console.log(err);
              } else {
                console.log('ONE MINUTE DOW DB 145');
              }
            });
          } else if (dow60.length === 1) {
            var data = {
              new: oneMinuteData,
              old: dow60[0]
            };

            commonFunctions.calculateChange(data, function(result) {
              oneMinuteData.change_flag = result.change_flag;
              oneMinuteData.change_type = result.change_type;
              oneMinuteData.change_value = result.change_value;
              oneMinuteData.signal_strength = result.signal_strength;
              oneMinuteData.last_change_type = result.last_change_type;

              var dowData = new dow_1(oneMinuteData);

              oneMinuteData.created_on = time;
              io.emit('one minute dow-report', oneMinuteData);

              // Try saving the new dow document
              dowData.save(function(err) {
                if (err) {
                  console.log(err);
                } else {
                  console.log('ONE MINUTE DOW DB 171');
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

    request(cfg.one_minute_usfuture, function(error, response, html) {
      if (!error && response.statusCode == 200) {
        var $ = cheerio.load(html);
        var oneMinuteData = {};

        oneMinuteData.created_on = time;
        // Summary Info
        oneMinuteData.summary = $(cfg.summary_div).children('.summary').children('span').text().toLowerCase();

        // Moving Averages Info
        if ($(cfg.summary_div).children('.summaryTableLine').children('span').eq(1).children('span').length === 1) {
          oneMinuteData.moving_averages = $(cfg.summary_div).children('.summaryTableLine').children('span').eq(1).children('span').text().toLowerCase();
        } else if ($(cfg.summary_div).children('.summaryTableLine').children('span').eq(1).children('b').length === 1) {
          oneMinuteData.moving_averages = $(cfg.summary_div).children('.summaryTableLine').children('span').eq(1).children('b').text().toLowerCase();
        }

        // Technical Indicators Info
        if ($(cfg.summary_div).children('.summaryTableLine').next().children('span').eq(1).children('span').length === 1) {
          oneMinuteData.technical_indicators = $(cfg.summary_div).children('.summaryTableLine').next().children('span').eq(1).children('span').text().toLowerCase();
        } else if ($(cfg.summary_div).children('.summaryTableLine').next().children('span').eq(1).children('b').length === 1) {
          oneMinuteData.technical_indicators = $(cfg.summary_div).children('.summaryTableLine').next().children('span').eq(1).children('b').text().toLowerCase();
        }

        oneMinuteData.value = parseFloat($('div #quotes_summary_current_data').children().children('.inlineblock').children('div').children('span').eq(0).text().replace(',', ''));

        // Use the model 'find' method to get a list of listings
        usfuture_1.find().sort('-created_on').limit(1).exec(function(err, usfuture60) {
          if (err) {
            console.log(err);
          } else if (usfuture60.length === 0) {
            oneMinuteData.signal_strength = 'change';
            oneMinuteData.last_change_type = 'neutral';

            var usfutureData = new usfuture_1(oneMinuteData);

            oneMinuteData.created_on = time;
            io.emit('one minute usfuture-report', oneMinuteData);

            // Try saving the new usfuture document
            usfutureData.save(function(err) {
              if (err) {
                console.log(err);
              } else {
                console.log('ONE MINUTE US-FUTURE DB 229');
              }
            });
          } else if (usfuture60.length === 1) {
            console.log(usfuture60[0].created_on);
            console.log(time);
            var data = {
              new: oneMinuteData,
              old: usfuture60[0]
            };

            commonFunctions.calculateChange(data, function(result) {
              oneMinuteData.change_flag = result.change_flag;
              oneMinuteData.change_type = result.change_type;
              oneMinuteData.change_value = result.change_value;
              oneMinuteData.signal_strength = result.signal_strength;
              oneMinuteData.last_change_type = result.last_change_type;

              var usfutureData = new usfuture_1(oneMinuteData);

              oneMinuteData.created_on = time;
              io.emit('one minute usfuture-report', oneMinuteData);

              // Try saving the new usfuture document
              usfutureData.save(function(err) {
                if (err) {
                  console.log(err);
                } else {
                  console.log('ONE MINUTE US-FUTURE DB 255');
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

    request(cfg.one_minute_seng, function(error, response, html) {
      if (!error && response.statusCode == 200) {
        var $ = cheerio.load(html);
        var oneMinuteData = {};

        oneMinuteData.created_on = time;
        // Summary Info
        oneMinuteData.summary = $(cfg.summary_div).children('.summary').children('span').text().toLowerCase();

        // Moving Averages Info
        if ($(cfg.summary_div).children('.summaryTableLine').children('span').eq(1).children('span').length === 1) {
          oneMinuteData.moving_averages = $(cfg.summary_div).children('.summaryTableLine').children('span').eq(1).children('span').text().toLowerCase();
        } else if ($(cfg.summary_div).children('.summaryTableLine').children('span').eq(1).children('b').length === 1) {
          oneMinuteData.moving_averages = $(cfg.summary_div).children('.summaryTableLine').children('span').eq(1).children('b').text().toLowerCase();
        }

        // Technical Indicators Info
        if ($(cfg.summary_div).children('.summaryTableLine').next().children('span').eq(1).children('span').length === 1) {
          oneMinuteData.technical_indicators = $(cfg.summary_div).children('.summaryTableLine').next().children('span').eq(1).children('span').text().toLowerCase();
        } else if ($(cfg.summary_div).children('.summaryTableLine').next().children('span').eq(1).children('b').length === 1) {
          oneMinuteData.technical_indicators = $(cfg.summary_div).children('.summaryTableLine').next().children('span').eq(1).children('b').text().toLowerCase();
        }

        oneMinuteData.value = parseFloat($('div #quotes_summary_current_data').children().children('.inlineblock').children('div').children('span').eq(0).text().replace(',', ''));

        // Use the model 'find' method to get a list of listings
        seng_1.find().sort('-created_on').limit(1).exec(function(err, seng60) {
          if (err) {
            console.log(err);
          } else if (seng60.length === 0) {
            oneMinuteData.signal_strength = 'change';
            oneMinuteData.last_change_type = 'neutral';

            var sengData = new seng_1(oneMinuteData);

            oneMinuteData.created_on = time;
            io.emit('one minute seng-report', oneMinuteData);

            // Try saving the new seng document
            sengData.save(function(err) {
              if (err) {
                console.log(err);
              } else {
                console.log('ONE MINUTE SENG DB 313');
              }
            });
          } else if (seng60.length === 1) {
            var data = {
              new: oneMinuteData,
              old: seng60[0]
            };

            commonFunctions.calculateChange(data, function(result) {
              oneMinuteData.change_flag = result.change_flag;
              oneMinuteData.change_type = result.change_type;
              oneMinuteData.change_value = result.change_value;
              oneMinuteData.signal_strength = result.signal_strength;
              oneMinuteData.last_change_type = result.last_change_type;

              var sengData = new seng_1(oneMinuteData);

              oneMinuteData.created_on = time;
              io.emit('one minute seng-report', oneMinuteData);

              // Try saving the new seng document
              sengData.save(function(err) {
                if (err) {
                  console.log(err);
                } else {
                  console.log('ONE MINUTE SENG DB 339');
                }
              });

            });
          }
        });
      }
    });
  },

};

module.exports = one_minute;
