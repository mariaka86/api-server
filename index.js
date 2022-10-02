'use strict';

// requires from the model/index.js file

const { sequelize, FoodPrototype,AnimalsPrototype } = require('./src/models/index');
const { start } = require('./src/server');

//create all associated tables and make sure connection is good
sequelize.sync()
  .then(() => {
    console.log('Successful Connection!');
    // here lies danger - inserts every time it is started
    // FoodPrototype.create({name: 'Pizza'});
  })
  .catch(err => console.error(err));

start();
