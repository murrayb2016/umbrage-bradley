// require Express application framework
var express = require('express');
// require Handlebars templating engine for Express
var exphbs  = require('express-handlebars');

var peopleRouter = require('./routers/people');

var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// use Handlebars as templating engine instead of Express default one
app.engine('handlebars', exphbs({defaultLayout: 'base'}));
app.set('view engine', 'handlebars');

app.use(peopleRouter);

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
