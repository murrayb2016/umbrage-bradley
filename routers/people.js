// require Express application framework
const express = require('express');
const router = express.Router();

const superagent = require('superagent');

// define the app routes

//Homepage for list of people
router.get('/', function(req, res) {
	session=req.session;
	if(session.token){
		res.render('pages/home');
    }else{
		res.render('pages/login',{root:__dirname});
	}
});

router.get('/login', function(req, res) {
	res.render('pages/login');
});

router.post('/login', (req, res) => {
	// console.log(req.body)
	session=req.session;
	superagent
	.post('https://umbrage-interview-api.herokuapp.com/login')
	.send({ username: req.body.email, password: req.body.password }) // sends a JSON post body
	.set('accept', 'json')
	.end((err, res) => { 
	  // Calling the end function will send the request
	  let resp = res.text;
	  let token = JSON.parse(resp).access_token;
	  session.token=token;
	  console.log(err)
	});
	   res.render('pages/home');  
});

module.exports = router; 
