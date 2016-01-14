var env = process.env.NODE_ENV || 'dev';
var cfg = require('../config/config.'+env);
var db = cfg.connection;

var usfuture = {
  usfuture_data: function (page, callback) {
    var query;
    if(page.page == "period60"){
      query = 'SELECT * FROM usfuture_1 ORDER BY id DESC';
    }else if(page.page == "period300"){
      query = 'SELECT * FROM usfuture_5 ORDER BY id DESC';
    }else if(page.page == "period900"){
      query = 'SELECT * FROM usfuture_15 ORDER BY id DESC';
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

  clear_usfuture_1: function (){
    var query = 'TRUNCATE TABLE usfuture_1';
    db.query(query, function(err, results) {
      if(err){
        // echo globally (all clients) that a person has connected
        console.log(err);
      }else {
        // echo globally (all clients) that a person has connected
        console.log(results);
      }
    });
  },

  clear_usfuture_5: function (){
    var query = 'TRUNCATE TABLE usfuture_5';
    db.query(query, function(err, results) {
      if(err){
        // echo globally (all clients) that a person has connected
        console.log(err);
      }else {
        // echo globally (all clients) that a person has connected
        console.log(results);
      }
    });
  },

  clear_usfuture_15: function (){
    var query = 'TRUNCATE TABLE usfuture_15';
    db.query(query, function(err, results) {
      if(err){
        // echo globally (all clients) that a person has connected
        console.log(err);
      }else {
        // echo globally (all clients) that a person has connected
        console.log(results);
      }
    });
  },
};

module.exports = usfuture;
