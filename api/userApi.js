var notification = require('mongoose').model('notification');
var commonFunctions = require('./functions');
exports.addDevice = function (req, res) {
	
	var deviceData = new notification(req.body);

	deviceData.save(function(err) {
	  if (err) {
	    console.log(err);
	  } else {
	    res.jsonp({'message': 'device added.'});
	  }
	});

 	
};