//simple express server bult using example from lecture notes
//http://people.scs.carleton.ca/~comp2406/notes/17%20Introducing%20Express/

const express = require('express');
const logger = require('morgan');
const requestModule = require('request');
const PORT = process.env.PORT || 3000;
const bodyParser = require('body-parser');

const API_KEY = '4005fdf6e9370006592efe57404fcf46';
const app = express();

//template engine
app.set('view engine', 'pug');
app.set('views', __dirname + '/views');

//MiddleWare
app.use(logger('dev'));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

//Routes
app.get('/', (req, res) =>{
  res.sendFile(__dirname +'/public/recipes.html');
});

app.get('/recipes', (request, response) => {
  let ingredient = request.query.ingredient;
  if(!ingredient) {
    console.log('no ingredient');
    return response.render('recipes.pug');
  }
  console.log("ingredient found");
  const url = `http://www.food2fork.com/api/search?q=${ingredient}&key=${API_KEY}`;
  requestModule.get(url, (err, res, data) => {
      var dataObj = JSON.parse(data);
      return response.render('recipes.pug', {
        title : `${dataObj.count} recipes for ${ingredient}`,
        recipes : dataObj.recipes
      });
  });
});

app.post('/recipes', (req, res) => { 
  console.log(req.query.ingredient);
  if(!req.query.ingredient){
    return res.json({message: 'ingredient not found'});
  }
  const url = `http://www.food2fork.com/api/search?q=${req.query.ingredient}&key=${API_KEY}`;
  requestModule.get(url, (err, response, data) => {
    return res.contentType('application/json').json(JSON.parse(data));
    
});
});


//start server
app.listen(PORT, err =>{
  if(err) console.log(err);
  else{
    console.log(`Server listening on port: ${PORT}`);
  }
});
