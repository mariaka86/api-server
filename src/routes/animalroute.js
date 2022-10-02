'use strict';

const express = require('express');
const { animalsInterface ,foodInterface } = require('../models/index');

const router = express.Router();

router.post('/animals',async(req,res,send)=>{
  console.log('reqbody',req.body);
  const newAnimal = await animalsInterface.create(req.body);
  res.status(200).send(newAnimal);
});
// Get All
router.get('/animals', async(req,res,next)=>{
  let animals = await animalsInterface.read();
  res.status(200).send(animals);

});

//Get One
router.get('/animals/:id',async(req,res,next)=>{
  let {id}= req.params;
  let animal = await animalsInterface.read(id);
  res.status(200).send(animal);
});

// connecting the two routes

router.get('/animalWithFood/:id',async(req,res,next)=>{
  let{id}= req.params;
  let animalWithFood = await animalsInterface.readManyToOne(id,foodInterface.model);
  res.status(200).send(animalWithFood);
});








//DELETE

router.delete('/animal/:animalId', deleteAnimal);

async function deleteAnimal(req, res, next) {
  const id = req.params.animalId;
  console.log(id);
  try {
    await Animal.findByIdAndDelete(id);
    res.status(204).send('successful!');
  } catch (error) {
    next(error);
  }
}
// UPDATE

router.put('/animal/:animalId', putAnimal);

async function putAnimal(req, res, next){
  let id = req.params.animalId;
  try {
    let data = req.body;

    const updateAnimal = await Animal.findByIdAndUpdate(id, data, { new: true, overwrite: true });
    res.status(201).send(updateAnimal);

  } catch (error) {
    next(error);

  }
}


module.exports = router;

