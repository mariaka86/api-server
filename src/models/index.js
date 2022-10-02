'use strict';
require ('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
const animalsModel = require('./animals/animal.js');
const foodModel = require ('./food/food.js');
const ModelInterface = require('./modelInterface.js');
const DATABASE_URL = process.env.NODE_ENV === 'test'
  ? 'sqlite::memory'
  : process.env.DATABASE_URL;

// instantiates our database
const sequelize = new Sequelize(DATABASE_URL,{dialectOptions:{
  ssl:{
    require:true,
    rejectUnauthorized:false,
  },
},
});
const FoodPrototype = foodModel(sequelize, DataTypes);
const AnimalsPrototype = animalsModel(sequelize, DataTypes);

AnimalsPrototype.hasMany(FoodPrototype);
FoodPrototype.belongsTo(AnimalsPrototype);

sequelize.sync()
  .then(()=> console.log ('you are connected!'))
  .catch(err=> console.error(err));

module.exports = {
  sequelize,
  animalsInterface:new ModelInterface(AnimalsPrototype),
  foodInterface:new ModelInterface(FoodPrototype),
};
