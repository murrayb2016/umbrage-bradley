// require Express application framework
var express = require('express');
var router = express.Router();

// require 'request' module that allows to make external HTTP requests
var request = require('request');

// define the app routes
router.get('/', function(req, res) {

	// request the data from third party API
	request(
    { 
    	method: 'GET',
    	uri: 'http://mysafeinfo.com/api/data?list=englishmonarchs&format=json'
   	},
  	function (error, resp, body) {
  		// if the response is an error, display the error page
      if (error) {
      	res.render('pages/error', { error: err });
    	}
    	// otherwise render the home page with the fetched data
    	else {
    		res.render('pages/home', { kings: JSON.parse(body) });
    	}
    }
  );
});

module.exports = router; 