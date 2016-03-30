var notification = require('mongoose').model('notification');
var users = require('mongoose').model('users');
var commonFunctions = require('./functions');

exports.addDevice = function (req, res) {
	console.log('req.body',req.body);
	var deviceData = new notification(req.body);
	deviceData.save(function(err) {
	  if (err) {
	    console.log(err);
	  } else {
	    res.jsonp({'message': 'device added.'});
	  }
	});

 	
};

exports.register = function (req, res) {
	var userdata = new users(req.body);
	users.find({ user_email : req.body.user_email }).sort('-created_on').limit(1).exec(function (err, response) {
	    if(!err){
			if(response.length > 0){
				var response = {
		    		status : 0,
		    		message : "User already Registered."
		    	}
	   		res.jsonp(response);							
			}else{
				userdata.save(function(err) {
				  if (err) {
				    console.log(err);
				  } else {
					var response = {
						status : 1,
						message : "User Added successfully."
					}
					res.jsonp(response); 	
				  }
				})
			}
	    }else{
	    	var response = {
	    		status : 2,
	    		message : "somthing went wrong Please try again."
	    	}
	   		res.jsonp(response); 	
	    }
	})
}

exports.login = function (req, res) {
	var userdata = new users(req.body);
	users.find({ user_email : req.body.user_email, user_password : req.body.user_password }).exec(function (err, response) {
	    if(!err){
			if(response.length > 0){
				console.log('response_57', response);
				var deviceData = new notification(req.body);
				deviceData.save(function(err) {
					if (err) {
						console.log(err);
					} else {
						console.log('response_57', response);
						var resdata = {
							status : 1,
							userdata : response,
							message : "Login successfully."
						}
						res.jsonp(resdata); 	
					}
				});
			}else{
				var resdata = {
		    		status : 0,
		    		message : "User not found Or wrong details."
		    	}
		   		res.jsonp(resdata);		
			}
	    }else{
	    	var resdata = {
	    		status : 2,
	    		message : "somthing went wrong Please try again."
	    	}
	   		res.jsonp(resdata); 	
	    }
	})	
}