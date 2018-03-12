const express = require('express');

const Bear = require('./BearModel.js');

const bearsRouter = express.Router();

bearsRouter.get('/', (req, res) => {
  Bear.find({})
    .then(bears => {
      res.status(200).json(bears);
    })
    .catch(err => {
      res.status(500).json({ msg: 'Error getting bears', error: err });
    });
});

bearsRouter.post('/', (req, res) => {
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

bearsRouter.get('/:id', (req, res) => {
  const { id } = req.params;
  Bear.findById(id)
    .then(bear => {
      res.status(200).json(bear);
    })
    .catch(err => {
      res.status(500).json({ msg: `Error getting bear at id ${id}`, error: err });
    });
});

bearsRouter.delete('/:id', (req, res) => {
  const { id } = req.params;
  Bear.findByIdAndRemove(id)
    .then(bear => {
      res.status(200).json(bear);
    })
    .catch(err => {
      res.status(500).json({ msg: 'Error getting bears', error: err });
    });
});

bearsRouter.put('/:id', (req, res) => {
  const { id } = req.params;
  const updateInfo = req.body;
  Bear.findByIdAndUpdate(id, updateInfo)
    .then(bear => Bear.findById(id))
    .then(bear => {
      res.status(200).json(bear);
    })
    .catch(err => {
      res.status(500).json({ msg: 'Error getting bears', error: err });
    });
});

module.exports = bearsRouter;
