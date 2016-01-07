var request = require('request');
var cheerio = require('cheerio');
var cron = require('cron');

var one_minute = {
   url : 'http://www.investing.com/indices/germany-30-technical?period=60',
   headers:  {
       'User-Agent' : 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.153 Safari/537.36'
   }
};

var five_minute = {
    url : 'http://www.investing.com/indices/germany-30-technical?period=300',
    headers:  {
        'User-Agent' : 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.153 Safari/537.36'
    }
};

// One Minute Cron
var oneMinuteCron = cron.job('0 * * * * *', function(){
  request(one_minute, function (error, response, html) {
    if (!error && response.statusCode == 200) {
      console.log('----------- ONE MINUTE SUMMARY ----------');
      var $ = cheerio.load(html);
      var parsedResults = [];
      $('div #techStudiesInnerWrap').each(function(i, element){
        console.log($(this).children('.summary').text());

        if($(this).children('.summaryTableLine').children('span').eq(1).children('span').length === 1){
          console.log($(this).children('.summaryTableLine').children('span').eq(0).text() + ' ' + $(this).children('.summaryTableLine').children('span').eq(1).children('span').text());
        }else if($(this).children('.summaryTableLine').children('span').eq(1).children('b').length === 1){
          console.log($(this).children('.summaryTableLine').children('span').eq(0).text() + ' ' + $(this).children('.summaryTableLine').children('span').eq(1).children('b').text());
        }

        if($(this).children('.summaryTableLine').next().children('span').eq(1).children('span').length === 1){
          console.log($(this).children('.summaryTableLine').next().children('span').eq(0).text() + ' '+ $(this).children('.summaryTableLine').next().children('span').eq(1).children('span').text());
        }else if($(this).children('.summaryTableLine').next().children('span').eq(1).children('b').length === 1){
          console.log($(this).children('.summaryTableLine').next().children('span').eq(0).text() + ' '+ $(this).children('.summaryTableLine').next().children('span').eq(1).children('b').text());
        }

      });
    }
  });
});

// Five Minute Cron
var fiveMinuteCron = cron.job('0 */5 * * * *', function(){
  request(five_minute, function (error, response, html) {
    var stoday = new Date();
    console.log(stoday.getTime());
    if (!error && response.statusCode == 200) {
      console.log('----------- FIVE MINUTE SUMMARY ----------');
      var $ = cheerio.load(html);
      var parsedResults = [];
      $('div #techStudiesInnerWrap').each(function(i, element){
        console.log($(this).children('.summary').text());

        if($(this).children('.summaryTableLine').children('span').eq(1).children('span').length === 1){
          console.log($(this).children('.summaryTableLine').children('span').eq(0).text() + ' ' + $(this).children('.summaryTableLine').children('span').eq(1).children('span').text());
        }else if($(this).children('.summaryTableLine').children('span').eq(1).children('b').length === 1){
          console.log($(this).children('.summaryTableLine').children('span').eq(0).text() + ' ' + $(this).children('.summaryTableLine').children('span').eq(1).children('b').text());
        }

        if($(this).children('.summaryTableLine').next().children('span').eq(1).children('span').length === 1){
          console.log($(this).children('.summaryTableLine').next().children('span').eq(0).text() + ' '+ $(this).children('.summaryTableLine').next().children('span').eq(1).children('span').text());
        }else if($(this).children('.summaryTableLine').next().children('span').eq(1).children('b').length === 1){
          console.log($(this).children('.summaryTableLine').next().children('span').eq(0).text() + ' '+ $(this).children('.summaryTableLine').next().children('span').eq(1).children('b').text());
        }
      });
    }
  });
});

oneMinuteCron.start();
fiveMinuteCron.start();
