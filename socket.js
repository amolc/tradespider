var io = require("socket.io")();

var env = process.env.NODE_ENV || 'dev';
var cfg = require('./config/config.'+env);
var db = cfg.connection;

function dax(page, callback) {
  var query;
  if(page.page == "period60"){
    query = 'SELECT * FROM dax_1 ORDER BY id DESC';
  }else if(page.page == "period300"){
    query = 'SELECT * FROM dax_5 ORDER BY id DESC';
  }else if(page.page == "period1500"){
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
}

function dow(page, callback) {
  var query;
  if(page.page == "period60"){
    query = 'SELECT * FROM dow_1 ORDER BY id DESC';
  }else if(page.page == "period300"){
    query = 'SELECT * FROM dow_5 ORDER BY id DESC';
  }else if(page.page == "period1500"){
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
}

io.on('connection', function(socket){

  socket.on('get dax data', function (page) {
    dax(page, function (result) {
      socket.emit('dax data', {
        'dax': result,
      });
    });
  });

  socket.on('get dow data', function (page) {
    dow(page, function (result) {
      socket.emit('dow data', {
        'dow': result,
      });
    });
  });

});
module.exports = io;
