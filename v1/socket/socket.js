var io = require("socket.io")();

var dax = require("./dax_operations");
var dow = require("./dow_operations");
var usfuture = require("./usfuture_operations");
var seng = require("./seng_operations");

io.on('connection', function(socket){
  //DAX DATA SOCKET
  socket.on('clear dax records', function () {
    dax.clear_dax_1();
    dax.clear_dax_5();
    dax.clear_dax_15();
  });

  //DOW DATA SOCKET
  socket.on('clear dow records', function () {
    dow.clear_dow_1();
    dow.clear_dow_5();
    dow.clear_dow_15();
  });

  //US-FUTURE DATA SOCKET
  socket.on('clear usfuture records', function () {
    usfuture.clear_usfuture_1();
    usfuture.clear_usfuture_5();
    usfuture.clear_usfuture_15();
  });

  //SENG DATA SOCKET
  socket.on('clear seng records', function () {
    seng.clear_seng_1();
    seng.clear_seng_5();
    seng.clear_seng_15();
  });


});
module.exports = io;
