var cron = require('cron');

var spiderData = require('./spiderData');
var trigger = require('./trigger');
var events = require('./events');

var dow = cron.job('0 * * * * *', function() {
  console.log('dow Cron Started');
  link = "http://www.investing.com/indices/us-30-futures";
  var market = "dow";
  spiderData.spider(link, market);

  trigger.calculateSignal(market, function (err, result) {
    console.log('dow_err_15', err);
    console.log("dow_result_16", result);
    
  });

  trigger.compareUserSignal();
  // events.androidPushEvent();
  // events.iosPushEvent();
});

dow.start();

module.exports = dow;