var Db = require('mongodb').Db,
  MongoClient = require('mongodb').MongoClient,
  Server = require('mongodb').Server,
  ReplSetServers = require('mongodb').ReplSetServers,
  ObjectID = require('mongodb').ObjectID,
  Binary = require('mongodb').Binary,
  GridStore = require('mongodb').GridStore,
  Grid = require('mongodb').Grid,
  Code = require('mongodb').Code,
  assert = require('assert');

var db = new Db('tradespider', new Server('localhost', 27017));
// Fetch a collection to insert document into
db.open(function(err, db) {
  var collection = db.collection("abcd");
  // Insert a single document
  collection.insert({
    hello: 'world_no_safe'
  });


});
