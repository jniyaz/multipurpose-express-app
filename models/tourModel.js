const mongoose = require('mongoose');

const tourScehema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'a tour should have name'],
    unique: true,
  },
  price: {
    type: Number,
    required: [true, 'a tour should have price'],
  },
  rating: {
    type: Number,
    default: 4.5,
  },
});

const Tour = mongoose.model('Tour', tourScehema);

module.exports = Tour;
