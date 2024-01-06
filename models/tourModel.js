const mongoose = require('mongoose');

const tourScehema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'a tour should have a name'],
    unique: true,
    trim: true,
  },
  price: {
    type: Number,
    required: [true, 'a tour should have a price'],
  },
  priceDiscount: Number,
  summary: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'a tour should have a description'],
    trim: true,
  },
  duration: {
    type: Number,
    required: [true, 'a tour should have a duration'],
  },
  maxGroupSize: {
    type: Number,
    required: [true, 'a tour should have a group size'],
  },
  difficulty: {
    type: String,
    required: [true, 'a tour should have a difficulty'],
  },
  ratingsAverage: {
    type: Number,
    default: 4.5,
  },
  ratingsQuantity: {
    type: Number,
    default: 0,
  },
  coverImage: {
    type: String,
    required: [true, 'a tour should have a cover image'],
  },
  images: [String],
  startDates: [Date],
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
  updatedAt: {
    type: Date,
    default: null,
    select: false,
  },
});

const Tour = mongoose.model('Tour', tourScehema);

module.exports = Tour;
