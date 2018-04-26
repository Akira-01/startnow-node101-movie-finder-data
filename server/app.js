var express = require('express');
var morgan = require('morgan');
var axios = require('axios');
var bodyParser = require('body-parser');
// Create a 
var app = express();
app.use(morgan());
app.use(bodyParser.json());
// Log all requests to our server using morgan with the setting 'combined'
//app.use(morgan('combined'));
// Create an object that will hold all of our previous data
var cache = {};
var cache = {
    url: '',
    data: ''
 };
app.get('/', function(req,res) {
    //if req.url == cache.url show the user cache.data
    if (req.url == cache.url) {
        res.send(cache.data);
    } else {
        //otherwise go get omdb data
        axios.get('http://www.omdbapi.com'+ req.url + '&apikey=8730e0e')
        .then(function(r) {
        //since they haven't gotten this data twice, save it to cache before response (otherwise we will)
 
            cache.url = req.url;
            cache.data = r.data;
            res.json(r.data);
            
    })    
    .catch(function(e) {
        res.send(e.message);
    });
 }
 });


 module.exports = app;



