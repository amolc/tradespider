var env = process.env.NODE_ENV;
var cfg = require('../config/config.' + env);

var io = require("../socket/socket");

var request = require('request');
var cheerio = require('cheerio');
var moment = require('moment');

var commonFunctions = require('../api/functions');

var dax_60 = require('mongoose').model('dax_60');
var dow_60 = require('mongoose').model('dow_60');
var seng_60 = require('mongoose').model('seng_60');
var usfuture_60 = require('mongoose').model('usfuture_60');

var sixty_minute = {

  dax: function() {
    var time = new Date();

    request(cfg.sixty_minute_dax, function(error, response, html) {
      if (!error && response.statusCode == 200) {
        var $ = cheerio.load(html);
        var sixtyMinuteData = {};

        // Summary Info
        sixtyMinuteData.summary = $(cfg.summary_div).children('.summary').children('span').text().toLowerCase();

        // Moving Averages Info
        if ($(cfg.summary_div).children('.summaryTableLine').children('span').eq(1).children('span').length === 1) {
          sixtyMinuteData.moving_averages = $(cfg.summary_div).children('.summaryTableLine').children('span').eq(1).children('span').text().toLowerCase();
        } else if ($(cfg.summary_div).children('.summaryTableLine').children('span').eq(1).children('b').length === 1) {
          sixtyMinuteData.moving_averages = $(cfg.summary_div).children('.summaryTableLine').children('span').eq(1).children('b').text().toLowerCase();
        }

        // Technical Indicators Info
        if ($(cfg.summary_div).children('.summaryTableLine').next().children('span').eq(1).children('span').length === 1) {
          sixtyMinuteData.technical_indicators = $(cfg.summary_div).children('.summaryTableLine').next().children('span').eq(1).children('span').text().toLowerCase();
        } else if ($(cfg.summary_div).children('.summaryTableLine').next().children('span').eq(1).children('b').length === 1) {
          sixtyMinuteData.technical_indicators = $(cfg.summary_div).children('.summaryTableLine').next().children('span').eq(1).children('b').text().toLowerCase();
        }

        sixtyMinuteData.value = parseFloat($('div #quotes_summary_current_data').children().children('.inlineblock').children('div').children('span').eq(0).text().replace(',', ''));

        // Use the model 'find' method to get a list of listings
        dax_60.find().sort('-created_on').limit(1).exec(function(err, dax3600) {
          if (err) {
            console.log(err);
          } else if (dax3600.length === 0) {
            sixtyMinuteData.is_started = true;
            sixtyMinuteData.signal_strength = 'change';
            sixtyMinuteData.last_change_type = 'neutral';

            var daxData = new dax_60(sixtyMinuteData);

            sixtyMinuteData.created_on = time;
            io.emit('sixty minute dax-report', sixtyMinuteData);

            // Try saving the new dax document
            daxData.save(function(err) {
              if (err) {
                console.log(err);
              } else {
                console.log('FIFTEEN MINUTE DAX DB 63');
              }
            });
          } else if (dax3600.length === 1) {
            var ms = moment.utc(moment(time).diff(moment(dax3600[0].created_on))).format("HH");
            if(ms <= 1 && ms >= 0){
              sixtyMinuteData.is_started = false;
            }else if(ms > 1){
              sixtyMinuteData.is_started = true;
            }
            var data = {
              new: sixtyMinuteData,
              old: dax3600[0]
            };

            commonFunctions.calculateChange(data, function(result) {
              sixtyMinuteData.change_flag = result.change_flag;
              sixtyMinuteData.change_type = result.change_type;
              sixtyMinuteData.change_value = result.change_value;
              sixtyMinuteData.signal_strength = result.signal_strength;
              sixtyMinuteData.last_change_type = result.last_change_type;

              var daxData = new dax_60(sixtyMinuteData);

              sixtyMinuteData.created_on = time;
              io.emit('sixty minute dax-report', sixtyMinuteData);

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

    request(cfg.sixty_minute_dow, function(error, response, html) {
      if (!error && response.statusCode == 200) {
        var $ = cheerio.load(html);
        var sixtyMinuteData = {};

        // Summary Info
        sixtyMinuteData.summary = $(cfg.summary_div).children('.summary').children('span').text().toLowerCase();

        // Moving Averages Info
        if ($(cfg.summary_div).children('.summaryTableLine').children('span').eq(1).children('span').length === 1) {
          sixtyMinuteData.moving_averages = $(cfg.summary_div).children('.summaryTableLine').children('span').eq(1).children('span').text().toLowerCase();
        } else if ($(cfg.summary_div).children('.summaryTableLine').children('span').eq(1).children('b').length === 1) {
          sixtyMinuteData.moving_averages = $(cfg.summary_div).children('.summaryTableLine').children('span').eq(1).children('b').text().toLowerCase();
        }

        // Technical Indicators Info
        if ($(cfg.summary_div).children('.summaryTableLine').next().children('span').eq(1).children('span').length === 1) {
          sixtyMinuteData.technical_indicators = $(cfg.summary_div).children('.summaryTableLine').next().children('span').eq(1).children('span').text().toLowerCase();
        } else if ($(cfg.summary_div).children('.summaryTableLine').next().children('span').eq(1).children('b').length === 1) {
          sixtyMinuteData.technical_indicators = $(cfg.summary_div).children('.summaryTableLine').next().children('span').eq(1).children('b').text().toLowerCase();
        }

        sixtyMinuteData.value = parseFloat($('div #quotes_summary_current_data').children().children('.inlineblock').children('div').children('span').eq(0).text().replace(',', ''));

        // Use the model 'find' method to get a list of listings
        dow_60.find().sort('-created_on').limit(1).exec(function(err, dow3600) {
          if (err) {
            console.log(err);
          } else if (dow3600.length === 0) {
            sixtyMinuteData.is_started = true;
            sixtyMinuteData.signal_strength = 'change';
            sixtyMinuteData.last_change_type = 'neutral';

            var dowData = new dow_60(sixtyMinuteData);

            sixtyMinuteData.created_on = time;
            io.emit('sixty minute dow-report', sixtyMinuteData);

            // Try saving the new dow document
            dowData.save(function(err) {
              if (err) {
                console.log(err);
              } else {
                console.log('FIFTEEN MINUTE DOW DB 145');
              }
            });
          } else if (dow3600.length === 1) {
            var ms = moment.utc(moment(time).diff(moment(dow3600[0].created_on))).format("HH");
            if(ms <= 1 && ms >= 0){
              sixtyMinuteData.is_started = false;
            }else if(ms > 1){
              sixtyMinuteData.is_started = true;
            }
            var data = {
              new: sixtyMinuteData,
              old: dow3600[0]
            };

            commonFunctions.calculateChange(data, function(result) {
              sixtyMinuteData.change_flag = result.change_flag;
              sixtyMinuteData.change_type = result.change_type;
              sixtyMinuteData.change_value = result.change_value;
              sixtyMinuteData.signal_strength = result.signal_strength;
              sixtyMinuteData.last_change_type = result.last_change_type;

              var dowData = new dow_60(sixtyMinuteData);

              sixtyMinuteData.created_on = time;
              io.emit('sixty minute dow-report', sixtyMinuteData);

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

    request(cfg.sixty_minute_usfuture, function(error, response, html) {
      if (!error && response.statusCode == 200) {
        var $ = cheerio.load(html);
        var sixtyMinuteData = {};

        // Summary Info
        sixtyMinuteData.summary = $(cfg.summary_div).children('.summary').children('span').text().toLowerCase();

        // Moving Averages Info
        if ($(cfg.summary_div).children('.summaryTableLine').children('span').eq(1).children('span').length === 1) {
          sixtyMinuteData.moving_averages = $(cfg.summary_div).children('.summaryTableLine').children('span').eq(1).children('span').text().toLowerCase();
        } else if ($(cfg.summary_div).children('.summaryTableLine').children('span').eq(1).children('b').length === 1) {
          sixtyMinuteData.moving_averages = $(cfg.summary_div).children('.summaryTableLine').children('span').eq(1).children('b').text().toLowerCase();
        }

        // Technical Indicators Info
        if ($(cfg.summary_div).children('.summaryTableLine').next().children('span').eq(1).children('span').length === 1) {
          sixtyMinuteData.technical_indicators = $(cfg.summary_div).children('.summaryTableLine').next().children('span').eq(1).children('span').text().toLowerCase();
        } else if ($(cfg.summary_div).children('.summaryTableLine').next().children('span').eq(1).children('b').length === 1) {
          sixtyMinuteData.technical_indicators = $(cfg.summary_div).children('.summaryTableLine').next().children('span').eq(1).children('b').text().toLowerCase();
        }

        sixtyMinuteData.value = parseFloat($('div #quotes_summary_current_data').children().children('.inlineblock').children('div').children('span').eq(0).text().replace(',', ''));

        // Use the model 'find' method to get a list of listings
        usfuture_60.find().sort('-created_on').limit(1).exec(function(err, usfuture3600) {
          if (err) {
            console.log(err);
          } else if (usfuture3600.length === 0) {
            sixtyMinuteData.is_started = true;
            sixtyMinuteData.signal_strength = 'change';
            sixtyMinuteData.last_change_type = 'neutral';

            var usfutureData = new usfuture_60(sixtyMinuteData);

            sixtyMinuteData.created_on = time;
            io.emit('sixty minute usfuture-report', sixtyMinuteData);

            // Try saving the new usfuture document
            usfutureData.save(function(err) {
              if (err) {
                console.log(err);
              } else {
                console.log('FIFTEEN MINUTE US-FUTURE DB 227');
              }
            });
          } else if (usfuture3600.length === 1) {
            var ms = moment.utc(moment(time).diff(moment(usfuture3600[0].created_on))).format("HH");
            if(ms <= 1 && ms >= 0){
              sixtyMinuteData.is_started = false;
            }else if(ms > 1){
              sixtyMinuteData.is_started = true;
            }
            var data = {
              new: sixtyMinuteData,
              old: usfuture3600[0]
            };

            commonFunctions.calculateChange(data, function(result) {
              sixtyMinuteData.change_flag = result.change_flag;
              sixtyMinuteData.change_type = result.change_type;
              sixtyMinuteData.change_value = result.change_value;
              sixtyMinuteData.signal_strength = result.signal_strength;
              sixtyMinuteData.last_change_type = result.last_change_type;

              var usfutureData = new usfuture_60(sixtyMinuteData);

              sixtyMinuteData.created_on = time;
              io.emit('sixty minute usfuture-report', sixtyMinuteData);

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

    request(cfg.sixty_minute_seng, function(error, response, html) {
      if (!error && response.statusCode == 200) {
        var $ = cheerio.load(html);
        var sixtyMinuteData = {};

        // Summary Info
        sixtyMinuteData.summary = $(cfg.summary_div).children('.summary').children('span').text().toLowerCase();

        // Moving Averages Info
        if ($(cfg.summary_div).children('.summaryTableLine').children('span').eq(1).children('span').length === 1) {
          sixtyMinuteData.moving_averages = $(cfg.summary_div).children('.summaryTableLine').children('span').eq(1).children('span').text().toLowerCase();
        } else if ($(cfg.summary_div).children('.summaryTableLine').children('span').eq(1).children('b').length === 1) {
          sixtyMinuteData.moving_averages = $(cfg.summary_div).children('.summaryTableLine').children('span').eq(1).children('b').text().toLowerCase();
        }

        // Technical Indicators Info
        if ($(cfg.summary_div).children('.summaryTableLine').next().children('span').eq(1).children('span').length === 1) {
          sixtyMinuteData.technical_indicators = $(cfg.summary_div).children('.summaryTableLine').next().children('span').eq(1).children('span').text().toLowerCase();
        } else if ($(cfg.summary_div).children('.summaryTableLine').next().children('span').eq(1).children('b').length === 1) {
          sixtyMinuteData.technical_indicators = $(cfg.summary_div).children('.summaryTableLine').next().children('span').eq(1).children('b').text().toLowerCase();
        }

        sixtyMinuteData.value = parseFloat($('div #quotes_summary_current_data').children().children('.inlineblock').children('div').children('span').eq(0).text().replace(',', ''));

        // Use the model 'find' method to get a list of listings
        seng_60.find().sort('-created_on').limit(1).exec(function(err, seng3600) {
          if (err) {
            console.log(err);
          } else if (seng3600.length === 0) {
            sixtyMinuteData.is_started = true;
            sixtyMinuteData.signal_strength = 'change';
            sixtyMinuteData.last_change_type = 'neutral';

            var sengData = new seng_60(sixtyMinuteData);

            sixtyMinuteData.created_on = time;
            io.emit('sixty minute seng-report', sixtyMinuteData);

            // Try saving the new seng document
            sengData.save(function(err) {
              if (err) {
                console.log(err);
              } else {
                console.log('FIFTEEN MINUTE SENG DB 309');
              }
            });
          } else if (seng3600.length === 1) {
            var ms = moment.utc(moment(time).diff(moment(seng3600[0].created_on))).format("HH");
            if(ms <= 1 && ms >= 0){
              sixtyMinuteData.is_started = false;
            }else if(ms > 1){
              sixtyMinuteData.is_started = true;
            }
            var data = {
              new: sixtyMinuteData,
              old: seng3600[0]
            };

            commonFunctions.calculateChange(data, function(result) {
              sixtyMinuteData.change_flag = result.change_flag;
              sixtyMinuteData.change_type = result.change_type;
              sixtyMinuteData.change_value = result.change_value;
              sixtyMinuteData.signal_strength = result.signal_strength;
              sixtyMinuteData.last_change_type = result.last_change_type;

              var sengData = new seng_60(sixtyMinuteData);

              sixtyMinuteData.created_on = time;
              io.emit('sixty minute seng-report', sixtyMinuteData);

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

module.exports = sixty_minute;
