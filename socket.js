var io = require("socket.io")();
var mysql = require('mysql');

var dbConnection = mysql.createConnection({
  database : 'tradespider',
  user : 'ftdev',
  password : '10gXWOqeaf',
  host :'apps.fountaintechies.com',
  multipleStatements: true
});

io.on('connection', function(socket){

  // when the client emits 'add user', this listens and executes
  socket.on('add user', function (user_data) {
    console.log('New user Connected');
    console.log(user_data);

    dbConnection.query('SELECT * FROM dax_1 ORDER BY id DESC; SELECT * FROM dax_5 ORDER BY id DESC', function(err, results) {
      if(err){
        // echo globally (all clients) that a person has connected
        socket.emit('error', {
          usernames: user_list
        });
      }else {
        // echo globally (all clients) that a person has connected
        socket.emit('dax data', {
          'dax_1': results[0],
          'dax_5': results[1]
        });
      }
    });
  });

});
module.exports = io;
