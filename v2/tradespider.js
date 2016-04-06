var express = require('express');
var app = express();
var http = require("http").createServer(app);
var bodyParser = require('body-parser');
var cron = require('cron');

app.use(bodyParser.json({limit: '50mb'}));
app.use('/', express.static(__dirname + '/public'));
app.use('/admin', express.static(__dirname + '/public/admin'));

  var dow = require('./workers/dow');
  var sp500 = require('./workers/sp500');
  var nasdaq = require('./workers/nasdaq');
  var dax = require('./workers/dax');
  var cac40 = require('./workers/cac40');
  var ftse100 = require('./workers/ftse100');
  var eurostox = require('./workers/eurostox');
  var ftsemib = require('./workers/ftsemib');
  var smi = require('./workers/smi');
  var ibex = require('./workers/ibex');
  var nikkei = require('./workers/nikkei');
  var hangseng = require('./workers/hangseng');
  var chinahshares = require('./workers/chinahshares');
  var csi = require('./workers/csi');
  var chinaa50 = require('./workers/chinaa50');
  var asx200 = require('./workers/asx200');
  var singmsci = require('./workers/singmsci');
  var nifty = require('./workers/nifty');
  var sensex = require('./workers/sensex');

  http.listen(5555);

  console.log("listening to port 5555");