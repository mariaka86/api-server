'use strict';

const express = require('express');
const { foodInterface} = require('../models/index');
const router = express.Router();

router.post('/food', async(req, res, send) => {
  console.log('req body', req.body);
  const newFood = await foodInterface.create(req.body);
  res.status(200).send(newFood);
});

// get all
router.get('/food', async (req, res, next) => {
  let food= await foodInterface.read();
  res.status(200).send(food);
});

// get one
router.get('/food/:id', async (req, res, next) => {
  let { id } = req.params;
  // console.log('my id is', id);

  let order = await foodInterface.read(id);
  res.status(200).send(order);
});



module.exports = router;
