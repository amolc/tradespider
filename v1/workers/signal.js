var Db = require('mongodb').Db,
  MongoClient = require('mongodb').MongoClient,
  Server = require('mongodb').Server,
  ReplSetServers = require('mongodb').ReplSetServers,
  ObjectID = require('mongodb').ObjectID,
  Binary = require('mongodb').Binary,
  GridStore = require('mongodb').GridStore,
  Grid = require('mongodb').Grid,
  Code = require('mongodb').Code,
  assert = require('assert'),
  builder = require('mongo-sql');

var db = new Db('tradespider', new Server('localhost', 27017));
// Fetch a collection to insert document into
db.open(function(err, db) {
  var collection = db.collection("hse");

  // We get the last 2 records in the market for %% time_period %%
  // We compare the same and then
  // if there is a change, we run a logic to select the diff.


  console.log(data);


});
