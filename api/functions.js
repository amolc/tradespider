var common_functions = {

  calculateChange: function (data, callback) {
    // var change_flag, change_by, change_type;
    var change = {};

    if (data.old.summary !== data.new.summary) {
      change.change_flag = true;

      if (data.old.summary == 'neutral') {

        if (data.new.summary == 'buy') {
          change.change_type = 'positive';
        } else if (data.new.summary == 'sell') {
          change.change_type = 'negative';
        } else if (data.new.summary == 'strong buy') {
          change.change_type = 'positive';
        } else if (data.new.summary == 'strong sell') {
          change.change_type = 'negative';
        }

      } else if (data.old.summary == 'sell') {

        if (data.new.summary == 'buy') {
          change.change_type = 'positive';
        } else if (data.new.summary == 'neutral') {
          change.change_type = 'positive';
        } else if (data.new.summary == 'strong buy') {
          change.change_type = 'positive';
        } else if (data.new.summary == 'strong sell') {
          change.change_type = 'negative';
        }

      } else if (data.old.summary == 'buy') {

        if (data.new.summary == 'neutral') {
          change.change_type = 'negative';
        } else if (data.new.summary == 'sell') {
          change.change_type = 'negative';
        } else if (data.new.summary == 'strong buy') {
          change.change_type = 'positive';
        } else if (data.new.summary == 'strong sell') {
          change.change_type = 'negative';
        }

      } else if (data.old.summary == 'strong sell') {

        if (data.new.summary == 'buy') {
          change.change_type = 'positive';
        } else if (data.new.summary == 'sell') {
          change.change_type = 'positive';
        } else if (data.new.summary == 'strong buy') {
          change.change_type = 'positive';
        } else if (data.new.summary == 'neutral') {
          change.change_type = 'positive';
        }

      } else if (data.old.summary == 'strong buy') {

        if (data.new.summary == 'buy') {
          change.change_type = 'negative';
        } else if (data.new.summary == 'sell') {
          change.change_type = 'negative';
        } else if (data.new.summary == 'neutral') {
          change.change_type = 'negative';
        } else if (data.new.summary == 'strong sell') {
          change.change_type = 'negative';
        }

      }
      change.change_value = data.new.value;
      change.signal_strength = 'change';
      change.last_change_type = change.change_type;

    } else {

      change.change_flag = false;
      change.change_type = 'neutral';
      change.change_value = data.old.change_value;
      change.last_change_type = data.old.last_change_type;

      if (data.old.last_change_type === 'positive') {
        if (data.new.value > change.change_value) change.signal_strength = 'correct';
        else if (data.new.value < change.change_value) change.signal_strength = 'wrong';
        else change.signal_strength = 'correct';
      } else if (data.old.last_change_type === 'negative') {
        if (data.new.value < change.change_value) change.signal_strength = 'correct';
        else if (data.new.value > change.change_value) change.signal_strength = 'wrong';
        else change.signal_strength = 'correct';
      }

    }

    callback(change);

  },

  // Create a new error handling controller method
  getErrorMessage: function(err) {
  	if (err.errors) {
  		for (var errName in err.errors) {
  			if (err.errors[errName].message) return err.errors[errName].message;
  		}
  	} else {
  		return 'Unknown server error';
  	}
  }

};

module.exports = common_functions;
