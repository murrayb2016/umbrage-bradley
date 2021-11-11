// require 'request' module that allows to make external HTTP requests
const request =  require('superagent');

async function login(){
    return await request.get('https://umbrage-interview-api.herokuapp.com/login').set({username: req.body.email, password: req.body.password});
}

module.exports = {
    login
};