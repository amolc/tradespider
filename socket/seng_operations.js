var env = process.env.NODE_ENV || 'dev';
var cfg = require('../config/config.'+env);
var db = cfg.connection;

var seng = {
  seng_data: function (page, callback) {
    var query;
    if(page.page == "period60"){
      query = 'SELECT * FROM seng_1 ORDER BY id DESC';
    }else if(page.page == "period300"){
      query = 'SELECT * FROM seng_5 ORDER BY id DESC';
    }else if(page.page == "period900"){
      query = 'SELECT * FROM seng_15 ORDER BY id DESC';
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

  clear_seng_1: function (){
    var query = 'TRUNCATE TABLE seng_1';
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

  clear_seng_5: function (){
    var query = 'TRUNCATE TABLE seng_5';
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

  clear_seng_15: function (){
    var query = 'TRUNCATE TABLE seng_15';
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

module.exports = seng;
