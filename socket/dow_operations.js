var env = process.env.NODE_ENV || 'dev';
var cfg = require('../config/config.'+env);
var db = cfg.connection;

var dow = {
  dow_data: function (page, callback) {
    var query;
    if(page.page == "period60"){
      query = 'SELECT * FROM dow_1 ORDER BY id DESC';
    }else if(page.page == "period300"){
      query = 'SELECT * FROM dow_5 ORDER BY id DESC';
    }else if(page.page == "period900"){
      query = 'SELECT * FROM dow_15 ORDER BY id DESC';
    }
    db.query(query, function(err, results) {
      if(err){
        // echo globally (all clients) that a person has connected
        console.log(err);
      }else {
        // echo globally (all clients) that a person has connected
        callback(results);
      }
    });
  },

  clear_dow_1: function (){
    var delete_query = 'SELECT * FROM dow_1 ORDER BY id DESC LIMIT 1';
    db.query(delete_query, function (err, rows) {
      if(err){
        // echo globally (all clients) that a person has connected
        console.log(err);
      }else {
        var query = 'DELETE FROM dow_1 WHERE id < '+ rows[0].id;
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

  clear_dow_5: function (){
    var delete_query = 'SELECT * FROM dow_5 ORDER BY id DESC LIMIT 1';
    db.query(delete_query, function (err, rows) {
      if(err){
        // echo globally (all clients) that a person has connected
        console.log(err);
      }else {
        var query = 'DELETE FROM dow_5 WHERE id < '+ rows[0].id;
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

  clear_dow_15: function (){
    var delete_query = 'SELECT * FROM dow_15 ORDER BY id DESC LIMIT 1';
    db.query(delete_query, function (err, rows) {
      if(err){
        // echo globally (all clients) that a person has connected
        console.log(err);
      }else {
        var query = 'DELETE FROM dow_15 WHERE id < '+ rows[0].id;
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

module.exports = dow;
