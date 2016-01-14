var io = require("socket.io")();

var dax = require("./dax_operations");
var dow = require("./dow_operations");
var usfuture = require("./usfuture_operations");
var seng = require("./seng_operations");

io.on('connection', function(socket){
  //DAX DATA SOCKET
  socket.on('get dax data', function (page) {
    dax.dax_data(page, function (result) {
      socket.emit('dax data', {
        'dax': result,
      });
    });
  });

  socket.on('clear dax records', function () {
    dax.clear_dax_1();
    dax.clear_dax_5();
    dax.clear_dax_15();
  });

  //DOW DATA SOCKET
  socket.on('get dow data', function (page) {
    dow.dow_data(page, function (result) {
      socket.emit('dow data', {
        'dow': result,
      });
    });
  });

  socket.on('clear dow records', function () {
    dow.clear_dow_1();
    dow.clear_dow_5();
    dow.clear_dow_15();
  });

  //US-FUTURE DATA SOCKET
  socket.on('get usfuture data', function (page) {
    usfuture.usfuture_data(page, function (result) {
      socket.emit('usfuture data', {
        'usfuture': result,
      });
    });
  });

  socket.on('clear usfuture records', function () {
    usfuture.clear_usfuture_1();
    usfuture.clear_usfuture_5();
    usfuture.clear_usfuture_15();
  });

  //SENG DATA SOCKET
  socket.on('get seng data', function (page) {
    seng.seng_data(page, function (result) {
      socket.emit('seng data', {
        'seng': result,
      });
    });
  });

  socket.on('clear seng records', function () {
    seng.clear_seng_1();
    seng.clear_seng_5();
    seng.clear_seng_15();
  });


});
module.exports = io;
