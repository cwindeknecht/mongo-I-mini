const express = require('express');

const Bear = require('./BearModel.js');

const bearsRouter = express.Router();

bearsRouter.post('/', function(req, res) {
  const bearInfo = req.body;

  const bear = new Bear(bearInfo);

  bear
    .save()
    .then(savedBear => {
      res.status(201).json(savedBear);
    })
    .catch(err => {
      res.status(500).json({ msg: 'Error saving bear', error: err });
    });
});

bearsRouter.get('/', function(req, res) {
  Bear.find({})
    .then(bears => {
      res.status(200).json(bears);
    })
    .catch(err => {
      res.status(500).json({ msg: 'Error getting bears', error: err });
    });
});

module.exports = bearsRouter;
