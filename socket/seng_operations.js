var env = process.env.NODE_ENV || 'dev';
var cfg = require('../config/config.'+env);
var db = cfg.connection;

var seng = {

  clear_seng_1: function (){
    var delete_query = 'SELECT * FROM seng_1 ORDER BY id DESC LIMIT 1';
    db.query(delete_query, function (err, rows) {
      if(err){
        // echo globally (all clients) that a person has connected
        console.log(err);
      }else {
        var query = 'DELETE FROM seng_1 WHERE id < '+ rows[0].id;
        db.query(query, function(err, results) {
          if(err){
            // echo globally (all clients) that a person has connected
            console.log(err);
          }else {
            // echo globally (all clients) that a person has connected
            console.log(results);
          }
        });
      }
    });
  },

  clear_seng_5: function (){
    var delete_query = 'SELECT * FROM seng_5 ORDER BY id DESC LIMIT 1';
    db.query(delete_query, function (err, rows) {
      if(err){
        // echo globally (all clients) that a person has connected
        console.log(err);
      }else {
        var query = 'DELETE FROM seng_5 WHERE id < '+ rows[0].id;
        db.query(query, function(err, results) {
          if(err){
            // echo globally (all clients) that a person has connected
            console.log(err);
          }else {
            // echo globally (all clients) that a person has connected
            console.log(results);
          }
        });
      }
    });
  },

  clear_seng_15: function (){
    var delete_query = 'SELECT * FROM seng_15 ORDER BY id DESC LIMIT 1';
    db.query(delete_query, function (err, rows) {
      if(err){
        // echo globally (all clients) that a person has connected
        console.log(err);
      }else {
        var query = 'DELETE FROM seng_15 WHERE id < '+ rows[0].id;
        db.query(query, function(err, results) {
          if(err){
            // echo globally (all clients) that a person has connected
            console.log(err);
          }else {
            // echo globally (all clients) that a person has connected
            console.log(results);
          }
        });
      }
    });
  },
};

module.exports = seng;
