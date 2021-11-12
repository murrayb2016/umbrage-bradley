// require Express application framework
const express = require('express');
const router = express.Router();

const superagent = require('superagent');

const ls = require('local-storage');

// define the app routes

//Homepage for list of people
router.get('/', function(req, res) {
	res.render('pages/home');
});

router.get('/login', function(req, res) {
	res.render('pages/login');
});

router.post('/login', (req, res) => {
	console.log(req.body)
	superagent
	.post('https://umbrage-interview-api.herokuapp.com/login')
	.send({ username: req.body.email, password: req.body.password }) // sends a JSON post body
	.set('accept', 'json')
	.end((err, res) => { 
	  // Calling the end function will send the request
	  let r = res; 
	  console.log(r.text)
	  console.log(token)
	});
	   res.render('pages/home'); 
});

module.exports = router; 