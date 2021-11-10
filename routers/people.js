// require Express application framework
var express = require('express');
var router = express.Router();

// require 'request' module that allows to make external HTTP requests
var request = require('request');

// define the app routes
router.get('/', function(req, res) {
	res.render('pages/home');
});

module.exports = router; 