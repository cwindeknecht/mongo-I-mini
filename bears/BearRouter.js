const express = require('express');

const Bear = require('./BearModel.js');

const bearsRouter = express.Router();

bearsRouter.get('/', (req, res) => {
  Bear.find({})
    .then(bears => {
      res.status(200).json({ msg: "Here's All the Bears", bears });
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
      res.status(201).json({ msg: "Here's That Bear You Created", savedBear });
    })
    .catch(err => {
      res.status(500).json({ msg: 'Error saving bear', error: err });
    });
});

bearsRouter.get('/:id', (req, res) => {
  const { id } = req.params;
  Bear.findById(id)
    .then(bear => {
        if (!bear) return res.status(404).json({ msg: `Error getting bear at ID: ${id}`, error: err });
      res.status(200).json({ msg: "Here's That Bear You Requested", bear });
    })
    .catch(err => {
      res.status(500).json({ msg: `Error getting bear at ID: ${id}`, error: err });
    });
});

bearsRouter.delete('/:id', (req, res) => {
  const { id } = req.params;
  Bear.findByIdAndRemove(id)
    .then(bear => {
      res.status(200).json({ msg: 'Deleted Bear', bear });
    })
    .catch(err => {
      res.status(500).json({ msg: 'Error getting bears', error: err });
    });
});

bearsRouter.put('/:id', (req, res) => {
  const updateInfo = req.body;
  if (!updateInfo.species || !updateInfo.latinName)
    return res
      .status(400)
      .json({ errorMessage: 'Please provide both species and latinName for the Bear.' });
  if (typeof updateInfo.species !== String || typeof updateInfo.latinName !== String)
    return res.status(400).json({ errorMessage: 'You provided non-string types.' });
  const { id } = req.params;
  Bear.findByIdAndUpdate(id, updateInfo)
    .then(bear => Bear.findById(id))
    .then(bear => {
      res.status(201).json({ msg: 'Updated Bear', bear });
    })
    .catch(err => {
      res.status(500).json({ msg: 'There was an error while saving the Bear to the Database', error: err });
    });
});

module.exports = bearsRouter;
