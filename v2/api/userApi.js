var mongojs = require('mongojs');
var db = mongojs('tradespider');
var jobCollection = db.collection("jobs");
var users = db.collection("users");
var notification =db.collection("notification")

var MongoClient = require('mongodb').MongoClient
    , assert = require('assert');

//   // Connection URL
// var url = 'mongodb://root:ferrari@localhost:27017/tradealert';

var Db = require('mongodb').Db,
  MongoClient = require('mongodb').MongoClient,
  Server = require('mongodb').Server,
  ReplSetServers = require('mongodb').ReplSetServers,
  ObjectID = require('mongodb').ObjectID,
  Binary = require('mongodb').Binary,
  GridStore = require('mongodb').GridStore,
  Grid = require('mongodb').Grid,
  Code = require('mongodb').Code,
  assert = require('assert');

var db = new Db('tradespider', new Server('localhost', 27017));
// Fetch a collection to insert document into



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
	users.find({ 'user_email' : req.body.user_email}, function (err, response) {
	    if(!err){
			if(response.length > 0){
				var response = {
		    		status : 0,
		    		message : "User already Registered."
		    	}
	   		res.jsonp(response);							
			}else{
				db.open(function(err, db) {
					users.insert(req.body, function(err, result){
						if(err){
							var response = {
								status : 0,
								message : "Error."
							}
							res.jsonp(response); 	
						}else{
							var response = {
								status : 1,
								message : "User Added successfully."
							}
							res.jsonp(response); 	
						}
					});

				});
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
	users.find({ 'user_email' : req.body.user_email, 'user_password' : req.body.user_password }, function (err, response) {
		    if(!err){
			if(response.length > 0){
				db.open(function(err, db) {
					notificationdata = {
						user_id  : response[0]._id,
						device   : req.body.device,
						token_id : req.body.token_id,
						platform : req.body.platform
					}
					notification.insert(notificationdata, function(err, result){
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
	users.find({ 'user_email' : req.body.facebook.email}, function (err, response) {
	    if( !err ){
			if( response.length > 0 ){
				if( response.length == 1 && response[0].isActive == true ){
					req.body.user_id = response[0]._id;
					add_device( req.body, function(resCall){
							if(resCall.status == 1){
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
				db.open(function(err, db) {
					users.insert(userdata, function(err, result){
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
					});
				});
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
		console.log('req_data_195', req_data);
		db.open(function(err, db) {
			notificationdata = {
				user_id  : req_data._id,
				device   : req_data.device,
				token_id : req_data.token_id,
				platform : req_data.platform
			}
			notification.insert(notificationdata, function(err, result){
				if (err) {
					var resCall = {
						status: 0,
						err : err
					}
					callback(res);
				} else {
					var resCall = {
						status: 1
					}
					callback(resCall); 	
				}
			});
		});
	}	
}

exports.googleLogin = function (req, res) {
	users.find({ 'user_email' : req.body.google.email}, function (err, response) {
	    if( !err ){
			if( response.length > 0 ){
				if( response.length == 1 && response[0].isActive == true ){
					req.body.user_id = response[0]._id;
					add_device( req.body, function(resCall){
							if(resCall.status == 1){
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
					user_email : req.body.google.email,
					first_name : req.body.google.given_name,
					last_name  : req.body.google.family_name,
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
				var resCall = {
					status: 0,
					err : err
				}
				callback(res);
			} else {
				var resCall = {
					status: 1
				}
				callback(resCall); 	
			}
		});
	}	
}