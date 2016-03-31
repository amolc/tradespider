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
	req.body.isActive = 1;
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
				userdata.save(function(err, result) {
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
				req.body.user_id = response[0]._id;
				console.log('req.body with userid', req.body);
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

exports.facebookLogin = function (req, res) {
	users.find({ user_email : req.body.facebook.email}).exec(function (err, response) {
	    if( !err ){
			if( response.length > 0 ){
				if( response.length == 1 && response[0].isActive == true ){
					req.body.user_id = response[0]._id;
					add_device( req.body, function(res){
							if(res.status == 1){
								var resdata = {
									status : 1,
									userdata : response[0],
									message : "Login successfully."
								}
								res.jsonp(resdata); 
							}else{
								var resdata = {
									status : 0,
									message : "somthing went wrong."
								}
								res.jsonp(resdata);
							}
						});
				}else if(response.length == 1 && response[0].isActive == false){
					var resdata = {
		    			status : 0,
		    			message : "User Not Verified."
		    		}
		   			res.jsonp(resdata);			
				}
			}else if(response.length == 0){
				var userdata = {
					user_email : req.body.facebook.email,
					first_name : req.body.facebook.first_name,
					last_name  : req.body.facebook.last_name,
					isActive   : 1,
				}
				var fbdata = new users(userdata);
				fbdata.save(function(err, result) {
					if (err) {
						console.log(err);
					} else {
						req.body.user_id = result._id;
						add_device( req.body, function(response){
							if(response.status == 1){
								var resdata = {
									status : 1,
									userdata : result,
									message : "User added."
								}
								res.jsonp(resdata);
							}else{
								var resdata = {
									status : 0,
									message : "somthing went wrong."
								}
								res.jsonp(resdata);
							}
						});
					}
				})
			}
	    }else{
	    	var resdata = {
	    		status : 2,
	    		message : "somthing went wrong Please try again."
	    	}
	   		res.jsonp(resdata); 	
	    }
	})	
	
	function add_device (req_data, callback) {
		var deviceData = new notification(req_data);
		deviceData.save(function(err) {
			if (err) {
				var res = {
					status: 0,
					err : err
				}
				callback(res);
			} else {
				var res = {
					status: 1
				}
				callback(res); 	
			}
		});
	}	
}