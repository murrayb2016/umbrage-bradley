// require Express application framework
const express = require('express');
const router = express.Router();

const superagent = require('superagent');

// define the app routes

//Homepage for list of people
router.get('/', function(req, res) {
	console.log(req.cookies);
	res.render('pages/home');
});

router.get('/login', function(req, res) {
	res.render('pages/login');
});


module.exports = router; 