var mongoose = require('mongoose');

// var url = 'mongodb://trade:3cXWOqeaf@localhost:27017/tradespider';

// mongoose.connect(url);

var opt = {
        user: 'trade',
        pass: '3cxWOqeaf',
        auth: {
            authdb: 'tradespider'
        }
    };

mongoose.createConnection('localhost', 'tradespider', 27017, opt);


require('../schema/table.schema');
require('../schema/tableNotificationSchema');

var config = module.exports = {};

config.env = 'dev';
config.port = 5555;

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
    url : 'http://www.investing.com/indices/us-30-technical?period=900',
    headers:  {
        'User-Agent' : 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.153 Safari/537.36'
    }
};

config.sixty_minute_dow = {
    url : 'http://www.investing.com/indices/us-30-technical?period=3600',
    headers:  {
        'User-Agent' : 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.153 Safari/537.36'
    }
};

config.threehundred_minute_dow = {
    url : 'http://www.investing.com/indices/us-30-technical?period=18000',
    headers:  {
        'User-Agent' : 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.153 Safari/537.36'
    }
};

config.daily_dow = {
    url : 'http://www.investing.com/indices/us-30-technical?period=86400',
    headers:  {
        'User-Agent' : 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.153 Safari/537.36'
    }
};

// US FUTURES LINK
config.one_minute_usfuture = {
   url : 'http://www.investing.com/indices/us-30-futures-technical?period=60',
   headers:  {
       'User-Agent' : 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.153 Safari/537.36'
   }
};

config.five_minute_usfuture = {
    url : 'http://www.investing.com/indices/us-30-futures-technical?period=300',
    headers:  {
        'User-Agent' : 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.153 Safari/537.36'
    }
};

config.fifteen_minute_usfuture = {
    url : 'http://www.investing.com/indices/us-30-futures-technical?period=900',
    headers:  {
        'User-Agent' : 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.153 Safari/537.36'
    }
};

config.sixty_minute_usfuture = {
    url : 'http://www.investing.com/indices/us-30-futures-technical?period=3600',
    headers:  {
        'User-Agent' : 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.153 Safari/537.36'
    }
};

config.threehundred_minute_usfuture = {
    url : 'http://www.investing.com/indices/us-30-futures-technical?period=18000',
    headers:  {
        'User-Agent' : 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.153 Safari/537.36'
    }
};

config.daily_usfuture = {
    url : 'http://www.investing.com/indices/us-30-futures-technical?period=86400',
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
    url : 'http://www.investing.com/indices/germany-30-technical?period=900',
    headers:  {
        'User-Agent' : 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.153 Safari/537.36'
    }
};

config.sixty_minute_dax = {
    url : 'http://www.investing.com/indices/germany-30-technical?period=3600',
    headers:  {
        'User-Agent' : 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.153 Safari/537.36'
    }
};

config.threehundred_minute_dax = {
    url : 'http://www.investing.com/indices/germany-30-technical?period=18000',
    headers:  {
        'User-Agent' : 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.153 Safari/537.36'
    }
};

config.daily_dax = {
    url : 'http://www.investing.com/indices/germany-30-technical?period=86400',
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
    url : 'http://www.investing.com/indices/hang-sen-40-technical?period=900',
    headers:  {
        'User-Agent' : 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.153 Safari/537.36'
    }
};

config.sixty_minute_seng = {
    url : 'http://www.investing.com/indices/hang-sen-40-technical?period=3600',
    headers:  {
        'User-Agent' : 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.153 Safari/537.36'
    }
};

config.threehundred_minute_seng = {
    url : 'http://www.investing.com/indices/hang-sen-40-technical?period=18000',
    headers:  {
        'User-Agent' : 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.153 Safari/537.36'
    }
};

config.daily_seng = {
    url : 'http://www.investing.com/indices/hang-sen-40-technical?period=86400',
    headers:  {
        'User-Agent' : 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.153 Safari/537.36'
    }
};
