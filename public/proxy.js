var cors_proxy = require('cors-anywhere');

cors_proxy.createServer({
    originWhitelist: [], // Allow all origins
}).listen('8080', 'localhost', function() {
    console.log('Running CORS Anywhere on localhost:8080');
});
 