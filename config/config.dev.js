var mysql = require('mysql');
var config = module.exports = {};
var request = require('request');
var cheerio = require('cheerio');

config.env = 'dev';
config.port = 5555;

config.connection = mysql.createPool({
  database : 'tradespider',
  user : 'ftdev',
  password : '10gXWOqeaf',
  host :'apps.fountaintechies.com',
});

config.summary_div = 'div #techStudiesInnerWrap';

// DOW LINK
config.one_minute_dow = {
   url : 'http://www.investing.com/indices/us-30-technical?period=60',
   headers:  {
       'User-Agent' : 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.153 Safari/537.36'
   }
};

config.five_minute_dow = {
    url : 'http://www.investing.com/indices/us-30-technical?period=300',
    headers:  {
        'User-Agent' : 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.153 Safari/537.36'
    }
};

config.fifteen_minute_dow = {
    url : 'http://www.investing.com/indices/us-30-technical?period=1500',
    headers:  {
        'User-Agent' : 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.153 Safari/537.36'
    }
};

// DAX LINK
config.one_minute_dax = {
   url : 'http://www.investing.com/indices/germany-30-technical?period=60',
   headers:  {
       'User-Agent' : 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.153 Safari/537.36'
   }
};

config.five_minute_dax = {
    url : 'http://www.investing.com/indices/germany-30-technical?period=300',
    headers:  {
        'User-Agent' : 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.153 Safari/537.36'
    }
};

config.fifteen_minute_dax = {
    url : 'http://www.investing.com/indices/germany-30-technical?period=1500',
    headers:  {
        'User-Agent' : 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.153 Safari/537.36'
    }
};

// SENG LINK
config.one_minute_seng = {
   url : 'http://www.investing.com/indices/hang-sen-40-technical?period=60',
   headers:  {
       'User-Agent' : 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.153 Safari/537.36'
   }
};

config.five_minute_seng = {
    url : 'http://www.investing.com/indices/hang-sen-40-technical?period=300',
    headers:  {
        'User-Agent' : 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.153 Safari/537.36'
    }
};

config.fifteen_minute_seng = {
    url : 'http://www.investing.com/indices/hang-sen-40-technical?period=1500',
    headers:  {
        'User-Agent' : 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.153 Safari/537.36'
    }
};
