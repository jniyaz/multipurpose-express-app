const mongoose = require('mongoose');
const slugify = require('slugify');
// const validator = require('validator');

const tourScehema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      trim: true,
      required: [true, 'a tour should have a name'],
      minlength: [10, 'A tour name must have more or equal 10 characters'],
      maxlength: [50, 'A tour name must have less or equal 50 characters'],
      // validate: [validator.isAlpha, 'Tour name must only contain characters'],
    },
    slug: String,
    price: {
      type: Number,
      required: [true, 'a tour should have a price'],
    },
    priceDiscount: {
      type: Number,
      validate: {
        validator: function (val) {
          // currently this only works on create NEW documents
          return val < this.price;
        },
        message: 'Price discount ({VALUE}) must be below the regular price',
      },
    },
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
      enum: {
        values: ['easy', 'medium', 'difficulty'],
        message: 'Difficulty is either: easy, medium, difficulty',
      },
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, 'Rating must be above 1.0'],
      max: [5, 'Rating must be below 5.0'],
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
    secretTour: {
      type: Boolean,
      default: false,
    },
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

// handle DOCUMENT MIDDLEWARE: runs before .save() and .create()
tourScehema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

// tourScehema.post('save', function (doc, next) {
//   console.log(doc);
//   next();
// });

// handle QUERY MIDDLEWARE:
// tourScehema.pre('find', function (next) {
tourScehema.pre(/^find/, function (next) {
  this.find({ secretTour: { $ne: true } });
  this.start = Date.now();
  next();
});

tourScehema.post(/^find/, function (docs, next) {
  // console.log(docs);
  console.log(`Query took ${Date.now() - this.start} milliseconds!`);
  next();
});

// handle AGGREGATION MIDDLEWARE:
tourScehema.pre('aggregate', function (next) {
  // console.log(this.pipeline());
  this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });
  next();
});

const Tour = mongoose.model('Tour', tourScehema);

module.exports = Tour;
