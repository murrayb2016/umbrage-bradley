// require Express application framework
const express = require('express');
const router = express.Router();

const superagent = require('superagent');

// define the app routes

//Homepage for list of people
router.get('/', function(req, res) {
	// console.log(req.cookies['token'])
	let token = req.cookies['token']; 
	let peoples = new Array(); 
	if(token){
		superagent
	.get('https://umbrage-interview-api.herokuapp.com/people')
	.auth(token, { type: 'bearer' })
	.end((err, data) => { 
	//   console.log(res.text.people)
	  peoples = JSON.parse(data.text).people; 
	  console.log(peoples); 
	  console.log(err)
	  res.render('pages/home', {peoples});
	});
	}
	else{
		res.render('pages/login');
	}
});

//View specific person 
router.get('/view/:id', function(req, res) {
	// console.log(req.cookies['token'])
	let token = req.cookies['token'];
	let id = req.params.id;  
	let person = new Object(); 
	let comments = new Array(); 
	if(token){
		superagent
	.get('https://umbrage-interview-api.herokuapp.com/people/'+id+'')
	.auth(token, { type: 'bearer' })
	.end((err, data) => {  
	  person = JSON.parse(data.text).person; 
	  console.log(person);
	  comments = person.comments; 
	  console.log(comments); 
	  console.log(err)
	  res.render('pages/details', {person,comments});
	});
	}
	else{
		res.render('pages/login');
	}
});

//Delete specific person 
router.delete('/delete/:id', function(req, res) {
	// console.log(req.cookies['token'])
	let token = req.cookies['token'];
	let id = req.params.id;  
	if(token){
		superagent
	.delete('https://umbrage-interview-api.herokuapp.com/people/'+id+'')
	.auth(token, { type: 'bearer' })
	.end((err, data) => {   
	  console.log(err)
	  res.render('pages/home');
	});
	}
	else{
		res.render('pages/login');
	}
});

//Create person
router.post('/people', function(req, res) {
	// console.log(req.cookies['token'])
	let token = req.cookies['token'];
	if(token){
		superagent
	.post('https://umbrage-interview-api.herokuapp.com/people') //API is not accepting body but randomly assigning values
	.auth(token, { type: 'bearer' })
	.send({ first_name: req.body.first_name, last_name: req.body.last_name, email: req.body.email, job_title: req.body.job_title, avatar: req.body.avatar}) // sends a JSON post body
	.set('accept', 'json')
	.end((err, data) => {   
	  console.log(err)
	  res.render('pages/home');
	});
	}
	else{
		res.render('pages/login');
	}
});

//Get login page
router.get('/login', function(req, res) {
	res.render('pages/login');
});

//Set token for 24 hours and get token 
router.post('/login', (req, res) => {
	// console.log(req.body)
	session=req.session;
	console.log('hit'+JSON.stringify(req.body.email))
	console.log('hit'+JSON.stringify(req.body.password))
	superagent
	.post('https://umbrage-interview-api.herokuapp.com/login')
	.send({ username: req.body.email, password:  req.body.password}) // sends a JSON post body
	.set('accept', 'json')
	.end((err, res) => { 
	  // Calling the end function will send the request
	  let resp = res.text;
	  let token = JSON.parse(resp).access_token;
	  const oneDay = 1000 * 60 * 60 * 24;
	  res.cookie('token', token, { maxAge: oneDay, httpOnly: true });
	  res.setHeader('Set-Cookie','visited=true; Max-Age='+oneDay+'; HttpOnly, Secure');
	  console.log(err)
	});
	   res.render('pages/home');  
});

module.exports = router; 
