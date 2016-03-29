// Invoke 'strict' JavaScript mode
'use strict';

// Load the module dependencies
var mongoose = require('mongoose');
var notificationschema = mongoose.Schema;

// create a schema
var notificationTableSchema = new notificationschema({
  token_id : String,
  device : String,
  platform : String,
  user_id : Number
});
  console.log('notificationTableSchema', notificationTableSchema);
// Create the 'notification' model out of the 'tableSchema'
mongoose.model('notification', notificationTableSchema);