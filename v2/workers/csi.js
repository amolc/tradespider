var cron = require('cron');

var spiderData = require('./spiderData');
var trigger = require('./trigger');
var events = require('./events');

var csi = cron.job('0 * * * * *', function() {
  console.log('Cron Started');
  var link = "http://www.investing.com/indices/csi-300-futures";
  var market = "csi";
  spiderData.spider(link, market);

  trigger.calculateSignal(market, function (err, result) {
    console.log('err_15', err);
    console.log("result_16", result);
    
  });

  trigger.compareUserSignal();
  // events.androidPushEvent();
  // events.iosPushEvent();
});

csi.start();

module.exports = csi;