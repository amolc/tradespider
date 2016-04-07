var express = require('express');
var app = express();
var http = require("http").createServer(app);
var bodyParser = require('body-parser');
var cron = require('cron');

app.use(bodyParser.json({limit: '50mb'}));
app.use('/', express.static(__dirname + '/public'));
app.use('/admin', express.static(__dirname + '/public/admin'));

  var dow = require('./workers/dow'),
   sp500 = require('./workers/sp500'),
   nasdaq = require('./workers/nasdaq'),
   dax = require('./workers/dax'),
   cac40 = require('./workers/cac40'),
   ftse100 = require('./workers/ftse100'),
   eurostox = require('./workers/eurostox'),
   ftsemib = require('./workers/ftsemib'),
   smi = require('./workers/smi'),
   ibex = require('./workers/ibex'),
   nikkei = require('./workers/nikkei'),
   hangseng = require('./workers/hangseng'),
   chinahshares = require('./workers/chinahshares'),
   csi = require('./workers/csi'),
   chinaa50 = require('./workers/chinaa50'),
   asx200 = require('./workers/asx200'),
   singmsci = require('./workers/singmsci'),
   nifty = require('./workers/nifty'),
   sensex = require('./workers/sensex');

var user = require('./api/userApi');

app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, authorization");
  next();
});

app.post('/user/addDevice', user.addDevice);
app.post('/user/register', user.register);
app.post('/user/login', user.login);
app.post('/user/facebookLogin', user.facebookLogin);
app.post('/user/googleLogin', user.googleLogin);

http.listen(5555);
console.log("listening to port 5555");