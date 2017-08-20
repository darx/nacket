const http = require('http');
const https = require('https');
const cheerio = require('cheerio');

var getWebsiteSynopsis = function(url, callback) {
    const protocol = (url.split(/(^\w+:|^)\/\//)[1] == 'https:' ? https : http);

    protocol.get(url, function(response) {
        var siteBody;
        
        response.on('data', function(data) {
            siteBody += data;
        });
        
        response.on('end', function() {
            const doc = cheerio.load(siteBody),
                  processData = {
                      title: doc('title').text(),
                      description: doc('[name="description"]').attr('content'),
                      image: doc('[property="og:image"]').attr('content')
                  };
            
            callback(processData);
        });
        
        response.on('error', function(error) {
            callback("Got error: " + error.message);
        });
    });
};

exports.handler = (event, context, callback) => {
    getWebsiteSynopsis(event.params.querystring.url, function(response) {
         callback(null, response);
    });
};