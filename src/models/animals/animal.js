'use strict';

const animalsModel = (sequelize, DataTypes) => {
  return sequelize.define('animals', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    group: {
      type: DataTypes.ENUM,
      values: ['mammals', 'fish', 'birds', 'reptiles','amphibians'],
      allowNull: true,
    },
  });
};
module.exports = animalsModel;
