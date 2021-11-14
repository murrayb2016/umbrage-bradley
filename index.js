// require Express application framework
const express = require('express');
// require Handlebars templating engine for Express
const exphbs  = require('express-handlebars');

require('dotenv').config();

var sessions = require('express-session');
var cookieParser = require('cookie-parser');

const app = express();

let secretySecret = process.env.SECRET_ACCESS; 
// console.log(secretySecret)
const oneDay = 1000 * 60 * 60 * 24;
app.use(sessions({
    secret: secretySecret,
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false 
}));

//serving public file
app.use(express.static(__dirname));

app.use(cookieParser());

const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({
  extended: true
}));

/**bodyParser.json(options)
* Parses the text as JSON and exposes the resulting object on req.body.
*/
app.use(bodyParser.json());

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// use Handlebars as templating engine instead of Express default one
app.engine('handlebars', exphbs({defaultLayout: 'base'}));
app.set('view engine', 'handlebars');

const peopleRouter = require('./routers/people');
app.use(peopleRouter);

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
