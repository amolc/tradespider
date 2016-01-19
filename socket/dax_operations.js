var env = process.env.NODE_ENV || 'dev';
var cfg = require('../config/config.'+env);
var db = cfg.connection;

var dax = {
  dax_data: function (page, callback) {
    var query;
    if(page.page == "period60"){
      query = 'SELECT * FROM dax_1 ORDER BY id DESC';
    }else if(page.page == "period300"){
      query = 'SELECT * FROM dax_5 ORDER BY id DESC';
    }else if(page.page == "period900"){
      query = 'SELECT * FROM dax_15 ORDER BY id DESC';
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

  clear_dax_1: function (){
    var delete_query = 'SELECT * FROM dax_1 ORDER BY id DESC LIMIT 1';
    db.query(delete_query, function (err, rows) {
      if(err){
        // echo globally (all clients) that a person has connected
        console.log(err);
      }else {
        var query = 'DELETE FROM dax_1 WHERE id < '+ rows[0].id;
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

  clear_dax_5: function (){
    var delete_query = 'SELECT * FROM dax_5 ORDER BY id DESC LIMIT 1';
    db.query(delete_query, function (err, rows) {
      if(err){
        // echo globally (all clients) that a person has connected
        console.log(err);
      }else {
        var query = 'DELETE FROM dax_5 WHERE id < '+ rows[0].id;
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

  clear_dax_15: function (){
    var delete_query = 'SELECT * FROM dax_15 ORDER BY id DESC LIMIT 1';
    db.query(delete_query, function (err, rows) {
      if(err){
        // echo globally (all clients) that a person has connected
        console.log(err);
      }else {
        var query = 'DELETE FROM dax_15 WHERE id < '+ rows[0].id;
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

module.exports = dax;
