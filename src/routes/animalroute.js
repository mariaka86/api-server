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

// UPDATE

router.put('/animals/:id',async (req, res, next)=>{
  let {id}= req.params;
  let animal = await animalsInterface.update(req.body,id);
  res.status(200).send(animal);
});


//DELETE

router.delete('/animals/:id',async(req, res, next)=>{

  try{
    let{id}=req.params;

    let message = await animalsInterface.delete(id);
    res.status(200).send(message);
  }catch(err){
    next(err.message);
  }
} );

module.exports = router;

