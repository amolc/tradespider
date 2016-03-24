var apn = require('apn');

//var token ="eJ8yGhFtuqA:APA91bHH3TNSoS-aLKlibv7wUkkBg6pF92FaB_bo9XexZkZCE9E9a32ePpytHZkfsnYG_IxoB98oenMy9V5-qNdjHXrh1BH4uOsNrQnZvzxh-14u9cwfIEOt5xxMrGyW20m2zf-M8pwq";
var token = "c059fcc9248053395574459ed031817802a477ccc08eef7b541fe26969a3bcdf";

var device = new apn.Device(token);

var notification = new apn.Notification();
notification.expiry = Math.floor(Date.now() / 1000) + 3600;
notification.badge = Number(1) || 0;
notification.alert = "This is a Push Testing";
notification.payload = {'prop': 'special value'};
notification.device = device;

var callback = function(errorNum, notification){
      console.log('Error is: %s', errorNum);
      console.log("Note =" );
      console.log( notification );
  };

  var options = {
 gateway: 'gateway.sandbox.push.apple.com',
 cert: '../assets/tradealertCert.pem',
 key:  '../assets/tradealertKey.pem',
 passphrase: 'ferrari1234',
 errorCallback: callback,
 port: 2195,
	enhanced: true,
	cacheLength: 100
}
var apnsConnection = new apn.Connection(options);
apnsConnection.pushNotification(notification, device);
