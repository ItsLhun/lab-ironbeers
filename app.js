const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

hbs.registerPartials(path.join(__dirname, 'views/partials'));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:
app.get('/', (req, res, next) => {
  res.render('index.hbs', {});
});
app.get('/beers', (req, res, next) => {
  punkAPI
    .getBeers()
    .then(beersFromApi => {
      res.render('beers.hbs', {
        beers: beersFromApi,
        isRandom: false
      });
      console.log('Beers from the database: ', beersFromApi);
    })
    .catch(error => console.log(error));
});
app.get('/random-beer', (req, res, next) => {
  punkAPI
    .getRandom()
    .then(randomBeer => {
      res.render('random-beer.hbs', {
        beer: randomBeer[0],
        isRandom: true
      });
      console.log('Beers from the database: ', randomBeer[0]);
    })
    .catch(error => console.log(error));
});
// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(3020, () => console.log('🏃‍ on port 3010'));
