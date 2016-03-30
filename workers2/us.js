var cron = require('cron');

var spiderData = require('./spiderData');
var trigger = require('./trigger');
var events = require('./events');

var usFuture = cron.job('0 * * * * *', function() {
  var link = "http://www.investing.com/indices/nq-100-futures";
  var market = "usFuture";
  spiderData.spider(link, market);

  trigger.calculateSignal(market, function (err, result) {
    console.log(err);
    console.log(result);
  });

  trigger.compareUserSignal();
  events.androidPushEvent();
  events.iosPushEvent();
});

usFuture.start();
