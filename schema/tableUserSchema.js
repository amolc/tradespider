// Invoke 'strict' JavaScript mode
'use strict';

// Load the module dependencies
var mongoose = require('mongoose');
var userLogin = mongoose.Schema;

// create a users schema
var userLoginSchema = new userLogin({
	user_email : String,
	user_password : String,
	user_profileimage : String,	
	first_name : String,
	last_name : String,
	created_on : {
		type : Date,
		// Create a default 'created' value
		default : Date.now
	}
});
  
// Create the 'users' model out of the 'userLoginSchema'
mongoose.model('users', userLoginSchema);