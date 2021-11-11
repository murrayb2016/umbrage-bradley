// require Express application framework
const express = require('express');
const router = express.Router();

// require 'request' module that allows to make external HTTP requests
const request =  require('superagent');

// define the app routes

//Homepage for list of people
router.get('/', function(req, res) {
	res.render('pages/home');
});

router.get('/login', function(req, res) {
	res.render('pages/login');
});

router.post('/login', async (req, res) => {
	console.log(req.body)
	let token = await request.get('https://umbrage-interview-api.herokuapp.com/login').query({username: req.body.email, password: req.body.password});
	console.log(token)
	res.render('pages/home');
});

module.exports = router; 