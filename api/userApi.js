var notification = require('mongoose').model('notification');
var commonFunctions = require('./functions');
exports.addDevice = function (req, res) {
 	console.log("addDevice");
 	res.jsonp({'device': 'done'});
};