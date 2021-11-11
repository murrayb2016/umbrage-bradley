// require Express application framework
const express = require('express');
const router = express.Router();

const loginPost = require('../services/api'); 

// define the app routes

//Homepage for list of people
router.get('/', function(req, res) {
	res.render('pages/home');
});

router.get('/login', function(req, res) {
	res.render('pages/login');
});

router.post('/login', async function(req, res) {
	console.log(req.body)
	let token = await loginPost();
	console.log(token)
	res.render('pages/home');
});

module.exports = router; 