'use strict';

const express = require('express');
const {  FoodPrototype,AnimalsPrototype } = require('./models/index');
const PORT = process.env.PORT || 3002;
const app = express();



const validator = require('./middleware/validator.js');
const errorHandler = require('./error-handlers/500.js');
const notFound = require('./error-handlers/404.js');


app.get('/', (req, res, next) => {
  res.status(200).send('Welcome to the server ');
});


app.use('*', notFound);
app.use(express.json());

app.use(errorHandler);

app.post('/animals', (req, res, send) => {
  console.log ('req body', req.body);

  const newAnimal=AnimalsPrototype.create(req.body);
  res.status(200).send(newAnimal);


});

app.post('/food',async(req, res, send) => {

  const newFood = await FoodPrototype.create(req.body);

  res.status(200).send(newFood);
});


function start(){
  app.listen(PORT, () => console.log(`listening on port ${PORT}`));
}

module.exports = { app, start };
