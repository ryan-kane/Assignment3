/*
NOTE: THIS CODE WILL NOT RUN UNTIL YOU ENTER YOUR OWN openweathermap.org APP ID KEY
NOTE: You need to intall the npm modules by executing >npm install
before running this server
Simple express server re-serving data from openweathermap.org
To test: 
http://localhost:3000
or
http://localhost:3000/weather?city=Ottawa
http://localhost:3000/?ingredient=Basil
to just set JSON response. (Note it is helpful to add a JSON formatter extension, like JSON Formatter, to your Chrome browser for viewing just JSON data.)
*/
const express = require('express'); //express framework
const requestModule = require('request'); //npm module for easy http requests
const PORT = process.env.PORT || 3000;

/*YOU NEED AN APP ID KEY TO RUN THIS CODE
  GET ONE BY SIGNING UP AT openweathermap.org
  THE KEY BELOW IS FAKE
*/
const WEATHER_API_KEY = '2753e02fbb7691461a7fe6ed88806719'; //PUT IN YOUR OWN KEY HERE
const FOOD_API_KEY = 'e0a8e275254cf39c8413d3b99262e01d'; //PUT IN YOUR OWN KEY HERE

const app = express();

//Middleware
app.use(express.static(__dirname + '/public')); //static server

//Routes
app.get('/', (request, response) => {
  response.sendFile(__dirname + '/views/index.html');
});

//Get recipes through express
app.get('/recipes', (request, response) => {
  let ingredient = request.query.ingredient;
  if(!ingredient) {
	  console.log("no ingredient");
    return response.json({message: 'Please enter an ingredient'});
  }
  console.log("ingredient found");
  const url = `http://www.food2fork.com/api/search?q=${ingredient}&key=${FOOD_API_KEY}`;
  requestModule.get(url, (err, res, data) => {
    return response.contentType('application/json').json(JSON.parse(data));
  });
});

//start server
app.listen(PORT, err => {
  if(err) console.log(err);
  else {
    console.log(`Server listening on port: ${PORT}`);
  }
});