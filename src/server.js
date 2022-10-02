'use strict';

const express = require('express');
const foodRouter = require('./routes/foodroute');
const animalsRouter = require ('./routes/animalroute');
const PORT = process.env.PORT || 3002;
const app = express();
const validator = require('./middleware/validator.js');
const errorHandler = require('./error-handlers/500.js');
const notFound = require('./error-handlers/404.js');


app.get('/', (req, res, next) => {
  res.status(200).send('Welcome to the server ');
});



app.use(express.json());

app.use(foodRouter);
app.use(animalsRouter);

app.use(errorHandler);

app.use('*', notFound);


function start(){
  app.listen(PORT, () => console.log(`listening on port ${PORT}`));
}

module.exports = { app, start };
