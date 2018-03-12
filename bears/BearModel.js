const mongoose = require('mongoose');

const BearSchema = new mongoose.Schema({
  species: {
    type: String,
    required: true,
  },
  latinName: {
    type: String,
    required: true,
  },
  createdOn: {
      type: Date,
      default: new Date(),
  },
});

const BearModel = mongoose.model('Bear', BearSchema);

module.exports = BearModel;

// {
//     species: "American Black Bear", // String, required
//     latinName: "Ursus americanus",  // String, required
//     createdOn: Mon Aug 14 2017 12:50:16 GMT-0700 (PDT) // Date, required, defaults to current date
// }
