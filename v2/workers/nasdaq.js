var cron = require('cron');

var spiderData = require('./spiderData');
var trigger = require('./trigger');
var events = require('./events');

var nasdaq = cron.job('0 * * * * *', function() {
  console.log('Cron Started');
  var link = "http://www.investing.com/indices/nq-100-futures";
  var market = "nasdaq";
  spiderData.spider(link, market);

  trigger.calculateSignal(market, function (err, result) {
    console.log('err_15', err);
    console.log("result_16", result);
    
  });

  trigger.compareUserSignal();
  // events.androidPushEvent();
  // events.iosPushEvent();
});

nasdaq.start();

module.exports = nasdaq;