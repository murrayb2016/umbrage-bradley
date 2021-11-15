// require Express application framework
const express = require('express');
// require Handlebars templating engine for Express
const exphbs  = require('express-handlebars');

require('dotenv').config();

const cookieParser = require('cookie-parser');

const app = express();

//serving public file
app.use(express.static(__dirname));

//allow node to use cookies 
app.use(cookieParser());

//get body from request
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({
  extended: true
}));

/**bodyParser.json(options)
* Parses the text as JSON and exposes the resulting object on req.body.
*/
app.use(bodyParser.json());

//Set port for heroku
app.set('port', (process.env.PORT || 5000));

//serve static files
app.use(express.static(__dirname + '/public'));

// use Handlebars as templating engine instead of Express default one
app.engine('handlebars', exphbs({defaultLayout: 'base'}));
app.set('view engine', 'handlebars');

//Init router(s)
const peopleRouter = require('./routers/people');
app.use(peopleRouter);

//Start app on port
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
