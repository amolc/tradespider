var cheerio = require('cheerio');
var request = require('request');

var builder = require('mongo-sql');
var MongoClient = require('mongodb').MongoClient
    , assert = require('assert');

  // Connection URL
var url = 'mongodb://root:ferrari@localhost:27017/tradealert';

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



var spiderData =  {

spider: function(link,market,err,callback) {

var metadata= '';

var time = Math.round(+new Date()/1000);
var URL = {
   url : link ,
   headers:  {
       'User-Agent' : 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.153 Safari/537.36'
   }
};

  request(URL, function (error, response, html) {
  if (!error && response.statusCode == 200) {

    var $ = cheerio.load(html);

    var five = $('table.technicalSummaryTbl tbody tr:nth-child(3)').children().eq(1).html();
    var fifteen = $('table.technicalSummaryTbl tbody tr:nth-child(3)').children().eq(2).html();
    var hour = $('table.technicalSummaryTbl tbody tr:nth-child(3)').children().eq(3).html();
    var daily = $('table.technicalSummaryTbl tbody tr:nth-child(3)').children().eq(4).html();
    var monthly = $('table.technicalSummaryTbl tbody tr:nth-child(3)').children().eq(5).html();

    var presentvalue = $('#last_last').text();
    var change = $('#last_last').next().text();
    var changeper = $('#last_last').next().next().next().text();

    var previousclose = $('div.overviewDataTable').children().eq(0).children().eq(1).html();
    var volume = $('div.overviewDataTable').children().eq(1).children().eq(1).html();
    var dayrange = $('div.overviewDataTable').children().eq(2).children().eq(1).html();
    var open = $('div.overviewDataTable').children().eq(3).children().eq(1).html();
    var avgvolume = $('div.overviewDataTable').children().eq(4).children().eq(1).html();
    var fiftytwoweek = $('div.overviewDataTable').children().eq(5).children().eq(1).html();
    var oneyearreturn = $('div.overviewDataTable').children().eq(6).children().eq(1).html();

    metadata = {
              _id : time,
              time : time,
              presentvalue : presentvalue,
              change : change,
              changeper : changeper,
              previousclose : previousclose,
              volume : volume,
              dayrange : dayrange,
              open : open,
              avgvolume : avgvolume,
              fiftytwoweek : fiftytwoweek,
              oneyearreturn : oneyearreturn,
              five : five,
              fifteen : fifteen,
              hour : hour,
              daily : daily,
              monthly : monthly
              };

              db.open(function(err, db) {
                var collection = db.collection(market);
                // Insert a single document
                collection.insert(metadata);


              });

              // console.log(metadata);


    }


  });


   }
  };

  module.exports = spiderData;
