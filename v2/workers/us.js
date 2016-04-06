var cron = require('cron');

var spiderData = require('./spiderData');
var trigger = require('./trigger');
var events = require('./events');

var dow = cron.job('0 * * * * *', function() {
  console.log('Cron Started');
  // var link = "http://www.investing.com/indices/nq-100-futures";
  link = "http://www.investing.com/indices/us-30-futures";
  var market = "dow";
  spiderData.spider(link, market);

  trigger.calculateSignal(market, function (err, result) {
    console.log('err_15', err);
    console.log("result_16", result);
  });

  trigger.compareUserSignal();
  // events.androidPushEvent();
  // events.iosPushEvent();
});

dow.start();
