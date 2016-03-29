// Invoke 'strict' JavaScript mode
'use strict';

// Load the module dependencies
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var tableSchema = new Schema({
  is_started: Boolean,
  summary: String,
  moving_averages: String,
  technical_indicators: String,
  value: Number,
  change_value: Number,
  last_change_type: String,
  signal_strength: String,
  change_by: Number,
  change_flag: Boolean,
  change_type: String,
  created_on: {
		type: Date,
		// Create a default 'created' value
		default: Date.now
	}
});

console.log(tableSchema);  
// Create the 'dax_1' model out of the 'tableSchema'
mongoose.model('dax_1', tableSchema);
// Create the 'dax_5' model out of the 'tableSchema'
mongoose.model('dax_5', tableSchema);
// Create the 'dax_15' model out of the 'tableSchema'
mongoose.model('dax_15', tableSchema);
// Create the 'dax_60' model out of the 'tableSchema'
mongoose.model('dax_60', tableSchema);
// Create the 'dax_300' model out of the 'tableSchema'
mongoose.model('dax_300', tableSchema);
// Create the 'dax_1440' model out of the 'tableSchema'
mongoose.model('dax_1440', tableSchema);

// Create the 'dow_1' model out of the 'tableSchema'
mongoose.model('dow_1', tableSchema);
// Create the 'dow_5' model out of the 'tableSchema'
mongoose.model('dow_5', tableSchema);
// Create the 'dow_15' model out of the 'tableSchema'
mongoose.model('dow_15', tableSchema);
// Create the 'dow_60' model out of the 'tableSchema'
mongoose.model('dow_60', tableSchema);
// Create the 'dow_300' model out of the 'tableSchema'
mongoose.model('dow_300', tableSchema);
// Create the 'dow_1440' model out of the 'tableSchema'
mongoose.model('dow_1440', tableSchema);

// Create the 'seng_1' model out of the 'tableSchema'
mongoose.model('seng_1', tableSchema);
// Create the 'seng_5' model out of the 'tableSchema'
mongoose.model('seng_5', tableSchema);
// Create the 'seng_15' model out of the 'tableSchema'
mongoose.model('seng_15', tableSchema);
// Create the 'seng_60' model out of the 'tableSchema'
mongoose.model('seng_60', tableSchema);
// Create the 'seng_300' model out of the 'tableSchema'
mongoose.model('seng_300', tableSchema);
// Create the 'seng_1440' model out of the 'tableSchema'
mongoose.model('seng_1440', tableSchema);

// Create the 'usfuture_1' model out of the 'tableSchema'
mongoose.model('usfuture_1', tableSchema);
// Create the 'usfuture_5' model out of the 'tableSchema'
mongoose.model('usfuture_5', tableSchema);
// Create the 'usfuture_15' model out of the 'tableSchema'
mongoose.model('usfuture_15', tableSchema);
// Create the 'usfuture_60' model out of the 'tableSchema'
mongoose.model('usfuture_60', tableSchema);
// Create the 'usfuture_300' model out of the 'tableSchema'
mongoose.model('usfuture_300', tableSchema);
// Create the 'usfuture_1440' model out of the 'tableSchema'
mongoose.model('usfuture_1440', tableSchema);
