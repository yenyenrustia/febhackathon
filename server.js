  var express         = require('express');
  var app             = express();
  var bodyParser      = require('body-parser');
 var fs               = require('fs');
 var http             = require('http');
 var sox              = require('sox');

app.use(express.static('www'));
  app.use(bodyParser.json());
  app.use( bodyParser.urlencoded({ extended: true }));

// CORS (Cross-Origin Resource Sharing) headers to support Cross-site HTTP requests
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
        res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.set('port', process.env.PORT || 5000);
app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});