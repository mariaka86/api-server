'use strict';

const express = require('express');
const { Food} = require('../models/index');
const router = express.Router();
//GET
router.get('/food', getFood);

async function getFood(req, res, next) {
  try {
    let results = await Food.find();
    res.status(200).send(results);

  } catch (error) {
    next(error);
  }
}
// POST
router.post('/food', postFood);

async function postFood(req, res, next) {
  console.log(req.body);
  try {
    let results = await Food.find();
    res.status(200).send(results);

  } catch (error) {
    next(error);
  }
}
//DELETE

router.delete('/food/:foodId', deleteFood);

async function deleteFood(req, res, next) {
  const id = req.params.animalId;
  console.log(id);
  try {
    await Food.findByIdAndDelete(id);
    res.status(204).send('successful!');
  } catch (error) {
    next(error);
  }
}
// UPDATE

router.put('/food/:foodId', putFood);

async function putFood(req, res, next){
  let id = req.params.animalId;
  try {
    let data = req.body;

    const updateAnimal = await Food.findByIdAndUpdate(id, data, { new: true, overwrite: true });
    res.status(201).send(updateAnimal);

  } catch (error) {
    next(error);

  }
}


module.exports = router;
