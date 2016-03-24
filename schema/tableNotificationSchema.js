// Invoke 'strict' JavaScript mode
'use strict';

// Load the module dependencies
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var tableSchema = new Schema({
  token_id : String,
  device : String,
  platform : String,
  user_id : Number,
  created_on: {
		type: Date,
		default: Date.now
	}
});

// Create the 'notification' model out of the 'tableSchema'
mongoose.model('notification', tableSchema);