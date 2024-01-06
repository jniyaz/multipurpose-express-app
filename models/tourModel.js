const mongoose = require('mongoose');
const slugify = require('slugify');

const tourScehema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'a tour should have a name'],
      unique: true,
      trim: true,
    },
    slug: String,
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
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

tourScehema.virtual('durationWeeks').get(function () {
  return this.duration / 7;
});

// DOCUMENT MIDDLEWARE: runs before .save() and .create()
tourScehema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

// tourScehema.post('save', function (doc, next) {
//   console.log(doc);
//   next();
// });

const Tour = mongoose.model('Tour', tourScehema);

module.exports = Tour;
